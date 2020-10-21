<template>
  <div data-v-7ed748b6="" class="songs-container">
    <div class="tab-bar">
      <span
        :class="['item', item.type == vat ? 'active' : '']"
        v-for="item in list"
        :key="item.type"
        @click="vat = item.type"
        >{{ item.name }}</span
      >
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
        <tr
          class="el-table__row"
          v-for="(item, index) in getsongList"
          :key="item.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" /><span
                class="iconfont icon-play"
              ></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span v-if="item.mvid" @click="tomv(item.mvid)" class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration|second }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vat: 0,
      list: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 8, name: "日本" },
        { type: 16, name: "韩语" },
      ],
      getsongList:[]
    };
  },
created() 
  
 {
    

   this.getdata()
  },
  methods: {
      async getdata(){
    const res= await this.$http.get('top/song',{
      params:{
        type: this.vat
 
  },
  // TODO 从最新音乐的界面小图标去播放mv
  

      
    })
    
  this.getsongList=res.data
  },
    tomv(id){
    this.$router.push(`/mvde?id=${id}`)
  }
  },
  watch: {
    vat(){
      this.getdata()
    }
  },
};
</script>

<style lang="less">
.songs-container {
  .tab-bar {
    display: flex;
    justify-content: flex-end;
    .item {
      font-size: 15px;
      color: gray;
      margin-right: 20px;
      cursor: pointer;
      &.active {
        color: #dd6d60;
      }
    }
  }
  .song-table {
    .song-wrap {
      > span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }
      .icon-mv {
        padding-left: 5px;
        color: #dd6d60;
      }
    }
    .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }
      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #dd6d60;
        font-size: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        &::before {
          transform: translateX(1px);
        }
      }
    }
  }
}
</style>
