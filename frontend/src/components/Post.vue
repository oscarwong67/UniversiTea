<template>
 <div class='container post'>
     <div class='post-info'>
        <span class='posterName'>{{this.poster.name || 'Anonymous'}}&nbsp;(</span>
        <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
        <span class='school'>@ {{this.school}})</span>
     </div>
     <h2 class='post-title'>{{this.title || 'POST TITLE'}}</h2>
     <section class='body' v-html="content" />
 </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['title', 'poster', 'school', 'content'],
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
