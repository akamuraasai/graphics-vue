<template>
  <div class="group_edit">
    <h2>Edição/Inclusão de Grupo de Gráficos</h2>
    <b-form @submit="onSubmit">
      <b-form-group label="Titulo do Gráfico" label-for="titulo">
        <b-form-input id="titulo" type="text" v-model="data.name" required placeholder="Digite o titulo do grupo de gráficos"/>
      </b-form-group>
      <b-btn v-b-modal.adicao variant="success" class="pull-right">Adicionar Gráfico</b-btn>
      <b-form-group label="Graficos Associados" label-for="titulo">
        <b-table id='mainTable' striped hover show-empty
                 :items="data.items"
                 :fields="fields"
                 :empty-text="'Nenhum gráfico associado'"
        >
          <template slot="id" scope="row">{{row.value}}</template>
          <template slot="name" scope="row">{{row.value}}</template>
          <template slot="type_name" scope="row">{{row.value}}</template>
          <template slot="size" scope="row">
            <b-form-input type="text" v-model="data.items[row.index].size" required/>
          </template>
          <template slot="order" scope="row">
            <b-form-input type="number" v-model="data.items[row.index].order" required/>
          </template>
          <template slot="actions" scope="row">
            <b-btn size="sm" :variant="'danger'" @click.stop="removeItem(row.item,row.index,$event.target)"><i class="fa fa-trash"></i></b-btn>
          </template>
        </b-table>
      </b-form-group>
      <b-button type="button" v-on:click="$router.push('/groups')" variant="secondary">Cancelar</b-button>
      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>

    <b-modal id="adicao"
             ref="adicao"
             title="Selecione o Grafico"
             @ok="handleOk"
             @shown="clearGraphic">
        <form>
          <b-form-group label="Lista de Gráficos" label-for="graphics">
            <multiselect
              id="graphics"
              v-model="data.graphic"
              :options="graphicsShowed"
              track-by="id"
              label="name"
            />
          </b-form-group>
        </form>
    </b-modal>
  </div>
</template>

<script>
import { get, post, put } from '@/helpers/http'
import { API_HOME } from '@/helpers/consts'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      data: {
        name: '',
        graphic: {},
        items: [],
        removed: []
      },
      fields: {
        id: { label: 'ID', sortable: false },
        name: { label: 'Nome do Gráfico', 'class': 'text-center' },
        type_description: { label: 'Tipo de Gráfico' },
        size: { label: 'Tamanho' },
        order: { label: 'Ordem' },
        actions: { label: 'Ações' }
      },
      graphicsList: [],
      graphicsShowed: []
    }
  },
  methods: {
    removeItem (item, index, evt) {
      this.data.items.splice(index, 1)
      this.data.removed.push(item.id)
    },
    clearGraphic () {
      const { items } = this.data

      this.graphicsShowed = this.graphicsList.filter(g => items.map(i => i.id).indexOf(g.id) === -1)
      this.data.graphic = {}
    },
    handleOk () {
      this.data.items.push(this.data.graphic)
    },
    onSubmit (evt) {
      evt.preventDefault()
      /* eslint-disable no-unused-vars */
      const { name, items, removed } = this.data /* eslint-enable no-unused-vars */
      const graphics = JSON.stringify(items.map(i => ({ id: i.id, order: i.order, size: i.size })))

      if (this.$route.params.id === undefined) {
        post(`${API_HOME}/groups/store`, { name })
          .then(data => post(`${API_HOME}/groups/${data.group_id}/attach`, { graphics })
            .then(() => this.$router.push(`/groups`)))
      } else {
        if (removed.length > 0) {
          put(`${API_HOME}/groups/`, this.$route.params.id, { name })
            .then(data => post(`${API_HOME}/groups/${this.$route.params.id}/detach`, { graphics: JSON.stringify(removed) }))
            .then(data => post(`${API_HOME}/groups/${this.$route.params.id}/attach`, { graphics })
              .then(() => this.$router.push(`/groups`)))
        } else {
          put(`${API_HOME}/groups/`, this.$route.params.id, { name })
            .then(data => post(`${API_HOME}/groups/${this.$route.params.id}/attach`, { graphics })
              .then(() => this.$router.push(`/groups`)))
        }
      }
    }
  },
  created () {
    const { id } = this.$route.params

    get(API_HOME)
      .then(data => { this.graphicsList = data })

    if (id !== undefined) {
      get(`${API_HOME}/groups/show/${id}?consultor_id=1`)
        .then(data => {
          this.data.name = data.name
          this.data.items = data.graphics
        })
    }
  }
}
</script>

<style scoped>
.group_edit {
  padding-top: 20px;
}
</style>
