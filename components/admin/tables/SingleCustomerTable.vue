<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">id</th>
        <th scope="col ">name</th>
        <th scope="col ">email</th>
        <th scope="col ">mobile</th>

     
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row col-1">{{ customer.id }}</th>
        <td class="fw-500 text-capitalize col">
          {{ customer.name }}
        </td>
        <td class="text-capitalize fw-500 col">
          {{ customer.email }}
        </td>
        <td class="fw-500 text-capitalize col">
          {{ customer.mobile }}
        </td>

        
      </tr>

      <update-order-model
        @update-item="activeCustomer"
        message="Are you sure you want to change customer status"
      />
    </tbody>
  </table>
</template>

<script>
import UpdateOrderModel from '../reusable/UpdateOrderModel.vue'
export default {
  components: { UpdateOrderModel },
  props: ['customer'],
  methods: {
    changeData(active, customerId) {
      this.customerId = customerId
      this.status = active
    },
    activeCustomer() {
      this.$emit('active-customer', {
        customerId: this.customerId,
        active: this.status,
      })
    },
  },

  data() {
    return {
      customerId: '',
      status: false,
    }
  },
}
</script>

<style></style>
