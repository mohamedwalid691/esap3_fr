<template>
  <div class="admin-content col-10 no-gutters">
    <product-nav :id="$route.params.id" />

    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('productColor') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="addProductColor"
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

            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('nameEn')"
              name="nameEn"
              :value="$store.state.product.nameEn"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="name_en"
            />

            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('nameAr')"
              name="nameAr"
              :value="$store.state.product.nameAr"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="name_ar"
            />

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

              <div>


                <label for="exampleColorInput" class="form-label"
                >Choose your color</label
              >
              <input
                type="color"
                class="form-control form-control-color"
                id="exampleColorInput"
                v-model="$store.state.product.color"
                title="Choose your color"
              />
              </div>
             
            </div>
          </div>
        </div>
        <div class="col-3 ms-5">
          <div class="border bg-white rounded shadow-sm p-3">
            <upload-file-input
              label="image"
              name="image"
              @change-value="changeFile"
              :multiple="true"
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
  // validate({ params, query, store }) {

  //   const hasPermission = store.state.roles.find(ro => ro.name_en == 'add category');
  //   console.log(hasPermission);
  //   if (hasPermission)
  //     return true
  //   else return false
  // },
 
  methods: {
   
    async addProductColor() {
      await this.$store.dispatch('product/addData', {
        type: 'color',
        productId: this.$route.params.id,
      })
    },

    changeValue(e) {
      this.$store.state.product[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
    changeFile({ data, name }) {
      this.$store.commit('product/addImageToList', data)
    },
  },

  layout: 'admin',
}
</script>

<style></style>
