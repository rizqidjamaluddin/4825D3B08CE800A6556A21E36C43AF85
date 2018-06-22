<template>
  <div class="paginator flex mx-auto mt-8 justify-center">
    <div class="paginator__option paginator__option--clickable" v-show="showFirst" @click="navigate(1)">1</div>
    <div class="paginator__option" v-show="!showFirst"></div>

    <div class="paginator__option" v-show="showFirstGap">...</div>

    <div class="paginator__option paginator__option--clickable" v-show="showPrevious" @click="navigate(page-1)">
      {{ page - 1 }}
    </div>

    <div class="paginator__option paginator__option--current">{{ page }}</div>

    <div class="paginator__option paginator__option--clickable" v-show="showNext" @click="navigate(page+1)">
      {{ page + 1 }}
    </div>

    <div class="paginator__option" v-show="showLastGap">...</div>

    <div class="paginator__option paginator__option--clickable" v-show="showLast" @click="navigate(pages)">{{ pages }}</div>
    <div class="paginator__option" v-show="!showLast"></div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component({
    model: {
      prop: 'initialPage',
      event: 'update:page',
    }, data: {
      showFirst: false,
      showLast: false,
      showFirstGap: false,
      showLastGap: false,
      showPrevious: false,
      showNext: false,
    }
  })
  export default class BrowserPaginator extends Vue {
    @Prop() initialPage: number;
    @Prop() pages: number;
    private page = 1;

    data() {
      return {
        page: this.initialPage,
      };
    }

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
        this.page = page;
        this.$emit('update:page', page);
      }
    }
  }
</script>

<style lang="scss">
  @tailwind utilities;

  .paginator__option {
    @apply .px-4 .py-2 .mx-2 .font-bold .text-grey;
  }

  .paginator__option--current {
    @apply .bg-ash .text-solid;
  }

  .paginator__option--clickable {
    @apply .cursor-pointer;
    transition: 0.05s all;

    &:hover {
      @apply .bg-green .text-white;
    }
  }
</style>
