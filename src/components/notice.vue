<!--
 * @Author: SailorCai
 * @Date: 2020-01-01 11:44:29
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-01 17:07:51
 * @FilePath: /hello-cli3/src/components/notice.vue
 -->
<template>
    <div class="notice" :style="{width: width+'px'}" v-show="isShow">
        <h1>{{title}}</h1>
        <div>
            <p>{{message}}</p>
        </div>
    </div>
</template>
<script>
export default {
  name: "notice",
  props: {
      title: {
          type: String,
          default: ""
      },
      width: {
          type: Number,
          default: 400,
      },
      message: {
          type: String,
          default: '',
      },
      duration: {
          type: Number,
          default: 1000,
      }
  },
  data () {
    return {
        isShow: false,
    };
  },
  mounted() {},
  methods: {
      show() {
        this.isShow = true;
        // setTimeout(this.hide, this.duration);
      },
      hide() {
          this.remove();
      },
  },
}
</script>
<style scoped>
.notice{
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #ddd;
}
</style>