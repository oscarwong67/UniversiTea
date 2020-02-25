<template>
 <div class='container post'>
     <div class='columns is-gapless is-0'>
        <div class='column'>{{this.poster.name}}</div>
        <div class='column'>{{this.poster.degreeType}} Student</div>
        <div class='column'>@ {{this.school}}</div>
     </div>
     <h2 class='post-title'>{{this.title || 'POST TITLE'}}</h2>
     <section class='body'>
         {{this.content}}
     </section>
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
