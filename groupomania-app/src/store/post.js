import axios from 'axios';
import router from "../router/index";

export default {
    namespaced: true,
    state: () => ({
        posts: [],
        post: {},
    }),
    getters: { // Computed
        numberOfEvents(state) {
            return state.posts.length
        },
    },
    mutations: { // Dès que je souhaites modifier le state
        getAllPost(state, posts) {
            state.posts=posts
          },
    },
    actions: { // Tout ce qui est asynchrone
        publishContent({ commit }, data) {
            axios
                .post("http://localhost:3000/groupomania/posts", data)
                .then((response) => {
                    commit('getPosts', response.data.posts)
                    router.push({ name: "HomePage" });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getAllPost({ commit }) {
            axios
                .get("http://localhost:3000/groupomania/posts")
                .then((response) => {
                    commit('getAllPosts', response.data.posts)
                    router.push({ name: "HomePage" });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //   fetchPost(id) {
        //     axios
        //       .get("http://localhost:3000/groupomania/posts/" + id)
        //       .catch((e) => console.log(e));
        //     this.post = response.data;
        //   },
        //   createPost(post) {
        //     axios
        //       .post("http://localhost:3000/groupomania/posts/", post)
        //       .catch((error) => console.log(error));
      
        //     this.posts.push(response.data);
        //   },
        //  deletePost(id) {
        //     axios
        //       .delete("http://localhost:3000/groupomania/posts/" + id)
        //       .catch((error) => console.log(error));
      
        //     this.posts.filter((post) => {
        //       post.id != response;
        //     });
        //     this.post = {};
        //   },
        //   EditPost(id, post) {
        //     axios
        //       .put(`http://localhost:3000/groupomania/posts/${id}/edit`, post)
        //       .catch((error) => console.log(error));
        //     this.post = response.data;
        //   },
        //   likePost(postId, like) {
        //     axios
        //       .post(`http://localhost:3000/groupomania/posts/${postId}`, { like: like })
        //       .catch((error) => console.log(error));
        //     this.post = response.data;
        //   },
    }
}