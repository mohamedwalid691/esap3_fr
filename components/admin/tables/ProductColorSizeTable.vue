<template>
  <table class="table">
    <thead>
      <tr>
        <th role="button" @click="sortData('id')" scope="col ">
          {{ $t('id') }}
        </th>
        <th scope="col ">{{ $t('colorName') }}</th>
        <th scope="col ">{{ $t('sizeName') }}</th>

        <th scope="col ">{{ $t('price') }}</th>
        <th scope="col ">{{ $t('salePrice') }}</th>
        <th scope="col ">{{ $t('stock') }}</th>
        <!-- <th scope="col ">{{ $t('order') }}</th> -->
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="colorSize in colorsSizes" :key="colorSize.id">
        <th scope="row col-1">{{ colorSize.id }}</th>
        <td class="fw-500 col text-capitalize">{{ colorSize.color_name }}</td>

        <td class="text-capitalize fw-500 col">{{ colorSize.size_name }}</td>

        <td class="text-capitalize fw-500 col">{{ colorSize.price }}</td>
        <td class="text-capitalize fw-500 col">{{ colorSize.sale_price }}</td>
        <td class="text-capitalize fw-500 col">{{ colorSize.stock }}</td>
        <td class="d-flex flex-row align-items-center">
          <!-- <nuxt-link
            :to="
              localePath({
                name: 'admin-color-id-edit',
                params: {
                  id: colorSize.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link> -->

          <span
            @click="colorSizeId = colorSize.id"
            data-bs-toggle="modal"
            data-bs-target="#delete-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
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
  props: ['colorsSizes'],

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

    deleteData() {
      this.$emit('delete-data', { id: this.colorSizeId })
    },

    ChangeStatus() {
      this.$emit('change-status', { id: this.colorSizeId })
    },
  },
  data() {
    return {
      colorSizeId: '',
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
