<template>
  <table class="table">
    <thead>
      <tr>
        <th role="button" @click="sortData('id')" scope="col ">
          {{ $t('id') }}
        </th>
        <th scope="col ">{{ $t('nameEn') }}</th>
        <th scope="col ">{{ $t('nameAr') }}</th>

        <th scope="col ">{{ $t('price') }}</th>
        <th scope="col ">{{ $t('salePrice') }}</th>
        <th scope="col ">{{ $t('stock') }}</th>
        <!-- <th scope="col ">{{ $t('order') }}</th> -->
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="size in sizes" :key="size.id">
        <th scope="row col-1">{{ size.id }}</th>
        <td class="fw-500 col text-capitalize">{{ size.name_en }}</td>

        <td class="text-capitalize fw-500 col">{{ size.name_ar }}</td>

        <td class="text-capitalize fw-500 col">{{ size.price }}</td>
        <td class="text-capitalize fw-500 col">{{ size.sale_price }}</td>
        <td class="text-capitalize fw-500 col">{{ size.stock }}</td>
        <td class="d-flex flex-row align-items-center">
          <!-- <nuxt-link
            :to="
              localePath({
                name: 'admin-color-id-edit',
                params: {
                  id: size.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link> -->

          <span
            @click="sizeId = size.id"
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
  props: ['sizes'],

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
      this.$emit('delete-data', { id: this.sizeId })
    },

    ChangeStatus() {
      this.$emit('change-status', { id: this.sizeId })
    },
  },
  data() {
    return {
      sizeId: '',
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
