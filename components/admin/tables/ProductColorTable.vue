<template>
    <table class="table">
      <thead>
        <tr>
          <th role="button" @click="sortData('id')" scope="col ">
            {{ $t('id') }}
          </th>
          <th scope="col ">{{ $t('nameEn') }}</th>
          <th scope="col ">{{ $t('nameAr') }}</th>
          <th scope="col ">{{ $t('color') }}</th>
          <th scope="col ">{{ $t('price') }}</th>
          <th scope="col ">{{ $t('salePrice') }}</th>
          <th scope="col ">{{ $t('stock') }}</th>
          <th scope="col ">{{ $t('images') }}</th>
          <!-- <th scope="col ">{{ $t('order') }}</th> -->
          <th scope="col ">{{ $t('change') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="color in colors" :key="color.id">
          <th scope="row col-1">{{ color.id }}</th>
          <td class="fw-500 col text-capitalize">{{ color.color_name_en }}</td>
  
          <td class="text-capitalize fw-500 col">{{ color.color_name_ar }}</td>
          <td class="text-capitalize fw-500 col">{{ color.color }}</td>
          <td class="text-capitalize fw-500 col">{{ color.price }}</td>
          <td class="text-capitalize fw-500 col">{{ color.sale_price }}</td>
          <td class="text-capitalize fw-500 col">{{ color.stock }}</td>
          <td class="text-capitalize fw-500 col">{{ color.stock }}</td>
          <td class="d-flex flex-row align-items-center">
            <!-- <nuxt-link
              :to="
                localePath({
                  name: 'admin-product-id-color-color_id-edit',
                  params: {
                    
                    id: color.id,
                    color_id: color.id,
                  },
                })
              "
              role="button"
              class="rounded-circle table-icon__circle bg-primary mx-2"
            >
              <i class="fas fa-edit text-white"></i>
            </nuxt-link> -->
  
            <span
              @click="colorId = color.id"
              data-bs-toggle="modal"
              data-bs-target="#delete-model"
              role="button"
              class="rounded-circle table-icon__circle bg-danger mx-2"
            >
              <i class="far fa-trash-alt text-white"></i>
            </span>
   
            <delete-model @delete-data="deleteData" />
            <active-model @change-status="ChangeStatus" />
           
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  import ActiveModel from '../reusable/ActiveModel.vue'
  import DeleteModel from '../reusable/DeleteModel.vue'
  export default {
    components: { DeleteModel, ActiveModel },
    props: ['colors','productId'],
  
    methods: {
      sortData(orderBy) {
        if (this.$route.query.orderBy) {
          if (this.$route.query.orderBy == orderBy) {
            if (this.$route.query.order == 'desc') {
              this.$emit('sort-data', { orderBy, order: 'asc' })
            } else {
              this.$emit('sort-data', { orderBy, order: 'desc' })
            }
          }
        } else {
          this.$emit('sort-data', { orderBy, order: 'desc' })
        }
      },
    
      deleteData() {
        this.$emit('delete-data', { id: this.colorId })
      },
  
      ChangeStatus() {
        this.$emit('change-status', { id: this.colorId })
      },
    },
    data() {
      return {
        colorId: '',
        order: 'desc',
      }
    },
  }
  </script>
  
  <style scoped>
  img {
    height: 100px;
    display: block;
  }
  </style>
  