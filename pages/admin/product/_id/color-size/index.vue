<template>
  <div class="admin-content col-10 no-gutters">
    <product-nav :id="$route.params.id" />

    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('productColorSize') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="addProductColorSize"
          type="button"
          class="btn btn-dark mx-5 text-capitalize"
        >
          {{ $t('publish') }}
        </button>
      </div>
      <div class="mt-4 row">
        <div class="col-8">
          <div class="h-fit border bg-white rounded shadow-sm p-3 mb-4">
            <h6 class="text-capitalize">{{ $t('basicInformation') }}</h6>

            <div class="d-flex flex-row justify-content-between">
              <dash-input
                :errValue="$store.state.reusable.errArr"
                :label="$t('price')"
                name="price"
                :value="$store.state.product.price"
                width="w-40 mx-2"
                @change-value="changeValue"
                backName="price"
                type="number"
              />

              <dash-input
                :errValue="$store.state.reusable.errArr"
                :label="$t('salePrice')"
                name="salePrice"
                :value="$store.state.product.salePrice"
                width="w-40 mx-2"
                @change-value="changeValue"
                backName="sale_price"
                type="number"
              />
            </div>

            <div class="d-flex flex-row justify-content-between">
              <dash-input
                :errValue="$store.state.reusable.errArr"
                :label="$t('stock')"
                name="stock"
                :value="$store.state.product.stock"
                width="w-30 mx-2"
                @change-value="changeValue"
                backName="stock"
                type="number"
              />
            </div>
          </div>
        </div>

        <div class="col-3 ms-5">
          <div class="mt-3 bg-white rounded shadow-sm p-3">
            <multi-selection
              :all="$store.state.product.allColors"
              className="mx-2 w-100"
              :label="$t('selectColor')" name="color_name_en"
              :value="$store.state.product.colorName"
              @change-value="changeSelection"
              selectionName="color"
            />
          </div>

          <div class="mt-3 bg-white rounded shadow-sm p-3 mt-5">
            <multi-selection
              :all="$store.state.product.allSizes"
              className="mx-2 w-100"
              :label="$t('selectSize')"
              :value="$store.state.product.sizeName"
              @change-value="changeSelection"
              selectionName="size"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductNav from '~/components/admin/reusable/ProductNav.vue'
import DashInput from '~/components/reusable/DashInput.vue'
import MultiSelection from '~/components/reusable/MultiSelection.vue'

import UploadFileInput from '~/components/reusable/UploadFileInput.vue'

export default {
  components: {
    DashInput,

    MultiSelection,
    UploadFileInput,
    ProductNav,
  },
  async created() {
    await this.$store.dispatch('product/getData', {
      type: 'color',
      productId: this.$route.params.id,
    })
    await this.$store.dispatch('product/getData', {
      type: 'size',
      productId: this.$route.params.id,
    })
  },

  methods: {
    changeSelection({ data, name, id }) {
      this.$store.state.product[`${name}Name`] = data
      this.$store.state.product[`${name}Id`] = id
    },
    async addProductColorSize() {
      await this.$store.dispatch('product/addData', {
        type: 'color-size',
        productId: this.$route.params.id,
      })
    },

    changeValue(e) {
      this.$store.state.product[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
  },

  layout: 'admin',
}
</script>

<style></style>
