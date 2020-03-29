<template>
 <div class='container post'>
     <div class='post-info'>
        <span class='posterName'>{{this.poster.isAnonymous ?
            'Anonymous' : this.poster.name}}&nbsp;(</span>
        <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
        <span class='school'>@ {{this.school}})</span>
     </div>
     <h2 class='post-title'>{{this.title}}</h2>
     <section class='body' v-html="content" />
     <section class='time'>{{formatTime(this.time)}}</section>
 </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Post',
  props: ['title', 'poster', 'school', 'content', 'time'],
  methods: {
    formatTime(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm A');
      }
      return value;
    },
  },
};
</script>

<style scoped>
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
