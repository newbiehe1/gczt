<template>
    <div id="login">
        <div class="bg"></div>
        <!-- 中间登录模块 -->
        <div class="content">
            <!-- 左侧背景图 -->
            <div class="left"></div>
            <!-- 右侧相关内容 -->
            <div class="right">
                <!-- 上部分 -->
                <div class="top">

                    <!-- logo -->
                    <div class="logo">
                        <img src="../assets/images/login/logo.png"
                             alt="">
                    </div>
                    <div class="title">
                        文华学院工程制图后台系统
                    </div>
                    <!-- 文本内容 -->

                </div>
                <!-- 登录表单 -->
                <div class="form">
                    <form action="">
                        <!-- 用户名 -->
                        <div class="account">
                            <img src="../assets/images/login/user.png"
                                 alt="">
                            <input type="text"
                                   @focus="switchAccount"
                                   @blur="checkAccount"
                                   @keydown.enter="submit"
                                   v-model.trim="form.account"
                                   placeholder="请输入账号">
                            <div class="hr"
                                 :style='style.account'></div>
                        </div>
                        <!-- 密码 -->
                        <div class="password">
                            <img src="../assets/images/login/pwd.png"
                                 alt="">
                            <input type="password"
                                   @focus="switchPassword"
                                   @blur="checkPassword"
                                   @keydown.enter="submit"
                                   v-model.trim="form.password"
                                   placeholder="请输入密码">
                            <div class="hr"
                                 :style='style.password'></div>
                        </div>
                    </form>
                    <div class="tips">
                        {{tips}}
                    </div>
                    <a href="javascript:;"
                       @click="submit"
                       class="submit">
                        登录
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@font-face {
    font-family: "font";
    src: url("../assets/font/font.ttf");
}
// 大背景图
#login {
    width: 100%;
    height: 100%;
    background-color: #0b8b7e;
    display: flex;
    justify-content: center;
    align-items: center;
    & > .bg {
        background-image: url("../assets/images/login/bg.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        min-height: 1080px;
        min-width: 1920px;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 0;
    }
    // 中间登录模块
    .content {
        width: 1424px;
        height: 650px;
        border-radius: 40px;
        background: #fff;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-flow: row nowrap;
        position: relative;
        z-index: 1;
        // 左侧背景图
        .left {
            width: 712px;
            height: 100%;
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            background: url("../assets/images/login/left-bg.png") no-repeat;
            background-size: 100% 100%;
            background-position: 0;
            background-color: #daf7f0;
        }
        // 右侧
        .right {
            width: 712px;
            height: 100%;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            .top {
                margin-top: 81px;
                .logo {
                    width: 266px;
                    height: 98px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 33px auto;
                }
                .title {
                    width: 100%;
                    font-size: 32px;
                    background: linear-gradient(to right, #0de8d2, #0b8b7e);
                    color: transparent;
                    background-clip: text;
                    height: 32px;
                    line-height: 32px;
                    font-family: font;
                    text-align: center;
                }
            }
            // 登录表单
            .form {
                margin-top: 50px;
                //验证提示信息
                position: relative;

                form {
                    & > div {
                        width: 400px;
                        height: 74px;
                        margin: 0 auto;
                        display: block;
                        position: relative;
                        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
                        & > img {
                            position: absolute;
                            bottom: 24px;
                            left: 0;
                        }
                        & > .hr {
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            height: 1px;
                            width: 0;
                            transition: all 0.5s;
                        }
                        input {
                            outline: none;
                            width: calc(100% - 34px);
                            border: 0;
                            margin-left: 34px;
                            height: 100%;
                            background-color: transparent;
                        }
                    }
                }
                & > div.tips {
                    position: absolute;
                    top: 165px;
                    font-size: 16px;
                    word-wrap: break-word;
                    word-break: break-all;
                    width: 400px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    color: red;
                }
                & > a.submit {
                    width: 200px;
                    height: 46px;
                    background-image: linear-gradient(
                            90deg,
                            #51f5e4 0%,
                            #2ec0b1 63%,
                            #0b8b7e 100%
                        ),
                        linear-gradient(#ffffff, #ffffff);
                    background-blend-mode: normal, normal;
                    border-radius: 23px;
                    display: block;
                    color: #fff;
                    font-size: 24px;
                    letter-spacing: 5px;
                    text-align: center;
                    line-height: 46px;
                    margin: 60px auto 0 auto;
                }
            }
        }
    }
}
</style>
<script>
const Base64 = require('js-base64').Base64;
export default {
    data () {
        return {
            API: {
                login: 'login/login_login',
                menuTree: 'systemManage/main/showSubMenuForBdis',
            },
            form: {
                account: '',
                password: '',
            },
            style: {
                account: '',
                password: ''
            },
            tips: '',
        }
    },
    methods: {
        // 切换账号
        switchAccount () {
            this.style.account = {
                width: '100%',
                backgroundColor: '#0b8b7e'
            };
        },
        // 切换密码
        switchPassword () {
            this.style.password = {
                width: '100%',
                backgroundColor: '#0b8b7e'
            };
        },
        // 校验账号
        checkAccount () {
            if (this.form.account) {
                this.style.account = '';
            } else {
                this.style.account = {
                    width: '100%',
                    backgroundColor: 'red'
                };
            }
        },
        // 校验密码
        checkPassword () {
            if (this.form.password) {
                this.style.password = '';
            } else {
                this.style.password = {
                    width: '100%',
                    backgroundColor: 'red'
                };
            }
        },
        // 提交
        submit () {
            if (!this.form.account) {
                this.tips = '请输入账号';
                this.style.account = {
                    width: '100%',
                    backgroundColor: 'red'
                };
            } else if (!this.form.password) {
                this.tips = '请输入密码';
                this.style.password = {
                    width: '100%',
                    backgroundColor: 'red'
                };
            } else {
                this.requestSubmit();
            }
        },
        // 请求 提交
        requestSubmit () {
            const base64Account = Base64.encode(this.form.account);
            const base64Password = Base64.encode(this.form.password);
            this.$H.ajaxRequest({
                way: this.API.login,
                parameter: {
                    accountId: base64Account,
                    password: base64Password,
                },
                success: response => {
                    if (response.success) {
                        this.requestMenuTree();
                    }
                    this.tips = response.message
                },
            })
        },
        //请求 菜单树
        requestMenuTree () {
            this.$H.ajaxRequest({
                way: this.API.menuTree,
                parameter: '',
                success: response => {
                    let data = {};
                    if (response.success) {
                        data = JSON.parse(JSON.stringify(response.message));
                    }
                    this.$store.dispatch('setUserData', data);
                    this.setRouter(data.menuVOList);
                }
            })
        },
        //赋值路由
        setRouter (arr) {
            if (!arr) return null;
            let router = [{
                path: '/index',
                name: '首页',
                component: () =>
                    import('./About.vue'),
                children: [],
            },]
            this.recursionArr(arr, router[0].children);
            this.$router.addRoutes(router);
            this.$router.push('/index');
        },
        //递归
        recursionArr (arr, container) {
            arr.forEach((index, n) => {
                let urlArr = index.menu_url.split('/');
                let path = urlArr[urlArr.length - 1].toLowerCase();
                let name = index.menu_name;
                container.push({
                    path: path,
                    name: name,
                    component: () =>
                        import('../components/' + path + '.vue'),
                })

                if (index.is_leaf === '0' && index.menu_id !== 20348) {
                    if (index.menu_parent === 20350) {
                        container[n + 1].children = [];
                        this.recursionArr(index.children, container[n + 1].children)
                    }
                    else {
                        container[n].children = index.menu_id === 20350 ? container[n].children : [];
                        this.recursionArr(index.children, container[n].children)
                    }
                }

            })
        },
    },
}
</script>