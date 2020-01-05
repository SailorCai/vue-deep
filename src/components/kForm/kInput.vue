<!--
 * @Author: SailorCai
 * @Date: 2019-12-31 21:41:10
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-01 11:08:53
 * @FilePath: /hello-cli3/src/components/kForm/kInput.vue
 -->
<template>
    <!-- 输入控件 -->
    <input v-bind="$attrs" :value="value" @input="onInput">
</template>
<script>
export default {
  inheritAttrs: false,
  name: "kInput",
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      error: '',
    };
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      this.$parent.$emit('validate');
      // 通知kform-item校验

    },
  }
}
</script>
<style lang="scss" scoped>
</style>