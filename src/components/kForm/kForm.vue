<!--
 * @Author: SailorCai
 * @Date: 2019-12-31 21:41:04
 * @LastEditTime : 2020-01-01 10:53:42
 * @LastEditors  : SailorCai
 * @Description: In User Settings Edit
 * @FilePath: /web-exer/hello-cli3/src/components/kForm/kForm.vue
 -->
<template>
  <div class="kfrom">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "kForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    },
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
</style>