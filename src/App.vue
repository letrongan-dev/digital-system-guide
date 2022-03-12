<template>
  <div>
    <CompHeader/>
    <router-view/>
    <CompFooter/>
  </div>
</template>

<script>
import CompHeader from './components/ComponentHeader.vue'
import CompFooter from './components/ComponentFooter.vue'
import Pagination from './components/PaginationVue.vue'
export default {
  name: 'App',
  components: {
    CompHeader,
    CompFooter,
    Pagination
  },
  data () {
    return {
      fromRoute: null,
      currentPage: 1
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bg-grey{
  background-color: whitesmoke;
}
  .link{
    color: blue;
    text-decoration-line: underline;
    cursor: pointer;
  }
</style>
