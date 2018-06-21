<template>
  <div class="job-browser">
    <div class="job-grid table">
      
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EntityBuilder} from "@decahedron/entity";
  import axios from "axios";
  import {Job} from "../../entities/job";

  const sourceUrl = 'https://paikat.te-palvelut.fi/tpt-api/tyopaikat?englanti=true';

  @Component({})
  export default class JobBrowser extends Vue {

    private jobs: Job[] = [];

    created() {
      this.fetch();
    }

    fetch() {
      axios.get(sourceUrl).then((response) => {
        this.jobs = EntityBuilder.buildMany<Job>(Job, <Array> response.data.response.docs);
      });
    }

  }
</script>
