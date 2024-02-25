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
        <th scope="col ">{{ $t('category') }}</th>
        <!-- <th scope="col ">{{ $t('order') }}</th> -->
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="subcategory in subcategories" :key="subcategory.id">
        <th scope="row col-1">{{ subcategory.id }}</th>
        <td class="fw-500 col text-capitalize">{{ subcategory.name_en }}</td>

        <td class="text-capitalize fw-500 col">{{ subcategory.name_ar }}</td>
        <td class="text-capitalize fw-500 col">
          <img :src="imagePath(subcategory.image_en)" alt="" />
        </td>
        <td class="text-capitalize fw-500 col">
          <img :src="imagePath(subcategory.image_ar)" alt="" />
        </td>
        <td class="text-capitalize fw-500 col">{{ subcategory.category_name }}</td>
        <td class="d-flex flex-row align-items-center">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-subcategory-id-edit',
                params: {
                  id: subcategory.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link>
          <span
            @click="subcategoryId = subcategory.id"
            data-bs-toggle="modal"
            data-bs-target="#delete-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
          </span>

          <span
            v-if="subcategory.active == 1"
            @click="subcategoryId = subcategory.id"
            data-bs-toggle="modal"
            data-bs-target="#active-model"
            role="button"
            class="rounded-circle table-icon__circle bg-info mx-2"
          >
            <i class="fa fa-times text-white"></i>
          </span>
          <span
            v-else
            @click="subcategoryId = subcategory.id"
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
  props: ['subcategories'],

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
      console.log(this.subcategoryId);
      this.$emit('delete-data', { id: this.subcategoryId })
    },

    ChangeStatus() {
      console.log("we will change status");
      this.$emit('change-status', { id: this.subcategoryId })
    },
  },
  data() {
    return {
      subcategoryId: '',
      order: 'desc',
    }
  },
}
</script>

<style scoped>
img {
  height: 120px;
  display: block;
}
.color-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
