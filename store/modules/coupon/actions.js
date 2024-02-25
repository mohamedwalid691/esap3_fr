import axios from 'axios'
export default {
  async add(context) {
    await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/coupon',

        objectData: {
          name: context.state.name,
          min_order: context.state.minOrder,
          amount: context.state.amount,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },

  async get(context) {
    const { data, status } = await context.dispatch(
      'reusable/getData',
      {
        type: 'admin/coupon',
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.allCategories = data.data
    }
  },

  async getSingle(context, id) {
    
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: 'admin/coupon',
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
  
    if (status) {
      context.state.name = data.data.name
      context.state.minOrder = data.data.min_order
      context.state.amount = data.data.amount
      
    }
  },
  async update(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/coupon/${id}`,
        hasImage: true,
        objectData: {
          name: context.state.name,
          min_order: context.state.minOrder,
          amount: context.state.amount,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },

  async paginationData(context, { page, order = null, orderBy = null, resId }) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: `coupon`,
        page,
        order,
        orderBy,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.coupons = data.data.data
    }
  },
  async deleteData(context, couponId) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: 'admin/coupon',
        dataId: couponId,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.coupons = context.state.coupons.filter(
        (co) => co.id !== couponId
      )
    }
  },
  async search(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'coupon',
        searchBy: `name_${this.$i18n.locale}`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.coupons = []
      data.data.data.forEach((cu) => context.state.coupons.push(cu))
    }
  },

  async searchUserId(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'single-user',
        searchBy: `email`,
        searchValue: context.state.userEmail,
      },
      {
        root: true,
      }
    )

    if (status) {
      console.log(data)
      if (data != null) {
        context.state.userEmail = data.data.email
        context.state.userId = data.data.id
      }
    }
  },

  async searchCouponId(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'single-coupon',
        searchBy: `name`,
        searchValue: context.state.couponName,
      },
      {
        root: true,
      }
    )

    if (status) {
      console.log("this is our here");
      console.log(data.data)
    
      if (data != null) {
        context.state.couponName = data.data.name
        context.state.couponId = data.data.id
        console.log(context.state.couponId);
      }
    }
  },
  async assignCoupon(context) {
   
    await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/assign-coupon',

        objectData: {
          user_id: context.state.userId,
          coupon_code_id: context.state.couponId,
          expiry_date: context.state.expiryDate,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },
}
