<template>
  <div class="admin-content col-10 no-gutters">
    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('edit') }} {{ $t('product') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="updateProduct"
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
            <reusable-text-area
              :errValue="$store.state.reusable.errArr"
              :label="$t('descriptionEn')"
              name="descriptionEn"
              :value="$store.state.product.descriptionEn"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="description_en"
            />
            <reusable-text-area
              :errValue="$store.state.reusable.errArr"
              :label="$t('descriptionAr')"
              name="descriptionAr"
              :value="$store.state.product.descriptionAr"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="description_ar"
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
            </div>
          </div>
        </div>
        <div class="col-3 ms-5">
       
          <div class="mt-3 bg-white rounded shadow-sm p-3">
            <multi-selection
              :all="$store.state.category.allCategories"
              className="mx-2 w-100"
              :label="$t('selectCategory')"
              :value="$store.state.product.categoryName"
              @change-value="changeSelection"
              selectionName="category"
            />
          </div>

          <div class="mt-3 bg-white rounded shadow-sm p-3">
            <multi-selection
              :all="$store.state.subcategory.allSubcategories"
              className="mx-2 w-100"
              :label="$t('selectSubcategory')"
              :value="$store.state.product.subcategoryName"
              @change-value="changeSelection"
              selectionName="subcategory"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashInput from '~/components/reusable/DashInput.vue'
import MultiSelection from '~/components/reusable/MultiSelection.vue'
import ReusableTextArea from '~/components/reusable/ReusableTextArea.vue'
import UploadFileInput from '~/components/reusable/UploadFileInput.vue'

export default {
  components: {
    DashInput,

    ReusableTextArea,
    MultiSelection,
    UploadFileInput,
  },

  async created() {
    await this.$store.dispatch('category/get')

  
    await this.$store.dispatch('product/getSingle', this.$route.params.id)
    await this.$store.dispatch('subcategory/getCategorySubcategory',this.$store.state.product.categoryId)
  },
  methods: {
    async changeSelection({ data, name, id }) {
      if (name == 'category') {
        await this.$store.dispatch('subcategory/getCategorySubcategory',id)
      }
      this.$store.state.product[`${name}Name`] = data
      this.$store.state.product[`${name}Id`] = id
    
    },
    async updateProduct() {
      await this.$store.dispatch('product/update',this.$route.params.id)
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
