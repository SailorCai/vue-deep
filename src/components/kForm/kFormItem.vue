<!--
 * @Author: SailorCai
 * @Date: 2019-12-31 21:41:21
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-01 17:11:54
 * @FilePath: /hello-cli3/src/components/kForm/kFormItem.vue
 -->
<template>
  <div>
    <label for="">{{label}}</label>
    <!-- 输入控件 -->
    <slot></slot>
    <!-- 错误提示 -->
    <p v-if="error" style="color: red;">{{error}}</p>
  </div>

</template>
<script>
import Schema from 'async-validator';

export default {
  name: "kFromItem",
  inject: ['form'],
  props: {
      label: {
          type: String,
          default: ""
      },
      prop: {
          type: String,
      },
  },
  data () {
    return {
        error: '',
    };
  },
  mounted() {
    this.$on('validate', this.validate);
  },
  methods: {
      validate() {
          let rule = this.form.rules[this.prop],
            value = this.form.model[this.prop],
            // 校验描述对象
            desc = {[this.prop]: rule};
          let schema =  new Schema(desc);
          // 调用实例validate方法
          return schema.validate({[this.prop]: value}, errs => {
            if(errs) {
              this.error  = errs[0].message;
            }else{
              this.error = '';
            }
          }); 
      },
  }
}
</script>
<style lang="scss" scoped>
</style>