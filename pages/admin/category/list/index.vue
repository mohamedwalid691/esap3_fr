<template>
  <div class="admin-content col-10 no-gutters">
    <div class="mx-5 mt-5">
      <h1 class="text-capitalize h3 text-body">{{ $t('categories') }}</h1>

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

        <category-table
          :categories="$store.state.category.categories"
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
import CategoryTable from '~/components/admin/tables/CategoryTable.vue'

export default {
  components: {
    PaginationNav,
    CategoryTable,
  },

  layout: 'admin',
  async created() {
    this.$store.dispatch('category/paginationData', {
      page: this.$route.query.page,
    })
  },
  methods: {
    changePage(page) {
      this.$store.dispatch('category/paginationData', {
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
      this.$store.dispatch('category/paginationData', {
        page: this.$route.query.page,
        order: sort.order,
        orderBy: sort.orderBy,
      })
    },
    changeCategoryStatus({ id }) {
      console.log(id);
      this.$store.dispatch('category/changeStatus', id)
    },

    deleteData({ id }) {
      this.$store.dispatch('category/deleteData', id)
    },
    search() {
      if (!this.$refs.search.value) {
        return
      }
      this.$store.dispatch('category/search', this.$refs.search.value)
    },
  },
}
</script>

<style></style>
