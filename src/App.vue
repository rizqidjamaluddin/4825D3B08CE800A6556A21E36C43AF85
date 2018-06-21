<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  // tailwind: https://tailwindcss.com/docs/installation
  @tailwind preflight;
  @tailwind components;
  @tailwind utilities;

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
