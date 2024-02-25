<template>
  <table class="table">
    <thead>
      <tr>
        <th role="button" @click="sortData('id')" scope="col ">
          {{ $t('id') }}
        </th>
        <th scope="col ">{{ $t('nameEn') }}</th>
        <th scope="col ">{{ $t('nameAr') }}</th>
        <th scope="col ">{{ $t('imageEn') }}</th>
        <th scope="col ">{{ $t('imageAr') }}</th>
        <!-- <th scope="col ">{{ $t('order') }}</th> -->
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.id">
        <th scope="row col-1">{{ category.id }}</th>
        <td class="fw-500 col text-capitalize">{{ category.name_en }}</td>

        <td class="text-capitalize fw-500 col">{{ category.name_ar }}</td>
        <td class="text-capitalize fw-500 col">
          <img :src="imagePath(category.image_en)" alt="" />
        </td>
        <td class="text-capitalize fw-500 col">
          <img :src="imagePath(category.image_ar)" alt="" />
        </td>
        <td class="d-flex flex-row align-items-center">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-category-id-edit',
                params: {
                  id: category.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link>

          <span
            @click="categoryId = category.id"
            data-bs-toggle="modal"
            data-bs-target="#delete-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
          </span>
          <span
            v-if="category.active == 1"
            @click="categoryId = category.id"
            data-bs-toggle="modal"
            data-bs-target="#active-model"
            role="button"
            class="rounded-circle table-icon__circle bg-info mx-2"
          >
            <i class="fa fa-times text-white"></i>
          </span>
          <span
            v-else
            @click="categoryId = category.id"
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
  props: ['categories'],

  methods: {
    sortData(orderBy) {
      if (this.$route.query.orderBy) {
        if (this.$route.query.orderBy == orderBy) {
          if (this.$route.query.order == 'desc') {
            this.$emit('sort-data', { orderBy, order: 'asc' })
          } else {
            this.$emit('sort-data', { orderBy, order: 'desc' })
          }
        }
      } else {
        this.$emit('sort-data', { orderBy, order: 'desc' })
      }
    },
    imagePath(path) {
      return this.$store.state.filePath + path
    },
    deleteData() {
      this.$emit('delete-data', { id: this.categoryId })
    },

    ChangeStatus() {
      this.$emit('change-status', { id: this.categoryId })
    },
  },
  data() {
    return {
      categoryId: '',
      order: 'desc',
    }
  },
}
</script>

<style scoped>
img {
  height: 100px;
  display: block;
}
</style>
