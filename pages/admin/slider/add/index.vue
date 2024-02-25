<template>
  <div class="admin-content col-10 no-gutters">
    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('slider') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="addSlider"
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
              :label="$t('link')"
              name="link"
              :value="$store.state.slider.link"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="link"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashInput from '~/components/reusable/DashInput.vue'
import UploadFileInput from '~/components/reusable/UploadFileInput.vue'

export default {
  components: {
    DashInput,
    UploadFileInput,
  },

  created(){
   console.log("mohamed is here");
  },
  methods: {
    async addSlider() {
      await this.$store.dispatch('slider/add')
    },

    changeValue(e) {
      this.$store.state.slider[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
    changeFile({ data, name }) {
      this.$store.state.slider[name] = data.target.files[0]
    },
  },

  layout: 'admin',
}
</script>

<style></style>
