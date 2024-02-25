<template>
  <div class="admin-content col-10 no-gutters">
    <div class="container mt-5">
      <h1 class="text-capitalize h3 text-body">
        {{ $t('add') }} {{ $t('coupon') }}
      </h1>
      <div class="d-flex justify-content-center">
        <button
          @click="assignCoupon"
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

            <div class="admin-form__control mt-4">
              <label class="admin-form__label mb-2 px-1 text-capitalize">{{
                $t('searchUser')
              }}</label>
              <form @submit.prevent="searchUserId">
                <input
                  v-model="$store.state.coupon.userEmail"
                  ref="search"
                  type="text"
                  class="admin-form__input px-3"
                  placeholder="Email"
                />
              </form>
            </div>

            <div class="admin-form__control mt-4">
              <label class="admin-form__label mb-2 px-1 text-capitalize">{{
                $t('searchCoupon')
              }}</label>
              <form @submit.prevent="searchCouponId">
                <input
                  v-model="$store.state.coupon.couponName"
                  type="text"
                  class="admin-form__input px-3"
                  placeholder="couponName"
                />
              </form>
            </div>

            
            <dash-input
              :errValue="$store.state.reusable.errArr"
              :label="$t('expiryDate')"
              name="expiryDate"
              :value="$store.state.coupon.expiryDate"
              width="w-100 mx-2"
              @change-value="changeValue"
              backName="expiry_date"
              type="date"
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
    async searchUserId() {
      await this.$store.dispatch('coupon/searchUserId')
    },

    async searchCouponId() {
      await this.$store.dispatch('coupon/searchCouponId')
    },
    async assignCoupon() {
      await this.$store.dispatch('coupon/assignCoupon')
    },

    changeValue(e) {
      this.$store.state.coupon[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
  },

  layout: 'admin',
}
</script>

<style scoped>
.admin-form__input {
  width: 100%;
  border: 2px solid #f4f5f9;

  height: 2.5rem;
  border-radius: 0.5rem;

  display: block;
  color: #333;

  font-size: 1.1rem;
}
.admin-form__label {
  color: rgb(102, 102, 102);
  font-weight: 600;

  display: block;
}
.admin-form__input:focus {
  border-radius: 0.5rem;
  outline: 0;
  padding: 0 1rem;
  background: white;
}
</style>
