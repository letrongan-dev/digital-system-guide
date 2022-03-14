<template>
  <div class="mb-2" style="background-color: #00ADEF;">
          <div class="header ml-3 mr-3 mt-3 p-2">
              <a href="/" class="fas fa-home float-left" style="text-decoration:none; color:black;font-size: 35px;"></a>
              <div class="d-flex justify-content-center">
                  <h3>{{ text }}</h3>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  name: 'comp-header',
  data () {
    return {
      text: 'Digital System Guide'
    }
  }
}
</script>

<style>

</style>
