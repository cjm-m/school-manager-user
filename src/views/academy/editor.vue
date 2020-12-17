<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="学院名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="form.renshu"></el-input>
      </el-form-item>

      <el-form-item label="所属学校">
        <el-select v-model="form.school" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
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
    name: 'academy',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data(){
      return{
        options: [

          ],
        apiModel:'academy',
        form:{}
      }
    },
    methods:{
      onSubmit(){
        console.log('222:', 222)
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
      }
    },
    mounted() {
      if(this.$route.query._id){
        this.$http.post('/api/'+this.apiModel+'/get',{_id:this.$route.query._id}).then(res => {
          if(res&&res.length>0){
            this.form = res[0]
          }
        })
      }

      this.$http.post('/api/school/find').then(res => {
        if(res&&res.length>0){
          this.options = res
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
