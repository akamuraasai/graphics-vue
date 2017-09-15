import _ from 'lodash'
import { get } from '@/helpers/http'
import { API_HOME, FORMAT_TYPE, CATEGORIES } from '@/helpers/consts'

/* eslint-disable no-unused-vars */
const orderByName = (x, y) => x.name - y.name
const orderGraphics = (x, y) => x.order - y.order
const links = data =>
  data.map((item, i, arr) => (
    {
      source: item.name,
      target: arr[i + 1] !== undefined ? arr[i + 1].name : ''
    })
  )

const formatDados = (data, type) =>
  data.dados
    .sort(orderByName)
    .map((d, i) =>
      ({
        ...d,
        id: d.name,
        alias: data.aliases ? data.aliases[d.name] : null,
        itemStyle: type ? { normal: { color: d.active === '1' ? 'green' : 'red' } } : d.itemStyle
      })
    )

const formatSeries = (series, attributes, data, format, links) =>
  series.map(s => {
    const attribute = attributes.find(a => a.id === s.id)
    return ({
      ...s,
      links: links,
      itemStyle: attribute === undefined ? s.itemStyle : attribute.itemStyle,
      label:
      {
        ...s.label,
        normal:
        {
          ...s.label.normal,
          fontSize: 9,
          color: '#000000',
          formatter: FORMAT_TYPE[1][format]
        }
      },
      data: data
        .filter(d => d.series_id === s.id)
        .map(d => ({ ...d, name: d.alias || d.name }))
    })
  }
  )

const checkTypeIsPie = series => series.filter(s => s.type === 'pie').length > 0

const formatXAxis = (xAxis, series, type) =>
  ({
    ...xAxis,
    type: (type ? 'category' : xAxis.type),
    // name: 'Ciclo',
    data: _.union(...series.map(s => s.data.map(d => d.name)))
  })

const formatYAxis = (yAxis, type) =>
  ({
    ...yAxis,
    type: (type ? 'category' : yAxis.type),
    data: (type ? CATEGORIES : yAxis.data)
    // name: 'Pontos'
  })

const formatLegend = (legend, series, isPie) =>
  ({
    ...legend,
    data: isPie
      ? _.union(...series.map(s => s.data.map(d => d.name)))
      : series.map(s => s.name.toString())
  })

const tooltipFunction = params => format =>
  `${params[0].seriesName}<br/>
   ${params[0].name}: ${FORMAT_TYPE[0][format](params[0])}`

const tooltipFunctionStatus = params => format =>
  `${params.seriesName}<br/>
  ${params.name}: ${FORMAT_TYPE[0][format](params)}`

const formatTooltip = (tooltip, format, type) =>
  ({
    ...tooltip,
    formatter: params => type ? tooltipFunctionStatus(params)(format) : tooltipFunction(params)(format)
  })

const setOptions = data => {
  const isStatusGraph = Number(data.graphics_types_id) === 4
  const seriesAttributes = data.series_attributes || []
  const dados = formatDados(data, isStatusGraph)
  const linked = (isStatusGraph ? links(dados) : false)
  const series = formatSeries(data.series, seriesAttributes, dados, data.source_format, linked)
  const xAxis = formatXAxis(data.xAxis, series, isStatusGraph)
  const yAxis = formatYAxis(data.yAxis)
  const legend = formatLegend(data.legend, series, checkTypeIsPie(data.series))
  const tooltip = formatTooltip(data.tooltip, data.source_format, isStatusGraph)
  const title = {
    ...data.title,
    subtext: data.title.subtext || '',
    subtextStyle: {
      ...data.title.subtextStyle,
      color: data.title.subtextStyle === undefined ? '#000000' : data.title.subtextStyle.color
    }
  }

  return {
    title: title,
    tooltip: tooltip,
    legend: legend,
    xAxis: xAxis,
    yAxis: yAxis,
    series: series,
    size: data.size
  }
}

const setParameters = data => ({
  fonte: {
    text: data.description,
    value: data.graphics_sources_id
  },
  filters: data.filters,
  color: data.series_attributes === null ? '' : data.series_attributes[0].itemStyle.normal.color
})

export const showGraphic = (id, params) =>
  get(`${API_HOME}/show/${id}?${params}`)
    .then(data => setOptions(data))

export const editGraphic = (id, params) =>
  get(`${API_HOME}/show/${id}?${params}`)
    .then(data => ({ options: setOptions(data), parameters: setParameters(data) }))

export const showGroup = (id, params) =>
  get(`${API_HOME}/groups/show/${id}?${params}`)
    .then(data => makeGraphics(data))

const makeGraphics = data =>
  ({
    name: data.name,
    options: data.graphics.sort(orderGraphics).map(g => setOptions(g))
  })
