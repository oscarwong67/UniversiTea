<template>
  <div class= "view container" v-if="!isEditing">
    <div>
      <div class = 'posts container' v-if="postExists">
        <Post
          :key='post[0].Post_ID'
          :poster="{
            name: post[0].FName, degreeType: post[0].Degree_Type, isAnonymous: post[0].Is_Anonymous
          }"
          :title="post[0].Title" :content="post[0].Content" :school="post[0].SchoolName"
        />
        <div class='media container' v-if='hasMedia'>
          <b-carousel :autoplay='false' :indicator-inside="false">
            <b-carousel-item v-for="media in mediaList" :key="media.id">
              <img class='media image' :src="media.url" v-if='media.type === "image"'/>
              <video class='media video' :src="media.url"
                v-else-if='media.type === "video"' controls/>
              <iframe class='media youtube' :src="media.url" allowfullscreen="allowfullscreen"
                v-else-if='media.type==="youtube"'/>
            </b-carousel-item>
          </b-carousel>
        </div>
        <div class='buttons container level-right' v-if="isOP">
          <b-button @click='handleEdit'>Edit</b-button>
          <b-button type='is-danger' icon-right='delete' @click='handleDelete'>Delete</b-button>
        </div>
        <div class = 'create-comment container'>
          <hr/>
          <CreateComment/>
        </div>
      </div>
      <NotFoundMessage :type='"post"' v-else/>
    </div>
    <hr/>
    <CommentFeed :postid='this.$route.params.postid'/>
  </div>
  <div class='edit container' v-else>
    <EditPost
      :oldTitle="post[0].Title" :oldContent="post[0].Content"
      :oldMediaUrls="mediaList" :oldAnonymous="post[0].isAnonymous"
    />
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import EditPost from '../components/EditPost.vue';
import CreateComment from '../components/CreateComment.vue';
import CommentFeed from '../components/CommentFeed.vue';
import NotFoundMessage from '../components/NotFoundMessage.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'ViewPost',
  data: () => ({
    post: [],
    mediaList: [],
    isEditing: false,
    comments: [],
  }),
  components: {
    Post,
    EditPost,
    CreateComment,
    CommentFeed,
    NotFoundMessage,
  },
  async mounted() {
    const id = this.$route.params.postid;
    const res = await fetch(`${API_ADDRESS}/api/getPost/?postid=${id}`);
    const data = await res.json();
    this.mediaList = data.media;
    this.post = data.post;
  },
  methods: {
    handleEdit() {
      this.isEditing = true;
    },
    async handleDelete() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to <b>delete</b> this post? This action cannot be undone.',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          const res = await fetch(`${API_ADDRESS}/api/deletePost/`, {
            method: 'POST',
            body: JSON.stringify({
              postid: this.post[0].Post_ID,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (res.status === 200) {
            this.$buefy.toast.open('Post deleted!');
            this.$router.push('/');
          } else {
            this.$buefy.toast.open('Post could not be deleted. Please try again later');
          }
        },
      });
    },
  },
  computed: {
    isOP() {
      return (localStorage.getItem('User_ID') === String(this.post[0].User_ID));
    },
    hasMedia() {
      return (this.mediaList[0] !== undefined);
    },
    postExists() {
      return !(this.post[0] === undefined);
    },
  },
};
</script>

<style scoped>
.view {
  padding-top: 3em;
}
.buttons {
  padding: 1em;
  background-color: white;
  border: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.posts {
  border-radius: 6px;
  background-color: white;
}
.carousel{
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  width: 600px;
}
.carousel-item {
  display: flex;
  height: 600px;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
}
.media {
  width: 600px;
  height: auto;
}
.youtube {
  width: 600px;
  height: 500px;
}
.create-comment {
  width: 95%;
}
</style>
