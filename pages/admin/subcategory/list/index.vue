<template>
  <div class="admin-content col-10 no-gutters">
    <div class="mx-5 mt-5">
      <h1 class="text-capitalize h3 text-body">{{ $t('subcategories') }}</h1>

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

        <subcategory-table
          :subcategories="$store.state.subcategory.subcategories"
          @delete-data="deleteData"
          @sort-data="sortData"
          @change-status="changeCategoryStatus"
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

import SubcategoryTable from '~/components/admin/tables/SubcategoryTable.vue'

export default {
  components: {
    PaginationNav,

    SubcategoryTable,
  },

  layout: 'admin',
  async created() {
    this.$store.dispatch('subcategory/paginationData', {
      page: this.$route.query.page,
    })
  },
  methods: {
    changePage(page) {
      this.$store.dispatch('subcategory/paginationData', {
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
      this.$store.dispatch('subcategory/paginationData', {
        page: this.$route.query.page,
        order: sort.order,
        orderBy: sort.orderBy,
      })
    },

    deleteData({ id }) {
    console.log(id);

    console.log("we will delete");
    this.$store.dispatch('subcategory/deleteData', id)
    },
    changeCategoryStatus({ id }) {
      console.log(id)
      this.$store.dispatch('subcategory/changeStatus', id)
    },

    search() {
      if (!this.$refs.search.value) {
        return
      }
      this.$store.dispatch('subcategory/search', this.$refs.search.value)
    },
  },
}
</script>

<style></style>
