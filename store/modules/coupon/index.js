import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getter.js'
export default {
  namespaced: true,

  state() {
    return {
      name: '',
      amount: '',
      expiryDate:'',
      minOrder:'',
      userEmail:"",
      userId:"",
      couponName:"",
      couponId:"",
  

      coupons: [],
      allCoupons: [],
    }
  },
  mutations,
  actions,
  getters,
}
