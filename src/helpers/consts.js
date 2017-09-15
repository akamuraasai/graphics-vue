// export const API_HOME = 'http://bi.contem1gmagic.com.br/graphics'
export const API_HOME = 'http://177.47.18.121/graphics'

export const CATEGORIES =
  [
    'Consultor', 'Sponsor', 'Bronze', 'Prata',
    'Ouro', 'Rubi', 'Esmeralda', 'Diamante',
    'Diamante Plus', 'Duplo Diamante', 'Triplo Diamante',
    'Diamante Real'
  ]

export const INITIAL_OPTIONS = {
  xAxis: {
    show: true
  },
  yAxis: {
    show: true
  },
  legend: {
    show: true
  },
  title: {
    text: '',
    subtext: '',
    subtextStyle: {
      color: '#000000'
    }
  },
  tooltip: {
    trigger: ''
  },
  series: []
}

const abbreviateNumber = function (num, fixed) {
  fixed = (!fixed || fixed < 0) ? 0 : fixed
  const b = (num).toPrecision(2).split('e')
  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3)
  const c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed)
  const d = c < 0 ? c : Math.abs(c)
  const e = d + ['', 'K', 'M', 'B', 'T'][k]
  return e
}

const correctNumber = num => num === null || num === 0 ? '0' : abbreviateNumber(num)

export const FORMAT_TYPE = {
  0: {
    number: params => Number(params.value).toLocaleString(),
    percent: params => `${Number(params.value).toLocaleString()}%`,
    money: params => `R$ ${Number(params.value).toLocaleString()}`,
    string: params => `${params.value} [${params.data.active === '1' ? 'Ativo' : 'Inativo'}]`
  },
  1: {
    number: params => correctNumber(Number(params.value)),
    percent: params => `${correctNumber(Number(params.value))}%`,
    money: params => `R$ ${correctNumber(Number(params.value))}`,
    string: params => `${params.value} [${params.data.active === '1' ? 'Ativo' : 'Inativo'}]`
  }
}
