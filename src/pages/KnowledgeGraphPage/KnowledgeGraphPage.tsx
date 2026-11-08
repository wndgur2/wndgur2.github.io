import '@/components/common/Tag/Tag.css'
import './KnowledgeGraphPage.css'

import { useMemo, useRef, useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { LuMaximize, LuMinus, LuPlus } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useGetKnowledgeGraph } from '@/api/knowledgeGraph'
import {
  endId,
  filterGraph,
  type SimNode,
} from '@/features/knowledgeGraph/graph'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useTheme from '@/hooks/useTheme'
import { ROUTES } from '@/router'
import GraphCanvas, { type GraphCanvasHandle } from './GraphCanvas'

const CATEGORY_LABELS: Record<string, string> = {
  project: 'Projects',
  study: 'Studies',
  algorithm: 'Algorithms',
}

const TYPE_LABELS: Record<string, string> = {
  language: '언어',
  library: '라이브러리',
  tool: '도구',
  concept: '개념',
  algorithm: '알고리즘·자료구조',
  domain: '분야',
}

const RELATION_LABELS: Record<string, string> = {
  is_a: '종류',
  part_of: '일부',
  uses: '사용',
  implements: '구현',
  improves: '개선',
  compares: '비교',
  related_to: '관련',
}

const DENSITY = [
  { label: '전부', minCount: 1 },
  { label: '주요', minCount: 2 },
  { label: '핵심', minCount: 3 },
]

/**
 * 지식 그래프 페이지
 * - Claude가 글마다 추출한 개념(scraper/scripts/generate-knowledge-graph.js)을 글과 함께 그래프로 표시
 * - 노드에 마우스를 올리면 이웃을 강조하고, 클릭하면 상세 패널을 연다
 */
export default function KnowledgeGraphPage() {
  useDocumentTitle('Knowledge Graph')
  const { data } = useGetKnowledgeGraph()
  const { isDark } = useTheme()
  const graphRef = useRef<GraphCanvasHandle>(null)

  const [minCount, setMinCount] = useState(2)
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(
    () => new Set(),
  )
  const [query, setQuery] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const pool = useMemo(() => new Map<string, SimNode>(), [])
  const { nodes, links } = useMemo(
    () => filterGraph(data, pool, { minCount, hiddenCategories }),
    [data, pool, minCount, hiddenCategories],
  )
  const nodeById = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes])

  const categories = useMemo(
    () =>
      [
        ...new Set(
          data.nodes.flatMap(n => (n.kind === 'post' ? [n.category] : [])),
        ),
      ].sort(),
    [data],
  )

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return new Set(
      nodes.filter(n => n.label.toLowerCase().includes(q)).map(n => n.id),
    )
  }, [nodes, query])

  const toggleCategory = (category: string) =>
    setHiddenCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })

  const select = (id: string | null) => {
    setSelected(id)
    if (id) graphRef.current?.focus(id)
  }

  const selectedNode = selected ? nodeById.get(selected) : undefined
  const detail = useMemo(() => {
    if (!selected) return null
    const neighbors = new Set<string>()
    const relations: { from: string; to: string; relation: string }[] = []
    for (const l of links) {
      const a = endId(l.source)
      const b = endId(l.target)
      if (a !== selected && b !== selected) continue
      neighbors.add(a === selected ? b : a)
      if (l.kind === 'relation')
        relations.push({
          from: nodeById.get(a)?.label ?? a,
          to: nodeById.get(b)?.label ?? b,
          relation: l.relation ?? 'related_to',
        })
    }
    const list = [...neighbors].map(id => nodeById.get(id)!).filter(Boolean)
    return {
      posts: list.flatMap(n => (n.kind === 'post' ? [n] : [])),
      concepts: list
        .flatMap(n => (n.kind === 'concept' ? [n] : []))
        .sort((a, b) => b.count - a.count),
      relations,
    }
  }, [selected, links, nodeById])

  const { stats } = data

  const conceptTags = (concepts: { id: string; label: string }[]) =>
    concepts.length > 0 && (
      <ul className='kg-tags'>
        {concepts.map(n => (
          <li key={n.id}>
            <button type='button' className='tag' onClick={() => select(n.id)}>
              {n.label}
            </button>
          </li>
        ))}
      </ul>
    )

  return (
    <main className='knowledge-graph'>
      <header className='kg-header'>
        <h1 className='content'>Knowledge Graph</h1>
        <small>
          글 {stats.posts} · 개념 {stats.concepts}
          {stats.extracted < stats.posts &&
            ` · ${stats.posts - stats.extracted}개 글은 태그 기반`}
        </small>
      </header>

      <section className='kg-stage'>
        <GraphCanvas
          ref={graphRef}
          nodes={nodes}
          links={links}
          focusId={hovered ?? selected}
          selectedId={selected}
          matches={matches}
          theme={isDark ? 'dark' : 'light'}
          onHover={setHovered}
          onSelect={select}
        />

        <div className='kg-controls'>
          <form
            className='kg-search'
            onSubmit={e => {
              e.preventDefault()
              const first = matches && [...matches][0]
              if (first) select(first)
            }}
          >
            <IoSearch className='minor' size={16} />
            <input
              className='content'
              type='search'
              placeholder='개념이나 글 찾기'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>
          <div className='kg-filter'>
            {categories.map(category => (
              <button
                key={category}
                type='button'
                className={`tag kg-pill ${hiddenCategories.has(category) ? 'off' : ''}`}
                aria-pressed={!hiddenCategories.has(category)}
                onClick={() => toggleCategory(category)}
              >
                {CATEGORY_LABELS[category] ?? category}
              </button>
            ))}
          </div>
          <div className='kg-filter' role='radiogroup' aria-label='개념 표시'>
            {DENSITY.map(option => (
              <button
                key={option.minCount}
                type='button'
                role='radio'
                aria-checked={minCount === option.minCount}
                className={`tag kg-pill ${minCount === option.minCount ? '' : 'off'}`}
                onClick={() => setMinCount(option.minCount)}
              >
                {option.label} 개념
              </button>
            ))}
          </div>
        </div>

        <div className='kg-zoom'>
          <button
            className='small clickable icon'
            aria-label='확대'
            onClick={() => graphRef.current?.zoomBy(1.4)}
          >
            <LuPlus size={18} />
          </button>
          <button
            className='small clickable icon'
            aria-label='축소'
            onClick={() => graphRef.current?.zoomBy(1 / 1.4)}
          >
            <LuMinus size={18} />
          </button>
          <button
            className='small clickable icon'
            aria-label='전체 보기'
            onClick={() => graphRef.current?.fit()}
          >
            <LuMaximize size={16} />
          </button>
        </div>
        <small className='kg-hint'>
          드래그로 이동 · ⌘/Ctrl + 스크롤 또는 핀치로 확대
        </small>

        {selectedNode && detail && (
          <aside className='kg-panel'>
            <button
              className='kg-close small clickable icon'
              aria-label='닫기'
              onClick={() => setSelected(null)}
            >
              <IoClose size={18} />
            </button>
            {selectedNode.kind === 'post' ? (
              <>
                <small>
                  {CATEGORY_LABELS[selectedNode.category] ??
                    selectedNode.category}{' '}
                  · {selectedNode.date}
                </small>
                <h3 className='content'>{selectedNode.label}</h3>
                {selectedNode.summary && (
                  <p className='dimmed content'>{selectedNode.summary}</p>
                )}
                <Link
                  className='kg-open'
                  to={ROUTES.POST_DETAIL(selectedNode.postId)}
                >
                  글 읽기 →
                </Link>
                {conceptTags(detail.concepts)}
              </>
            ) : (
              <>
                <small>
                  {TYPE_LABELS[selectedNode.type] ?? selectedNode.type} · 글{' '}
                  {selectedNode.count}개
                </small>
                <h3 className='content'>{selectedNode.label}</h3>
                {detail.relations.length > 0 && (
                  <ul className='kg-relations'>
                    {detail.relations.map(r => (
                      <li
                        key={`${r.from}-${r.to}-${r.relation}`}
                        className='dimmed content'
                      >
                        {r.from}
                        <span className='minor'>
                          {' '}
                          {RELATION_LABELS[r.relation] ?? r.relation} →{' '}
                        </span>
                        {r.to}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className='kg-posts'>
                  {detail.posts.map(n => (
                    <li key={n.id}>
                      <Link
                        className='kg-post'
                        to={ROUTES.POST_DETAIL(n.postId)}
                      >
                        <i />
                        <span>{n.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {conceptTags(detail.concepts)}
              </>
            )}
          </aside>
        )}
      </section>
    </main>
  )
}
