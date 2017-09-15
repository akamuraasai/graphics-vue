<template>
  <figure>
    <chart :options="options" ref="graphic" :auto-resize="''"></chart>
  </figure>
</template>

<style>

figure > .echarts {
  width: 100%;
  min-width: 0;
  height: 30vw;
}
</style>

<script>
import ECharts from 'vue-echarts'

export default {
  components: {
    chart: ECharts
  },
  data () {
    return {
      options:
      {
        'title': {
          'text': 'Total Bonus (R$)'
        },
        'tooltip': {
          'text': 'Tooltip por Categoria no Gráfico',
          'trigger': 'axis',
          'formatter': '{a} <br/>{b}: R$ {c}'
        },
        'legend': {
          'show': true,
          'data': [1070]
        },
        'xAxis': {
          'show': true,
          'data': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
        },
        'yAxis': {
          'show': true
        },
        'series': [{
          'id': 1,
          'name': 1070,
          'type': 'bar',
          'label': {
            'normal': {
              'show': true,
              'position': 'outside',
              'fontSize': 200,
              'formatter': 'R$ {c}'
            }
          },
          'itemStyle': {
            'normal': {
              'color': '#4382bc'
            }
          },
          'data': [{
            'id': 3,
            'series_id': 1,
            'name': '1',
            'value': '2511.50',
            'alias': null
          }, {
            'id': 4,
            'series_id': 1,
            'name': '2',
            'value': '1532.94',
            'alias': null
          }, {
            'id': 8,
            'series_id': 1,
            'name': '3',
            'value': '1271.81',
            'alias': null
          }, {
            'id': 11,
            'series_id': 1,
            'name': '4',
            'value': '848.43',
            'alias': null
          }, {
            'id': 5,
            'series_id': 1,
            'name': '5',
            'value': '1211.86',
            'alias': null
          }, {
            'id': 1,
            'series_id': 1,
            'name': '6',
            'value': '1331.37',
            'alias': null
          }, {
            'id': 2,
            'series_id': 1,
            'name': '7',
            'value': '679.77',
            'alias': null
          }, {
            'id': 9,
            'series_id': 1,
            'name': '8',
            'value': '1453.95',
            'alias': null
          }, {
            'id': 6,
            'series_id': 1,
            'name': '9',
            'value': '2629.09',
            'alias': null
          }, {
            'id': 10,
            'series_id': 1,
            'name': '10',
            'value': '3334.54',
            'alias': null
          }, {
            'id': 7,
            'series_id': 1,
            'name': '11',
            'value': '87.00',
            'alias': null
          }]
        }],
        'size': 'col-6'
      }
    }
  }
}
</script>
