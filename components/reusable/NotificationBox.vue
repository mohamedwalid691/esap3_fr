<template>
  <div
    v-if="$store.state.reusable.showNotificationBox"
    class="notification-box"
    :class="posation"
  >
    <div
      class="notfication-header px-4 py-3 d-flex justify-content-between align-items-center"
      :class="bg"
    >
      <h5 class="notifcation-head__element head-element">{{ name }}</h5>
      <h6 v-if="notifications>0" @click="readNotification" type="button" class="notifcation-head__element head-element">
        mark as read
      </h6>
      <span  class="notifcation-head__icon"
        ><i class="far fa-bell"></i
      ></span>
    </div>
    <div class="notification-content bg-white">
      <div v-for="notification in notifications" :key="notification.id">
        <nuxt-link
          @mouseup="readNotification"
          :to="
            localePath({
              name: 'admin-order',
              query: {
                page: 1,
              },
            })
          "
        >
          <div
            class="notification-content__element bg-white d-flex py-2 px-2 align-items-center"
          >
            <img
              class="notification-circle__image"
              src="../../assets/images/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
              alt=""
            />
            <div class="flex-colum ml-4">
              <h6 class="notification-content__head my-2">
                new order was placed
              </h6>
            </div>
          </div></nuxt-link
        >
        <div class="exam-divider mt-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bg", "name", "posation", "notifications"],
  methods: {
    readNotification() {
      this.$store.dispatch("admin/readNotification");
    },
  },
};
</script>

<style scoped>
.notification-box {
  z-index: 3;
  height: fit-content;
  width: 25vw;
  border-radius: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.notifcation-head__icon i {
  font-size: 1.5rem;
  color: white;
}
.notfication-header {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.notification-content {
  padding: 1.5rem;
  min-height: fit-content;
  max-height: 15rem;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  overflow: auto;
}

.notification-content__head {
  font-size: 1.3rem;

  font-weight: 600;
  color: #1e293b;
}

.notification-circle__image {
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  margin-top: 1rem;
}
.notification-content__notification {
  font-size: 1.6rem;
  font-weight: 500;
  color: grey;
}
.notification-content__time {
  font-size: 1.1rem;
  font-weight: 400;
  color: grey;
}
</style>
