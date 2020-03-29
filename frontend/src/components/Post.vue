<template>
 <div class='container post'>
     <div class='post-info'>
        <span class='posterName'>{{this.poster.isAnonymous ?
            'Anonymous' : this.poster.name}}&nbsp;(</span>
        <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
        <span class='school'>@ {{this.school}})</span>
        <span class='time'> on {{this.formatedTime}}&nbsp;</span>
     </div>
     <h2 class='post-title'>{{this.title}}</h2>
     <section class='body' v-html="content" />
 </div>
</template>

<script>
import { formatTime } from '../helper';

export default {
  name: 'Post',
  props: ['title', 'poster', 'school', 'content', 'time'],
  data: () => ({
    formatedTime: '',
  }),
  created() {
    this.formatedTime = formatTime(this.$props.time);
  },
};
</script>

<style scoped>
.time {
  color: rgb(78, 78, 78);
  font-size: 85%;
}
.post {
    background-color: white;
    border: 2px solid white;
    border-radius: 6px;
    padding: 1em;
}

.post-title {
    font-size: 1.5em;
}
</style>
