

// 加载完毕事件,在该事件中，写的js代码去获取dom元素，就一定不会出现找不到的问题
window.onload = function () {
    // 顶部的通栏，滚动的效果
    headerScroll()
    // 倒计时
    cutDownTime()
    // 轮播图的效果
    banner()
}

function banner() {
    // 获取轮播的ul
    let bannerUI = document.querySelector(".banner_images");

    //获取小圆点的li
    let bannerCircles = document.querySelectorAll(".banner_index li");

    //获取屏幕的宽度
    let width = document.body.offsetWidth;

    // 初始化起始位置，index从1开始，0位最后一张图
    let index = 1;


    //开启定时器
    let timer = setInterval(function () {

        //累加
        index++;

        //添加过渡效果，因为index = 9时，关闭了过渡，所以每次都开启,开启前先关闭过渡
        bannerUI.style.transition = '';
        bannerUI.style.transition = 'all .3s';

        // 修改ul的位置，通过transform，向右偏移
        bannerUI.style.transform = 'translateX('+ width * index * -1  +'px)';

    }, 2000)


    //监听过渡结束事件,设置小圆点的class,判断index是否有效
    //webkitTransitionEnd 是cs3添加的属性.不同浏览器的内核不一样，前缀不一样
    bannerUI.addEventListener('webkitTransitionEnd', function () {

        //index = 9为第一张图，当为8时，自动跳转到1
        if (index > 8) {
            index = 1;

            //从最后一张，偏移到第一张
            //去掉过渡效果,用户看不到切换时的视觉效果
            bannerUI.style.transition = '';
            //修改ui的位置
            bannerUI.style.transform = 'translateX('+ width * index * -1  +'px)';
        }

        //修改小圆点的class
        //先置空所以的class
        for (let i=0;i<8;i++) {
            bannerCircles[i].className = '';
        }

        //设置当前index的小圆点为白色的class，原点的小标从0开始，所以需要index-1
        bannerCircles[index-1].className = 'current';

    })


    // 记录三个值

    //记录开始的值
    var starX = 0;
    //记录移动的值
    var moveX = 0;

    // 触摸事件，移动端才支持

    // 触摸开始
    bannerUI.addEventListener('touchstart',function (event) {
        console.log("触摸开始")
        console.log(event)
        // 关闭定时器
        clearInterval(timer)

        // 关闭过渡效果
        bannerUI.style.transition = '';

        //记录开始的值
        starX = event.touches[0].clientX

    })

    //触摸移动
    bannerUI.addEventListener('touchmove',function (event) {
        console.log("触摸移动中")

        // 记录移动后的偏移量
        moveX = event.touches[0].clientX - starX;


        //移动ul
        let translateX = moveX + (width * index * -1);
        bannerUI.style.transform = 'translateX('+ translateX  +'px)';
    })

    //触摸结束
    bannerUI.addEventListener('touchend',function (event) {
        // 记录可最大的偏移
        let distanceX = width / 5;

        //判断移动后的偏移
        if (Math.abs(moveX) > distanceX)  {
            //大于0说明往右
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
        }

        if (index < 1) {
            index = 8
            bannerUI.style.transition = '';
        } else  if (index > 8) {
            index = 1
            bannerUI.style.transition = '';

        } else {
            bannerUI.style.transition = 'all 0.3s';
        }


        //偏移
        bannerUI.style.transform = 'translateX('+ width * index * -1 +'px)';

        // //开启定时器
        timer = setInterval(function () {
            //累加
            index++;

            //添加过渡效果，因为index = 9时，关闭了过渡，所以每次都开启,开启前先关闭过渡
            bannerUI.style.transition = '';
            bannerUI.style.transition = 'all .3s';

            // 修改ul的位置，通过transform，向右偏移
            bannerUI.style.transform = 'translateX('+ width * index * -1  +'px)';
        },2000)
    })
}

function cutDownTime() {
    // 获取所有li标签
    var lists = document.querySelectorAll(".main_content:nth-child(1) .content_top li")
    console.log(lists)

    //设置倒计时的总时间（3小时），总的秒数
    var totalSec = 3 * 60 * 60

    //创建定时器
    var timer = setInterval(function () {
        // 总数<= 0 ，结束
        if (totalSec <= 0) {
            clearInterval(timer);
            return
        }

        //递减
        totalSec--;

        //计算小时
        let hour = Math.floor(totalSec / 3600);  // floor取整
        let min = Math.floor(totalSec % 3600 / 60)
        let sec = Math.floor(totalSec % 60)

        //显示小时 ，十位，个位
        lists[0].innerHTML = `${Math.floor(hour/10)}`
        lists[1].innerHTML = `${hour%10}`

        //显示分 ，十位，个位
        lists[3].innerHTML = `${Math.floor(min/10)}`
        lists[4].innerHTML = `${Math.floor(min%10)}`

        // 显示秒， 十位，个位
        lists[6].innerHTML = `${Math.floor(sec/10)}`
        lists[7].innerHTML = `${Math.floor(sec%10)}`
    },1000)
}

function headerScroll() {
    // 获取banner
    let bannerDom = document.querySelector(".jd_banner");
    // 获取从顶部到banner底部的距离
    let maxDistance = bannerDom.offsetTop + bannerDom.offsetHeight;

    // 获取header
    let headerDom = document.querySelector(".jd_header");
    //初始化通栏的背景为透明色
    headerDom.style.backgroundColor = 'rgba(201,21,35,0)';

    //监听body的滚动
    window.onscroll = function () {
        // console.log('123');
        //  获取body 滚动的距离 由于不同浏览器，需要调用方法不一致，所有需要调用多个方法来判断
        var scrollDistance = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        console.log(scrollDistance);

        // // 计算一个 0-1的百分数
        var percent = scrollDistance / maxDistance;
        // console.log(percent);

        // 如果 超过了1 没有意义了 所以 还原为1
        if (percent>1) {
            percent=1;
        }

        // 到这 获取到的 一定是 0-1
        // 设置 顶部通栏的透明度
        headerDom.style.backgroundColor = `rgba(201,21,35,${percent})`;

    }
}