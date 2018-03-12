<style>
Table{
    text-align:center;
}
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
    <div>
        <div>
            <div class="search">
                <Button type="primary" icon="android-add" @click=" modal2 = true ">添加</Button>
                <Input v-model="nameCarousel" placeholder="填入轮播图称搜索" style="width: 300px"></Input>
                <ButtonGroup><Button type="primary" icon="ios-search" @click="partCarousel()">搜索</Button></ButtonGroup> 
            </div>
            
            <Modal  v-model="modal2"  title="添加轮播图信息" @on-ok="addData">
                <Form  :label-width="80" :model="addItem">
                    <FormItem label="名称：">
                        <Input v-model="addItem.name"placeholder="例如：西安文理学院"></Input>
                    </FormItem>
                    <FormItem label="ID：">
                        <Input v-model="addItem.bid"  placeholder="例如：00001"></Input>
                    </FormItem>
                    <FormItem label="轮播类型：">
                        <RadioGroup v-model="addItem.type">
                            <Radio label="0">图片</Radio>
                            <Radio label="1">其他</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="是否启用：">
                        <RadioGroup v-model="addItem.status">
                            <Radio label="1">启用</Radio>
                            <Radio label="0">不用</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <Form  :label-width="80" enctype="multipart/form-data"  id="insertCarousel" >
                    <FormItem label="图片：">
                        <Input  type="file" name="file"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <Table border :columns="columns7" :data="historyData"></Table>
        <!-- 分页 -->
        <center><Page :total="dataCount" :page-size="pageSize" show-elevator @on-change="handleChange"></Page></center>

        <Modal v-model="modal1"   title="修改轮播图信息"  @on-ok="updateCarousel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="名称：">
                    <Input v-model="formItem.name" placeholder="例如：西安文理学院"></Input>
                </FormItem>
                <FormItem label="ID：">
                    <Input v-model="formItem.bid" placeholder="例如：00001"></Input>
                </FormItem>
                <FormItem label="轮播类型：">
                    <RadioGroup v-model="formItem.type">
                        <Radio label="0">图片</Radio>
                        <Radio label="1">其他</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否启用：">
                    <RadioGroup v-model="formItem.status">
                        <Radio label="1">启用</Radio>
                        <Radio label="0">不用</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <Form :label-width="80" enctype="multipart/form-data" id="updateFrom">
                <FormItem label="轮播图片：">
                    <Input type="file" name="file"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    let ajaxHistoryData = [];    //全部数据（用于分页的全部数据）
    export default {
        data () {
            return {
                bcid:'',
                dataCount:0,    //初始化信息总条数
                pageSize:7,    //每页显示多少条
                ip:'http://47.95.214.132:8080',
                nameCarousel:'',//模糊查询
                addItem: {
                    name: '',
                    bid: '',
                    type: '',
                    status: ''
                },
                formItem: { 
                    name: '',
                    bid: '',
                    type: '',
                    status: ''
                },//修改填充
                addCarousel:{}, //添加数据
                allCarouselData:[], //暂时存放所有数据
                resultData:[], //查询全部数据(接口查询出来的)
                historyData:[], //存放每页显示的数据
                modal1:false,   //修改
                modal2:false,   //添加
                columns7: [
                    {
                        title: '序号',
                        width: 80,
                        key: 'id'
                    },
                    {
                        title: '商家ID',
                        key: 'bid',
                        width: 140
                    },
                    {
                        title: '轮播图名称',
                        key: 'name',
                    },
                    {
                        title: '轮播图路径',
                        key: 'imgpath',
                        render:(h,params) => {
                            return h('img', {
                                attrs:{
                                    src: this.resultData[params.index].imgpath
                                }
                            })
                        }
                    },
                    {
                        title: '轮播类型',
                        key: 'type',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '是否启用',
                        key: 'status',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteCarousel(this.resultData[params.index].bcid);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=>{
                                            this.modal1 = true ;
                                            this.fillData(this.resultData[params.index]);
                                            
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
            fillData:function(objFill){
                    //console.log(objFill);
                    this.bcid = this.ip+"/travel/businessCarousel/updateByPrimaryKeySelective.action?bcid="+objFill.bcid;
                    this.formItem.bcid = objFill.bcid;
                    this.formItem.name = objFill.name;
                    this.formItem.bid = objFill.bid;
                    this.formItem.imgpath = objFill.imgpath;
                    this.formItem.type = objFill.type;
                    this.formItem.status = objFill.status;
            },
            allSelectCarousel: function(){
                ajaxHistoryData.splice(0,ajaxHistoryData.length);
                this.$axios.get(this.ip+"/businessCarousel/findAll.action",{})
                    .then(result => {
                        var data = result.data.data;
                       // this.resultData = data;
                       // console.log(this.resultData.length+"....."+this.resultData);
                        for(var i=0;i<data.length;i++){
                            this.resultData.push({
                                id:i+1,
                                bid: data[i].bid,
                                name: data[i].name,
                                imgpath: this.ip+"/travel"+data[i].imgpath,
                                type: data[i].type,
                                status: data[i].status,
                                bcid: data[i].bcid
                            })
                        }
                    ajaxHistoryData = this.resultData;
                    console.log(ajaxHistoryData.length);
                    this.handleListApproveHistory();
                    }).catch(error => {
                        alert("加载出错！");
                        console.log(error);
                    });
            },
            deleteCarousel: function(bcid){
               this.$axios.get(this.ip+'/travel/businessCarousel/deleteByPrimaryKey.action?',{
                    params:{
                        bcid: bcid
                    }
                }).then(result => {
                    if(result.data.status==200){
                        alert("删除成功！");
                    }
                    console.log(result.data);
                }).catch(function(error){
                    alert("出错操作！");
                    console.log(error);
                });
              this.allSelectCarousel();
            },
            updateCarousel: function(){
                var updateFrom = document.getElementById("updateFrom");
                var formData = new FormData(updateFrom);
            
                formData.append("bcid",this.formItem.bcid);
                formData.append("name",this.formItem.name);
                formData.append("bid",this.formItem.bid);
                formData.append("type",this.formItem.type);
                formData.append("status",this.formItem.status);
                // var datas = "bcid="+this.formItem.bcid+"&name=123"
                //47.95.214.132
                this.$axios.post(this.ip+'/travel/businessCarousel/updateByPrimaryKeySelective.action',formData)
                .then(result =>{
                    this.allSelectCarousel();
                    console.log(result.data);
                    if(result.data.status == 200){
                        alert(result.data.msg);
                    }else{
                        alert(result.data.msg);
                    }
                   console.log(result.data);
                }).catch( error => {
                    console.log(error);
                });
            },
            addData:function(){
                var insertForm = document.getElementById("insertCarousel");
                var formData = new FormData(insertForm);
                formData.append("name",this.addItem.name);
                formData.append("bid",this.addItem.bid);
                formData.append("type",this.addItem.type);
                formData.append("status",this.addItem.status);
                this.$axios.post(this.ip+"/travel/businessCarousel/insertSelective.action",formData)
                .then(result => {
                    this.allSelectCarousel();
                    if(result.data.status==200){
                        alert(result.data.msg);
                    }else{
                        alert(result.data.msg);
                    }
                    this.addItem.name="";
                    this.addItem.bid="";
                    this.addItem.type="";
                    this.addItem.status="";
                }).catch(error => {
                    alert(error);
                });
                
            },
            partCarousel:function(){
                console.log(this.nameCarousel);
                this.$axios.get(this.ip+'/travel/businessCarousel/findByName.action',{
                    params:{
                        name: this.nameCarousel
                    }
                })
                .then(result => {
                    console.log(result.data);
                    this.resultData.splice(0,this.resultData.length);
                    var data = result.data;
                    for(var i=0;i<data.length;i++){
                        this.resultData.push({
                            id:i+1,
                            bid: data[i].bid,
                            name: data[i].name,
                            imgpath: this.ip+"/travel"+data[i].imgpath,
                            type: data[i].type,
                            status: data[i].status,
                            bcid: data[i].bcid
                        })
                    }
                ajaxHistoryData = this.resultData;
                this.handleListApproveHistory();
                }).catch(error => {
                    console.log(error);
                })
            },
            handleListApproveHistory:function(){
                this.allCarouselData = ajaxHistoryData;
                this.dataCount = ajaxHistoryData.length;
                console.log(this.dataCount);

                if(this.dataCount < this.pageSize){
                    this.historyData = this.allCarouselData;
                }else{
                    this.historyData = this.allCarouselData.slice(0,this.pageSize);
                }
            },
            handleChange:function(page){
                // console.log(this.allCarouselData.length);
                // console.log(page);
                var _start = (page-1) * this.pageSize;
                var _end = page * this.pageSize;
                this.historyData = this.allCarouselData.slice(_start,_end);
            }
        },
        //mounted
        created(){
            this.allSelectCarousel();
           
        },
    }
</script>
