<template>
  <div>
        <h4>Manage Digital System Guide</h4>
        <div class="menu-system-guide pt-2">
            <router-link to="/guide-video-list" class="d-flex pb-2" style="text-decoration:none; color:black; ">
                <div class="col-3 mr-2">
                    <img src="../assets/img/guide-video-list.png">
                </div>
                <div class="col-9">
                    <h3>Guide Video List</h3>
                    <p>Digital system guide provides OPUS guide video to help ONE user understand</p>
                </div>
            </router-link>
            <hr class="border-dashed border-primary">
            <router-link to="/inquiry-feedback-list" class="d-flex pb-2" style="text-decoration:none; color:black; ">
                <div class="col-3 mr-2">
                    <img src="../assets/img/feedback-list.png">
                </div>
                <div class="col-9 mr-2">
                    <h3>Feedback List</h3>
                    <p>Inquiry Feedback content by program</p>
                </div>
            </router-link>
            <hr class="border-dashed border-primary">
            <router-link to="/manage-digital-system-guide" class="d-flex pb-2" style="text-decoration:none; color:black; ">
                <div class="col-3">
                    <img src="../assets/img/manage-guide-video-list.png">
                </div>
                <div class="col-9">
                    <h3>Manage Guide Video List</h3>
                    <p>Create & Upload program & guide video</p>
                </div>
            </router-link>
            <hr class="border-dashed border-primary">
        </div>
    </div>
</template>

<script>
export default {
  name: 'comp-manage',
  data () {
    return {
      text: 'Manage Digital System Guide'
    }
  }
}
</script>

<style>
.border-dashed{
    border: dashed 0.25px;
}

a {
    transition: background-color .5s;
    -webkit-transition: background-color .5s;
    -moz-transition: background-color .5s;
    -ms-transition: background-color .5s;
    -o-transition: background-color .5s;
}

a:hover{
  background-color: rgb(226, 224, 224);
}

  .checked {
    color: yellow;
  }
</style>
