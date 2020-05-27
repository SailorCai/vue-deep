import { type } from "os";

/*
 * @Author: SailorCai
 * @Date: 2020-05-26 08:07:02
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-26 08:44:00
 * @FilePath: /vue-deep/src/kvue/vue.js
 */

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;

    observe(options.data);

    // 开始编译模板
    const compiler = new Compiler({
      el: options.el,
      vim: this
    });
    const root = document.querySelector(this.$el);
    compiler.compile(root);
  }
}

class Compiler {
  constructor(options) {
    this.$options = options;
    this.$el = options.el;
    this.vim = options.vim;
  }

  compile(dom) {
    // 递归遍历编译节点
    console.log(dom.childNodes);
    const childNodes = Array.from(dom.childNodes);
    childNodes.map(function(node) {});
  }
}

function observe(obj) {
  console.log(typeof obj);
  if (typeof obj !== "object") {
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      defineReactive(obj, key, val);
      if (typeof val === "object") {
        observe(val);
      }
    }
  }
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get " + key);
      return val;
    },
    set(newVal) {
      console.log("set " + key + ":" + newVal);
      if (newVal === val) {
        return;
      }
      val = newVal;
    }
  });
}
