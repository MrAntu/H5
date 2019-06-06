


var a = [];

for (var i=0;i<10;i++) {
    a[i] = function () {
        console.log(i);
    }
}


a[6](); // 10
// 变量i是var声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的function在运行时，会通过闭包读到这同一个变量i，导致最后输出的是最后一轮的i的值，也就是10。


var b = [];

for (let i=0;i<10;i++) {
    b[i] = function () {
        console.log(i);
    }
}


b[6](); // 6 let是局部的，只对本次循环有用

