<!--
 * @Author: SailorCai
 * @Date: 2020-01-11 11:57:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-04 22:47:06
 * @FilePath: /vue-deep/src/components/kForm/kForm.vue
 -->
<template>
  <section>
    <slot></slot>
  </section>
</template>
<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  name: "component_name",
  props: {
    rules: { type: Object },
    model: { type: Object, reqired: true }
  },
  data() {
    return {};
  },
  created() {
    this.fields = [];
    this.$on("k.form.addfield", item => {
      this.fields.push(item);
    });
  },
  methods: {
    validate(cb) {
      const tasks = this.fields.map(item => item.validate());
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>