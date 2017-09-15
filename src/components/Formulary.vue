<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Titulo do Gráfico" label-for="titulo" style="color: #FFF">
        <b-form-input id="titulo" type="text" v-model="options.title.text" required placeholder="Digite o titulo do gráfico"/>
      </b-form-group>
      <b-form-group label="Subtitulo do Gráfico" label-for="subtitulo" style="color: #FFF">
        <b-input-group>
          <b-form-input id="subtitulo" type="text" v-model="options.title.subtext" placeholder="Digite o subtitulo do gráfico"/>
            <b-input-group-button slot="right">
              <b-btn variant="info" id="subtextColor">Cor</b-btn>
            </b-input-group-button>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Tipo de Dados" label-for="tipo" style="color: #FFF">
        <b-input-group>
          <multiselect
            id="tipo"
            v-model="parameters.tipo"
            :options="typeOptions"
            track-by="trigger"
            label="text"
          />
          <b-input-group-button slot="right">
            <b-btn variant="info" id="seriesColor">Cor</b-btn>
          </b-input-group-button>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Estilo do Tooltip" label-for="tooltip" style="color: #FFF">
        <multiselect
          id="tooltip"
          v-model="options.tooltip"
          :options="tooltipList"
          track-by="trigger"
          label="text"
        />
      </b-form-group>
      <b-form-group label="Fonte de Dados" label-for="fonte" style="color: #FFF">
        <multiselect
          id="fonte"
          v-model="parameters.fonte"
          @input="renderFilters"
          :options="sourceOptions"
          track-by="value"
          label="text"
        />
      </b-form-group>
      <b-form-group v-for="filter in filters" style="color: #FFF" :key="filter.id" :label="filter.name" :label-for="filter.name">
        <b-form-input :id="filter.name" type="text" v-if="filter.type === 'string'" />
        <b-form-input :id="filter.name" type="number" v-if="filter.type === 'integer'" />
        <b-form-input :id="filter.name" type="number" step="any" v-if="filter.type === 'decimal'" />
        <multiselect
          :id="filter.name"
          track-by="value"
          label="text"
          :options="filter.default_values"
          v-if="filter.type === 'choices'"
          v-model="sourceFilter[filter.name]"/>
        <multiselect
          :id="filter.name"
          track-by="value"
          label="text"
          multiple
          :options="filter.default_values"
          v-if="filter.type === 'multiple_choices'"
          v-model="sourceFilter[filter.name]"/>
        <!-- <multiselect
            :id="filter.name"
            track-by="value"
            label="text"
            multiple
            :options="[{ value: true, text: filter.name }]"
            v-if="filter.type === 'get'"
            v-model="sourceFilter[filter.name]"/> -->
        <b-form-checkbox
          :id="filter.name"
          v-on:change="changeCheckState(filter.name)"
          v-if="filter.type === 'get'"
        >
          {{ filter.name }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="options.xAxis.show" id="xAxis">Visualizar Eixo X</b-form-checkbox>
        <b-form-checkbox v-model="options.yAxis.show" id="xAxis">Visualizar Eixo Y</b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="options.legend.show" id="xAxis">Visualizar Legenda</b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button type="reset" variant="secondary">Limpar</b-button>
    </b-form>

    <b-popover target="subtextColor"
               triggers="click"
               placement="auto"
               ref="popover"
               @show="onShow"
               @hidden="onHidden">
      <template slot="title">
        <b-btn @click="onClose('popover')" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        Selecione a Cor
      </template>
      <div>
        <b-form-group>
          <chrome :value="options.title.subtextStyle.color" @input="updateValue"/>
        </b-form-group>
      </div>
    </b-popover>

    <b-popover target="seriesColor"
               triggers="click"
               placement="auto"
               ref="popover2"
               @show="onShow"
               @hidden="onHidden">
      <template slot="title">
        <b-btn @click="onClose('popover2')" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        Selecione a Cor
      </template>
      <div>
        <b-form-group>
          <chrome :value="parameters.color" @input="updateValue2"/>
        </b-form-group>
      </div>
    </b-popover>
  </div>
</template>

<script>
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import { Chrome } from 'vue-color'
import Sidebar from '@/components/Sidebar'
import { get, post, put } from '@/helpers/http'
import { API_HOME } from '@/helpers/consts'

export default {
  components: {
    Sidebar,
    Multiselect,
    Chrome
  },
  inherit: true,
  data () {
    return {
      color: '',
      sourceList: [],
      typeList: [],
      sourceOptions: [],
      typeOptions: [],
      filters: [],
      sourceFilter: {},
      tooltipList: [
        { text: 'Tooltip por Item do Gráfico', trigger: 'item' },
        { text: 'Tooltip por Categoria no Gráfico', trigger: 'axis' },
        { text: 'Não exibir Tooltip', trigger: 'none' }
      ]
    }
  },
  methods: {
    onClose (el) {
      this.$refs[el].$emit('close')
    },
    onShow () {
      this.disabled = true
    },
    onHidden () {
      this.disabled = false
    },
    updateValue (color) {
      this.options.title = {
        ...this.options.title,
        subtextStyle: {
          color: color.hex
        }
      }
    },
    updateValue2 (color) {
      this.options.series = this.options.series.map(s => ({ ...s, itemStyle: { normal: { color: color.hex } } }))
    },
    changeCheckState (name) {
      if (this.sourceFilter[name] === undefined) {
        this.sourceFilter[name] = true
      } else {
        delete this.sourceFilter[name]
      }
    },
    setType () {
      const { series } = this.options
      if (series.length > 0) {
        this.parameters.tipo = this.typeOptions.filter(t => t.value === series[0].type)[0]
      }
    },
    setFilters () {
      const { filters } = this.parameters

      if (filters.length > 0) {
        const json = filters.map(f => {
          const content = JSON.stringify(f.values.map(v => ({ text: v, value: v })))
          return `"${f.column}": ${content},`
        }).join('').replace(/[,]$/, '')

        const mutated = JSON.parse((`{ ${json} }`))
        this.sourceFilter = mutated
      } else {
        this.filters
          .filter(f => f.type === 'get' && f.required)
          .forEach(i => { this.sourceFilter[i.name] = true })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      const tipos = _.union(..._.map(this.sourceList, f => f.columns))
      const filtred = tipos.length > 0 ? _.map(this.sourceFilter,
        (f, k) => (
          {
            column: k,
            values: _.isArray(f) ? f.map(d => d.value) : [f.value],
            type: tipos.filter(t => t.name === k)[0].type
          }
        )
      ) : []
      const typeId = this.typeList.filter(t => t.name === this.parameters.tipo.value)[0].id

      const { series, ...attributes } = this.options
      const postData = {
        type_id: typeId,
        source_id: this.parameters.fonte.value,
        name: this.options.title.text,
        filters: filtred,
        graphic_attributes: attributes,
        series_attributes: series.map(s => ({ id: s.id, itemStyle: s.itemStyle }))
      }

      if (this.$route.params.id === undefined) {
        post(`${API_HOME}/store`, postData)
        .then(data => this.$router.push(`/view/${data.graphic_id}/consultor_id=1070`))
      } else {
        put(API_HOME, this.$route.params.id, postData)
        .then(data => this.$router.push(`/`))
      }
    },
    renderFilters () {
      this.sourceFilter = {}
      const id = Number(this.parameters.fonte.value)
      const fonte = this.sourceList.filter(f => f.id === id)[0] || { columns: [] }
      this.filters = fonte.columns
      this.setFilters()
    }
  },
  created () {
    get(`${API_HOME}/types`)
      .then(data => {
        this.typeOptions = _.map(data, d => {
          return { text: d.description, value: d.name }
        })
        this.typeList = data
      }
    )
    .then(setTimeout(() => this.setType(), 1000))

    get(`${API_HOME}/sources`)
      .then(data => {
        this.sourceOptions = _.map(data, d => {
          return { text: d.description, value: d.id }
        })
        this.sourceList = data
      }
    )
    .then(setTimeout(() => this.renderFilters(), 2000))
  },
  props: ['parameters', 'options']
}
</script>

<style scoped>
label, #app, body {
  color: #FFFFFF !important
}
</style>
