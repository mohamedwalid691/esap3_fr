import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getter.js'
export default {
  namespaced: true,

  state() {
    return {
      nameEn: '',
      nameAr: '',
      image: '',
      descriptionEn: '',
      descriptionAr: '',

      price: '',
      salePrice: '',


      categoryName: '',
      subcategoryName:"",
      subcategoryId:"",
      categoryId: '',




      stock: '',
      color: '',
      dataStock: '',
      productColors: [],
      selectedSizes: [],
      productColorsSizes:[],
      productSizes: [],
      selectedImages: [],
      selectedImagesObject: {},
      productImages: [],
      allColors: [],
      allSizes: [],

      colorName: '',
      sizeName: '',
      sizeId: '',
      colorId: '',

      products: [],
      allProducts: [],
    }
  },
  mutations,
  actions,
  getters,
}
