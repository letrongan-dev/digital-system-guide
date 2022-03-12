<template>
<article>
    <div class="float-right">
        <button class="btn font-weight-bold">Retrieve</button>
        <button class="btn font-weight-bold">Save</button>
        <button class="btn font-weight-bold"  @click="addRowHandler">Add</button>
        <button class="btn font-weight-bold" @click="removeRowsHandler">Delete</button>
    </div>
    <div style="clear:both"></div>
    <div class="mt-3">
       <b-table class="b-table" :items="tableItems" :fields="fields" fixed :per-page="perPage"
                :current-page="currentPage">
            <template v-for="(field, index) in fields" #[`cell(${field.key})`]="data">
                <b-form-file v-if="field.type === 'file' && tableItems[data.index].isEdit" :key="index" :value="tableItems[data.index][field.key]" @input="(value) => inputHandler(value, data.index, field.key)" :options="field.options" :ref="'field-'+index"></b-form-file>
                <b-checkbox  v-else-if="field.key === 'checkbox'" :checked="tableItems[data.index].isSelected" :key="index" @change="selectRowHandler(data)"></b-checkbox>
                <b-form-input v-else-if="field.type && tableItems[data.index].isEdit" :key="index" :type="field.type" :value="tableItems[data.index][field.key]" @blur="(e) => inputHandler(e.target.value, data.index, field.key)"></b-form-input>
                <span :key="index" @click="editRowHandler(data)" v-else-if="field.key === 'program'">{{data.value}}</span>
                <span :key="index" v-else>{{data.value}}</span>
            </template>
        </b-table>
        <b-pagination
                class="float-right"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
    </div>
     </article>
</template>

<script>
export default {
  name: 'EditableTable',
  components: {},
  props: {
    value: Array,
    fields: Array
  },
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      tableItems: this.value.map(item => ({...item, isEdit: false, isSelected: false}))
    }
  },
  methods: {
    editRowHandler (data) {
      this.tableItems[data.index].isEdit = !this.tableItems[data.index].isEdit
    },
    inputHandler (value, index, key) {
      this.tableItems[index][key] = value
      this.$set(this.tableItems, index, this.tableItems[index])
      this.$emit('input', this.tableItems)
    },
    addRowHandler () {
      const newRow = this.fields.reduce((a, c) => ({...a, [c.key]: null}), {})
      newRow.isEdit = true
      this.tableItems.unshift(newRow)
      this.$emit('input', this.tableItems)
    },
    removeRowHandler (index) {
      this.tableItems = this.tableItems.filter((item, i) => i !== index)
      this.$emit('input', this.tableItems)
    },
    removeRowsHandler () {
      this.tableItems = this.tableItems.filter(item => !item.isSelected)
      this.$emit('input', this.tableItems)
    },
    selectRowHandler (data) {
      this.tableItems[data.index].isSelected = !this.tableItems[data.index].isSelected
    }
  },
  computed: {
    rows () {
      return this.tableItems.length
    }
  }
}
</script>

<style>
</style>
