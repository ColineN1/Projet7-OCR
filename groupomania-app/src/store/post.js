import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        posts: [],
    }),
    getters: { // Computed
        nbOfPosts(state) {
            return state.posts.length
        },
    },
    mutations: { // Dès que je souhaites modifier le state
        initPosts(state, posts) {
            state.posts = posts
        },
        newPost(state, post) {
            state.posts.unshift(post);
        }, 
    },
    actions: { // Tout ce qui est asynchrone
        publishContent({ commit }, data) {
            axios
                .post("http://localhost:3000/groupomania/posts", data)
                .then((response) => {
                    commit('getPosts', response.data.posts)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getAllPost({ commit }) {
            const url = "http://localhost:3000/groupomania/post";
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            };
            fetch(url, options)
                .then(res => res.json())
                .then(posts => {
                    commit('initPosts', posts)
                })
                .catch(error => console.log(error));
        },
          createPost({ commit }, formData) {
            const options =
            {
              method: 'POST',
              body: formData,
              headers:
              {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            };
            return fetch('http://localhost:3000/groupomania/post', options)
              .then(res => res.json())
              .then((post) => {
                commit('newPost', post);
                alert("Votre message a été publié avec succès");
              })
              .catch(error => console.log('error message: ', error))
          },

    }
}