<template>
  <div class="admin-content col-10 no-gutters">
    <product-nav :id="$route.params.id" />

    <div class="mx-5 mt-5">
      <h1 class="text-capitalize h3 text-body">{{ $t('productColorSize') }}</h1>

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

        <product-color-size-table
          :colorsSizes="$store.state.product.productColorsSizes"
          @delete-data="deleteData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaginationNav from '~/components/admin/reusable/PaginationNav.vue'
import ProductNav from '~/components/admin/reusable/ProductNav.vue'
import ProductColorSizeTable from '~/components/admin/tables/ProductColorSizeTable.vue'

export default {
  components: {
    PaginationNav,

    ProductColorSizeTable,
    ProductNav,
  },

  layout: 'admin',
  async created() {
    this.$store.dispatch('product/productPaginationData', {
      page: this.$route.query.page,
      type: 'color/size',
      id: this.$route.params.id,
    })
  },
  methods: {
    deleteData({ id }) {
      this.$store.dispatch('product/deleteProductData', {
        type: 'color/size',
        productId: this.$route.params.id,
        colorSizeId: id,
      })
    },
  },
}
</script>

<style></style>
