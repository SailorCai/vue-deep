export default function cPromise(fn) {
    this.events = {resolved: [], rejected: []};
    try{
        fn.call(this, this.resolve.bind(this), this.reject.bind(this));
    }catch(err){
        this.reject(err);
    }
    
}

cPromise.prototype.then = function(fn) {
    var pro = this;
    return new cPromise(function(resolve, reject) {
        try{
            pro.$on('resolved', function(res) {
                var data = fn(res);
                resolve(data);
            });
            pro.$on('rejected', function(err) {
                reject(err);
            });
        }catch(err){
            reject(err);
        }
    });
};
cPromise.prototype.catch = function(fn) {
    // this.reject_fn = fn;
    this.$on('rejected', fn);
};
cPromise.prototype.all = function(promises) {
    return new cPromise(function(resolve, reject) {
        var ress = [];
        promises.forEach(function(item) {
            item.then(function(res) {
                ress.push(res);
                if(ress.length === promises.length) {
                    resolve(ress);
                }
            }).catch(function(err) {
                reject(err);
            });
        });
    });
};
cPromise.prototype.resolve = function(param) {
    try{
        this.$emit('resolved', param);
    }catch(err) {
        this.$emit('rejected', err);
    }
    
};
// 用于注册事件监听
cPromise.prototype.$on = function(name, cb) {
    this.events[name].push(cb);
};
// 触发事件
cPromise.prototype.$emit = function(name, param){
    this.events[name].forEach(function(cb) {
        cb(param);
    });
};
cPromise.prototype.reject = function(err) {
    this.$emit('rejected', err);
};