<template>
  <div class="admin-form__control p-relative" :class="className">
    <label for class="admin-form__label">{{ label }}</label>
    <input
      ref="val"
      type="text"
      class="admin-form__input"
      :value="value"
      @input="showSelection"
    />
    <div class="p-absolute">
      <ul class="select-holder p-0">
        <li
          ref="list"
          @click="choseSelect($event, one.id)"
          class="select select-none"
          v-for="one in all"
          :key="one.id"
        >
          {{ name != null ? one[`${name}`] : one[`name_${$i18n.locale}`] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['all', 'value', 'label', 'className', 'name','selectionName'],
  methods: {
    showSelection(e) {
      if ( this.all&& this.all.length > 0) {
        const list = this.$refs.list

        if (e.target.value) {
          list.forEach((el) => {
            el.classList.add('select-none')

            if (el.textContent.toLowerCase().includes(e.target.value)) {
              el.classList.remove('select-none')
            }
          })
        }
      }
    },
    choseSelect(e, id) {
      if (this.all.length > 0) {
        const list = this.$refs.list
        this.$emit('change-value', {
          data: e.target.textContent.trim(),
          name: this.selectionName,
          id,
        })
        list.forEach((se) => {
          se.classList.add('select-none')
        })
      }
    },
  },
}
</script>

<style scoped>
.select-none {
  display: none;
}
.select-holder {
  border-color: #96c8da;
  box-shadow: 0 2px 3px 0 rgb(34 36 38 / 15%);
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 400;
}
.select-holder li {
  padding: 0.5rem 0.3rem;
  cursor: pointer;
}
.select-holder li:hover {
  background: rgba(0, 0, 0, 0.03);
}
.admin-form__input {
  width: 100%;
  border: 2px solid #f4f5f9;

  height: 2.2rem;
  border-radius: 0.5rem;

  display: block;
  color: #333;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  font-size: 1rem;
}
.admin-form__label {
  color: rgb(102, 102, 102);
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
}
.admin-form__input:focus {
  border-radius: 0.5rem;
  outline: 0;
  padding: 0 1rem;
  background: white;
}
</style>
