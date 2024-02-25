<template>
  <div class="p-relative mb-5">
    <div class="form-group mt-3">
      <label class="admin-form__label">{{ label }}</label>
      <input class="admin-form__input" type="text" @input="showList" />
    </div>
    <div class="specfic-list__item">
      <ul class="d-flex flex-row align-items-center p-0">
        <li
          class="d-flex flex-row align-items-center"
          v-for="selectedValue in selectedValues"
          :key="selectedValue.id"
        >
          <span class="size-name text-light">{{
            selectedValue[`name_${$i18n.locale}`]
          }}</span>
          <i
            @click="removeFromList(selectedValue)"
            class="fas fa-times close pointer mx-1 text-light"
          ></i>
        </li>
      </ul>
    </div>

    <div ref="speclist" class="specfication-list">
      <p
      
        v-for="selectionValue in selectionValues"
        :key="selectionValue.id"
        @click="addValue(selectionValue)"
        class="none-p p mb-0  z-5"
        :class="`p-${label}`"
        
      >
        {{ selectionValue[`name_${$i18n.locale}`] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'selectionValues', 'selectedValues'],
 
  methods: {
    showList(e) {
  
      const list = document.querySelectorAll(`.p-${this.label}`)
     

      list.forEach((el) => {
        el.classList.add('none-p')

        if (el.textContent.toLowerCase().includes(e.target.value)) {
          el.classList.remove('none-p')
        }
      })
    },
    removeFromList(selectedValue) {
      this.$emit('remove-from-list', selectedValue)
    },

    addValue(selectionValue) {
      this.$emit('add-value', { selectionValue, valueName: this.label })

      this.$forceUpdate()

      const list = document.querySelectorAll(`.p-${this.label}`)
      list.forEach((el) => {
        el.classList.add('none-p')
      })
   
    },
  },
}
</script>

<style scoped>
.p-relative {
  position: relative;
}
.specfic-list__item {
  width: 100%;
}
.specfic-list__item ul li {
  padding: 0.2rem 0.4rem;
  display: flex;
  background: #0f172a;
  border-radius: 0.5rem;
  font-weight: 500;
  margin: 0.5rem;
}
.specfic-list__item ul {
  width: 100%;
  flex-wrap: wrap;
}
.specfication-list {
  background: white;
  position: absolute;
  width: 100%;
  top: 110%;
  right: 0%;
  border-radius: 0.4rem;
  box-shadow: 1px 1px 5px grey;
  border-radius: 0.7rem;

  max-height: 400px;

  overflow: auto;
}
.specfication-list p {
  cursor: pointer;
  padding: 0.7rem 0.4rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 400;
}
.specfication-list p:hover {
  color: white;
  background: rgba(40, 150, 239, 255);
}
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
  outline: 0;

  background: white;
}
.none-p {
  display: none;
}
.z-5{
  z-index: 5;
}
</style>
