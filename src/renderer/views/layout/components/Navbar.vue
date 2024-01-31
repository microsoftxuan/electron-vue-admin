<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="'https://profile-avatar.csdnimg.cn/ebf6643be8974f1eb576f551bb180dbb_dajjbb.jpg'">
        <!-- <span class="user-avatar"><i class="el-icon-user"></i></span> -->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="changexlsx" style="display:block;">xlsx</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <input type='file' @change="importFileDemo">
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import * as XLSX from 'xlsx'
import * as XLSXS from 'xlsx-style'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changexlsx() {
      // const file = 'https://serviceapad-policycentertest.gtmc.com.cn:20090/gtmc-policy-center/api/data/policy/show/sys/handdown/01a7dc22-9f7b-46d3-af10-4302f79c1501.xlsx?authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIiwiZXhwIjoxNzA2NTY0NTI4LCJzc29UayI6IiJ9.Y2dnaKFt_wzJVMFZmDwvXJKxqZ0ZmfwbV7Dla7wzhAY&authorizationUId=1' // 文件路径或URL
      // fetch(file).then(response => response.arrayBuffer()).then(data => {
      //   const workbook = XLSX.read(data, { type: 'buffer' })
      //   const sheetName = workbook.SheetNames[0] // 假设我们读取第一个工作表
      //   const worksheet = workbook.Sheets[sheetName]
      //   const data1 = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      //   console.log(data1)
      // })
      const borderStyle = {
        top: { style: 'thin', color: { auto: 1 }},
        bottom: { style: 'thin', color: { auto: 1 }},
        left: { style: 'thin', color: { auto: 1 }},
        right: { style: 'thin', color: { auto: 1 }}
      }
      const cellStyle = {
        border: borderStyle
      }
      debugger
      const data = JSON.parse(localStorage.getItem('xlsxJson'))
      const worksheet = XLSX.utils.json_to_sheet(data, { cellStyles: true })
      console.log(worksheet)
      const newValue = ''
      const range = { s: { r: 6, c: 0 }, e: { r: 6, c: 8 }}
      for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellRef = XLSX.utils.encode_cell({ c: col, r: row })
          // worksheet[cellRef] = { t: 's', v: newValue, z: XLSX.utils.encode_cell({ c: col, r: row }) }
          worksheet[cellRef].s = cellStyle
        }
      }
      const range1 = { s: { r: 0, c: 1 }, e: { r: 0, c: 8 }}
      for (let row = range1.s.r; row <= range1.e.r; row++) {
        for (let col = range1.s.c; col <= range1.e.c; col++) {
          const cellRef = XLSX.utils.encode_cell({ c: col, r: row })
          worksheet[cellRef] = { t: 's', v: newValue, z: XLSX.utils.encode_cell({ c: col, r: row }) }
        }
      }
      debugger
      console.log(worksheet)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      // const excelData = XLSXS.write(workbook, { bookType: 'xlsx', type: 'buffer', cellStyles: true })
      XLSXS.writeFile(workbook, `new-${new Date().getTime()}.xlsx`, { bookType: 'xlsx', type: 'buffer', cellStyles: true })
      // const blobData = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' })
      // // 创建Blob URL
      // const blobUrl = URL.createObjectURL(blobData)
      // // 创建一个隐藏的<a>标签并设置href属性为Blob URL
      // const link = document.createElement('a')
      // link.href = blobUrl
      // link.target = '_blank'
      // link.download = `new-${new Date().getTime()}.xlsx`
      // // 触发点击操作，开始下载文件
      // link.click()
      // // 释放Blob URL
      // URL.revokeObjectURL(blobUrl)
    },
    importFileDemo(obj) { // 1.onchange事件绑定方法出发
      // 2.如果没有选中文件则取消
      debugger
      if (!obj.target.files) {
        return
      }
      // 3.获得选择的文件对象
      var f = obj.target.files[0]
      // 4.初始化新的文件读取对象，浏览器自带，不用导入
      var reader = new FileReader()
      // 5.绑定FileReader对象读取文件对象时的触发方法
      reader.onload = function(e) {
        // 7.获取文件二进制数据流
        var data = e.currentTarget.result
        // 8.利用XLSX解析二进制文件为xlsx对象
        var wb = XLSX.read(data, { type: 'binary' })
        // 9.利用XLSX把wb第一个sheet转换成JSON对象
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        debugger
        var j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        // 10.在终端输出查看结果
        console.log(j_data)
        // localStorage.setItem('xlsxJson', JSON.stringify(j_data))
      }
      // 6.使用reader对象以二进制读取文件对象f，
      reader.readAsBinaryString(f)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

