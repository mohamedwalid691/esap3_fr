<template>
  <div class="agent-chat  flex-row  align-center my-4 flex-end flex-row">
    <p class="agent-chat__message  chat-message  ">
      {{ message }}
    </p>
    <div class="ml-5">
      <img
        class="active-user__image circle"
        src="../../../assets/images/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>

<style></style>
