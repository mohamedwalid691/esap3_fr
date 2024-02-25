<template>
  <div class="admin-content col-10 no-gutters">
    <product-nav :id="$route.params.id" />

    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('images') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="addImages"
          type="button"
          class="btn btn-dark mx-5 text-capitalize"
        >
          publish
        </button>
      </div>
      <div class="mt-4 row">
        <div class="my-3">
          <label for="formFileMultiple" class="form-label"
            >upload new images</label
          >
          <input
            @input="selectImage"
            class="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div class="border bg-white rounded shadow-sm p-3 mt-4 row g-0">
          <div
            class="card mt-4 col-md-4"
            v-for="image in $store.state.product.productImages"
            :key="image"
          >
            <img :src="imagePath(image)" class="card-img-top" alt="..." />
            <div class="card-body"></div>
            <i
              @click="imageLocation = image"
              class="fas fa-times-circle delete-image text-danger"
              data-bs-toggle="modal"
              data-bs-target="#delete-model"
              role="button"
            ></i>
            <delete-model @delete-data="deleteImage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteModel from '~/components/admin/reusable/DeleteModel.vue'
import ProductNav from '~/components/admin/reusable/ProductNav.vue'

import SelectionList from '~/components/reusable/SelectionList.vue'

export default {
  components: {
    SelectionList,
    ProductNav,
    DeleteModel,
  },

  async created() {
    await this.$store.dispatch('product/getImages', this.$route.params.id)
  },
  methods: {
    async addImages() {
      await this.$store.dispatch(
        'product/addImages',

        this.$route.params.id
      )
    },
    selectImage(va) {
      this.$store.commit('product/addImageToList', va)
    },
    imagePath(path) {
      return this.$store.state.filePath + path
    },

    async deleteImage() {
      await this.$store.dispatch('product/deleteImage', {
        imagePath: this.imageLocation,
        productId: this.$route.params.id,
      })
    },
  },
  data() {
    return {
      imageLocation: '',
    }
  },

  layout: 'admin',
}
</script>

<style scoped>
.delete-image {
  position: absolute;
  font-size: 2rem;
  left: 10px;
  top: 10px;
}
</style>
