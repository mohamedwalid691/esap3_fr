<template>
  <div class="d-flex flex-column justify-content-around">
    <img
      src="../../assets/images/image.png"
      class="ml-auto mr-auto w-50 rounded"
      alt=""
    />
    <div class="mt-3">
      <input
        class="form-control"
        type="file"
        id="formFile"
        :multiple="multiple"
        @input="changeValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    width: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeValue(event) {
      this.$emit('change-value', { data: event, name: this.name })
    },
  },
}
</script>

<style></style>
