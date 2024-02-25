<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">{{ $t('id') }}</th>
        <th scope="col ">{{ $t('name') }}</th>
        <th scope="col ">{{ $t('amount') }}</th>
        <th scope="col ">{{ $t('min_order') }}</th>
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in coupons" :key="coupon.id">
        <th scope="row col-1">{{ coupon.id }}</th>
        <td class="fw-500 col-6 text-capitalize">{{ coupon.name }}</td>

        <td class="text-capitalize fw-500 col">{{ coupon.amount }}</td>
        <td class="text-capitalize fw-500 col">{{ coupon.min_order }}</td>
        <td class="d-flex flex-row align-items-center">
          <nuxt-link
          
            :to="
              localePath({
                name: 'admin-coupon-id-edit',
                params: {
                  id: coupon.id,
                },
              })
            "
            role="button"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <i class="fas fa-edit text-white"></i>
          </nuxt-link>
          <span
       
            @click="deletedId = coupon.id"
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
  props: ['coupons'],

  methods: {
   
    deleteData() {
      this.$emit('delete-data', { id: this.deletedId })
    },
  },
  data() {
    return {
      deletedId: '',
    }
  },
}
</script>

<style></style>
