<template>
<div>
  <div id="loader" style="display:none;" class="sbl-circ-path"></div>
  <div>
    <h4>Manage Digital System Guide</h4>
    <div class="mb-2">
      <div class="d-flex p-2 inputPrgRmk">
          <div class="col-6">
            <span class="font-weight-bold">Program</span>
            <input class="border ml-4"/>
          </div>
          <div class="col-6">
            <span class="font-weight-bold">Remark</span>
        <input class="border ml-4" />
       </div>

      </div>
    </div>
    <div class="float-right">
        <button class="btn font-weight-bold inputPrgRmk">Retrieve</button>
        <button class="btn font-weight-bold inputPrgRmk" @click="saveItems">Save</button>
        <button class="btn font-weight-bold inputPrgRmk" id="btnAdd" @click="addRowHandler">Add</button>
        <button class="btn font-weight-bold inputPrgRmk" @click="removeRowsHandler">Delete</button>
      </div>
    <div style="clear:both;"></div>
    <div class="mt-3" id="myDiv">
          <b-table
                bordered
                id="myTable"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="visibleFields"
              >
            <template #cell(checkbox)="data">
                <b-checkbox :checked="data.item.isSelected" @change="data.item.isSelected = !data.item.isSelected"></b-checkbox>
            </template>
            <template #cell(program)="data">
                <span style="cursor: pointer" v-on:dblclick="counter += 1, editRowHandler(data.item)">{{data.value}}</span>
            </template>
            <template #cell(fileName)="data">
              <div class="d-flex" v-if="data.item.isEdit">
              <b-form-file v-on:change="onChange($event, data.item.programId)" v-if="data.item.isEdit"  v-model="data.item.files" :state="Boolean(data.item.fileName)" ref="fileInput" placeholder="Choose file.."
               >
              </b-form-file >
              <b-icon icon="trash"
                  font-scale="2.5"
                  @click="data.item.files = null, data.item.fileName= null"
                  variant="danger"
                  v-model="data.item.fileName"
              ></b-icon>

               <!-- <input type="file" v-on:change="onChange($event, data.item.programId)" v-if="data.item.isEdit"   :id="'fileInput'+ data.item.programId" placeholder="Choose file.."
               >
               <span style="font-size: 2.5rem"><i class="bi bi-trash"></i></span> -->
                </div>
                <div class="mt-3" v-if="data.item.isEdit" id="selectedFile">
                    <p v-if="data.item.files != null">
                      <span class="btn font-weight-bold">Selected file: </span>
                      {{ data.item.files.name ? data.item.files.name : data.item.fileName }}
                    </p>
                </div>
              <span class="link" v-else >{{data.value}}</span>
            </template>
            <template #cell(remark)="data">
                <b-form-textarea v-if="data.item.isEdit" type="text" v-model="data.item.remark" no-resize></b-form-textarea>
                <span v-else>{{data.value}}</span>
            </template>
            <template #cell(tips)="data">
                <b-form-textarea v-if="data.item.isEdit" type="text" v-model="data.item.tips" ref="inputTip" autofocus no-resize></b-form-textarea >
                <span v-else>{{data.value}}</span>
            </template>
          </b-table>
              <b-pagination
                class="float-right"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                :value="value"
                aria-controls="my-table"
                ref="pagination"
              ></b-pagination>
    </div>
  <!-- <Editable v-model="items" :fields="visibleFields"/> -->
    <div class="mt-2">
      <div class="p-1 d-flex">
        <textarea class="mt-3 mb-3 pl-2 border border-primary"
          placeholder="Feedback mail against guide & Tips"
          size="38" style="resize: none; width: 300px"
        />
        <button class="btn bg-grey m-3 font-weight-bold pl-4 pr-4">Email</button>
      </div>
    </div>

</div>
</div>

</template>

<script>
import { data } from '../dataSource'

export default {
  components: {

  },
  data () {
    return {
      counter: 0,
      perPage: 3,
      currentPage: 1,
      value: 2,
      items: data.map(item => ({...item, isEdit: false, isSelected: false})),
      fields: [
        { key: 'checkbox', label: 'Check', thStyle: 'width: 10px', visible: true },
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
    onChange (e, programId) {
      // debugger
      document.querySelectorAll('#btnAdd')[0].disabled = false
      for (const pro of this.items) {
        if (pro.programId === programId) {
          pro.files = e.target.files[0]
          pro.fileName = pro.files.name

          // document.getElementById('fileInput' + pro.programId).value = ''
          try {
            this.$refs.fileInput.reset()
          } catch (error) {

          }
          // console.log(this.$refs.fileInput)
          break
        }
      }
    },
    editRowHandler (data) {
      data.isEdit = true
    },
    addRowHandler () {
      if (this.items[this.items.length - 1].tips === null) {
        alert('Please check again mandatory fields!!!!!')
        this.$refs.inputTip.focus()
        return
      }
      const newRow = this.fields.reduce((a, c) => ({...a, [c.key]: null}), {})
      newRow.isEdit = true
      newRow.isSelected = true
      newRow.program = this.items[0].program
      newRow.programId = this.items.length + 1
      // this.items.unshift(newRow) // add begin
      this.items.push(newRow) // add last
      this.$emit('input', this.items)
      // document.querySelectorAll('#btnAdd')[0].disabled = true
      this.$refs.pagination.localNumberOfPages = parseInt(this.items.length / this.perPage) + (this.items.length % this.perPage > 0 ? 1 : 0)
      this.currentPage = this.$refs.pagination.localNumberOfPages
    },
    removeRowsHandler () {
      // let index = this.items.length + 1
      let msg = 'Do you want delete rows ?'
      let arrDel = this.items.filter(item => item.isSelected)

      if (confirm(msg) === true && arrDel.length !== 0) {
        this.items = this.items.filter(item => !item.isSelected)
        this.$emit('input', this.items)
        alert('Deleted successfully !')
      } else {
        alert('No element delete !')
      }
    },
    saveItems () {
      let parsed = JSON.stringify(this.items)
      if (this.items.filter(item => !item.isSelected) !== 0) {
        localStorage.setItem('items', parsed)
        document.getElementById('loader').style.display = 'block'
        document.getElementById('myDiv').style.opacity = '0.2'
        setTimeout(this.showPage, 3000)
      } else {
        alert('Nothing selected')
      }
    },

    showPage () {
      alert('Save successfully!')
      document.getElementById('loader').style.display = 'none'
      document.getElementById('myDiv').style.opacity = '1'
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
  },
  mounted () {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'))
      } catch (e) {
        localStorage.removeItem('items')
      }
    }
  }
}
</script>

<style>
.sbl-circ-path {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 60px;
  height: 60px;
  margin: -76px 0 0 -76px;
  color: #00ADEF;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite; }

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }

#myTable tr:hover td{
  background:#c4c1c1;
  transition: background-color .5s;
    -webkit-transition: background-color .5s;
    -moz-transition: background-color .5s;
    -ms-transition: background-color .5s;
    -o-transition: background-color .5s;
}
</style>
