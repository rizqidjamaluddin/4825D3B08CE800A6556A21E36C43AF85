<template>
  <div class="job-browser mx-auto md:flex">

    <div class="job-grid__loading text-center" v-if="loading">
      <div>
        <LoadIndicator></LoadIndicator>
      </div>
      <div>
        <p class="italic text-gray">Pulling down jobs...</p>
      </div>
    </div>

    <div class="selector" :class="{'md:collapsed': selected, 'lt-md:mb-12': selected}"
         v-show="!loading">

      <!-- Sort & search -->
      <transition name="slide-up">
        <div class="md:flex ml-8 md:ml-0 content-center justify-between">
          <div class="mb-2" v-if="!selected">
            <BrowserSorter v-if="jobs.length > 0" v-model="sort"></BrowserSorter>
          </div>
          <div class="mb-2" v-if="!selected">
            <BrowserSearch v-if="jobs.length > 0" v-model="search"></BrowserSearch>
          </div>
        </div>
      </transition>

      <!-- Top paginator -->
      <div class="mt-6" v-if="!selected && jobs.length > 0">
        <BrowserPaginator v-model="page" :pages="pages"></BrowserPaginator>
      </div>

      <!-- Back (Detail mode) -->
      <div v-if="selected" class="job-grid__deselect mt-12" @click="deselect()">
        <LeftArrowIcon></LeftArrowIcon> Back
      </div>

      <!-- Grid -->
      <div class="job-grid border border-ash my-4 w-full" ref="container"
        :class="{'lt-md:hidden': selected}">
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
        <div class="text-center" v-if="!loading && sortedJobs.length === 0">
          <div>
            <p class="m-8">No results found.</p>
          </div>
        </div>

        <div class="job-grid__item border-b border-ash border-dotted cursor-pointer hover:bg-soft"
             :class="{'job-grid__item--selected': selected && job.id === selected.id}"
             v-for="job in displayedJobs" :key="job.id" @click="viewDetail(job)">
          <div class="px-2 pt-4">
            <p class="font-bold text-solid">{{ job.title }}</p>
          </div>
          <div class="px-2 pb-4">
            <p class="pt-2 text-sm text-black">
              <span class="mr-2">{{ job.company }}</span>
              <span class="text-xs text-grey tracking-tight uppercase">
                {{ job.createdAt.format('D MMM YY') }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom paginator -->
      <BrowserPaginator v-if="!selected && jobs.length > 0" v-model="page" :pages="pages">
      </BrowserPaginator>
    </div>

    <div class="detail-panel mx-4" v-if="!loading">
      <transition name="slide-right">
        <router-view :job="selected"></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { EntityBuilder } from '@decahedron/entity';
import axios from 'axios';
import smoothHeight from 'vue-smooth-height';
import { Route } from 'vue-router';
import Job from '../../entities/job';

import LoadIndicator from './support/LoadIndicator.vue';
import BrowserPaginator from './support/BrowserPaginator.vue';
import BrowserSearch from './support/BrowserSearch.vue';
import BrowserSorter, { SortOrder, SortOrderBy } from './support/BrowserSorter.vue';
import LeftArrowIcon from '../shared/icons/LeftArrowIcon.vue';

const sourceUrl = 'https://paikat.te-palvelut.fi/tpt-api/tyopaikat?englanti=true';

@Component({
  components: {
  LoadIndicator,
  BrowserPaginator,
  BrowserSorter,
  BrowserSearch,
  LeftArrowIcon,
  },
  mixins: [smoothHeight],
  })
export default class JobBrowser extends Vue {
    // typing hint for vue-smooth-height
    $smoothElement: any;

    jobs: Job[] = [];
    loadError = false;
    loading = false;

    perPage = 7;

    page = 1;
    search = '';
    sort: SortOrder = {
      by: 'createdAt',
      asc: false,
    };
    selected: Job|null = null;

    /**
     * Filter full job corpus to those matching the current query.
     * First step of the filtering process.
     * @returns {Job[]}
     */
    get filteredJobs() {
      if (this.search) {
        const term = this.search.toLowerCase();
        return this.jobs.filter((job: Job) => job.title.toLowerCase().indexOf(term) !== -1 ||
          job.company.toLowerCase().indexOf(term) !== -1 ||
          job.description.toLowerCase().indexOf(term) !== -1);
      }
      return this.jobs;
    }

    /**
     * Rearrange search-filtered jobs to sorting rules..
     * Second, and final step of the filtering process.
     * @returns {Job[]}
     */
    get sortedJobs() {
      const jobCopy = this.filteredJobs.slice(0);
      const direction = this.sort.asc ? 1 : -1;
      jobCopy.sort((a: Job, b: Job) => {
        if (this.sort.by === 'createdAt') {
          if (!a.createdAt || !b.createdAt) {
            return 0;
          }
          return (a.createdAt.valueOf() - b.createdAt.valueOf()) * direction;
        }
        return a[this.sort.by].localeCompare(b[this.sort.by]) * direction;
      });
      return jobCopy;
    }

    /**
     * Extract current page of jobs from filtered & sorted jobs.
     * @returns {Job[]}
     */
    get displayedJobs(): Job[] {
      const start = (this.page - 1) * this.perPage;
      return this.sortedJobs.slice(start, (start) + this.perPage);
    }

    /**
     * Total number of pages, after searching.
     * @returns {number}
     */
    get pages(): number {
      return Math.ceil(this.sortedJobs.length / this.perPage);
    }

    created() {
      this.fetch();
    }

    /**
     * Pull down job data from source server.
     */
    fetch() {
      this.loadError = false;
      this.loading = true;
      axios.get(sourceUrl)
        .then((response) => {
          this.jobs = EntityBuilder.buildMany<Job>(Job, response.data.response.docs);
          this.loading = false;
          this.updateParams(this.$route, this.$route);
        })
        .catch(() => {
          this.loadError = true;
          this.loading = false;
        });
    }

    /**
     * Ensure active page is within valid page range.
     */
    @Watch('sortedJobs')
    @Watch('page')
    adjustPagination() {
      if (this.page > this.pages) {
        this.page = this.pages;
      }
      if (this.page < 1) {
        this.page = 1;
      }
    }

    /**
     * Register smooth height transition container.
     */
    mounted() {
      this.$smoothElement({
        el: this.$refs.container,
        hideOverflow: true,
        transition: 'height 0.2s',
      });
    }

  /**
   * Upon route changes, update the browser to match route query params. Vue doesn't fire updates
   * on properties that don't change values, so we don't wind up in an infinite loop with
   * the watcher below.
   * @param {Route} to
   * @param {Route} from
   */
    @Watch('$route')
    updateParams(to: Route, from: Route) {
      if ('page' in to.query) {
        this.page = parseInt(to.query.page, 10);
      }
      if ('search' in to.query) {
        this.search = to.query.search;
      }
      if ('sort-by' in to.query) {
        this.sort.by = (to.query['sort-by'] as SortOrderBy);
      }
      if ('sort-dir' in to.query) {
        this.sort.asc = to.query['sort-dir'] === 'asc';
      }

      if ('jobId' in to.params) {
        // only attempt an expensive search if no selection or selection change
        if (!this.selected || this.selected.id !== to.params.jobId) {
          this.selected = this.jobs.find(el => el.id === to.params.jobId) || null;
        }
      } else {
        this.selected = null;
      }
    }

  /**
   * Update route query params whenever a browser option changes.
   */
    @Watch('search')
    @Watch('sort')
    @Watch('page')
    syncToUrl() {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.search,
          page: this.page.toString(),
          'sort-by': this.sort.by,
          'sort-dir': this.sort.asc ? 'asc' : 'desc',
        },
      });
    }

    /**
     * Select a job, views its details, and collapse the grid.
     */
    viewDetail(job: Job) {
      this.$router.push({
        name: 'detail',
        params: {
          jobId: job.id,
        },
        query: Object.assign({}, this.$route.query),
      });
    }

  /**
   * Return to main browser while viewing a job detail.
   */
    deselect() {
      this.$router.push({
        name: 'browse',
        query: Object.assign({}, this.$route.query),
      });
    }
}
</script>

<style lang="scss" scoped>
  @tailwind utilities;

  .job-browser {
    margin-top: 100px;
    max-width: 960px;
  }

  .selector {
    transition: 0.2s all;
    width: 100%;
  }

  @responsive {
    .collapsed {
      max-width: 300px;
      min-width: 300px;

    }
  }

  .job-grid {
    border-style: double solid solid;
    border-width: 3px 1px 5px;
    border-radius: 0 0 3px 3px;
  }

  .job-grid__loading {
    height: 200px;
    width: 100%;
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
    padding-right: 10px;
    transition: 0.2s all;
    border-left: 0 solid config('colors.blue');
  }

  .job-grid__item:hover {
    padding-left: 5px;
    border-left: 10px solid config('colors.green');
  }

  .job-grid__item--selected {
    /*@apply: .bg-soft;*/
    padding-left: 5px;
    border-left: 10px solid config('colors.purple');

    &:hover {
      padding-left: 5px;
      border-left: 10px solid config('colors.purple');
    }
  }

  .job-grid__deselect {
    @apply .bg-ash .px-4 .py-2 .font-bold .cursor-pointer;
    transition: 0.05s all, 0.1s background-color;

    &:hover {
      @apply .bg-green .text-white;
      .embed-icon {
        fill: config('colors.white');
      }
    }
    &:active {
      @apply .bg-blue .text-white;
      .embed-icon {
        fill: config('colors.white');
      }
    }
  }
</style>
