/*
 * @Author: SailorCai
 * @Date: 2020-01-08 21:25:04
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-11 08:34:24
 * @FilePath: /vue-deep/kvue.js
 */
function defineReactive(obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        get() {           
            if(Dep.target) {
                console.log('============',Dep.targe);
                dep.deps.push(Dep.target);
            }
            return val;
        },
        set(newVal) {
            val = newVal;
            dep.notify();
        }
    })
}

class KVue{
    constructor(options){
        this.$options = options;
        this.observe(this.$options.data);
        this.proxyData(this, '$options');
        new Compiler(this.$options.el, this);
    }

    observe(obj){
        // 便利对象key，设置响应式
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
            // 如果对对象的属性还是一个对象，递归
            if(typeof obj[key] === 'object') {
                this.observe(obj[key]);
            }
        });
    }

    proxyData(vm, sourceKey) {
        Object.keys(vm[sourceKey].data).forEach(key => {
            Object.defineProperty(vm, key, {
                get() {
                    return vm[sourceKey].data[key];
                },
                set(newVal) {
                    vm[sourceKey].data[key] = newVal;
                },
            });
        });
    }
}

// watcher类，用于对应每一个有绑定的地方
class Watcher{
    constructor(vm, key, updateFn) {
        this._vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        Dep.target = this;
        this._vm[key];
        Dep.target = null;
    }

    update() {
        this.updateFn(this._vm, this._vm[this.key]);
    }
}

// dep类用于管理依赖
class Dep{
    constructor() {
        this.deps = [];
    }

    notify() {
        console.log(this.deps);
        this.deps.forEach(item => {
            item.update();
        });
    }

    addDep(dep) {
        this.deps.push(dep);
    }
}