<template>
  <div>
      <h4>Inquiry Feedback List</h4>
    <div class="mb-2">
      <div class="float-left p-2" style="background-color: whitesmoke">
        <span class="font-weight-bold">Program</span>
        <input class="border" />
      </div>
      <div class="float-right">
        <button class="btn font-weight-bold">Retrieve</button>
      </div>
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
    <template v-slot:cell(program)="data">
       <span style="cursor: pointer;" @click=showTips(data.item.programId)>{{ data.item.program }}</span>
     </template>
    <template #cell(rating)="data">
       <star-rating v-bind:increment="1"
                        v-bind:max-rating="5"
                        v-bind:rating= "data.item.rating"
                        inactive-color="white"
                        active-color="orange"
                        v-bind:star-size="30"
                        :read-only="true">
        </star-rating>
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
    <h5 style="clear:both;">Feedback Content Detail</h5>
    <div class="mt-3 border" id="tips">
      <p class="container p-3">
        {{tips}}
      </p>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { data } from '../dataSource'
export default {
  components: {
    StarRating
  },
  data: function () {
    return {
      perPage: 3,
      currentPage: 1,
      items: data,
      fields: [
        { key: 'programId', visible: false },
        { key: 'program', label: 'Program', visible: true },
        { key: 'fileName', label: 'File Name', visible: true },
        { key: 'average', label: 'Average', visible: true },
        { key: 'count', label: 'Count', visible: true },
        { key: 'rating', label: 'Lowest Rating', visible: true },
        { key: 'feedbackContent', label: 'Feedback Content', visible: true },
        { key: 'tips', visible: false },
        { key: 'remark', visible: false }
      ],
      tips: ''
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
  methods: {
    showTips (id) {
      for (const it of this.items) {
        if (it.programId === id) {
          this.tips = it.tips
        }
      }
    }
  }
}
</script>

<style>
.vue-star-rating-rating-text{
    opacity: 0;
  }
</style>
