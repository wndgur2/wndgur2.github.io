import { readFileSync } from 'node:fs'

const TOKENS_FILE = 'src/styles/tokens.css'

// tokens.css 밖에서 쓰는 커스텀 프로퍼티. 컴포넌트가 직접 값을 넣는 지역 변수만 둔다.
const LOCAL_CUSTOM_PROPERTIES = [
  'image-max-height',
  'image-width',
  'image-margin',
  'img-nw',
  'img-nh',
  'preview-max-height',
  'preview-aspect-ratio',
]

const tokenNames = Array.from(
  readFileSync(new URL(TOKENS_FILE, import.meta.url), 'utf8').matchAll(
    /^\s*--([\w-]+)\s*:/gm,
  ),
  ([, name]) => name,
)

const CUSTOM_PROPERTY_PATTERN = new RegExp(
  `^(?:${[...tokenNames, ...LOCAL_CUSTOM_PROPERTIES].join('|')})$`,
)

const RADIUS_VALUE = String.raw`(?:0[a-z]*|var\(--radius(?:-[\w-]+)?\))`
const RADIUS_PATTERN = new RegExp(`^${RADIUS_VALUE}(?:\\s+${RADIUS_VALUE})*$`)

const LITERAL_TIME_PATTERN = /(?<![\w.-])-?\d*\.?\d+m?s\b/

// 뷰포트 단위나 %와 섞인 calc()는 토큰으로 옮길 수 없는 레이아웃 값이므로 통과시킨다.
const LAYOUT_UNIT = String.raw`[\d.](?:[dsl]?v[wh]|vmin|vmax|%)`
const LITERAL_EM_PATTERN = new RegExp(
  String.raw`(?<![\w.-])(?<!\([^()]*${LAYOUT_UNIT}[^()]*)` + // 앞쪽에 레이아웃 단위가 있는 괄호 안이 아님
    String.raw`-?(?!0*\.?0+em)\d*\.?\d+em\b` + // 0이 아닌 em 값
    String.raw`(?![^()]*${LAYOUT_UNIT}[^()]*\))`, // 뒤쪽에 레이아웃 단위가 있는 괄호 안이 아님
)

const tokenMessage = (property, value) =>
  `"${property}: ${value}" 대신 ${TOKENS_FILE}의 토큰을 쓰세요. 의도한 고정값이면 이유를 적은 stylelint-disable-next-line을 다세요.`

export default {
  ignoreFiles: [TOKENS_FILE],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    'color-named': 'never',
    'color-no-hex': true,
    'function-disallowed-list': [
      'rgb',
      'rgba',
      'hsl',
      'hsla',
      'hwb',
      'lab',
      'lch',
      'oklab',
      'oklch',
      'color',
    ],
    'custom-property-pattern': [
      CUSTOM_PROPERTY_PATTERN,
      {
        message: name =>
          `"${name}"은 ${TOKENS_FILE}에 없는 커스텀 프로퍼티입니다. 지역 변수라면 stylelint.config.js의 허용 목록에 추가하세요.`,
      },
    ],
    'declaration-property-value-allowed-list': [
      {
        'font-size': [/^var\(--font-size-[\w-]+\)$/, 'inherit'],
        font: ['inherit'],
        'z-index': [/^var\(--z-[\w-]+\)$/, 'auto', 'inherit'],
        'box-shadow': [/^var\(--shadow(?:-[\w-]+)?\)$/, 'none', 'inherit'],
        '/^border(?:-[a-z]+)*-radius$/': [RADIUS_PATTERN, 'inherit'],
      },
      { message: tokenMessage },
    ],
    'declaration-property-value-disallowed-list': [
      {
        '/^(?:transition|animation)(?:-duration)?$/': [LITERAL_TIME_PATTERN],
        '/^(?:(?:row-|column-|grid-)?gap|(?:padding|margin)(?:-.+)?)$/': [
          LITERAL_EM_PATTERN,
        ],
      },
      { message: tokenMessage },
    ],
  },
}
