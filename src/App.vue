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
th{
  background-color: rgb(206, 236, 247);
}
.inputPrgRmk, .bg-grey {
  background-color: rgb(203, 209, 211);
}
.tips{
  background-color: rgb(226, 235, 235);
}
.link{
  color: blue;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
