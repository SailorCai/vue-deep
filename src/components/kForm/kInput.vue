<!--
 * @Author: SailorCai
 * @Date: 2019-12-31 21:41:10
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 13:04:30
 * @FilePath: /hello-cli3/src/components/kForm/kInput.vue
 -->
<template>
    <!-- 输入控件 -->
    <input v-bind="$attrs" :value="value" @input="onInput">
</template>
<script>
import emitter from '@/mixins/emitter.js';

export default {
  inheritAttrs: false,
  mixins: [emitter],
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
      // 通知kform-item校验
      // this.$parent.$emit('validate');
      this.dispatch('kFormItem', 'validate');
    },
  }
}
</script>
<style lang="scss" scoped>
</style>