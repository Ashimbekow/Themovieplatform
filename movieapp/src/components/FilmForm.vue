<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label for="title">Заголовок</label>
      <input v-model="localFilm.title" id="title" type="text" required />
    </div>
    <div class="form-group">
      <label for="year">Год</label>
      <input
        v-model.number="localFilm.year"
        id="year"
        type="number"
        min="1900"
        max="2099"
        required
      />
    </div>
    <div class="form-group">
      <label for="genre">Жанр</label>
      <input v-model="localFilm.genre" id="genre" type="text" required />
    </div>
    <div class="form-group">
      <label for="rating">Рейтинг</label>
      <input
        v-model.number="localFilm.rating"
        id="rating"
        type="number"
        step="0.1"
        min="1"
        max="10"
        required
      />
    </div>
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea
        v-model="localFilm.description"
        id="description"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="imageUrl">Ссылка на фото</label>
      <input v-model="localFilm.imageUrl" id="imageUrl" type="text" required />
    </div>
    <button type="submit" class="btn btn-primary">Опубликовать</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

interface Film {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  imageUrl: string;
}

export default defineComponent({
  props: {
    film: {
      type: Object as () => Film | null,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isEditMode = !!route.params.id;

    const localFilm = ref<Film>({
      id: 0,
      title: "",
      year: new Date().getFullYear(),
      genre: "",
      rating: 1,
      description: "",
      imageUrl: "",
    });

    watch(
      () => props.film,
      (newFilm) => {
        if (newFilm) {
          localFilm.value = { ...newFilm };
        }
      }
    );

    const submit = () => {
      if (isEditMode) {
        store.dispatch("updateFilm", localFilm.value);
      } else {
        const newFilm = { ...localFilm.value, id: Date.now() };
        store.dispatch("addFilm", newFilm);
      }
      router.push("/");
    };

    return {
      localFilm,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 5px solid #4b2d2d;
  border-radius: 10px;
  font-size: 20px;
}
</style>
