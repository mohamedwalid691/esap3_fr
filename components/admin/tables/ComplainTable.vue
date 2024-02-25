<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">{{ $t('id') }}</th>
        <th scope="col ">{{ $t('orderId') }}</th>
        <th scope="col ">{{ $t('user') }}</th>
        <th scope="col ">{{ $t('status') }}</th>
        <th scope="col ">{{ $t('mainIssue') }}</th>
        <th scope="col ">{{ $t('check') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="complain in complains" :key="complain.id">
        <th scope="row col-1">{{ complain.id }}</th>
        <td class="fw-500 col text-capitalize">{{ complain.order_id }}</td>
        <td class="fw-500 col text-capitalize">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-product-id-color',
                params: {
                  id: complain.user_id,
                },
              })
            "
          >
            {{ complain.email }}</nuxt-link
          >
        </td>
        <td class="text-capitalize fw-500 col">
          <span
            v-if="complain.is_closed == 0"
            class="text-white bg-danger px-1 py-1 rounded"
            >open</span
          >
          <span v-else class="text-white bg-primary px-1 py-1 rounded"
            >closed</span
          >
        </td>
        <td class="fw-500 col text-capitalize">{{ complain.main_issue }}</td>
       

        <td class="fw-500 col text-capitalize">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-complain-complainId-answer',
                params: {
                  complainId: complain.id,
                },
              })
            "
          >
            check</nuxt-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DeleteModel from '../reusable/DeleteModel.vue'
export default {
  components: { DeleteModel },
  props: ['complains'],

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

<style scoped></style>
