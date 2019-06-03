


function object(o) {
    var n;
    function F() {};
    F.prototype = o;
    n = new F();
    n.uber = o;
    return n;
}