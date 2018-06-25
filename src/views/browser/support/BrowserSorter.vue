<template>
  <div class="sorter py-2 text-grey text-sm">
    <span class="uppercase text-black font-bold mr-2">SORT BY</span>
    <span class="sorter__option" role="button"
          @click="sortBy('title')"
          :class="{ active: sort.by === 'title' }">
      Title
      <template v-if="sort.by === 'title'">
        <span v-if="sort.asc"><UpArrowIcon></UpArrowIcon></span>
        <span v-if="!sort.asc"><DownArrowIcon></DownArrowIcon></span>
      </template>
    </span>

    <span class="sorter__option" role="button"
          @click="sortBy('company')"
          :class="{ active: sort.by === 'company' }">
      Company
      <template v-if="sort.by === 'company'">
        <span v-if="sort.asc"><UpArrowIcon></UpArrowIcon></span>
        <span v-if="!sort.asc"><DownArrowIcon></DownArrowIcon></span>
      </template>
    </span>

    <span class="sorter__option" role="button"
          @click="sortBy('createdAt')"
          :class="{ active: sort.by === 'createdAt' }">
      Date
      <template v-if="sort.by === 'createdAt'">
        <span v-if="sort.asc"><UpArrowIcon></UpArrowIcon></span>
        <span v-if="!sort.asc"><DownArrowIcon></DownArrowIcon></span>
      </template>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UpArrowIcon from '../../shared/icons/UpArrowIcon.vue';
import DownArrowIcon from '../../shared/icons/DownArrowIcon.vue';

export type SortOrderBy = 'title'|'company'|'createdAt';

export interface SortOrder {
    by: SortOrderBy
    asc: boolean
  }

@Component({
  components: {
  UpArrowIcon,
  DownArrowIcon,
  },
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
    @apply .text-black .font-bold .px-2;
    position: relative;

    .embed-icon {
      fill: config('colors.black');
    }

    &::before {
      @apply .bg-ash;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      transform: skew(-20deg);
    }
  }

  .sorter__option {
    @apply .px-2 .py-1 .mx-2 .cursor-pointer;
    position: relative;
    transition: 0.05s all, 0.1s background-color;

    &::before {
      transition: 0.05s all, 0.1s background-color;
    }

    &:hover {
      @apply .text-white;

      .embed-icon {
        fill: white;
      }

      &::before {
        @apply .bg-green;
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        transform: skew(-20deg);
      }
    }

    &:active {
      @apply .text-white;

      &::before {
        @apply .bg-blue;
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        transform: skew(-20deg);
      }
    }
  }
</style>
