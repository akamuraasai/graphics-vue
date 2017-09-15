<template>
  <figure>
    <button v-if="edit" v-on:click="toggle" id="toggle_side" class="btn btn-sm btn-primary"><i class="fa fa-bars"></i></button>
    <chart :options="options" ref="graphic" :auto-resize="''"></chart>
  </figure>
</template>

<style>

figure > .echarts {
  width: 100%;
  height: 25vw;
  min-width: 0;
  /*height: 30vw;*/
}
</style>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts'

export default {
  components: {
    chart: ECharts
  },
  methods: {
    resize () {
      this.$refs.graphic.resize()
    },
    toggle (evt) {
      const sidebar = document.querySelector('.sidebar')
      const echart = document.querySelector('.graphic')
      sidebar.classList.toggle('toggled')
      echart.classList.toggle('col-12')
      echart.classList.toggle('col-8')
      this.resize()
    }
  },
  props: ['options', 'edit']
}
</script>
