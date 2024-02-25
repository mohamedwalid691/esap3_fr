export default {
  async add(context) {
    await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/slider',

        objectData: {
          link: context.state.link,

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
        type: 'admin/slider',
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.allSliders = data.data
    }
  },

  async getSingle(context, id) {
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: 'admin/slider',
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.link = data.data.link
      context.state.imageEn = data.data.image_en
      context.state.imageAr = data.data.image_ar
    }
  },
  async update(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/slider/${id}`,
        hasImage: true,
        objectData: {
          link: context.state.link,
          image_en: context.state.imageEn,
          image_ar: context.state.imageAr,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )

    console.log(status)
    if (status) {
      this.$router.push(
        this.localePath({
          name: 'admin-slider-list',
          query: {
            page: 1,
          },
        })
      )
    }
  },

  async paginationData(context, page) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: 'slider',
        page,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.sliders = data.data.data
    }
  },
  async deleteData(context, sliderId) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: 'admin/slider',
        dataId: sliderId,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.sliders = context.state.sliders.filter(
        (sli) => sli.id != sliderId
      )
    }
  },
  async search(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'medicine',
        searchBy: `name_${this.$i18n.locale}`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.medicines = []
      data.data.forEach((med) => context.state.medicines.push(med))
    }
  },

  async changeStatus(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/change-status/slider`,
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
      const targetSlider = context.state.sliders.find((sl) => sl.id == id)
      if (targetSlider) {
        if (targetSlider.active == 1) {
          targetSlider.active = 0
        } else {
          targetSlider.active = 1
        }
      }
    }
  },
}
