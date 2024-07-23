<template>
  <div v-if="film">
    <h1>{{ film.Заголовок }}</h1>
    <img :src="film.imageUrl" alt="Film Image" class="film-image" />
    <p><strong>Год:</strong> {{ film.year }}</p>
    <p><strong>Жанр:</strong> {{ film.genre }}</p>
    <p><strong>Рейтинг:</strong> {{ film.rating }}</p>
    <p><strong>Описание:</strong> {{ film.description }}</p>
    <router-link :to="`/edit/${film.id}`" class="btn btn-warning"
      >Изменить</router-link
    >
    <button @click="handleDelete" class="btn btn-danger">Удалить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const film = computed(() => {
      return store.getters.getFilmById(Number(route.params.id));
    });

    const handleDelete = () => {
      if (film.value && confirm("Are you sure you want to delete this film?")) {
        store.dispatch("deleteFilm", film.value.id);
        router.push("/");
      }
    };

    return {
      film,
      handleDelete,
    };
  },
});
</script>

<style scoped lang="scss">
.film-image {
  width: 100%;
  height: auto;
}
</style>
