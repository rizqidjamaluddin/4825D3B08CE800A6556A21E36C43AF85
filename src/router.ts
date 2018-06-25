import Vue from 'vue';
import Router from 'vue-router';
import JobBrowser from './views/browser/JobBrowser.vue';
import JobDetail from './views/browser/detail/JobDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/browse',
    },
    {
      path: '/browse',
      name: 'browse',
      component: JobBrowser,
      children: [
        {
          path: ':jobId',
          name: 'detail',
          component: JobDetail,
          props: true,
        },
      ],
    },
  ],
});
