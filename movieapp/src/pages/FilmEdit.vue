<template>
  <div>
    <h1>{{ isEditMode ? "Редактировать фильм" : "Опубликовать фильм" }}</h1>
    <FilmForm :film="film" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import FilmForm from "../components/FilmForm.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { FilmForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isEditMode = computed(() => !!route.params.id);

    const film = computed(() => {
      if (isEditMode.value) {
        return store.getters.getFilmById(Number(route.params.id));
      }
      return null;
    });

    return {
      isEditMode,
      film,
    };
  },
});
</script>

<style scoped lang="scss">
/**/
</style>
