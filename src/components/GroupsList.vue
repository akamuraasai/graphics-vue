<template>
  <div class="home">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-3">
        <b-form-fieldset label="Itens por página" :label-cols="3">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-fieldset>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9">
        <b-form-fieldset label="Buscar" :label-cols="3">
          <b-form-input v-model="filter" placeholder="Buscar registro" />
        </b-form-fieldset>
      </div>
    </div>

    <!-- Main table element -->
    <b-table id='mainTable' striped hover show-empty
             :no-provider-paging="true"
             :no-provider-sorting="true"
             :no-provider-filtering="true"
             :busy.sync="isBusy"
             :items="itemList"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :empty-text="'Nenhum grupo de gráficos registrado'"
             :empty-filtered-text="'Nenhum grupo de gráficos registrado contem o texto digitado na busca'"
             @filtered="onFiltered"
    >
      <template slot="id" scope="row">{{row.value}}</template>
      <template slot="name" scope="row">{{row.value}}</template>
      <template slot="actions" scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn size="sm" :variant="'success'" :href="`#/groups/view/${row.item.id}/consultor_id=1070`"><i class="fa fa-eye"></i></b-btn>
        <b-btn size="sm" :variant="'warning'" :href="`#/groups/edit/${row.item.id}`"><i class="fa fa-pencil"></i></b-btn>
        <b-btn size="sm" :variant="'danger'" @click.stop="removeItem(row.item,row.index,$event.target)"><i class="fa fa-trash"></i></b-btn>
      </template>
    </b-table>

    <div class="row">
      <div class="col-sm-8">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
      </div>
      <div class="col-sm-4 text-md-right">
        <b-button :variant="'success'" @click="$router.push('/groups/edit')">Novo Grupo de Gráficos</b-button>
      </div>
    </div>

    <!-- Details modal -->
    <b-modal id="modal1" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
      <pre>{{ modalDetails.data }}</pre>
    </b-modal>
  </div>
</template>

<script>
import { get, remove } from '@/helpers/http'
import { API_HOME } from '@/helpers/consts'

export default {
  name: 'home',
  data: () => ({
    isBusy: false,
    fields: {
      id: { label: 'ID', sortable: false },
      name: { label: 'Nome do Grupo de Gráficos', sortable: true, 'class': 'text-center' },
      actions: { label: 'Ações' }
    },
    items: [],
    currentPage: 1,
    perPage: 5,
    totalRows: 0,
    pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}],
    sortBy: null,
    sortDesc: false,
    filter: null,
    modalDetails: { index: '', data: '' }
  }),
  methods: {
    itemList (ctx) {
      this.isBusy = true
      let promise = get(`${API_HOME}/groups`)

      return promise.then(data => {
        const items = data
        this.isBusy = false
        this.totalRows = items.length
        return items
      }).catch(error => {
        this.isBusy = false
        console.error(error)
        return []
      })
    },
    details (item, index, button) {
      this.modalDetails.data = JSON.stringify(item, null, 2)
      this.modalDetails.index = index
      this.$root.$emit('show::modal', 'modal1', button)
    },
    removeItem (item, index, button) {
      remove(`${API_HOME}/groups`, item.id)
      this.$root.$emit('table::refresh', 'mainTable')
    },
    resetModal () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
