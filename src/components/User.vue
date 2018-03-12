<style>
    Table img{
        width:100px;
        height:100px;
    }
    .search{
        height:50px;
    }
    center{
        margin: 30px 0 10px 0;
    }
</style>

<template>
<span slot="user">
    <div>
        <div class="search">
            <Input v-model="selectAccout" placeholder="填入用户名称搜索" style="width: 300px"></Input>
            <ButtonGroup><Button type="primary" icon="ios-search" @click="partUser(1)">搜索</Button></ButtonGroup> 
        </div>
        <Table border :columns="columns8" :data="userData"></Table>
        <center><Page :total="dataCount" :page-size="pageSize" show-elevator @on-change="handleChange"></Page></center>
    </div>
</span>
</template>
<script>
    export default {
        data () {
            return {
                flag:true,
                ip:'http://47.95.214.132:8080/',
                selectAccout:'',
                searchAccount:"",
                userData: [ ],  //表格里面存放数据
                pageSize:7,//   每页显示的数据条数
                dataCount:'', //所有数据个数
                columns8: [
                    {
                        title:'序号',
                        key:'id'
                    },
                    {
                        title: '用户名',
                        key: 'account',
                    },
                    {
                        title: '密码',
                        key: 'pass'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                    },
                    {
                        title: '令牌',
                        key: 'token'
                    },
                    {
                        title: '默认头像',
                        key: 'headImgPath',
                        render:(h,params) => {
                            return h('img',{
                                attrs:{
                                    src:this.userData[params.index].headImgPath
                                }
                            })
                        }
                    },
                    {
                        title: '注册时间',
                        key: 'signinTime'
                    },
                    {
                        title: '操作',
                        key: 'isdel',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    attrs:{
                                        id:'stopBtn'+this.userData[params.index].uid,
                                        disabled:false
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.stopUser(this.userData[params.index].uid);
                                        }
                                    }
                                }, '停用'),
                                h('Button', {
                                     attrs:{
                                        id:'startBtn'+this.userData[params.index].uid,
                                        disabled:''
                                    },
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                           this.startUser(this.userData[params.index].uid);
                                        }
                                    }
                                }, '复用'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            handleChange:function(page){
                this.allSelectUser(page);
            },
            allSelectUser:function(index){
                this.flag = true;
               // http://47.95.214.132:8080/travel/user/findAll.action?page=1
                this.$axios.get(this.ip+'travel/user/findAll.action?page='+index)
                .then(result => {
                    //console.log(result.data.data.list);
                    this.userData.splice(0,this.userData.length);
                    this.dataCount = result.data.data.total;
                    var data = result.data.data.list;
                    for(var i=0;i<data.length;i++){
                        this.userData.push({
                            id:i+1,
                            uid:  data[i].uid,
                            account: data[i].account,
                            pass: data[i].pass,
                            sex: data[i].sex,
                            phone: data[i].phone,
                            token: data[i].token,
                            signinTime: data[i].signinTime,
                            signinTime: data[i].signinTime,
                            isdel: data[i].isdel,
                            headImgPath:this.ip+data[i].headImgPath
                        });
                    }
                }).catch(error => {
                    alert(error);
                });
            },
            stopUser:function(uid){
                var stop = document.getElementById("stopBtn"+uid);
                var start = document.getElementById("startBtn"+uid);
                this.$axios.get(this.ip+'travel/user/updateUserDisable.action',{
                    params:{
                        uid: uid
                    }
                })
                .then(result => {
                    if(result.data.status==200){
                        stop.disabled = true ;
                        start.disabled = false;
                    }
                    alert(result.data.msg);
                }).catch(error => {
                    alert(error);
                });
            },
            startUser:function(uid){
                var stop = document.getElementById("stopBtn"+uid);
                var start = document.getElementById("startBtn"+uid);
                this.$axios.get(this.ip+'travel/user/updateUserAble.action',{
                    params:{
                        uid: "uid"
                    }
                })
                .then(result => {
                   // console.log(result.data);
                   if(result.data.status==200){
                        stop.disabled = false ;
                        start.disabled = true;
                   }                
                    alert(result.data.msg);
                },error => {
                    alert(error);
                });
            },
            partUser:function(index){
                this.flag = false;
                this.$axios.get(this.ip+'travel/user/findByAccount.action',{
                    params:{
                        account:this.selectAccout,
                        page: index
                    }
                })
                .then(result => {
                   // console.log(result.data);
                    this.userData.splice(0,this.userData.length);
                    this.dataCount = result.data.data.total;
                    var data = result.data.data.list;
                     for(var i=0;i<data.length;i++){
                        this.userData.push({
                            id:i+1,
                            uid:  data[i].uid,
                            account: data[i].account,
                            pass: data[i].pass,
                            sex: data[i].sex,
                            phone: data[i].phone,
                            token: data[i].token,
                            signinTime: data[i].signinTime,
                            signinTime: data[i].signinTime,
                            isdel: data[i].isdel,
                            headImgPath: this.ip+data[i].headImgPath
                        });
                     }
                }).catch(error => {
                    console.log(error);
                    alert("操作失败！");
                }); 
            }
        },
         mounted(){
            this.allSelectUser(1);
        }
    }
</script>
