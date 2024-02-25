<template>
<div class="min-h__100">
  <div class="text-center d-flex align-items-center justify-content-center flex-column min-h__100">
  <img class="d-block notfound-image" src="~assets/images/notfound.png" alt="">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink class="btn btn-outline-primary rounded mt-3 " to="/">Go To Home page</NuxtLink>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error'
  }
</script>
