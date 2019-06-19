

window.onload = function () {

    left_scroll()

}

function left_scroll() {

    // 获取移动目标
    let moveUI = document.querySelector(".main_left ul");

    //header的高度
    let headerHeight = document.querySelector(".header").offsetHeight;

    //获取父节点的高度，由于.mian_left的高度为100%，即为body 的高度，需要减去header的高度才是实际的高度
    let parentHeight = document.querySelector(".main_left").offsetHeight - headerHeight;

    //获取移动目标的高度
    let ulHeight = moveUI.offsetHeight;

    //计算可以滑动的最小范围,
    let minDistance = parentHeight - ulHeight;

    //最大的范围
    let maxDistance= 0;

    //定义可以吸附的距离
    let delayDistance = 300;


    //记录起始距离
    let startY = 0;
    //移动的距离
    let moveY = 0;
    //总的移动距离
    let distanceY = 0;

    let isMoved = false
    //监听手势
    moveUI.addEventListener('touchstart',function (event) {
        startY = event.touches[0].clientY;
        //关闭过渡效果
        moveUI.style.transition = "";
        isMoved = false
    })

    moveUI.addEventListener('touchmove',function (event) {
        moveY = event.touches[0].clientY - startY;
        isMoved = true
        // 判断 是否满足 移动的条件
        if ((moveY + distanceY) > (maxDistance + delayDistance)) {
            moveY = 0;
            distanceY = maxDistance + delayDistance;
            // 为什么是减法 因为 往上移动 是负值 要比最小值 还要更小
        } else if ((moveY + distanceY) < (minDistance - delayDistance)) {
            moveY = 0;
            distanceY = minDistance - delayDistance;
        }

        //关闭过渡效果
        moveUI.style.transition = "";

        //移动 moveY+distanceY必须先计算，否则滑动偏移结果有些不一样
        let result = moveY+distanceY
        moveUI.style.transform = 'translateY('+result+'px)';
    })

    moveUI.addEventListener('touchend',function (event) {
        distanceY += moveY;

        // 吸附回去 判断 吸附的方位
        if (distanceY > maxDistance) {
            distanceY = maxDistance;
        } else if (distanceY < minDistance) {
            distanceY = minDistance;
        }

        // 说明只是点击了，没有移动，不需要动画
        if (isMoved == false) {
            return
        }
        //开启过渡
        moveUI.style.transition = "all 0.3s";

        moveUI.style.transform = 'translateY('+distanceY+'px)';
    })

    //点击事件
    //获取所有的li
    let liList = document.querySelectorAll(".main_left ul li");

    //获取一个li的高度
    let liHeight = document.querySelector(".main_left ul li").offsetHeight;

    //给所有的li绑定一个index属性
    for (let i=0;i<liList.length;i++) {
        // 设置带横线属性的正确姿势
        liList[i].dataset["index"] = i;
    }

    //给ul添加点击事件
    fox_tap(moveUI,function (e) {
        // e.target为a标签
        // console.log(e.target)
        // li标签
        // console.log(e.target.parentNode)

        // 清空所有li的class
        for (let i=0;i<liList.length;i++) {
            liList[i].className = '';
        }

        //设置当前点击li的class
        e.target.parentNode.className = "current";

        //获取当前li的index
        let currentIndex = e.target.parentNode.dataset["index"];

        //计算偏移量,往上滚动，为负
        let distance = currentIndex * liHeight * -1;

        if (distance > maxDistance) {
            distance = maxDistance;
        }  else if (distance < minDistance) {
            distance = minDistance;
        }

        //重新赋值，记录已经移动的距离，
        distanceY = distance;
        //开启过渡
        moveUI.style.transition = "all 0.3s";

        moveUI.style.transform = 'translateY('+distanceY+'px)';

    })

}


/*
	参数1:绑定的dom元素
	参数2:回调函数
*/
function fox_tap(element,callBack) {
    // 绑定touch事件
    /*
        计算 start 跟 end的 时间差
            如果时间差 很长 也失效  if(time>200)
        如果move触发了 就失效

    */

    // 1. 定义一些必须的变量
    // 开始的时间
    var startTime = 0;

    // 标示 是否触发了 move事件
    var isMove =false;

    // 定义 最大的 延迟时间
    var maxTime = 250;

    element.addEventListener('touchstart',function (e) {
        // 记录开始时间
        startTime = Date.now();

        // 修正 我们标示变量的值
        isMove = false;
    })
    element.addEventListener('touchmove',function (e) {
        // 修改标示变量
        isMove = true;
    })
    element.addEventListener('touchend',function (e) {
        if (isMove == true) {
            // console.log('失效');
            return;
        }
        // 判断 延迟延迟的时间
        if ((Date.now()-startTime)>maxTime) {
            // console.log('太长了,都属于长按了');
            return;
        }

        // 如果能够到这里
        // console.log('成功');
        callBack(e);
    })
}