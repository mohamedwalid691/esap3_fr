<template>
  <div>
    <div
      v-if="message.is_user == 1"
      class="customer-chat d-flex align-center my-2"
    >
      <p class="chat-message ml-5 customer-chat__message">
        {{ message.message }}
      </p>
    </div>

    <div v-else class="agent-chat d-flex align-center my-2 flex-end flex-row">
      <p class="agent-chat__message chat-message">
        {{ message.message }}
      </p>
      <div class="ml-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
}
</script>

<style></style>
