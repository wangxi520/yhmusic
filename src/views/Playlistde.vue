<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img
          :src="list.coverImgUrl"
          alt=""
        />
      </div>
      <div class="info-wrap">
        <p class="title">
         {{list.name}}
        </p>
        <div class="author-wrap">
          <img
            :src="list.coverImgUrl"
            alt=""
            class="avatar"
          /><span class="name">网易云音乐</span
          ><span class="time">{{list.createTime|date}} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in list.tags" :key=index>{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span
          ><span class="desc"
            >{{list.description}}</span
          >
        </div>
      </div>
    </div>
    <table class="el-table playlit-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list.tracks " :key='item.id'>
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap"  @click="playmusic(item.id)">
              <img
                :src="item.al.picUrl"
                alt=""
              /><span  class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap"  @click="playmusic(item.id)">
              <div class="name-wrap">
                <span>{{item.name}}</span
                ><!---->
              </div>
              <span></span>
            </div>
          </td>
          <td>{{item.ar[0].name}}</td>
          <td>{{item.al.name}}</td>
          <td>{{item.dt|second}}</td>
        </tr>
    
      </tbody>
    </table>
  </div>
</template>
<script>
import bus from '../common/bus'
export default {
  
data() {
  return {

    list:[]
  }
},
created() {
  this.getlist()
  console.log(this.$route.params.id);
},
methods: {
 async  getlist(){
      const res = await this.$http.get('playlist/detail',{
        params:{
          id: this.$route.params.id
        }
      })
      console.log(res);
      this.list=res.playlist

  },
  playmusic(id){
      bus.$emit('playmusic',id)
    }
},
}
</script>
<style lang="less">
.playlist-container {
  margin: auto;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    color: gray;
    span {
      font-size: 17px;
    }
    .img-wrap {
      margin-right: 30px;
      img {
        width: 230px;
        height: 230px;
      }
    }
    .info-wrap {
      .title {
        margin-bottom: 20px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        span {
          color: white;
          &.iconfont {
            margin-right: 8px;
          }
          &.text {
            font-size: 16px;
          }
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
        }
        li {
          font-size: 15px;
          &:not(:last-child)::after {
            content: "/";
            margin: 0 4px;
          }
        }
      }
      .desc-wrap {
        span {
          &:last-child {
            font-size: 15px;
          }
        }
      }
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  .content-wrap {
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
