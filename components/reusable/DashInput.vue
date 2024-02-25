<template>
  <div class="admin-form__control mt-4" :class="width">
    <label for="name" class="admin-form__label mb-2 px-1 text-capitalize">{{
      label
    }}</label>
    <input
      class="admin-form__input px-3"
      :type="type"
      :name="name"
      id="label"
      :value="value"
      @input="changeValue"
      :placeholder="label"
      step="0.01"
      :disabled="isDisable"
    />

    <small class="input-error text-danger"
      >{{ check(errValue, backName) }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
    },
    errValue: {
      type: Object,
    },
    width: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    backName: {
      type: String,
    },
    isDisable: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    changeValue(event) {
      this.$emit('change-value', { data: event, name: this.name })
    },
    check(obj, val) {
      if (obj) {
        if (obj[val.replace(' ', '_').toLowerCase()])
          return obj[val.replace(' ', '_').toLowerCase()][0]
        else return ''
      } else {
      }
    },
  },
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
