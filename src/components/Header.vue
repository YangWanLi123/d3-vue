<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">SVG</el-menu-item>
        <el-menu-item index="2">D3</el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return {
      activeIndex: '0',
      pathArray: ['index','SVGIndex']
    }
  },
  mounted(){
    
  },
  methods: {
      handleSelect(key,keyPath){
          console.log(key,keyPath)
          this.$router.push({
              name: this.pathArray[parseInt(key)]
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
