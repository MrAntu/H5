

// 加载完毕事件,在该事件中，写的js代码去获取dom元素，就一定不会出现找不到的问题
window.onload = function () {
    // 顶部的通栏，滚动的效果
    headerScroll()
    // 倒计时

    // 轮播图的效果
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
        // console.log(scrollDistance);
        console.log(document.body.scrollTop);
        console.log(document.documentElement.scrollTop);
        console.log(window.pageXOffset);

        // // 计算一个 0-1的百分数
        var percent = scrollDistance / maxDistance;
        // console.log(percent);

        // 如果 超过了1 没有意义了 所以 还原为1
        if (percent>1) {
            percent=1;
        }

        // 到这 获取到的 一定是 0-1
        // 设置 顶部通栏的透明度
        // headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
        headerDom.style.backgroundColor = `rgba(201,21,35,${percent})`;

    }




}