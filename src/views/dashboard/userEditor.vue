<template>
  <div class="dashboard-container">
      <h1>统计页面</h1>
<!--    <el-form ref="user" :model="user" label-width="80px">-->
<!--      <el-form-item label="用户名">-->
<!--        <el-input v-model="user.name"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="年龄">-->
<!--        <el-input v-model="user.age"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="班级">-->
<!--        <el-input v-model="user.class"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--        <el-button>取消</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      apiModel:'dashboard',
      user:{}
    }
  },
  methods:{
    onSubmit(){
      // console.log(123434)
      if(this.user._id){
        this.$http.post('/api/${this.apiModel}/update',this.user).then(res => {
          console.log('bar:', res)
          this.$router.push({path:'user'})
          this.user={}
        })
      }else
      {
        this.$http.post('/api/${this.apiModel}/add',this.user).then(res => {
          console.log('bar:', res)
          this.$router.push({path:'user'})
          this.user={}
        })
      }



    }
  },
  mounted() {

    if(this.$route.query._id){

      this.$http.post('/api/student/get',{_id:this.$route.query._id}).then(res => {
        if(res&&res.length>0){
          this.user = res[0]
        }
      })
    }


  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
