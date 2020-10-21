<template>
  <div class="index-container">
    <div class="nav">
    <ul>
      <li><router-link to="/findmusic">发现音乐</router-link>
      <span class='iconfont icon-find-music'></span>
       </li>

      <li><router-link to="/playlist">推荐歌单</router-link>
         <span class="iconfont icon-music-list"></span>
      </li>
           
      <li><router-link to="/song">最新音乐</router-link> <span class="iconfont icon-music"></span></li>
      <li><router-link to="/new_mv">最新MV</router-link>
        <span class="iconfont icon-mv"></span></li>
    </ul>

    </div>
  <div class="main">
    <router-view/>
  </div>
<audio1></audio1>
  </div>
</template>


<script>
import audio from './components/Mainmp3'
export default {
  components:{
    audio1:audio
  }
}
</script>
<style lang="less" scoped>
.index-container {
  height: 100%;
  display: flex;
  .nav {
    background-color: #ededed;
    width: 200px;
    height: 100%;
    li {
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #e7e7e7;
      }
      .iconfont {
        margin-right: 10px;
        font-size: 20px;
      }
      a {
        color: black;
        padding-left: 30px;
        font-size: 18px;
        line-height: 60px;
        width: 100%;
        height: 100%;
        &.router-link-active {
          color: #dd6d60;
          .iconfont {
            color: #dd6d60;
          }
        }
      }
    }
  }
  .main {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 20px;
    padding-bottom: 60px;
    > div {
      max-width: 1100px;
      margin: 0 auto;
    }
  }}
</style>
