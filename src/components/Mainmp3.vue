<template>
<div class="player">

<audio :src="getUrl"  ref="resd"  loop controls autoplay ></audio>

</div>
</template>

<script>
import bus from '../common/bus'
export default {
  data() {
    return {
      getUrl:''
    }
  },
 methods: {
   
 },
 mounted() {
   bus.$on("playmusic", async id=>{
     const res = await this.$http.get(`song/url?id=${id}`)
    
  this.getUrl=res.data[0].url
   } )
  //  TODO当播放mv时候需要停止播放音乐
   bus.$on('musicstop', ()=>{
     this.$ref.resd.pause()
   })
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
</style>
