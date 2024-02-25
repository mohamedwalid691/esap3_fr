<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">id</th>
        <th scope="col ">name</th>
        <th scope="col ">email</th>
        <th scope="col ">mobile</th>

        <th scope="col ">change</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
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

        <td class="d-flex flex-row align-items-center">
          <span
            v-if="customer.active == 0"
            @click="changeData(1, customer.id)"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#update-model"
            class="rounded-circle table-icon__circle bg-success mx-2"
          >
            <i class="fa fa-check text-white"></i>
          </span>
          <span
            v-else
            @click="changeData(0, customer.id)"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#update-model"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="fa fa-ban text-white"></i>
          </span>
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
  props: ['customers'],
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
