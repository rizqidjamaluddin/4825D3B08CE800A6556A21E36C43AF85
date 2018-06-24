<template functional>
  <div class="spinner"></div>
</template>
<style lang="scss" scoped>

  /**
   * Derived from:
   * http://tobiasahlin.com/spinkit/
   */
  .spinner {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation-delay: 2s;
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      background-color: #ba4f45;
      border-color: #ba4f45;
    }
    25% {
      background-color: #56ae6c;
      border-color: #56ae6c;
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      background-color: #6cafd3;
      border-color: #6cafd3;
    }
    75% {
      background-color: #b65090;
      border-color: #b65090;
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      background-color: #ba4f45;
      border-color: #ba4f45;
    }
  }
</style>
