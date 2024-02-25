<template>
  <div class="form-group admin-form__control mt-4" :class="width">
    <label :for="label" class="admin-form__label mb-2 px-1 text-capitalize">{{
      label
    }}</label>
    <textarea
      class="form-control admin-form__input"
      :id="label"
      rows="3"
      :name="name"
      @input="changeValue"
      :placeholder="name"
      :value="value"
    ></textarea>
    <small class="input-error text-danger">{{ check(errValue, backName) }} </small>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'name', 'errValue', 'width','backName'],
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
textarea {
  resize: none;
}
.admin-form__input {
  width: 100%;
  border: 2px solid #f4f5f9;

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

  box-shadow: none;
  background: white;
}
</style>
