<template>
  <div class="film-card">
    <img :src="film.imageUrl" alt="Film Image" class="film-image" />
    <h2>{{ film.Заголовок }}</h2>
    <p><strong>Год:</strong> {{ film.year }}</p>
    <p><strong>Рейтинг:</strong> {{ film.rating }}</p>
    <router-link :to="`/edit/${film.id}`" class="btn btn-warning"
      >Изменить</router-link
    >
    <button @click="handleDelete" class="btn btn-danger">Удалить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const handleDelete = () => {
      if (confirm("Are you sure you want to delete this film?")) {
        store.dispatch("deleteFilm", props.film.id);
        router.push("/");
      }
    };

    return {
      handleDelete,
    };
  },
});
</script>

<style scoped lang="scss">
.film-card {
  border: 5px solid #ccc;
  $padding: 26px;
  max-width: 700px;
  box-shadow: 0 7px 10px rgba(233, 9, 9, 0.1);
  text-align: center;

  .film-image {
    width: 100%;
    height: auto;
  }
}
</style>
