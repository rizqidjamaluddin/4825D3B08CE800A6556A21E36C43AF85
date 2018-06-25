<template>
  <div class="detail">
    <h1 class="text-xl mb-1 leading-normal text-purple">{{ job.title }}</h1>
    <div class="mb-2">
      <span class="text-sm leading-normal mr-2">{{ job.company }}</span>
      <span class="text-sm uppercase leading-normal text-grey">
        {{ job.createdAt.format('D MMM YY') }}
      </span>
    </div>
    <div class="mb-2">
      <div class="text-xs leading-normal mr-2">
        {{ location }}
      </div>
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

    get location() {
      const address = [];
      if (this.job.municipality) address.push(this.job.municipality);
      if (this.job.province) address.push(this.job.province);
      if (this.job.country) address.push(this.job.country);
      return address.join(', ');
    }

    /**
     * Clean HTML entities and replace newlines with line breaks.
     * @returns {string}
     */
    get formattedDescription() {
      return this.job ? this.job.description
        .replace(/\n/g, '<br />') : '';
    }

  /**
   * Build static map for this job.
   * @returns {string | null}
   */
    get mapUrl(): string|null {
      if (!process.env.VUE_APP_GOOGLE_MAP_KEY || !this.job.coordinates) {
        return null;
      }
      const config: {[key: string]: string} = {
        center: this.job.coordinates,
        zoom: '12',
        size: '600x400',
        maptype: 'roadmap',
        markers: this.job.coordinates,
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
      };
      const params = Object.keys(config).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(config[k])}`).join('&');
      return `https://maps.googleapis.com/maps/api/staticmap?${params}`;
    }
}
</script>
