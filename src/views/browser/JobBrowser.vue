<template>
  <div class="job-browser mx-auto">
    <div class="job-grid border border-ash w-full">
      <div class="job-grid__loading text-center" v-if="!loadError && jobs.length === 0">
        <div><LoadIndicator></LoadIndicator></div>
        <div>
          <p class="italic text-gray">Pulling down jobs...</p>
        </div>
      </div>
      <div class="job-grid__error text-center" v-if="loadError">
        <div>
          <p class="mb-2">Unable to access job database &mdash; it might be down.</p>
          <p>
            <a @click="fetch" class="cursor-pointer text-xs bg-blue px-2 py-1 text-white">
              Try again
            </a>
          </p>
        </div>
      </div>

      <div class="job-grid__item border-b border-ash border-dotted cursor-pointer hover:bg-soft"
           v-for="job in displayedJobs"
           :key="job.id">
        <div class="px-2 pt-4">
          <p class="font-bold text-solid">{{ job.title }}</p>
        </div>
        <div class="px-2 pb-4">
          <p class="pt-2 text-sm text-black">
            <span class="mr-2">{{ job.company }}</span>
            <span class="text-xs text-grey uppercase">{{ job.createdAt.format('D MMM YY') }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EntityBuilder } from '@decahedron/entity';
import axios from 'axios';
import Job from '../../entities/job';
import LoadIndicator from './support/LoadIndicator.vue';

const sourceUrl = 'https://paikat.te-palvelut.fi/tpt-api/tyopaikat?englanti=true';

@Component({
  components: {LoadIndicator}
  })
export default class JobBrowser extends Vue {
    private jobs: Job[] = [];
    private displayedJobs: Job[] = [];
    private loadError = false;

    created() {
      this.fetch();
    }

    fetch() {
      this.loadError = false;
      axios.get(sourceUrl)
        .then((response) => {
          this.jobs = EntityBuilder.buildMany<Job>(Job, response.data.response.docs);
          this.displayedJobs = this.jobs.slice(0, 10);
        })
        .catch((response) => {
          console.log(response);
          this.loadError = true;
        });
    }
}
</script>

<style lang="scss" scoped>
  .job-browser {
    margin-top: 100px;
    max-width: 800px;
  }

  .job-grid {
    border-style: double solid solid;
    border-width: 3px 1px 5px;
    max-height: 1000px;
    border-radius: 0 0 3px 3px;
  }

  .job-grid__loading {
    height: 200px;
  }

  .job-grid__error {
    background: #ffe;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }

  .job-grid__item:last-of-type {
      border-bottom: none;
  }

  .job-grid__item {
    padding-left: 15px;
    transition: 0.2s all;
    border-left: 0 solid #7065bb;
  }

  .job-grid__item:hover {
    padding-left: 5px;
    border-left: 10px solid #56ae6c;
  }
</style>
