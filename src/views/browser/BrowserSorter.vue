<template>
  <div class="sorter text-grey text-sm">
    <span class="uppercase text-black font-bold mr-2">SORT BY</span>
    <span class="sorter__option" role="button"
          @click="sortBy('title')"
          :class="{ active: sort.by === 'title' }">
      Title
      <template v-if="sort.by === 'title'">
        <span v-if="sort.asc">&uarr;</span>
        <span v-if="!sort.asc">&darr;</span>
      </template>
    </span>
    /
    <span class="sorter__option" role="button"
          @click="sortBy('company')"
          :class="{ active: sort.by === 'company' }">
      Company
      <template v-if="sort.by === 'company'">
        <span v-if="sort.asc">&uarr;</span>
        <span v-if="!sort.asc">&darr;</span>
      </template>
    </span>
    /
    <span class="sorter__option" role="button"
          @click="sortBy('createdAt')"
          :class="{ active: sort.by === 'createdAt' }">
      <span v-if="sort.asc">Newest</span>
      <span v-if="!sort.asc">Oldest</span>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface SortOrder {
    by: 'title'|'company'|'createdAt'
    asc: boolean
  }

@Component({
  model: {
  prop: 'sort',
  event: 'update:sort'
  },
  })
export default class BrowserSorter extends Vue {
    @Prop() sort: SortOrder;

    sortBy(by: string) {
      if (this.sort.by === by) {
        this.$emit('update:sort', {
          by,
          asc: !this.sort.asc,
        });
      } else {
        this.$emit('update:sort', {
          by,
          asc: this.sort.asc,
        });
      }
    }
}
</script>

<style lang="scss" scoped>
  @tailwind utilities;

  .active {
    @apply .text-black .font-bold;
  }

  .sorter__option {
    @apply .px-1 .py-1 .mx-1 .cursor-pointer;

    &:hover {
      @apply .bg-green .text-white;
    }
  }
</style>
