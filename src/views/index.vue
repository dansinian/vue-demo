<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        /* position: relative; */
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        line-height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        padding-right: 20px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row-reverse; 
    }
    .layout-header>.demo-avatar{
        margin-top: -5px; 
    }
    .layout-header>span{
        margin:0 20px;
    } 
    .layout-logo-left{
        width: 90%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        color: #f5f7f9;
        font-size: 20px;
        font-family: '隶书';
    }
</style>
<template>
    <div class="layout" >
        <Row type="flex" id="layout">
            <Col span="4" class="layout-menu-left" id="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" >
                    <div class="layout-logo-left">旅游宝商家管理</div>
                    <Submenu name="1">
                        <template slot="title">
                            <router-link to="/travel/user"><Icon type="ios-navigate"></Icon>用户信息</router-link>
                        </template> 
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <router-link to="/travel/seller"><Icon type="ios-keypad"></Icon> 商家信息</router-link>
                        </template>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <router-link to="/travel/carousel"><Icon type="ios-analytics"></Icon>轮播图管理</router-link>
                        </template>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20" id="layout-content">
                <div class="layout-header">
                    <a href="javascript:;">退出</a>
                    <span><a href="javascript:;">管理员名字</a></span>
                    <div class="demo-avatar">
                        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </div>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <slot name="user"></slot>
                        <router-view></router-view>
                    </div>
                </div>
              
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                
            }
        },
        mounted(){
            this.clienHeight();
        },
        methods:{
            clienHeight(){
               var layout = document.getElementById("layout");   //整体最大的div
               var layoutLeft = document.getElementById("layout-menu-left");  //左边导航条的div
               var layoutContent = document.getElementById("layout-content");   // 右边内容的高度
               var cH = layoutContent.offsetHeight;   //右边内容的高度
               var bH = document.documentElement.clientHeight;
            //    console.log("右边高度："+layoutContent.offsetHeight);
            //    console.log("整体div："+layout.offsetHeight);
            //    console.log("导航条高度："+layoutLeft.offsetHeight);
            //    console.log("浏览器高度："+bH);
               //layout.style.height = cH + "px";
               layoutLeft.style.height = cH +"px";
            //    console.log(layoutLeft.offsetHeight);
            }
        }
    }
</script>
