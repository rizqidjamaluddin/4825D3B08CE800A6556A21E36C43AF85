<template>
  <div class="paginator flex mx-auto justify-center">
    <!-- Padding for first gap to ensure centered selection -->
    <div class="paginator__option" v-show="!showFirstGap"></div>

    <!-- First page, only shown when != previous page -->
    <div class="paginator__option paginator__option--clickable" role="button"
         v-show="showFirst" @click="navigate(1)">1</div>
    <div class="paginator__option" v-show="!showFirst"></div>

    <!-- Gap between first page and previous -->
    <div class="paginator__option paginator__option--gap"
         v-show="showFirstGap">...</div>

    <!-- Previous page -->
    <div class="paginator__option paginator__option--clickable" role="button"
         v-show="showPrevious" @click="navigate(page-1)">
      {{ page - 1 }}
    </div>
    <div class="paginator__option" v-show="!showPrevious"></div>

    <!-- Current page -->
    <div class="paginator__option paginator__option--current">{{ page }}</div>

    <!-- Next page -->
    <div class="paginator__option paginator__option--clickable" role="button"
         v-show="showNext" @click="navigate(page+1)">
      {{ page + 1 }}
    </div>
    <div class="paginator__option" v-show="!showNext"></div>

    <!-- Gap between next page and last -->
    <div class="paginator__option paginator__option--gap"
         v-show="showLastGap">...</div>

    <!-- Last page, only shown when != next page -->
    <div class="paginator__option paginator__option--clickable" role="button"
         v-show="showLast" @click="navigate(pages)">{{ pages }}</div>
    <div class="paginator__option" v-show="!showLast"></div>

    <!-- Padding for last gap to ensure centered selection  -->
    <div class="paginator__option" v-show="!showLastGap"></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  model: {
  prop: 'page',
  event: 'update:page'
  },
  })
export default class BrowserPaginator extends Vue {
    @Prop() pages: number;
    @Prop() page: number;


    get showFirst() {
      return this.page > 2;
    }

    get showFirstGap() {
      return this.page > 3;
    }

    get showPrevious() {
      return this.page > 1;
    }

    get showNext() {
      return this.page < this.pages;
    }

    get showLastGap() {
      return this.page + 2 < this.pages;
    }

    get showLast() {
      return this.page + 1 < this.pages;
    }

    navigate(page: number) {
      if (page > 0 && page <= this.pages) {
        this.$emit('update:page', page);
      }
    }
}
</script>

<style lang="scss">
  @tailwind utilities;

  .paginator__option {
    @apply .inline-block .py-2 .mx-2 .font-bold .text-grey;
    width: 40px;
    text-align: center;
  }

  .paginator__option--gap {
    @apply .text-ash;
  }

  .paginator__option--current {
    @apply .text-solid;
    position: relative;

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

  .paginator__option--clickable {
    @apply .cursor-pointer;
    transition: 0.05s all, 0.1s background-color;
    position: relative;

    &::before {
      @apply .bg-white;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      transform: skew(-20deg);
      transition: 0.05s all, 0.1s background-color;
    }

    &:hover {
      @apply .text-white;

      &::before {
        @apply .bg-green;
      }
    }

    &:active {
      &::before {
        @apply .bg-blue;
      }
    }
  }
</style>
