<template>
  <div>
    <h1>Коллекция фильмов</h1>
    <router-link to="/add" class="addmovie">Добавить фильм</router-link>
    <div class="film-list">
      <FilmCard v-for="film in films" :key="film.id" :film="film" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import FilmCard from "../components/FilmCard.vue";

export default defineComponent({
  name: "FilmDashboard", // измените имя компонента
  components: { FilmCard },
  setup() {
    const store = useStore();
    const films = computed(() => store.state.films);

    return {
      films,
    };
  },
});
</script>

<style scoped lang="scss">
.addmovie {
  background-color: blue;
}
.film-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
