import 'd3-transition'

import { useEffect, useImperativeHandle, useRef, type Ref } from 'react'
import { type ForceLink, type Simulation } from 'd3-force'
import { select } from 'd3-selection'
import {
  zoom as d3Zoom,
  zoomIdentity,
  type ZoomBehavior,
  type ZoomTransform,
} from 'd3-zoom'

import {
  createSimulation,
  getBounds,
  nodeRadius,
  type SimLink,
  type SimNode,
} from '@/features/knowledgeGraph/graph'

export interface GraphCanvasHandle {
  zoomBy: (_factor: number) => void
  fit: () => void
  focus: (_id: string) => void
}

interface Props {
  ref?: Ref<GraphCanvasHandle>
  nodes: SimNode[]
  links: SimLink[]
  focusId: string | null
  selectedId: string | null
  matches: ReadonlySet<string> | null
  /** 테마가 바뀌면 CSS 변수에서 색을 다시 읽는다. */
  theme: string
  onHover: (_id: string | null) => void
  onSelect: (_id: string | null) => void
}

interface Colors {
  post: string
  concept: string
  label: string
  halo: string
  accent: string
  font: string
}

const DIM = 0.14
const EASE = 0.18
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function readColors(el: HTMLElement): Colors {
  const style = getComputedStyle(el)
  const v = (name: string) => style.getPropertyValue(name).trim()
  // 색은 두 가지만 쓴다: 글 = 강조색, 개념 = 무채색
  return {
    post: v('--accent-color'),
    concept: v('--minor-color'),
    label: v('--content-color'),
    halo: v('--fg-color'),
    accent: v('--accent-color'),
    font: style.fontFamily,
  }
}

/**
 * d3-force + d3-zoom 으로 그리는 캔버스 그래프
 * - 휠은 페이지 스크롤에 양보하고, ⌘/Ctrl+휠 또는 핀치일 때만 확대한다.
 * - 강조/흐림은 프레임마다 보간해 부드럽게 바뀐다.
 */
export default function GraphCanvas({
  ref,
  nodes,
  links,
  focusId,
  selectedId,
  matches,
  theme,
  onHover,
  onSelect,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 렌더 루프는 React 밖에서 돌기 때문에 최신 값은 ref로 읽는다.
  const live = useRef({
    nodes,
    links,
    focusId,
    selectedId,
    matches,
    onHover,
    onSelect,
  })
  live.current = {
    nodes,
    links,
    focusId,
    selectedId,
    matches,
    onHover,
    onSelect,
  }

  const simRef = useRef<Simulation<SimNode, SimLink>>(null)
  const zoomRef = useRef<ZoomBehavior<HTMLCanvasElement, unknown>>(null)
  const transformRef = useRef<ZoomTransform>(zoomIdentity)
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })
  const colorsRef = useRef<Colors | null>(null)
  const emphasisRef = useRef(new Map<string, number>())
  const frameRef = useRef(0)
  const fittedRef = useRef(false)

  const requestDraw = useRef(() => {})

  // ---- 그리기 ----
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      frameRef.current = 0
      const colors = colorsRef.current
      const { width, height, dpr } = sizeRef.current
      if (!colors || !width) return
      const { nodes, links, focusId, selectedId, matches } = live.current
      const t = transformRef.current
      const k = t.k

      const focusSet = focusId ? new Set([focusId]) : null
      if (focusSet) {
        for (const l of links) {
          const a = typeof l.source === 'object' ? l.source.id : l.source
          const b = typeof l.target === 'object' ? l.target.id : l.target
          if (a === focusId) focusSet.add(String(b))
          if (b === focusId) focusSet.add(String(a))
        }
      }

      // 강조 값을 목표치로 조금씩 옮긴다.
      let animating = false
      const emphasis = emphasisRef.current
      for (const n of nodes) {
        const target =
          (focusSet && !focusSet.has(n.id)) || (matches && !matches.has(n.id))
            ? DIM
            : 1
        const current = emphasis.get(n.id) ?? target
        let next = current + (target - current) * EASE
        if (Math.abs(target - next) < 0.01) next = target
        else animating = true
        emphasis.set(n.id, next)
      }
      const em = (n: SimNode) => emphasis.get(n.id) ?? 1

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.translate(t.x, t.y)
      ctx.scale(k, k)

      // 링크: 살짝 휜 곡선
      ctx.lineCap = 'round'
      for (const l of links) {
        const s = l.source as SimNode
        const d = l.target as SimNode
        if (s.x === undefined || d.x === undefined) continue
        const hot = !!focusId && (s.id === focusId || d.id === focusId)
        const base = l.kind === 'relation' ? 0.5 : 0.28
        ctx.globalAlpha = hot ? 0.85 : base * Math.min(em(s), em(d))
        ctx.strokeStyle = hot ? colors.accent : colors.concept
        ctx.lineWidth = (hot ? 1.5 : l.kind === 'relation' ? 1 : 0.7) / k
        ctx.setLineDash(l.kind === 'relation' ? [3 / k, 3 / k] : [])
        const dx = d.x! - s.x!
        const dy = d.y! - s.y!
        ctx.beginPath()
        ctx.moveTo(s.x!, s.y!)
        ctx.quadraticCurveTo(
          (s.x! + d.x!) / 2 - dy * 0.12,
          (s.y! + d.y!) / 2 + dx * 0.12,
          d.x!,
          d.y!,
        )
        ctx.stroke()
      }
      ctx.setLineDash([])

      // 노드
      for (const n of nodes) {
        if (n.x === undefined) continue
        const r = nodeRadius(n)
        const color = n.kind === 'post' ? colors.post : colors.concept
        const special =
          n.id === focusId || n.id === selectedId || matches?.has(n.id)
        ctx.globalAlpha = em(n)
        if (special) {
          ctx.shadowColor = color
          ctx.shadowBlur = 14
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y!, r, 0, Math.PI * 2)
        if (n.kind === 'concept') {
          // 배경색으로 먼저 칠해 링 안으로 링크 선이 비치지 않게 한다.
          ctx.fillStyle = colors.halo
          ctx.fill()
          ctx.fillStyle = color
          ctx.globalAlpha = em(n) * 0.35
          ctx.fill()
          ctx.globalAlpha = em(n)
          ctx.lineWidth = 1.2 / k
          ctx.strokeStyle = color
          ctx.stroke()
        } else {
          ctx.fillStyle = color
          ctx.fill()
        }
        ctx.shadowBlur = 0
        if (n.id === selectedId) {
          ctx.beginPath()
          ctx.arc(n.x, n.y!, r + 3 / k, 0, Math.PI * 2)
          ctx.lineWidth = 1.5 / k
          ctx.strokeStyle = colors.accent
          ctx.stroke()
        }
      }

      // 라벨: 확대할수록, 연결이 많을수록 먼저 보인다.
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.lineJoin = 'round'
      for (const n of nodes) {
        if (n.x === undefined) continue
        let visibility =
          n.kind === 'concept'
            ? clamp01((k * (0.6 + 0.25 * n.count) - 1.1) / 0.5)
            : clamp01((k - 1.8) / 0.6)
        if (focusSet) visibility = focusSet.has(n.id) ? 1 : 0
        else if (matches) visibility = matches.has(n.id) ? 1 : 0
        const alpha = visibility * em(n)
        if (alpha < 0.02) continue

        const size = (n.kind === 'concept' ? 12 : 11) / k
        ctx.font = `${n.kind === 'concept' || n.id === focusId ? 600 : 400} ${size}px ${colors.font}`
        const label = n.label.length > 22 ? `${n.label.slice(0, 21)}…` : n.label
        const y = n.y! + nodeRadius(n) + 3 / k
        ctx.globalAlpha = alpha
        ctx.lineWidth = 3 / k
        ctx.strokeStyle = colors.halo
        ctx.strokeText(label, n.x, y)
        ctx.fillStyle = colors.label
        ctx.fillText(label, n.x, y)
      }
      ctx.globalAlpha = 1

      if (animating) requestDraw.current()
    }

    requestDraw.current = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(draw)
    }
    return () => {
      cancelAnimationFrame(frameRef.current)
      // StrictMode 재실행 시 예약 상태가 남아 다시 그리지 못하는 일을 막는다.
      frameRef.current = 0
    }
  }, [])

  // ---- 시뮬레이션: 데이터가 바뀌면 이어서 돌린다 ----
  useEffect(() => {
    let sim = simRef.current
    if (!sim) {
      sim = createSimulation(nodes, links).stop()
      // 첫 레이아웃은 미리 계산해 노드가 날아다니는 연출 없이 바로 보여준다.
      for (let i = 0; i < 300; i += 1) sim.tick()
      sim.alpha(0.02)
      simRef.current = sim
    } else {
      sim.nodes(nodes)
      sim.force<ForceLink<SimNode, SimLink>>('link')!.links(links)
      sim.alpha(0.35)
    }
    sim.on('tick', () => requestDraw.current()).restart()
    requestDraw.current()
  }, [nodes, links])

  useEffect(() => () => void simRef.current?.stop(), [])

  // ---- 상태 변화(강조/선택/검색)는 다시 그리기만 하면 된다 ----
  useEffect(() => {
    requestDraw.current()
  }, [focusId, selectedId, matches])

  useEffect(() => {
    colorsRef.current = readColors(canvasRef.current!)
    requestDraw.current()
  }, [theme])

  // ---- 확대/이동 ----
  const fitTransform = () => {
    const { width, height } = sizeRef.current
    const { minX, minY, maxX, maxY } = getBounds(live.current.nodes)
    const k = Math.min(
      2.5,
      Math.max(
        0.3,
        Math.min(width / (maxX - minX + 80), height / (maxY - minY + 80)),
      ),
    )
    return zoomIdentity
      .translate(width / 2, height / 2)
      .scale(k)
      .translate(-(minX + maxX) / 2, -(minY + maxY) / 2)
  }

  useImperativeHandle(ref, () => ({
    zoomBy: factor => {
      select(canvasRef.current!)
        .transition()
        .duration(250)
        .call(zoomRef.current!.scaleBy, factor)
    },
    fit: () => {
      select(canvasRef.current!)
        .transition()
        .duration(500)
        .call(zoomRef.current!.transform, fitTransform())
    },
    focus: id => {
      const node = live.current.nodes.find(n => n.id === id)
      if (node?.x === undefined) return
      const { width, height } = sizeRef.current
      const k = Math.max(transformRef.current.k, 1.8)
      // 넓은 화면에서는 오른쪽 상세 패널에 가리지 않도록 왼쪽으로 비켜 맞춘다.
      const offsetX = width > 768 ? Math.min(180, width * 0.2) : 0
      select(canvasRef.current!)
        .transition()
        .duration(600)
        .call(
          zoomRef.current!.transform,
          zoomIdentity
            .translate(width / 2 - offsetX, height / 2)
            .scale(k)
            .translate(-node.x, -node.y!),
        )
    },
  }))

  // ---- 크기, 포인터, 줌 바인딩 ----
  useEffect(() => {
    const wrapper = wrapperRef.current!
    const canvas = canvasRef.current!

    const toGraph = (event: { clientX: number; clientY: number }) => {
      const rect = canvas.getBoundingClientRect()
      return transformRef.current.invert([
        event.clientX - rect.left,
        event.clientY - rect.top,
      ])
    }
    const hit = (event: { clientX: number; clientY: number }) => {
      const [x, y] = toGraph(event)
      const slack = 4 / transformRef.current.k
      let best: SimNode | null = null
      let bestDist = Infinity
      for (const n of live.current.nodes) {
        const dist = Math.hypot(n.x! - x, n.y! - y)
        if (dist < nodeRadius(n) + slack && dist < bestDist) {
          best = n
          bestDist = dist
        }
      }
      return best
    }

    const zoom = d3Zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.2, 6])
      .filter(event => {
        // 일반 휠은 페이지 스크롤로 넘기고, ⌘/Ctrl+휠·핀치(ctrlKey)만 확대한다.
        if (event.type === 'wheel') return event.ctrlKey || event.metaKey
        if (event.type === 'dblclick') return false
        // 노드를 잡으면 이동 대신 노드를 끈다.
        if (event.type === 'mousedown' && hit(event)) return false
        if (event.type === 'touchstart' && event.touches.length === 1) {
          return !hit(event.touches[0])
        }
        return !event.button
      })
      .on('zoom', event => {
        transformRef.current = event.transform
        requestDraw.current()
      })
    zoomRef.current = zoom
    const selection = select(canvas).call(zoom)
    // 핀치 줌의 기본 동작(페이지 확대)을 막는다.
    canvas.addEventListener(
      'wheel',
      e => {
        if (e.ctrlKey || e.metaKey) e.preventDefault()
      },
      { passive: false },
    )

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const dpr = window.devicePixelRatio || 1
      sizeRef.current = { width, height, dpr }
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      if (!fittedRef.current && width > 0 && live.current.nodes.length) {
        fittedRef.current = true
        selection.call(zoom.transform, fitTransform())
      }
      requestDraw.current()
    })
    observer.observe(wrapper)

    // 노드 끌기 / 클릭 / 호버
    let drag: { node: SimNode; x: number; y: number; moved: boolean } | null =
      null
    let hovered: string | null = null
    const setHovered = (id: string | null) => {
      if (id === hovered) return
      hovered = id
      canvas.style.cursor = id ? 'pointer' : 'grab'
      live.current.onHover(id)
    }

    const onPointerDown = (e: PointerEvent) => {
      const node = hit(e)
      if (!node) return
      canvas.setPointerCapture(e.pointerId)
      drag = { node, x: e.clientX, y: e.clientY, moved: false }
    }
    const onPointerMove = (e: PointerEvent) => {
      if (drag) {
        if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 4) {
          if (!drag.moved) simRef.current?.alphaTarget(0.2).restart()
          drag.moved = true
        }
        if (drag.moved) {
          const [x, y] = toGraph(e)
          drag.node.fx = x
          drag.node.fy = y
        }
        return
      }
      if (e.pointerType === 'mouse') setHovered(hit(e)?.id ?? null)
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!drag) return
      const { node, moved } = drag
      drag = null
      canvas.releasePointerCapture(e.pointerId)
      if (moved) {
        node.fx = null
        node.fy = null
        simRef.current?.alphaTarget(0)
      } else {
        live.current.onSelect(node.id)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (!hit(e)) live.current.onSelect(null)
    }
    const onLeave = () => setHovered(null)

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)
    canvas.style.cursor = 'grab'

    return () => {
      observer.disconnect()
      selection.on('.zoom', null)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className='kg-canvas-wrapper' ref={wrapperRef}>
      <canvas ref={canvasRef} />
    </div>
  )
}
