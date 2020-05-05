<!--
 * @Author: SailorCai
 * @Date: 2020-01-11 11:57:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-04 23:37:56
 * @FilePath: /vue-deep/src/components/kForm/kFormItem.vue
 -->
<template>
  <div class="form-item">
    <label for>{{label}}</label>
    <slot></slot>
    <p v-show="error" style="color: red;">{{error}}</p>
  </div>
</template>
<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  name: "kFormItem",
  componentName: "kFormItem",
  props: {
    label: { type: String, default: "" },
    prop: { type: String }
  },
  data() {
    return {
      error: ""
    };
  },
  created() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  mounted() {
    if (this.prop) {
      this.form.$emit("k.form.addfield", this);
    }
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>
<style scoped>
.form-item {
  margin-bottom: 20px;
}
.form-item label {
  width: 100px;
  display: inline-block;
}
</style>