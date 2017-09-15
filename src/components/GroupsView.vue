<template>
  <div class="view .mx-auto">
    <h2>{{ data.name }}</h2>
    <div class="row">
      <div v-for="option in data.options" :class="option.size">
        <graphic class="graphic" :options="option"/>
      </div>
    </div>
  </div>
</template>

<script>
import { showGroup } from '@/helpers/functions'
import Graphic from '@/components/Graphic'

export default {
  components: {
    Graphic
  },
  created () {
    const { id, params } = this.$route.params

    if (id != null) {
      showGroup(id, params)
        .then(data => { this.data = data })
    }
  },
  data () {
    return {
      data: {
        name: '',
        options: []
      }
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
