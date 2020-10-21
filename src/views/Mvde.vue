<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <div class="video-wrap">
        <video controls="controls" :src="getUrl"></video>
      </div>
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="artistCover" alt="" />
          </div>
          <span class="name">{{ artistName }}</span>
        </div>
        <!-- 详细 -->
        <div class="mv-info">
          <h2 class="title">
            {{ artistName }}
          </h2>
          <span class="date">发布：{{ date }}</span
          ><span class="number">播放：{{ number }}次</span>
          <p class="desc">
            {{ desc }}
          </p>
        </div>
      </div>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items" v-for="item1 in getMvist" :key="item1.id" >
          <div class="item">
            <div class="img-wrap">
              <img
                :src="item1.cover"
                alt=""
              /><span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item1.playCount | Times}}</div>
              </div>
              <span class="time">{{item1.duration | second}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item1.name}}</div>
              <div class="singer">{{item1.artistName}}</div>
            </div>
          </div>
        </div>
      
        </div>
      </div>
    
  </div>
</template>
<script>
import bus from '../common/bus'
export default {
  data() {
    return {
      getUrl: "",
      getMvist: [],
      getDetail: "",
      //   标题
      title: "",
      date: "",
      number: "",
      desc: "",
      artid: "",
      id: this.$route.query.id,
      artistName: "",
      artistCover: "",
    };
  },
  created() {
    // 获取播放地址
    this.getmvurl();

    this.getdetail();
    this.getmvist();
    bus.$emit("musicstop")
  },
  methods: {
    async getmvurl() {
      const res = await this.$http.get("mv/url", {
        params: {
          id: this.id,
        },
      });
     
      this.getUrl = res.data.url;
    },
    async getmvist() {
      const res = await this.$http.get("simi/mv", {
        params: {
          mvid: this.id,
        },
      });
    
      this.getMvist = res.mvs;
    },

    // 获取歌曲信息
    async getdetail() {
      const res = await this.$http.get("mv/detail", {
        params: {
          mvid: this.id,
        },
      });
     
      this.title = res.data.title;
      this.date = res.data.publishTime;
      this.number = res.data.playCount;
      this.desc = res.data.desc;

      //   获取艺术家信息
      // 获取艺术家信息
      // 获取艺术家信息
      const res2 = await this.$http.get(`artists?id=${res.data.artistId}`);
      this.artistName = res2.artist.name;
      this.artistCover = res2.artist.picUrl;
    },
  },

};
</script>

<style lang="less">
.mv-container {
  display: flex;
  .title {
    margin-bottom: 20px;
  }
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    .date {
      margin-right: 25px;
    }
    .date,
    .number {
      color: #bebebe;
      font-size: 14px;
    }
    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }
    .info-wrap {
      margin-bottom: 50px;
      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
      }
      .mv-info {
        .title {
          font-size: 30px;
        }
        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }
  }
  .mv-recommend {
    flex: 1;
    .mvs {
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          &:hover {
            background-color: #f5f5f5;
          }
          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;
            > .icon-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 40px;
              height: 40px;
              color: #dd6d60;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;
              &::before {
                transform: translateX(3px);
              }
            }
            &:hover > .icon-play {
              opacity: 1;
            }
            img {
              width: 100%;
              border-radius: 5px;
            }
            .num-wrap {
              position: absolute;
              color: white;
              top: 0;
              right: 0;
              display: flex;
              align-content: center;
              font-size: 15px;
              padding-right: 5px;
              padding-top: 2px;
              .icon-play {
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-right: 5px;
              }
            }
            .time {
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: white;
              font-size: 15px;
            }
          }
          .info-wrap {
            flex: 1;
            .name {
              font-size: 15px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
        }
      }
    }
  }
}
</style>
