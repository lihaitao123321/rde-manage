<template>
  <transition name="popAni">
    <div class="popListViewBox" v-show="show" @click="closePop()">

    </div>
  </transition>
</template>

<script>
  export default {
    name: "poper",
    data() {
      return {
        show:false,
        options:{}
      }
    },
    methods: {
      closePop(){},
      callback(){}
    }
  }
</script>

<style scoped>
  .popListViewBox {
    position: fixed;
    z-index: 600;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    /*display: none;*/
  }
  /*动画*/
  .popAni-enter-active {
    animation: popshow 300ms;
  }

  .popAni-leave-active {
    animation: pophide 300ms;
  }

  @keyframes popshow {
    from {
      background-color: rgba(0,0,0,0);
    }
    to {
      background-color: rgba(0,0,0,0.4);
    }
  }

  @keyframes pophide {
    from {
      background-color: rgba(0,0,0,0.4);
    }
    to {
      background-color: rgba(0,0,0,0);
    }
  }
</style>
