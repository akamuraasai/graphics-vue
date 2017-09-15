<template>
  <div class="container-fluid">
    <Sidebar>
      <Formulary slot="formulary" :options="options" :parameters="parameters" />

      <Graphic slot="graphic" :options="options" :edit="true" />
    </Sidebar>
  </div>
</template>

<script>
import { INITIAL_OPTIONS } from '@/helpers/consts'
import { editGraphic } from '@/helpers/functions'
import Sidebar from '@/components/Sidebar'
import Formulary from '@/components/Formulary'
import Graphic from '@/components/Graphic'

export default {
  components: {
    Sidebar,
    Formulary,
    Graphic
  },
  created () {
    const { id, params } = this.$route.params

    if (id !== null) {
      editGraphic(id, params)
        .then(data => {
          this.options = data.options
          this.parameters = data.parameters
        })
    }
  },
  data () {
    return {
      options: INITIAL_OPTIONS,
      parameters: {
        tipo: '',
        fonte: '',
        color: '',
        filters: []
      }
    }
  }
}
</script>

<style scoped>
</style>
