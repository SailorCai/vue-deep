<!--
 * @Author: SailorCai
 * @Date: 2020-01-11 11:57:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-04 23:26:36
 * @FilePath: /vue-deep/src/components/kForm/kInput.vue
 -->
<template>
  <input v-bind="$attrs" :value="value" :type="type" @input="onInput" />
</template>
<script>
import emitter from "./emitter.js";

export default {
  inheritAttrs: false,
  name: "component_name",
  mixins: [emitter],
  props: {
    value: { type: String, required: true },
    type: { type: String, default: "text" }
  },
  data() {
    return {};
  },
  methods: {
    onInput(e) {
      // 触发input事件，实现v-model
      this.$emit("input", e.target.value);
      // 值改变后通知k-form-item校验
      // this.$parent.$emit("validate");
      this.dispatch("validate", "kFormItem");
    }
  }
};
</script>
<style scoped>
input {
  outline: none;
  width: 300px;
  height: 32px;
  background-color: none !important;
}
</style>