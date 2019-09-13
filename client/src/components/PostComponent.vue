<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <label for="create-post">Say Something... </label>
    <div class="create-post">
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Post</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container" title="double click to delete">
      <div class="post" 
        v-for="(post, index) in posts" 
        v-bind:item="post" 
        v-bind:index="index" 
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        <p class="created-at">{{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}</p>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    }catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.createPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = '';
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  width: 70vw;
}

h1 {
  color: white;
}

p.error {
  background-color: #fa766d;
  padding: 1rem;
  margin-bottom: 2vh;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight:bolder;
  color: #272727;
}

div.post {
  position: relative;
  background-color: #72cc6e;
  box-shadow: 0.2rem .3rem .9rem;
  padding: 1rem;
  margin-bottom: 2vh;
  border-radius: 0.5rem;
}

.post:hover {
  cursor: pointer;
}

.text {
  font-size: 1rem;
  font-weight: 500;
  color: #272727;
}

.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 .5rem; 
  font-size: .8rem;
  opacity: .6;
  font-style: oblique;
  letter-spacing: 0.1rem;
  font-weight:700;
    color: #272727;
}

.create-post { 
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-bottom: 3vh;
}

label {
  display: block;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2.5vh;
  font-style: italic;
}

button {
  margin: 0;
  padding: .6rem .5rem;
  border-radius: .5rem;
  width: 20%;
  outline: none;
  font-weight: 700;
  font-size: 1rem;
  background-color: rgb(212, 212, 212);
}

button:hover {
  cursor: pointer;
  background-color: rgb(184, 184, 184);
}

#create-post {
  outline: none;
  display: inline-block;
  width: 70%;
  border: none;
  margin: 0;
  padding: .5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}

#create-post:focus {
  outline: none;
  position: relative;
}
</style>
