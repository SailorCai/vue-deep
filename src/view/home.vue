<!--
 * @Author: SailorCai
 * @Date: 2020-01-05 18:23:51
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 23:29:36
 * @FilePath: /vue-deep/src/view/home.vue
 -->
<template>
    <div>
        <p @click="$store.commit('increment')">counter: {{$store.state.count}}</p>
        <p @click="$store.dispatch('add')">async counter: {{$store.state.count}}</p>
        <p @click="$store.state = {}">counter: {{$store.state.count}}</p>
    </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
</style>