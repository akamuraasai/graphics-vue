<template>
  <div class="view .mx-auto">
    <h2>Visualização de Gráfico</h2>
    <graphic class="graphic" :options="options"/>
  </div>
</template>

<script>
import { showGraphic } from '@/helpers/functions'
import { INITIAL_OPTIONS } from '@/helpers/consts'
import Graphic from '@/components/Graphic'

export default {
  components: {
    Graphic
  },
  created () {
    const { id, params } = this.$route.params

    if (id != null) {
      showGraphic(id, params)
        .then(options => { this.options = options })
    }
  },
  data () {
    return {
      options: INITIAL_OPTIONS
    }
  }
}
</script>

<style scoped>
.view {
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.graphic {
  padding-top: 20px;
}
</style>
