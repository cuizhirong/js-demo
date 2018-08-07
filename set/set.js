//模拟实现Set数据结构

/**
 * 需要实现的属性方法
 * 方法：add, delete, has, clear
 * 遍历方法: keys, values, entries, forEach
 */
(function(global) {
  //建立在Array上的数据结构, 和Array区别在于不存在重复值

  //单独判断出NaN, 添加一次
  var NaNSymbol = Symbol('NaN');

  var encodeVal = function(value) {
    return value !== value ? NaNSymbol : value;
  }

  var decodeVal = function(value) {
    return (value === NaNSymbol) ? NaN : value;
  }

  function Set(data) {
    this._values = [];
    this.size = 0;

    data && data.forEach(function(item) {
      this.add(item);
    }, this);
  }

  Set.prototype['add'] = function(value) {
    //如果values中没有这个新加的value，就加入新的
    value = encodeVal(value);
    console.log('value=====', this._values.indexOf(value))
    if (this._values.indexOf(value) === -1) {
      this._values.push(value);
      ++this.size;
    }
    return this;
  }

  Set.prototype['delete'] = function(value) {
    //返回是否删除成功
    if (this._values.indexOf(value) !== -1) {
      this._values.splice(this._values.indexOf(encodeVal(value)), 1);
      --this.size;

      return true;
    }

    return false;
  }

  Set.prototype['has'] = function(value) {
    return this._values.indexOf(encodeVal(value)) !== -1;
  }

  Set.prototype['clear'] = function() {
    //清空
    this._values = [];
    this.size = 0;
  }

  Set.prototype['forEach'] = function(callbackFn, thisArg) {
    thisArg = thisArg || global;
    for (var i = 0; i < this._values.length; i++) {
      callbackFn.call(thisArg, this._values[i], this._values[i], this);
    }
  }


  Set.length = 0;

  global.Set = Set;
})(this);

let set = new Set([1, 2, 3, 5, 5]);
console.log(set.size);

set.delete(1);
console.log(set.has(1));

set = new Set([1, 2, 3, 4, 4]);
set.forEach((value, key, set) => {
  console.log(value, key, set.size);
});

set = new Set([1, 2, 3]);
set.add(NaN);
console.log(set.size);

set.add(NaN);
console.log(set.size);