<template>
  <div class="admin-content col-10 no-gutters">
    <div class="mx-5 mt-5">
      <h1 class="text-capitalize h3 text-body">{{ $t('sliders') }}</h1>

      <div class="rder bg-white rounded shadow-sm px-2 py-2 mt-4">
        <slider-table
          :sliders="$store.state.slider.sliders"
          @delete-data="deleteData"
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

import SliderTable from '~/components/admin/tables/SliderTable.vue'

export default {
  components: {
    PaginationNav,

    SliderTable,
  },

  layout: 'admin',
  async created() {
    this.$store.dispatch('slider/paginationData',this.$route.query.page)
  },
  methods: {
    changePage(page) {
      this.$store.dispatch('slider/paginationData', page)
    },

    deleteData({ id }) {
      this.$store.dispatch('slider/deleteData', id)
    },
  },
}
</script>

<style></style>
