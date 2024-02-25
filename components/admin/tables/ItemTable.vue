<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col ">{{ $t('id') }}</th>
        <th scope="col ">{{ $t('productName') }}</th>

        <th scope="col ">{{ $t('price') }}</th>
        <th scope="col ">{{ $t('quantity') }}</th>
        <th scope="col ">{{ $t('realQuantity') }}</th>
        <th scope="col ">{{ $t('change') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row col-1">{{ item.id }}</th>
        <td class="fw-500 text-capitalize col">
          {{ item.product_name }}
        </td>

        <td class="text-capitalize fw-500 col">{{ item.price }}</td>
        <td class="text-capitalize fw-500 col">{{ item.quantity }}</td>
        <td class="text-capitalize fw-500 col">{{ item.real_quantity }}</td>
        <td
          class="text-capitalize fw-500 col text-primary"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#replace-item"
          @click="openReplaceItemBox(item.id)"
        >
          replace
        </td>
        <replace-item @replace-item="replaceItem" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import DeleteModel from '../reusable/DeleteModel.vue'

import ReplaceItem from '../reusable/ReplaceItem.vue'
export default {
  components: { DeleteModel, ReplaceItem },
  props: ['items'],
  methods: {
    async openReplaceItemBox(id) {
      this.itemId = id
      // await this.$store.dispatch('item/get')
    },
    showState(action) {
      const hasPermission = this.$store.state.roles.find(
        (ro) => ro.name_en == action
      )

      if (hasPermission) return true
      else return false
    },
    replaceItem({ quantity }) {
      this.$emit('replace-item', { quantity, id: this.itemId })
    },
  },

  data() {
    return {
      deletedId: '',
      action: false,
      itemId: '',
    }
  },
}
</script>

<style scoped>
.color-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
