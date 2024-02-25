<template>
  <div class="admin-content col-10 no-gutters">
    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('edit') }} {{ $t('subcategory') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="updateSubcategory"
          type="button"
          class="btn btn-dark mx-5 text-capitalize"
        >
          {{ $t('publish') }}
        </button>
      </div>
      <div class="mt-4 row">
        <div class="col-8">
          <div class="h-fit border bg-white rounded shadow-sm p-3">
            <h6 class="text-capitalize">{{ $t('basicInformation') }}</h6>

            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('nameEn')"
              name="nameEn"
              :value="$store.state.subcategory.nameEn"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="name_en"
            />
            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('nameAr')"
              name="nameAr"
              :value="$store.state.subcategory.nameAr"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="name_ar"
            />
          </div>
          <div
            class="other-information h-fit border bg-white rounded shadow-sm p-3 mt-3"
          ></div>
        </div>

        <div class="col-3 ms-5">
          <div class="border bg-white rounded shadow-sm p-3">
            <upload-file-input
              label="imageEn"
              name="imageEn"
              @change-value="changeFile"
            />
          </div>

          <div class="border bg-white rounded shadow-sm p-3 mt-5">
            <upload-file-input
              label="imageAr"
              name="imageAr"
              @change-value="changeFile"
            />
          </div>

          <div class="mt-3 bg-white rounded shadow-sm p-3">
            
            <multi-selection
              :all="$store.state.category.allCategories"
              className="mx-2 w-100"
              :label="$t('selectCategory')"
              :value="$store.state.subcategory.categoryName"
              @change-value="changeSelection"
              selectionName="category"
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
import UploadFileInput from '~/components/reusable/UploadFileInput.vue'

export default {
  components: {
    DashInput,
    UploadFileInput,
    MultiSelection,
  },

  async created() {
    await this.$store.dispatch('subcategory/getSingle', this.$route.params.id)
  },
  methods: {
    changeSelection({ data, name, id }) {
      this.$store.state.subcategory[`${name}Name`] = data
      this.$store.state.subcategory[`${name}Id`] = id
    },
    async updateSubcategory() {
      await this.$store.dispatch('subcategory/update', this.$route.params.id)
    },

    changeValue(e) {
      this.$store.state.subcategory[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
    changeFile({ data, name }) {
      this.$store.state.subcategory[name] = data.target.files[0]
    },
  },

  layout: 'admin',
}
</script>

<style></style>
