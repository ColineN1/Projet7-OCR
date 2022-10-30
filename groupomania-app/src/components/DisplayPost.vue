<template>
	<div class="feeds">
		<h2>Votre fil d'actualité</h2>
		<div class="feeds_post">
			<div v-for="post in posts" :key="post.id" class="post">
				<div class="post__box">
					<div class="post__data">
						<div class="post__user">
							<p>Le {{ post.date }}, <span class="writer">{{post.author}} </span> a dit : </p>
						</div>
						<p class="post__content">{{ post.description }}</p>
						<div class="post__image" v-if="post.imageUrl">
							<img :src="post.imageUrl">
						</div>
						<div class="post__reaction">
							{{ post.likes }} 
							<span class="like" @click="likePost(post._id)">
								<i class="fas fa-heart"></i>
							</span>
						</div>
						<div class="change">
							<div class="modify_post">
								<router-link :to="{ name: 'onepost', params: {id: post._id }}">
									<p><i class="fas fa-pen"></i> Modifier</p>
								</router-link>
							</div>
							<div class="delete-post" @click="deletePost(post._id)">
								<p><i class="fas fa-trash"></i> Supprimer</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "DisplayPost",
    components: {},
	computed: {
		// que ça soit un state ou un getter, on doit le mettre dans computed
		...mapState('post', ['posts'])
	},
	methods: {
		...mapActions('post', [
			'getAllPost'
		]),
		deletePost(id) {
			if (confirm("Voulez vous supprimer cette publication ? ")) {
				fetch(`http://localhost:3000/groupomania/post/${id}`,
					{
						method: "DELETE",
						headers:
						{
							Authorization: `Bearer ${localStorage.getItem("token")}`
						},
					})
					.then((res) => {
						if (res.status === 200) {
							alert("Publication supprimée !");
							this.getAllPost();
						}
						else {
							console.log(res.json());
							alert("Vous n'avez pas les droits pour supprimer cette publication.");
						}
					})
					.catch(error => console.log('error message: ', error));
			}
		},
		/* like a post*/
		likePost(id) {
			const newLike = {
				like: 1,
				postId: id,
			}
			console.log(newLike);
			const url = `http://localhost:3000/groupomania/post/${id}/like`;
			const options =
			{
				method: 'POST',
				body: JSON.stringify(newLike),
				headers:
				{
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				}
			};
			fetch(url, options)
				.then((res => res.json()
					.then(res => { console.log(res); this.getAllPost(); alert("Vous likez/dislikez la publication !");})
					.catch(error => console.log('error message: ', error))))
		},
	},
	mounted() {
		this.getAllPost();
	},
};
</script>

<style>
.create-post,.post, .admin__post {
	width: 90%;
	padding: 15px;
	margin: 15px 0;
	border: 1px solid #f1f1f1;
	background: #fff;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}
i{
	cursor:pointer;
}
textarea {
	width: 100%;
}
.post__data {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 5px;
	padding: 5px;
}

.writer {
	font-weight: bold;
}

.change {
	display: flex;
	flex-wrap: wrap;
	width: auto;
	justify-content: space-around;
}

.post__reaction {
	align-self: flex-end;
	align-items: baseline;
	padding: 5px;
}

.post__image {
	display: flex;
	flex-wrap: wrap;
	margin: 10px;
	overflow: hidden;
	flex-basis: auto;
}

main img {
	margin-left: auto;
	margin-right: auto;
	object-fit: cover;
	max-height: 100%;
	height: auto;
	max-width: 100%;
}
</style>