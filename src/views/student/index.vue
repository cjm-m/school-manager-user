<template>
  <div class="dashboard-container">
    <el-table
      :data="users"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="student_number"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <!--      列表添加项目
-->
      <el-table-column
        prop="school"
        label="学校名称"
        width="180">
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.school">
            <el-tag
              :type="scope.row.school.name === '深圳信息职业技术学院' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.school.name}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="academy"
        label="学院名称"
        width="180">
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.academy">
            <el-tag
              :type="scope.row.academy.name === '软件学院' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.academy.name}}</el-tag>
          </span>

        </template>
      </el-table-column>

      <el-table-column
        prop="classs"
        label="班级名称"
        width="180">
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.classs">
            <el-tag
              :type="scope.row.classs.name === '18软工4-3' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.classs.name}}</el-tag>
          </span>

        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
    data() {
      return {
        apiModel:'student',
        users: {}
      }
    },
    methods: {
      onSubmit() {
        console.log(123434)
      },
      handleEdit(index, item) {
        this.$router.push({ path: '/'+this.apiModel+'/editor', query: {_id:item._id} })
      },
      handleDelete(index, item) {
        this.$http.post('/api/'+this.apiModel+'/delete', item).then(res => {
          console.log('res:', res)
          this.findUser()
        })

      },
      findUser(){
        this.$http.post('/api/'+this.apiModel+'/find', this.user).then(res => {
          console.log('res:', res)
          this.users = res
        })
      }
    },
    mounted() {
      this.findUser()
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
