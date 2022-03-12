import Vue from 'vue'
import Router from 'vue-router'
import CompManage from '../components/ComponentManage.vue'
import CompGudVidLst from '../components/ComponentGuideVideoList.vue'
import CompInFbLst from '../components/ComponentInquiryFeedbackList.vue'
import CompManaDigSysGuide from '../components/ComponentManageDigitalSystemGuide.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/manage-digital-system-guide',
      name: 'CompManaDigSysGuide',
      component: CompManaDigSysGuide
    },
    {
      path: '/inquiry-feedback-list',
      name: 'CompInFbLst',
      component: CompInFbLst
    },
    {
      path: '/manage-system-guide',
      name: 'CompManage',
      component: CompManage
    },
    {
      path: '/guide-video-list',
      name: 'CompGudVidLst',
      component: CompGudVidLst
    },
    {
      path: '/',
      name: 'CompManage',
      component: CompManage
    }
  ]
})
