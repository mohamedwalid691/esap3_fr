<template>
  <div
    class="modal fade"
    id="replace-item"
    tabindex="-1"
    role="dialog"
    aria-labelledby="replace-item"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Replace item</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <!-- <label for="item-name" class="col-form-label">item name</label> -->
              <!-- <multi-selection
                                @change-value="changeSelection"
                                :all="$store.state.item.allItems"
                                class="mx-2"
                                label="chose product"
                                :value="$store.state.admin.itemName"
                            /> -->
              <form @submit.prevent="searchItem">
                <dash-input
                  label="item name"
                  :value="$store.state.order.itemName"
                  @change-value="changeValue"
                  name="itemName"
                />
              </form>
            </div>
            <div class="form-group">
              <label for="quantity" class="col-form-label">quantity</label>
              <input
                type="number"
                class="form-control"
                ref="quantity"
                id="quantity"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="replace"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary"
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashInput from '~/components/reusable/DashInput.vue'
import MultiSelection from '~/components/reusable/MultiSelection.vue'
export default {
  components: { MultiSelection, DashInput },
  methods: {
    replace() {
      this.$emit('replace-item', { quantity: this.$refs.quantity.value })
    },
    searchItem(e) {
      //   document.getElementById("ss").firstElementChild.target.value
    this.$store.dispatch("order/searchItemName");
    },
    changeValue(e) {
      this.$store.state.order[`${e.name.replace(' ', '')}`] =
        e.data.target.value
    },
  },
}
</script>

<style scoped>
img {
  height: 10rem;
  display: block;
  margin: 0 auto;
}
</style>
