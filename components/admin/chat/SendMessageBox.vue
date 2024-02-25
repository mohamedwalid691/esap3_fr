<template>
  <form @submit.prevent="snedMessage">
    <div class="send-message__form d-flex align-center">
      <div class="send-message__controller">
        <input
          class="send-message__input"
          type="text"
          placeholder="Enter Your Message Here"
          v-model="$store.state.complain.message"
        />
      </div>
    
    </div>
  </form>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    snedMessage() {
      if(!this.$store.state.complain.message ){
        return
      }
      
      this.$emit('send-message')
    },
   
  },
}
</script>

<style></style>
