

// Generator 函数有多种理解角度。从语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

function * helloGenerator() {
    yield 'hello';
    yield 'world';
    return  'ending';
}

var hw = helloGenerator();

// 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。
// next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。
console.log(hw.next()) // {value: "hello", done: false}
// 第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。
// next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。
console.log(hw.next()) // {value: "world", done: false}
// 第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。
// next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。
console.log(hw.next()) // {value: "ending", done: true}
// 第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。
// 以后再调用next方法，返回的都是这个值。
console.log(hw.next()) // {value: undefined, done: true}




function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var a = foo(5);
console.log(a.next()); // Object{value:6, done:false}
console.log(a.next()); // Object{value:NaN, done:false}
console.log(a.next()); // Object{value:NaN, done:true}

// 第一次next方法，返回yield (x + 1)的值，所以为5+1 = 6
// 第二次运行next方法的时候不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN，因此返回对象的value属性也等于NaN。
// 第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

var b = foo(5);
console.log(b.next());// { value:6, done:false }
console.log(b.next(12)) // { value:8, done:false }
console.log(b.next(13)) // { value:42, done:true }

//如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；
// 第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
// 第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

//注意，由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。
// V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
// 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。