const axios = require('axios')
export default {
  async getSingle(context, id) {
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: 'admin/category',
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.nameEn = data.data.name_en
      context.state.nameAr = data.data.name_ar
    }
  },
  async update(context, { id, action }) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/order/update/status/${id}`,
        hasImage: true,
        objectData: {
          action: action,

          id: id,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      const targetOrder = context.state.orders.find((or) => or.id == id)
      console.log(targetOrder);
      if (targetOrder) {
        console.log("irdr is her");
        if (action == 'true') {
          targetOrder.status += 1
        } else if (action == 'false') {
          targetOrder.status -= 1
        } else if (action == 'cancel') {
          targetOrder.status = 0
        }
      }
    }
  },

  async paginationData(context, { page, order = null, orderBy = null, resId }) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: `order`,
        page,
        order,
        orderBy,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.orders = data.data.data
    }
  },
  async deleteData(context, categoryId) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: 'admin/category',
        dataId: categoryId,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.categories = context.state.categories.filter(
        (ca) => ca.id !== categoryId
      )
    }
  },
  async search(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'category',
        searchBy: `name_${this.$i18n.locale}`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.categories = []
      data.data.data.forEach((cu) => context.state.categories.push(cu))
    }
  },
}
