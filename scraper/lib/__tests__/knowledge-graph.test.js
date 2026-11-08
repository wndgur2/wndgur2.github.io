import { describe, expect, it } from 'vitest'

import { buildGraph, conceptKey, postHash } from '../knowledge-graph.js'

const post = (id, tags, content = '') => ({
  id,
  title: id,
  category: 'study',
  tags,
  content,
  date_started: '2026.01.01',
})

describe('conceptKey', () => {
  it('merges spelling variants but keeps C++/C#', () => {
    expect(conceptKey('Event Loop')).toBe(conceptKey('event-loop'))
    expect(conceptKey('C++')).not.toBe(conceptKey('C#'))
  })
})

describe('buildGraph', () => {
  it('uses fresh LLM extractions and merges concepts across posts', () => {
    const a = post('a', ['js'], 'about react')
    const b = post('b', ['js'], 'about hooks')
    const cache = {
      posts: {
        a: {
          hash: postHash(a),
          summary: 'A',
          concepts: [
            { name: 'React', type: 'library', importance: 3 },
            { name: 'Virtual DOM', type: 'concept', importance: 2 },
          ],
          relations: [
            { source: 'React', target: 'Virtual DOM', relation: 'uses' },
            // 이 글에서 뽑지 않은 개념과의 관계는 버린다
            { source: 'React', target: 'Vue', relation: 'compares' },
          ],
        },
        b: {
          hash: postHash(b),
          summary: 'B',
          concepts: [{ name: 'react', type: 'library', importance: 2 }],
          relations: [],
        },
      },
    }

    const graph = buildGraph([a, b], cache)
    const react = graph.nodes.find(n => n.id === 'concept:react')

    expect(graph.stats).toMatchObject({ posts: 2, extracted: 2, concepts: 2 })
    expect(react).toMatchObject({ label: 'React', type: 'library', count: 2 })
    expect(graph.links.filter(l => l.kind === 'relation')).toEqual([
      {
        source: 'concept:react',
        target: 'concept:virtualdom',
        kind: 'relation',
        relation: 'uses',
      },
    ])
  })

  it('falls back to tags when the extraction is missing or stale', () => {
    const a = post('a', ['heap', 'js'], 'new content')
    const cache = {
      posts: {
        a: {
          hash: 'stale',
          summary: '',
          concepts: [{ name: 'X', type: 'concept', importance: 1 }],
          relations: [],
        },
      },
    }

    const graph = buildGraph([a], cache)

    expect(graph.stats.extracted).toBe(0)
    expect(
      graph.nodes.filter(n => n.kind === 'concept').map(n => n.label),
    ).toEqual(['heap', 'js'])
  })
})
