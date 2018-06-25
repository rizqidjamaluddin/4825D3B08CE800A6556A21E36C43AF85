<template>
  <div class="search text-sm relative">
    <span class="uppercase text-black font-bold mr-2">Search</span>
    <input type="text" @input="update($event.target.value)"
    class="text-blue p-2 border border-ash rounded"
    :value="search" placeholder="Find a job">
    <div class="clear absolute p-2 cursor-pointer" @click="clear()"
         v-bind:class="{'text-ash': !search, 'text-black': search}">
      <CrossIcon></CrossIcon>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CrossIcon from '../../shared/icons/CrossIcon.vue';

@Component({
  components: {
  CrossIcon,
  },
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

    clear() {
      this.$emit('update:search', '');
    }
}
</script>
<style lang="scss">
  @tailwind utilities;

  .search {
    position: relative;
    top: -1.5px;
  }

  .clear {
    position: absolute;
    right: 5px;
    // 1 extra pixel bump to compensate for the search box border
    top: 1px;

    .embed-icon {
      fill: config('colors.grey');
    }
  }
</style>
