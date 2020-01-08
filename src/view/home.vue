<!--
 * @Author: SailorCai
 * @Date: 2020-01-05 18:23:51
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-07 15:31:43
 * @FilePath: /vue-deep/src/view/home.vue
 -->
<template>
    <div>
        <p @click="$store.commit('increment')">counter: {{$store.state.count}}</p>
        <p @click="$store.dispatch('add')">async counter: {{$store.state.count}}</p>
        <p @click="$store.commit('increment')">doubleCount: {{$store.getter.doublecount}}</p>
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