const axios = require('axios')
export default {
  async add(context) {
    await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/user/customer',

        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          image_en: context.state.imageEn,
          image_ar: context.state.imageAr,
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
        type: 'admin/category',
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
      ;(context.state.nameAr = data.data.name_ar),
        (context.state.imageEn = data.data.image_en)
      context.state.imageAr = data.data.image_ar
    }
  },
  async update(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/category/${id}`,
        hasImage: true,
        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          image_en: context.state.imageEn,
          image_ar: context.state.imageAr,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )

    if (status) {
      this.$router.push(
        this.localePath({
          name: 'admin-category-list',
          query: {
            page: 1,
          },
        })
      )
    }
  },

  async paginationData(context, { page, order = null, orderBy = null, resId }) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: `user/customer`,
        page,
        order,
        orderBy,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.users = data.data.data
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
        type: 'user/customer',
        searchBy: `mobile`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.users = []
      data.data.data.forEach((us) => context.state.users.push(us))
    }
  },

  async changeStatus(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/change-status/category`,
        hasImage: true,
        objectData: {
          id,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )

    if (status) {
      const targetCategory = context.state.categories.find(
        (cat) => cat.id == id
      )
      if (targetCategory) {
        if (targetCategory.active == 1) {
          targetCategory.active = 0
        } else {
          targetCategory.active = 1
        }
      }
    }
  },
}
