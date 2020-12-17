<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属学校">
        <el-select v-model="form.school" placeholder="请选择" @change="schoolChange">
          <el-option
            v-for="item in schools"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      编辑框：学院选择列表-->
      <el-form-item label="所属学院">
        <el-select v-model="form.academy" placeholder="请选择">
          <el-option
            v-for="item in academys"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属班级">
        <el-select v-model="form.classs" placeholder="请选择">
          <el-option
            v-for="item in classs"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.student_number"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.gender"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'student',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data(){
      return{
        schools:[],
        academys:[],
        classs:[],
        options: [
        ],
        apiModel:'student',
        form:{}
      }
    },
    methods:{
      onSubmit(){
        if(this.form._id){
          this.$http.post(`/api/${this.apiModel}/update`,this.form).then(res => {
            console.log('bar:', res)
            this.$router.push({path:this.apiModel})
            this.form={}
          })
        }else
        {
          this.$http.post('/api/'+this.apiModel+'/add',this.form).then(res => {
            console.log('bar:', res)
            this.$router.push({path:this.apiModel})
            this.form={}
          })
        }
      },
      schoolChange(val1){
        //显示学院选择栏目
        this.$http.post('/api/academy/get',{school:val1}).then(res => {
          if(res&&res.length>0){
            this.academys = res
            console.log('res:', res)
          }
        })
      }
    },

    mounted() {
      if(this.$route.query._id){
        this.$http.post('/api/'+this.apiModel+'/get',{_id:this.$route.query._id}).then(res => {
          if(res&&res.length>0){
            this.form = res[0]
            this.schoolChange(this.form.school)
          }
        })
      }

      //显示学校选择栏目
      this.$http.post('/api/school/find').then(res => {
        if(res&&res.length>0){
          this.schools = res
          console.log('res:', res)
        }
      })
      //显示班级栏目
      this.$http.post('/api/classs/find').then(res => {
        if(res&&res.length>0){
          this.classs = res
          console.log('res:', res)
        }
      })
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
