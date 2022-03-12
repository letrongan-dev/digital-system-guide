<template>
<b-modal v-model="showModal" id="modal-1" size="lg" hide-backdrop content-class="shadow" ok-only ok-variant="secondary" ok-title="Cancel">
    <div class="container text-center">
       <iframe width="100%" height="500" :src="data" frameborder="0" allowfullscreen></iframe>
    </div>
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
