<style>
    .search{
        height:50px;
    }
    center{
        margin: 30px 0 10px 0;
    }
</style>

<template>
    <div>
        <div class="search">
            <ButtonGroup style="margin-right:20px;"><Button type="primary" icon="android-add" @click=" addseller = true ">添加</Button></ButtonGroup> 
            <Input v-model="selectBname" placeholder="填入商家称搜索" style="width: 300px"></Input>
            <ButtonGroup><Button type="primary" icon="ios-search" @click="partSeller(1)">搜索</Button></ButtonGroup> 
        </div>

        <Modal  v-model="addseller"  title="添加商家信息" @on-ok="addSeller">
            <Form  :label-width="80" :model="addFrom">
                   <FormItem label="商家名称：">
                       <Input v-model="addFrom.bname" placeholder="例如：西安文理学院"></Input>
                   </FormItem>
                   <FormItem label="登录密码">
                       <Input v-model="addFrom.pass" placeholder="默认：123456"></Input>
                   </FormItem>
                   <FormItem label="商家地址">
                       <Input v-model="addFrom.address" placeholder="例如：西安文理学院"></Input>
                   </FormItem>
                   <FormItem label="商家等级">
                        <Select v-model="addFrom.level">
                            <Option value="AAAA">AAAA</Option>
                            <Option value="AAA">AAA</Option>
                            <Option value="AA">AA</Option>
                            <Option value="A">A</Option>
                        </Select>
                   </FormItem> 
                   <FormItem label="地理位置：">
                        <Input v-model="addFrom.latitude" placeholder="纬度"  style="width:120px;"></Input>
                        <span><strong>,</strong></span>
                        <Input v-model="addFrom.longitude" placeholder="经度"  style="width:120px;"></Input>
                   </FormItem>
            </Form>
            <Form  :label-width="80" enctype="multipart/form-data"  id="insertForm">
                <FormItem label="图片：">
                    <Input name="file" type="file" accept="image/png,image/gif"></Input>
                </FormItem>
            </Form>
        </Modal>    

         <Modal  v-model="updateseller"  title="修改商家信息" @on-ok="updateSeller">
            <Form  :model="updateItem"  :label-width="80">
                <FormItem label="商家名称：">
                    <Input v-model="updateItem.bname" placeholder="例如：西安文理学院"></Input>
                </FormItem>
                <FormItem label="登录密码：">
                    <Input v-model="updateItem.pass" type="password" placeholder="默认：123456"></Input>
                </FormItem>
                <FormItem label="商家地址：">
                    <Input v-model="updateItem.address" placeholder="例如：西安文理学院"></Input>
                </FormItem>
                <FormItem label="商家等级：">
                    <Select v-model="updateItem.level"  placeholder="Select seller level" v-bind:value="updateItem.level">
                        <Option value="AAAA">AAAA</Option>
                        <Option value="AAA">AAA</Option>
                        <Option value="AA">AA</Option>
                        <Option value="A">A</Option>
                    </Select>
                </FormItem>
                <FormItem label="地理位置：">
                    <Input v-model="updateItem.latitude" placeholder="纬度"  style="width:120px;"></Input>
                    <span><strong>,</strong></span>
                    <Input v-model="updateItem.longitude" placeholder="经度"  style="width:120px;"></Input>
                </FormItem>
            </Form> 
            <Form  :label-width="80" enctype="multipart/form-data" id="updateseler">
                <FormItem label="商家图片：">
                    <Input type="file" name="file"></Input>
                </FormItem> 
            </Form> 
        </Modal>  

        <Table border :columns="columns9" :data="sellerData" > </Table>

        <center><Page :total="dataCount" :page-size="pageSize" show-elevator @on-change="handleChange"></Page></center>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                page:1,
                flag:true,
                dataCount:0,    //初始化信息总条数
                pageSize:7,    //每页显示多少条
                addFrom:{},
                ip:'http://47.95.214.132:8080',
                updateItem:{
                    bid: '',
                    bname: '',
                    pass: '',
                    address: '',
                    levle: '',
                    latitude: '',                
                    longitude: '',
                },  //
                updateseller:false, //修改模态框
                addseller:false,   //添加模态框
                selectBname:'',  //模糊查询
                sellerData: [], //全部数据
                columns9: [
                    {
                        title:'序号',
                        key:'id'
                    },
                    {
                        title: '商家名称',
                        key: 'bname'
                    },
                    {
                        title: '登录密码',
                        key: 'pass'
                    },
                    {
                        title: '商家地址',
                        key: 'address'
                    },
                    {
                        title:'地理位置',
                        key:'position'
                    },
                    {
                        title: '商家等级',
                        key: 'level'
                    },
                    {
                        title: '商家图片',
                        key: 'image',
                        render:(h,params) => {
                            return h('img',{
                                attrs:{
                                    src: this.sellerData[params.index].image
                                }
                            })
                        }
                    },
                    {
                        title: '是否停用',
                        key: 'isUse'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    attrs:{
                                        id:'stopBtn'+this.sellerData[params.index].bid,
                                        disabled:false
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.stopSeller(this.sellerData[params.index].bid);
                                        }
                                    }
                                }, '停用'),
                                h('Button', {
                                    attrs:{
                                        id:'startBtn'+this.sellerData[params.index].bid,
                                        disabled:''
                                    },
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.startSeller(this.sellerData[params.index].bid);
                                        }
                                    }
                                }, '复用'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=>{
                                            this.updateseller = true ;
                                            this.fillSeller(this.sellerData[params.index]);
                                           
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            handleChange:function(page){
                this.page = page;
                if(this.flag){
                    this.allSelectSeller(page);
                }else{
                    this.partSeller(page);
                }
                
            },
            allSelectSeller:function(index){
                //http://47.95.214.132:8080
                this.flag = true;
                this.$axios.get(this.ip+'/travel/business/findAll.action?page='+index,{})
                .then(result => {
                    this.sellerData.splice(0,this.sellerData.length);
                    this.dataCount = result.data.data.total;
                    var data = result.data.data.list;
                    for(var i=0;i<data.length;i++){
                        this.sellerData.push({
                            id:i+1,
                            bid: data[i].bid,
                            bname: data[i].bname,
                            pass: data[i].pass,
                            address: data[i].address,
                            position:"("+data[i].latitude+","+data[i].longitude+")",
                            latitude: data[i].latitude,
                            longitude: data[i].longitude,
                            level: data[i].level,
                            image: this.ip+"/travel"+data[i].image,
                            isUse: data[i].isUse
                        })
                    }
                }).catch(error => {
                    alert("操作出错！");
                });
            },
            stopSeller:function(bid){
                var stop = document.getElementById("stopBtn"+bid);
                var start = document.getElementById("startBtn"+bid);
                this.$axios.get(this.ip+'/travel/business/updateBusinessDisable.action',{
                    params:{
                        bid: bid
                    }
                })
                .then(result => {
                    if(result.data.status==200){
                        stop.disabled = true;
                        start.disabled = false;
                        alert(result.data.msg);
                    }
                }).catch(error => {
                    alert(error)
                })
            },
            startSeller:function(bid){
                var stop = document.getElementById("stopBtn"+bid);
                var start = document.getElementById("startBtn"+bid);
                console.log(bid);
                this.$http.get(this.ip+'/travel/business/updateBusinessAble.action',{
                    params:{
                        bid:bid
                    }
                })
                .then(result => {
                   if(result.data.status==200){
                        stop.disabled = false;
                        start.disabled = true;
                        alert(result.data.msg);
                   }
                }).catch(error => {
                    alert(error);
                })
            },
            partSeller:function(index){
                console.log(this.selectBname);
                this.flag = false;
               // console.log(this.flag);
                this.$axios.get(this.ip+'/travel/business/findByBname.action',{
                    params:{
                        bname: this.selectBname,
                        page: index
                    }
                })
                .then(result => {
                   // console.log(result.data);
                    this.dataCount = result.data.data.total;
                    var data = result.data.data.list;
                    this.sellerData.splice(0,this.sellerData.length);
                    for(var i=0;i<data.length;i++){
                        this.sellerData.push({
                            id:i+1,
                            bid: data[i].bid,
                            bname: data[i].bname,
                            pass: data[i].pass,
                            address: data[i].address,
                            position:"("+data[i].latitude+","+data[i].longitude+")",
                            latitude: data[i].latitude,
                            longitude: data[i].longitude,
                            level: data[i].level,
                            image: this.ip+"/travel"+data[i].image,
                            isUse: data[i].isUse
                        });
                     }
                   // this.handleListApproveHistory();
                }).catch(error => {
                    console.log(error);
                });
            },
            fillSeller:function(objSeller){
                console.log(objSeller);
                this.updateItem.bid = objSeller.bid;
                this.updateItem.bname = objSeller.bname;
                this.updateItem.pass = objSeller.pass;
                this.updateItem.address = objSeller.address;
                this.updateItem.levle = objSeller.levle;
                this.updateItem.latitude = objSeller.latitude;                
                this.updateItem.longitude = objSeller.longitude;
            },
            updateSeller:function(){
                console.log(this.page);
                var updateseler = document.getElementById("updateseler");
                var formData = new FormData(updateseler);
                formData.append("bid",this.updateItem.bid);
                formData.append("bname",this.updateItem.bname);
                formData.append("latitude",this.updateItem.latitude);
                formData.append("longitude",this.updateItem.longitude);
                formData.append("address",this.updateItem.address);
                formData.append("level",this.updateItem.level);
                formData.append("pass",this.updateItem.pass);
                this.$axios.post(this.ip+'/travel/business/updateByPrimaryKey.action',formData)
                .then(result => {
                    this.allSelectSeller(this.page);
                    if(result.data.status==200){
                        alert(result.data.msg);
                    }else{
                        alert(result.data.msg);
                    }
                    //this.updateItem = "";
                }).catch(error => {
                    alert(error);
                });
                
            },
            addSeller: function(){
                var insertForm = document.getElementById("insertForm");
                var formData = new FormData(insertForm);  
                formData.append("bname",this.addFrom.bname);
                formData.append("pass",this.addFrom.pass);
                formData.append("address",this.addFrom.address);
                formData.append("level",this.addFrom.level);
                formData.append("latitude",this.addFrom.latitude);
                formData.append("longitude",this.addFrom.longitude);
                this.$axios.post(this.ip+'/travel/business/insert.action', formData)
                .then(result => {
                    this.allSelectSeller(this.page);
                    if(result.data.status==200){
                        alert("添加商家成功！");
                    }
                    console.log(result.data);
                },error => {
                    alert("添加商家出错！");
                    console.log(error);
                });

            },
        },
        mounted(){
            this.allSelectSeller(1);
        }
    }



    
</script>


