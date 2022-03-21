<template>
<div>
    <h4>Guide Video List</h4>
    <div class="mb-2">
      <div class="float-left p-2 inputPrgRmk">
        <span class="font-weight-bold">Program</span>
        <input class="border" />
      </div>
      <div class="float-right">
        <button class="btn font-weight-bold inputPrgRmk">Retrieve</button>
      </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mt-3">
      <BModal :data="data" :showModal="showModal" @close="closeModal"></BModal>
    <b-table
       bordered
       responsive
       id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="visibleFields"
    >
   <template v-slot:cell(checkbox)="data">
     <b-form-checkbox
        v-model="data.item.selected"
        @change="select(data.item)"
     />
  </template>
  <template v-slot:cell(program)="data">
       <span style="cursor: pointer;" @click=showTips(data.item.programId)>{{ data.item.program }}</span>
     </template>
    <template v-slot:cell(fileName)="data">
       <span class="link" @click=showVideo(data.item.src)>{{ data.item.fileName }}</span>
     </template>
    </b-table>
    </div>
    <b-pagination
      class="float-right"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <div class="mt-3 border" style="clear:both;">
      <p class="container p-3">
        {{tips}}
      </p>
    </div>
    <div class="mt-2">
      <div class="p-1 tips d-flex">
        <p class="pr-3 pt-3">Selected type feedback</p>
        <star-rating v-bind:increment="1"
            :rating="3"
             v-bind:max-rating="5"
             inactive-color="white"
             active-color="orange"
             v-bind:star-size="20"
            :rounded-corners="true">
        </star-rating>
        <input class="mt-3 mb-3" v-model="feedbackContent"
          placeholder="Please leave your feedback below"
          size="30" required
        />
        <button class="btn-primary mt-3 mb-3" @click.prevent="submitRating">SUBMIT</button>

      </div>
    </div>

  </div>

</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import '../assets/dist/vue-cool-lightbox.min.css'
import StarRating from 'vue-star-rating'
import BModal from './VideoModal.vue'
import { data } from '../dataSource'
export default {
  components: {
    CoolLightBox,
    StarRating,
    BModal
  },
  data () {
    return {
      errors: [],
      items: data.map(item => ({...item, showModal: false})),
      data: '',
      showModal: false,
      index: null,
      perPage: 3,
      currentPage: 1,
      fields: [
        { key: 'checkbox', label: 'Check', thStyle: 'width: 10px', visible: true },
        { key: 'programId', visible: false },
        { key: 'program', label: 'Program', thStyle: 'width: 200px', visible: true },
        { key: 'fileName', label: 'File Name', thStyle: 'width: 200px', visible: true },
        { key: 'remark', label: 'Remark', visible: true },
        { key: 'average', visible: false },
        { key: 'count', visible: false },
        { key: 'rating', label: 'Rating', visible: false },
        { key: 'feedbackContent', label: 'Feedback Content', visible: false },
        { key: 'tips', visible: false }
      ],
      selected: [],
      feedbackContent: '',
      tips: ''
    }
  },
  methods: {
    showVideo (data) {
      this.data = data
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    submitRating () {
      if (this.selected.length !== 0) {
        for (const pro of this.selected) {
          for (const it of this.items) {
            if (pro.programId === it.programId) {
              it.rating = Number(document.querySelectorAll('.vue-star-rating-rating-text')[0].outerText)
              it.feedbackContent = this.feedbackContent
            }
          }
        }
        alert('Submit successfully')
      } else {
        alert('No element selected')
      }
    },
    select (program) {
      if (!this.selected.includes(program)) {
        this.selected.push(program)
      } else {
        this.selected.splice(this.selected.indexOf('program'), 1)
      }
      // console.log(this.selected)
    },
    showTips (id) {
      for (const it of this.items) {
        if (it.programId === id) {
          this.tips = it.tips
        }
      }
    }
  },
  computed: {
    rows () {
      return this.items.length
    },
    visibleFields () {
      return this.fields.filter(field => field.visible)
    }
  }
}
</script>
<style>
  .checked{
    color: orange;
  }
  .link{
    color: blue;
    text-decoration-line: underline;
    cursor: pointer;
  }
  .vue-star-rating-rating-text{
    opacity: 0;
  }

</style>
