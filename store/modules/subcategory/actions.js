export default {
  async add(context) {
    await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/subcategory',

        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          image_en: context.state.imageEn,
          image_ar: context.state.imageAr,
          category_id: context.state.categoryId,
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
        type: 'admin/subcategory',
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.allSubcategories = data.data
    }
  },

  async getSingle(context, id) {
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: 'admin/subcategory',
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
    console.log('this data')
    console.log(data.data)
    if (status) {
      context.state.nameEn = data.data.name_en
      context.state.nameAr = data.data.name_ar
      context.state.imageEn = data.data.image_en
      context.state.imageAr = data.data.image_ar
      context.state.categoryId = data.data.category_id
      context.state.categoryName = data.data.category_name
    }
  },
  async update(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/subcategory/${id}`,
        hasImage: true,
        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          image_en: context.state.imageEn,
          image_ar: context.state.imageAr,
          category_id: context.state.categoryId,
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
          name: 'admin-subcategory-list',
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
        type: `subcategory`,
        page,
        order,
        orderBy,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.subcategories = data.data.data
    }
  },
  async deleteData(context, subcategoryId) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: 'admin/subcategory',
        dataId: subcategoryId,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.subcategories = context.state.subcategories.filter(
        (ca) => ca.id !== subcategoryId
      )
    }
  },
  async search(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'subcategory',
        searchBy: `name_${this.$i18n.locale}`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.subcategories = []
      data.data.data.forEach((cu) => context.state.subcategories.push(cu))
    }
  },

  async changeStatus(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/change-status/subcategory`,
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
      const targetSubcategory = context.state.subcategories.find(
        (cat) => cat.id == id
      )
      if (targetSubcategory) {
        if (targetSubcategory.active == 1) {
          targetSubcategory.active = 0
        } else {
          targetSubcategory.active = 1
        }
      }
    }
  },

  async getCategorySubcategory(context, id) {
    const { data, status } = await context.dispatch(
      'reusable/getData',
      {
        type: `admin/category/${id}/subcategory`,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.allSubcategories = data.data
    }
  },
}
