<template>
  <div class="admin-content col-10 no-gutters">
    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('coupon') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="addCoupon"
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
              :label="$t('name')"
              name="name"
              :value="$store.state.coupon.name"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="name"
            />

            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('minOrder')"
              name="minOrder"
              :value="$store.state.coupon.minOrder"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="min_order"
              type="number"
            />

            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('amount')"
              name="amount"
              :value="$store.state.coupon.amount"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="amount"
              type="number"
            />
          </div>
          <div
            class="other-information h-fit border bg-white rounded shadow-sm p-3 mt-3"
          ></div>
        </div>

        <div class="col-3 ms-5"></div>
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

  methods: {
    async addCoupon() {
      await this.$store.dispatch('coupon/add')
    },

    changeValue(e) {
      this.$store.state.coupon[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
  },

  layout: 'admin',
}
</script>

<style></style>
