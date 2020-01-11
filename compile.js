/*
 * @Author: SailorCai
 * @Date: 2020-01-08 21:25:15
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-11 08:58:31
 * @FilePath: /vue-deep/compile.js
 */
class Compiler{
    constructor(id, vm) {
        this._vm = vm;
        this.$el = document.querySelector(id);
        this.compile(this.$el);
    }

    compile(el) {
        const childNodes = Array.from(el.childNodes);
        childNodes.forEach(node => {
            if(this.isDom(node)) {
                // 如果是元素节点遍历属性找到所有指令
                this.walkAttr(node);
                this.compile(node);
            }
            if(this.isText(node)) {
                // 如果是文本节点，判断是否是插值表达式
                this.judgInsert(node);
            }
        });
    }

    isDom(item) {
        return item.nodeType == 1;
    }

    isText(item) {
        return item.nodeType == 3;
    }

    // 判断和处理插值表达式
    judgInsert(node){
        const exp = /\{\{(.*)\}\}/;
        // 如果是插值表达式
        if(exp.test(node.textContent)) {
            let fn = this['textUpdater'];
            new Watcher(this._vm, RegExp.$1, function(vm, val) {
                fn && fn(node, val);
            });
        }
    }


    walkAttr(node) {
        var attrs = Array.from(node.attributes);
        attrs.forEach(attr => {
            let name = attr.name;
            let value = attr.value;
            let dire = name.substr(2)
            let fn = this[dire+'Updater'];
            // 先执行第一次更新
            // 如果name以k-开头说明是指令
            if(name.indexOf('k-') === 0) { 
                fn.call(this, node, this._vm[value]);
                new Watcher(this._vm, value, function(vm, val) {
                    fn && fn(node, val);
                });
            }
        });

    }

    textUpdater(node, val) {
        node.textContent = val;
    }

    htmlUpdater(node, val) {
        node.innerHTML = val;
    }
}