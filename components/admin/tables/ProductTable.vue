<template>
  <table class="table">
    <thead>
      <tr>
        <th role="button" @click="sortData('id')" scope="col ">
          {{ $t('id') }}
        </th>
        <th scope="col ">{{ $t('nameEn') }}</th>
        <th scope="col ">{{ $t('nameEn') }}</th>
        <th scope="col ">{{ $t('descriptionEn') }}</th>
        <th scope="col ">{{ $t('descriptionAr') }}</th>
        <th scope="col ">{{ $t('price') }}</th>
        <th scope="col ">{{ $t('salePrice') }}</th>
        <th scope="col ">{{ $t('sock') }}</th>
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <th scope="row col-1">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-product-id-color',
                params: {
                  id: product.id,
                },
              })
            "
            >{{ product.id }}</nuxt-link
          >
        </th>

        <td class="fw-500 col text-capitalize">{{ product.name_en }}</td>

        <td class="text-capitalize fw-500 col">{{ product.name_ar }}</td>

        <td class="fw-500 col-2 text-capitalize over-flow">
          {{ product.description_en }}
        </td>
        <td class="fw-500 col-2 text-capitalize over-flow">
          {{ product.description_ar }}
        </td>
        <td class="text-capitalize fw-500 col">{{ product.price }}</td>
        <td class="text-capitalize fw-500 col">{{ product.sale_price }}</td>
        <td class="text-capitalize fw-500 col">{{ product.stock }}</td>

        <td class="d-flex flex-row align-items-center">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-product-id-edit',
                params: {
                  id: product.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link>
          <span
            @click="deletedId = product.id"
            data-bs-toggle="modal"
            data-bs-target="#delete-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
          </span>
          <delete-model @delete-data="deleteData" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DeleteModel from '../reusable/DeleteModel.vue'
export default {
  components: { DeleteModel },
  props: ['products'],

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
      this.$emit('delete-data', { id: this.deletedId })
    },
  },
  data() {
    return {
      deletedId: '',
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
</style>
