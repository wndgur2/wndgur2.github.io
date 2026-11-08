import './KnowledgeGraphPreview.css'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { META_PATHS } from '@/consts/meta'
import { QUERY_KEYS } from '@/consts/query'
import {
  createSimulation,
  filterGraph,
  getBounds,
  nodeRadius,
  type SimNode,
} from '@/features/knowledgeGraph/graph'
import { ROUTES } from '@/router'
import type { KnowledgeGraph } from '@/types/knowledgeGraph'
import { fetchJSON } from '@/utils/fetch'

const PADDING = 16

/**
 * 홈 마지막 섹션의 지식 그래프 입구
 * - 실제 그래프 데이터로 레이아웃을 계산해 SVG 썸네일로 그린다
 * - 그래프 파일이 없거나 실패하면 섹션을 숨긴다 (홈을 깨뜨리지 않도록 suspense를 쓰지 않음)
 */
export default function KnowledgeGraphPreview() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.KNOWLEDGE_GRAPH,
    queryFn: () => fetchJSON<KnowledgeGraph>(META_PATHS.KNOWLEDGE_GRAPH),
    staleTime: 1000 * 60 * 5,
  })

  const preview = useMemo(() => {
    if (!data) return null
    const { nodes, links } = filterGraph(data, new Map(), {
      minCount: 2,
      hiddenCategories: new Set(),
    })
    if (!nodes.length) return null
    const sim = createSimulation(nodes, links).stop()
    for (let i = 0; i < 300; i += 1) sim.tick()

    const { minX, minY, maxX, maxY } = getBounds(nodes)
    const topConcepts = nodes
      .flatMap(n => (n.kind === 'concept' ? [n] : []))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
    return {
      nodes,
      links: links.map(l => ({
        kind: l.kind,
        s: l.source as SimNode,
        t: l.target as SimNode,
      })),
      viewBox: `${minX - PADDING} ${minY - PADDING} ${maxX - minX + PADDING * 2} ${maxY - minY + PADDING * 2}`,
      topConcepts,
    }
  }, [data])

  if (!data || !preview) return null

  return (
    <section className='home-category kg-preview'>
      <header>
        <Link className='link' to={ROUTES.GRAPH}>
          <header>
            <h1>Knowledge Graph</h1>
            <IoIosArrowForward size={20} />
          </header>
        </Link>
      </header>
      <Link to={ROUTES.GRAPH} className='kg-preview-card link clickable'>
        <svg
          className='kg-preview-thumb'
          viewBox={preview.viewBox}
          preserveAspectRatio='xMidYMid meet'
          aria-hidden
        >
          <g className='kg-preview-links'>
            {preview.links.map(({ kind, s, t }, i) => {
              const dx = t.x! - s.x!
              const dy = t.y! - s.y!
              return (
                <path
                  key={i}
                  className={kind}
                  d={`M${s.x},${s.y} Q${(s.x! + t.x!) / 2 - dy * 0.12},${(s.y! + t.y!) / 2 + dx * 0.12} ${t.x},${t.y}`}
                />
              )
            })}
          </g>
          <g>
            {preview.nodes.map(n => (
              <circle
                key={n.id}
                className={n.kind}
                cx={n.x}
                cy={n.y}
                r={nodeRadius(n)}
              />
            ))}
          </g>
        </svg>
        <div className='kg-preview-info content'>
          <h2>글과 개념의 연결 지도</h2>
          <p className='dimmed content'>
            글 {data.stats.posts}개에서 뽑은 개념 {data.stats.concepts}개가 서로
            어떻게 이어지는지 한눈에 살펴보세요.
          </p>
          <ul className='kg-preview-concepts'>
            {preview.topConcepts.map(n => (
              <li key={n.id} className='minor'>
                #{n.label}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </section>
  )
}
