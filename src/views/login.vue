<template>
    <div id="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <h1>管理系统登录</h1>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button to="" type="primary" @click="handleLogin()" id="signin">登录</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import './../assets/css/login.css'
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: "", message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: "/^[a-z0-9_-]{6,18}$/", message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                if(this.formInline.user=='admin' && this.formInline.password == "123456"){
                    this.$router.go('/travel');
                }
                // this.$refs[name].validate(() => {
                //     if (valid) {
                //         this.$Message.success('Success!');
                //     } else {
                //          this.$Message.error('Fail!');
                //     }
                // })
            }
        }
    }
</script>
