import Vue from 'vue';
import Router from 'vue-router';
import JobBrowser from './views/browser/JobBrowser.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'browse',
      component: JobBrowser,
    },
  ],
});
