<template>
  <div id="app" class="font-sans">
    <div class="bg-purple h-2"></div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  // tailwind: https://tailwindcss.com/docs/installation
  @tailwind preflight;
  @tailwind components;
  @tailwind utilities;

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-bottom: 100px;
  }

  a {
    text-decoration: none;
  }

  .slide-up-enter-active {
    transition: all .2s ease-in-out;
    max-height: 400px;
  }
  .slide-up-leave-active {
    transition: all .2s ease-in-out;
    max-height: 400px;
  }
  .slide-up-enter, .slide-up-leave-to {
    overflow: hidden;
    transition: all .2s ease-in-out;
    line-height: 0;
    padding: 0;
    margin: 0;
    opacity: 0;
    max-height: 0;
  }
</style>
