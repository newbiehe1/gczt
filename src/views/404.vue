<template>
    <div id="error">
        <div class="main">
            <div class="img">
                <img src="../assets/images/404/404.png"
                     alt="">
            </div>
            <div class="text">
                <div class="context">
                    Error，页面出错啦！系统将在
                    <span>{{count}}</span>
                    秒后自动跳转至登录页，<br />
                    或者手动点击重新登录~
                </div>
            </div>
            <div class="btn">
                <router-link :to="{name:'登录'}">
                    <img src="../assets/images/404/btn.png"
                         alt="">
                </router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#error {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    & > .main {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 517px;
        height: 608px;
        .img {
            margin-bottom: 30px;
            width: 517px;
            height: 418px;
        }
        .text {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            span {
                color: #ff0000;
                padding: 0 5px;
            }
        }
        .btn {
            width: 150px;
            height: 45px;
            margin: 55px auto 0 auto;
        }
    }
}
</style>
<script>
export default {
    data () {
        return {
            count: 15,
            timer: null
        }
    },
    created () {
        this.startTiming();
    },
    methods: {
        // 开始计时
        startTiming () {
            this.timer = setInterval(() => {
                --this.count;
                if (this.count < 1) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.$router.push({
                        name: '登录'
                    })
                }
            }, 1000);
        },
    },
    beforeDestroy () {
        this.timer = null;
        clearInterval(this.timer);
    },
}
</script>