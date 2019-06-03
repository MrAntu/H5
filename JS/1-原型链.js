
function Shape() {
    this.name = "shape";
    this.toString = function () {
        return this.name;
    }
}

function TwoDShape() {
    this.name = "2D Shape";
}

function Triangle(side, height) {
    this.name = 'Triangle';
    this.side = side;
    this.height = height;
    this.getArea = function () {
        return this.side * this.height / 2;
    }
}

TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape();

//当我们对prototype进行完全重写时，有可能会对对象constructor属性产生一定的负面影响，对constructor进行重置
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype.constructor = Triangle;

var my = new Triangle(5, 10);
console.log(my.getArea()) // 25
console.log(my.toString()) // 会去找原型链中的方法

