<template>
  <div class="search text-sm">
    <span class="uppercase text-black font-bold mr-2">Search</span>
    <input type="text" @input="update($event.target.value)"
    class="text-blue p-2 border border-ash rounded"
    :value="search" placeholder="Find a job">
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  model: {
  prop: 'search',
  event: 'update:search'
  },
  })
export default class BrowserSearch extends Vue {
    @Prop() search: string;

    update(term: string) {
      this.$emit('update:search', term);
    }
}
</script>
<style lang="scss">
  .search {
    position: relative;
    top: -1.5px;
  }
</style>
