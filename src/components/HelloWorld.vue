<!--
 * @Author: SailorCai
 * @Date: 2019-09-15 12:24:14
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 18:31:00
 * @FilePath: /hello-cli3/src/components/HelloWorld.vue
 -->
<template>
  <div>
    <k-form :model="userInfo" :rules="rules" ref="loginForm">
      <k-form-item prop="username" label="用户名">
        <k-input type="text" v-model="userInfo.username" placeholder="请输入用户名"></k-input>
      </k-form-item>
      <k-form-item prop="password" label="密码">
        <k-input type="password" v-model="userInfo.password" placeholder="请输入密码"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="login">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
// import {a} from '../utils/moduleDemo';
import { mapState } from 'vuex';
import kForm from './kForm/kForm.vue';
import kFormItem from './kForm/kFormItem.vue';
import kInput from './kForm/kInput.vue';
import notice from '@/components/notice.vue';

export default {
  name: 'HelloWorld',
  components: {
    kInput,
    kForm,
    kFormItem
  },
  props: {
    msg: String
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
      },
      rules: {
        username: {
          required: true,
          message: '用户名必填'
        },
        password: {
          required: true,
          message: '密码必填'
        }
      },
    }
  },
  computed: {
    ...mapState(['name']),
  },
  mounted() {
    // this.$store.commit('increment', 'haha');
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        this.$create(notice, {
          duration: 2000,
          message: valid ? '登录': '校验失败',
          title: '登录提示框'
        }).show();
        /* if(valid) {
          alert('请求登录');
        }else{
          console.log('error submit');
          return false;
        } */
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
