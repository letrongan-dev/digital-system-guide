<template>
<article>
    <h4>Manage Digital System Guide</h4>
    <div class="mb-2">
      <div class="d-flex p-2" style="background-color: whitesmoke">
          <div class="col-6">
            <span>Program</span>
            <input class="border ml-4"/>
          </div>
          <div class="col-6">
            <span>Remark</span>
        <input class="border ml-4" />
       </div>

      </div>
    </div>
    <div class="float-right">
        <button class="btn font-weight-bold">Retrieve</button>
        <button class="btn font-weight-bold">Save</button>
        <button class="btn font-weight-bold"  @click="addRowHandler">Add</button>
        <button class="btn font-weight-bold" @click="removeRowsHandler">Delete</button>
      </div>
    <div style="clear:both;"></div>
    <div class="mt-3">
          <b-table
                bordered
                responsive
                id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="visibleFields"
              >
            <template #cell(checkbox)="data">
                <b-checkbox :checked="data.item.isSelected"  @change="selectRowHandler(data)"></b-checkbox>
            </template>
            <template #cell(program)="data">
                <span style="cursor: pointer" v-on:dblclick="counter += 1, editRowHandler(data.item)">{{data.value}}</span>
            </template>
            <template #cell(fileName)="data">
                <b-form-file v-if="data.item.isEdit" v-model="data.item.fileName"></b-form-file>
                <span class="link" v-else>{{data.value}}</span>
            </template>
            <template #cell(remark)="data">
                <b-form-input v-if="data.item.isEdit" type="text" v-model="data.item.remark" :ref="data.item.programId"></b-form-input>
                <span v-else>{{data.value}}</span>
            </template>
            <template #cell(tips)="data">
                <b-form-input v-if="data.item.isEdit" type="text" v-model="data.item.tips" ref="fileInput"></b-form-input>
                <span v-else>{{data.value}}</span>
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
  <!-- <Editable v-model="items" :fields="visibleFields"/> -->
    <div class="mt-2">
      <div class="p-1 d-flex">
        <input class="mt-3 mb-3 pl-2 border border-primary"
          placeholder="Feedback mail against guide & Tips"
          size="38"
        />
        <button class="btn bg-grey m-3 font-weight-bold pl-4 pr-4">Email</button>
      </div>
    </div>

</article>
</template>

<script>
import { data } from '../dataSource'
import Editable from './ComponentEditTable.vue'
export default {
  components: {
    Editable
  },
  data () {
    return {
      counter: 0,
      perPage: 3,
      currentPage: 1,
      items: data.map(item => ({...item, isEdit: false, isSelected: false})),
      fields: [
        { key: 'checkbox', label: 'Check', visible: true },
        { key: 'programId', visible: false },
        { key: 'program', label: 'Program', type: 'text', visible: true },
        { key: 'fileName', label: 'File Name', type: 'file', visible: true },
        { key: 'remark', label: 'Remark', type: 'text', visible: true },
        { key: 'average', visible: false },
        { key: 'count', visible: false },
        { key: 'rating', label: 'Rating', visible: false },
        { key: 'feedbackContent', label: 'Feedback Content', visible: false },
        { key: 'tips', label: 'Tips', type: 'text', visible: true }
      ]
    }
  },
  methods: {
    editRowHandler (data) {
      data.isEdit = true
    },
    addRowHandler () {
      const newRow = this.fields.reduce((a, c) => ({...a, [c.key]: null}), {})
      newRow.isEdit = true
      newRow.program = this.items[0].program
      newRow.programId = this.items.length + 1
      // this.items.unshift(newRow) add begin
      this.items.push(newRow) // add last
      this.$emit('input', this.items)
      console.log(this.$refs)
    },
    removeRowsHandler () {
      // this.items = this.items.map(item => ({...item, isEdit: false}))
      let msg = 'Do you want delete rows ?'
      let arrDel = this.items.filter(item => item.isSelected)
      if (confirm(msg) === true && arrDel.length !== 0) {
        this.items = this.items.filter(item => !item.isSelected)
        this.$emit('input', this.items)
        alert('Deleted successfully !')
      } else {
        alert('No element delete !')
      }
      // console.log(this.items)
    },
    selectRowHandler (data) {
      data.item.isSelected = !data.item.isSelected
    }
  },
  computed: {
    rows () {
      return this.items.length
    },
    visibleFields () {
      return this.fields.filter(field => field.visible)
    }
  },
  watch: {
    currentPage (newPage) {
      this.$emit('input', newPage) // custom input event emitted
    },
    value (newValue, oldValue) { if (newValue !== oldValue) { this.currentPage = newValue } }
  }
}
</script>

<style>
</style>
