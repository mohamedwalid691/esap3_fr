<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">{{ $t('id') }}</th>

        <th scope="col ">{{ $t('imageEn') }}</th>
        <th scope="col ">{{ $t('imageAr') }}</th>

        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="slider in sliders" :key="slider.id">
        <th scope="row col-1">{{ slider.id }}</th>

        <td class="text-capitalize fw-500 col">
          <div class="slider-image">
            <img :src="imagePath(slider.image_en)" alt="" />
          </div>
        </td>
        <td class="text-capitalize fw-500 col">
          <div class="slider-image">
            <img :src="imagePath(slider.image_ar)" alt="" />
          </div>
        </td>

        <td class="d-flex flex-row align-items-center">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-slider-id-edit',
                params: {
                  id: slider.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link>
          <span
            @click="sliderId = slider.id"
            data-bs-toggle="modal"
            data-bs-target="#delete-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
          </span>


          <span
          v-if="slider.active == 1"
          @click="sliderId = slider.id"
          data-bs-toggle="modal"
          data-bs-target="#active-model"
          role="button"
          class="rounded-circle table-icon__circle bg-info mx-2"
        >
          <i class="fa fa-times text-white"></i>
        </span>
        <span
          v-else
          @click="sliderId = slider.id"
          data-bs-toggle="modal"
          data-bs-target="#active-model"
          role="button"
          class="rounded-circle table-icon__circle bg-info mx-2"
        >
          <i class="fa fa-check text-white"></i>
        </span>
          <delete-model @delete-data="deleteData" />

          <active-model @change-status="ChangeStatus" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ActiveModel from '../reusable/ActiveModel.vue'
import DeleteModel from '../reusable/DeleteModel.vue'
export default {
  components: { DeleteModel, ActiveModel },
  props: ['sliders'],

  methods: {
    imagePath(path) {
      return this.$store.state.filePath + path
    },
    deleteData() {
      this.$emit('delete-data', { id: this.sliderId })
    },
    ChangeStatus() {
      this.$emit('change-status', { id: this.sliderId })
    },
  },
  data() {
    return {
      sliderId: '',
    }
  },
}
</script>

<style scoped>
.slider-image {
  width: 300px;
}
.slider-image img {
  width: 100%;
  display: block;
}
</style>
