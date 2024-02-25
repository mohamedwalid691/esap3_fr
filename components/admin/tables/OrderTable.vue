<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col " role="button" @click="sortData('id')">
          {{ $t('id') }}
        </th>
        <th scope="col ">{{ $t('subtotal') }}</th>
        <th scope="col ">{{ $t('couponAmount') }}</th>
        <th scope="col ">{{ $t('deliveryFees') }}</th>
        <th scope="col ">{{ $t('total') }}</th>
        <th scope="col-3 ">
          <div class="dropdown">
            <span
              class="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $t('status') }}
            </span>
            <ul class="dropdown-menu">
              <li @click="changeStatus(5, 'All')" role="button">
                <span
                  :class="statusSelected == 'All' ? 'bg-primary' : ''"
                  class="dropdown-item"
                  >{{ $t('All') }}</span
                >
              </li>
              <li @click="changeStatus(0, 'Cancelled')" role="button">
                <span
                  :class="statusSelected == 'Cancelled' ? 'bg-primary' : ''"
                  class="dropdown-item"
                  >{{ $t('Cancelled') }}</span
                >
              </li>
              <li @click="changeStatus(1, 'Placed')" role="button">
                <span
                  :class="statusSelected == 'Placed' ? 'bg-primary' : ''"
                  class="dropdown-item"
                  >{{ $t('Placed') }}</span
                >
              </li>
              <li @click="changeStatus(2, 'out to delivery')" role="button">
                <span
                  :class="
                    statusSelected == 'out to delivery' ? 'bg-primary' : ''
                  "
                  class="dropdown-item"
                  >{{ $t('out to delivery') }}</span
                >
              </li>
              <li @click="changeStatus(3, 'Delivered')" role="button">
                <span
                  :class="statusSelected == 'Delivered' ? 'bg-primary' : ''"
                  class="dropdown-item"
                  >{{ $t('Delivered') }}</span
                >
              </li>
            </ul>
          </div>
        </th>
        <th scope="col ">{{ $t('user') }}</th>

        <th scope="col ">{{ $t('orderTime') }}</th>

        <!-- <th scope="col ">{{ $t('paymentMethod') }}</th>
        <th scope="col ">{{ $t('isPaid') }}</th> -->
        <th scope="col ">{{ $t('address') }}</th>
        <th scope="col ">{{ $t('items') }}</th>
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <th scope="row col">{{ order.id }}</th>

        <td class="fw-500 text-capitalize col">{{ order.subtotal }}</td>
        <td class="fw-500 text-capitalize col">{{ order.coupon_amount }}</td>
        <td class="fw-500 text-capitalize col">{{ order.delivery_fees }}</td>
        <td class="fw-500 text-capitalize col">{{ order.total }}</td>

        <td class="fw-500 text-capitalize col-3">
          <span
            v-if="order.status == 0"
            class="text-white bg-danger px-1 py-1 rounded"
            >{{ orderStatus(order.status) }}</span
          >
          <span
            v-else-if="order.status == 1"
            class="text-white bg-primary px-1 py-1 rounded"
            >{{ orderStatus(order.status) }}</span
          >
          <span
            v-else-if="order.status == 2"
            class="text-white bg-success px-1 py-1 rounded"
            >{{ orderStatus(order.status) }}</span
          >
          <span
            v-else-if="order.status == 3"
            class="text-white bg-success px-1 py-1 rounded"
            >{{ orderStatus(order.status) }}</span
          >
        </td>

        <td class="fw-500 text-capitalize col">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-user-id-single-customer',
                params: {
                  id: order.user_id,
                },
              })
            "
          >
            {{ order.user_name }}</nuxt-link
          >
        </td>
        <td class="fw-500 text-capitalize col">{{ order.created_at }}</td>
        <!-- 
        <td class="text-capitalize fw-500 col">{{ order.payment_method }}</td>
        <td class="text-capitalize fw-500 col">
          {{ order.is_paid == 1 ? 'yes' : 'no' }}
        </td> -->
        <td class="fw-500 col text-capitalize">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-order-id-address',
                params: {
                  id: order.address_id,
                },
              })
            "
          >
            address</nuxt-link
          >
        </td>

        <td class="fw-500 text-capitalize col">
          <nuxt-link
            :to="
              localePath({
                name: 'admin-order-id-item',
                params: {
                  id: order.id,
                },
                query: {
                  page: 1,
                },
              })
            "
            >items</nuxt-link
          >
        </td>

        <td class="d-flex flex-row align-items-center">
          <span
            v-if="order.status > 1 && order.status != 0"
            class="rounded-circle table-icon__circle bg-info mx-2"
          >
            <span
              role="button"
              @click="changeData('false', order.id)"
              data-bs-toggle="modal"
              data-bs-target="#update-model"
            >
              <i class="fas fa-angle-left"></i>
            </span>
          </span>

          <span
            @click="changeData('delete', order.id)"
            data-bs-toggle="modal"
            data-bs-target="#cancel-model"
            role="button"
            class="rounded-circle table-icon__circle bg-danger mx-2"
          >
            <i class="far fa-trash-alt text-white"></i>
          </span>
          <span
            v-if="order.status != 0 && order.status < 3"
            class="rounded-circle table-icon__circle bg-primary mx-2"
          >
            <span
              @click="changeData('true', order.id)"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#update-model"
            >
              <i class="fas fa-angle-right"></i>
            </span>
          </span>

          <cancel-order @delete-data="updateOrder" />

          <update-order-model @update-item="updateOrder" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CancelOrder from '../reusable/CancelOrder.vue'
import UpdateOrderModel from '../reusable/UpdateOrderModel.vue'

export default {
  components: { CancelOrder, UpdateOrderModel },
  props: ['orders'],
  methods: {
    orderStatus(orderStatus) {
      if (orderStatus == 0) {
        return 'Cancelled'
      } else if (orderStatus == 1) {
        return 'Placed'
      } else if (orderStatus == 2) {
        return 'out to delivery'
      } else if (orderStatus == 3) {
        return 'Delivered'
      }
    },
    sortData(orderBy) {
      if (this.$route.query.orderBy) {
        if (this.$route.query.orderBy == orderBy) {
          if (this.$route.query.order == 'desc') {
            this.$emit('sort-data', { orderBy, order: 'asc' })
          } else {
            this.$emit('sort-data', { orderBy, order: 'desc' })
          }
        } else {
          this.$emit('sort-data', { orderBy, order: 'asc' })
        }
      } else {
        this.$emit('sort-data', { orderBy, order: 'desc' })
      }
    },

    deleteData() {
      this.$emit('delete-data', { id: this.deletedId })
    },
    changeStatus(status, statusName) {
      this.statusSelected = statusName
      this.$emit('change-sort', status)
    },
    changeData(action, id) {
      this.action = action
      this.orderId = id
    },

    updateOrder() {
      this.$emit('update-order', { id: this.orderId, action: this.action })
    },
    cancelOrderItem() {
      this.$emit('delete-data', { id: this.deletedId })
    },
  },
  data() {
    return {
      deletedId: '',
      action: false,
      orderId: '',
      statusSelected: 'All',
    }
  },
}
</script>

<style></style>
