<template>
  <nav class="bg-dark py-2 shadow">
    <div class="container">
      <ul class="p-0 m-0 d-flex flex-row align-items-center">
        <nuxt-link
          class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
          :to="
            localePath({
              name: 'admin-product-id-color',
              params: { id },
            })
          "
        >
          {{ $t('color') }}
        </nuxt-link>

        <nuxt-link
          class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
          :to="
            localePath({
              name: 'admin-product-id-color-list',
              params: { id },
            })
          "
          >{{ $t('colorList') }}</nuxt-link
        >

        <nuxt-link
          class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
          :to="
            localePath({
              name: 'admin-product-id-size',
              params: { id },
            })
          "
          >{{ $t('size') }}</nuxt-link
        >

        <nuxt-link
          class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
          :to="
            localePath({
              name: 'admin-product-id-size-list',
              params: { id },
            })
          "
          >{{ $t('sizeList') }}</nuxt-link
        >
        <nuxt-link
        class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
        :to="
          localePath({
            name: 'admin-product-id-color-size',
            params: { id },
          })
        "
        >{{ $t('colorSize') }}</nuxt-link
      >


      <nuxt-link
      class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
      :to="
        localePath({
          name: 'admin-product-id-color-size-list',
          params: { id },
        })
      "
      >{{ $t('colorSizeList') }}</nuxt-link
    >
        <nuxt-link
          class="btn border-0 text-capitalize text-white fw-500 font-size__1-3"
          :to="
            localePath({
              name: 'admin-product-id-images',
              params: { id },
            })
          "
          >images</nuxt-link
        >
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['id'],
}
</script>

<style scoped>
.nuxt-link-exact-active {
  font-weight: 700 !important;

  font-size: 1.3rem;
  --bs-text-opacity: 1;
  color: rgba(var(--bs-info-rgb), var(--bs-text-opacity)) !important;
}
</style>
