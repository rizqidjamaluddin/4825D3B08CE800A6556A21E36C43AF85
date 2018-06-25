<template>
  <div class="detail">
    <h1 class="text-xl mb-1 leading-normal text-purple">{{ job.title }}</h1>
    <div class="mb-2">
      <span class="text-sm leading-normal mr-2">{{ job.company }}</span>
      <span class="text-sm uppercase leading-normal text-grey">{{ job.createdAt.format('D MMM YY') }}</span>
    </div>
    <img :src="mapUrl" v-if="mapUrl" class="mt-6" style="max-width: 100%;" />
    <div v-html="formattedDescription" class="text-sm leading-loose mt-6"></div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line space-infix-ops
import { Component, Vue, Prop } from 'vue-property-decorator';
import Job from '../../../entities/job';

@Component({})
export default class JobDetail extends Vue {
    @Prop() jobId: string;
    @Prop() job: Job;

    /**
     * Clean HTML entities and replace newlines with line breaks.
     * @returns {string}
     */
    get formattedDescription() {
      return this.job ? this.job.description
        .replace(/\n/g, '<br />') : '';
    }

    get mapUrl(): string|null {
      if (!process.env.VUE_APP_GOOGLE_MAP_KEY || !this.job.coordinates) {
        return null;
      }
      const config: {[key: string]: string} = {
        center: this.job.coordinates,
        zoom: '8',
        size: '600x400',
        maptype: 'terrain',
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
      };
      const params = Object.keys(config).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(config[k])}`).join('&');
      return `https://maps.googleapis.com/maps/api/staticmap?${params}`;
    }
}
</script>