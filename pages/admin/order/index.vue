<template>
  <div class="admin-content col-10 no-gutters">
    <div class="mx-5 mt-5">
      <h1 class="text-capitalize h3 text-body">{{ $t('products') }}</h1>

      <div class="rder bg-white rounded shadow-sm px-2 py-2 mt-4">
        <div class="d-flex flex-row justify-content-between">
          <h2 class="h4 text-muted text-capitalize m-2">{{ $t('search') }}</h2>
          <form class="d-flex" @submit.prevent="search">
            <input
              ref="search"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <order-table
          :orders="$store.state.order.orders"
          @delete-data="deleteData"
          @update-order="changeOrderStatus"
          @sort-data="sortData"
        />

        <pagination-nav
          :links="$store.state.reusable.links"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaginationNav from '~/components/admin/reusable/PaginationNav.vue'
import OrderTable from '~/components/admin/tables/OrderTable.vue'

export default {
  components: {
    PaginationNav,
    OrderTable,
  },

  layout: 'admin',
  async created() {
    this.$store.dispatch('order/paginationData', {
      page: this.$route.query.page,
    })
  },
  methods: {
    changePage(page) {
      this.$store.dispatch('order/paginationData', {
        page: page,
        order: this.$route.query.order,
        orderBy: this.$route.query.orderBy,
      })
    },
    sortData(sort) {
      this.$router.push(
        this.localePath({
          name: `${this.$route.name.replace('___en', '')}`,
          query: {
            page: this.$route.query.page,
            order: sort.order,
            orderBy: sort.orderBy,
          },
        })
      )
      this.$store.dispatch('order/paginationData', {
        page: this.$route.query.page,
        order: sort.order,
        orderBy: sort.orderBy,
      })
    },
    changeOrderStatus({ id, action }) {
      console.log(id, action)
      this.$store.dispatch('order/update', { id, action })
    },

    search() {
      if (!this.$refs.search.value) {
        return
      }
      this.$store.dispatch('order/search', this.$refs.search.value)
    },
    deleteData({ id }) {
      this.$store.dispatch('order/deleteData', id)
    },
    search() {
      if (!this.$refs.search.value) {
        return
      }
      this.$store.dispatch('order/search', this.$refs.search.value)
    },
  },
}
</script>

<style></style>
