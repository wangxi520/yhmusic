<template>
  <div data-v-7ed748b6="" class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in areas" :key="item" @click="area=item">
            <span
              :class="['title', item == area ? 'active' : '']"
              
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in types" :key="item" @click="type=item">
            <span
              :class="['title', item == type ? 'active' : '']"
             
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in orders" :key="item" @click="order=item">
            <span
              :class="['title', item == order ? 'active' : '']"
            
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="mvs">
      <div class="items">
        <div class="items">
          <div class="item" v-for="item in mvList" :key=item.id>
        <router-link :to="'/mvde?id='+item.id">
           <!-- //TODO把整个mv包起来,包在一个router中,则随便点哪里都可以跳转 -->
              <div class="img-wrap">
                <img
                  :src="item.cover"
                  alt=""
                />
                <div class="num-wrap">
                  <div class="iconfont icon-play"></div>
                  <div class="num">{{ item.playCount | Times}}</div>
                </div>
              </div>
              <div class="info-wrap"><div class="name">{{item.name}}</div></div>
            
        </router-link>
          </div>
         
        </div>
        </div>
      </div>
    </div>

</template>
<script>
export default {
  data() {
    return {
      area: "全部",
      areas: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      type: "全部",
      types: ["全部", "官方版", "原声", "现场版", "网易出品"],
      order: "上升最快",
      orders: ["上升最快", "最热", "最新"],
      mvList: [],

    };
  },
  // TODO tab栏切换的方法就是用watch来监听这个变量重新发送请求
   mounted() {
      this.getmvlist()
  },
   watch:{
     area(){
    this.getmvlist()
     },
 type() {
this.getmvlist()
 },
 order(){
this.getmvlist()
 }
  },
  methods: {
         
      async  getmvlist(){
          const res = await this.$http.get('mv/all',{
             params:{
                offset: 0,
          limit: 12,
          area: this.area,
          type: this.type,
          order: this.order

              }
          })
        this.mvList=res.data
      }
  },
 

};
</script>

<style lang="less">
.mvs-container {
  padding-top: 20px;
  .filter-wrap {
    > div {
      margin-bottom: 30px;
      vertical-align: baseline;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        height: 100%;
        &.title {
          margin: 20px;
          color: gray;
          cursor: pointer;
          padding: 5px 20px;
          &.active {
            color: #dd6d60;
            background-color: #fcf6f5;
            border-radius: 20px;
          }
          &::before {
            content: "", pos;
          }
        }
      }
      ul {
        display: flex;
        li:not(:last-child) {
          border-right: 1px solid #f2f2f1;
        }
      }
    }
  }
  .mvs {
    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;
        .img-wrap {
          width: 100%;
          position: relative;
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
        }
        .info-wrap {
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
</style>
