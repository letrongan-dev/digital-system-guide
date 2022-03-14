<template>
<b-modal v-model="showModal" id="modal-1" size="lg" content-class="shadow" ok-only ok-variant="secondary" ok-title="Cancel" hide-header-close hide-backdrop>
    <div class="container text-center">
       <iframe width="100%" height="500" :src="data" frameborder="0" allowfullscreen></iframe>
    </div>
    <template #modal-footer>
        <div class="w-100">
          <b-button
            class="float-right"
            @click="$emit('close')"
          >
            Close
          </b-button>
        </div>
      </template>
</b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'
export default {
  props: ['data', 'showModal'],
  components: {
    'b-modal': BModal
  },
  methods: {

  }
}
</script>

<style>

</style>
