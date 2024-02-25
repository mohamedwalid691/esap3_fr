export default {
  async add(context) {
    const { data, status } = await context.dispatch(
      'reusable/createData',
      {
        type: 'admin/product',

        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          description_en: context.state.descriptionEn,
          description_ar: context.state.descriptionAr,
          stock: context.state.stock,
          price: context.state.price,
          sale_price: context.state.salePrice,
          category_id: context.state.categoryId,
          subcategory_id:context.state.subcategoryId,

          length: Object.keys(context.state.selectedImagesObject).length,
          ...context.state.selectedImagesObject,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.selectedImagesObject = []
      // this.$router.push(
      //   this.localePath({
      //     name: 'admin-product-id-filter-type',
      //     params: { id: data.data.id },
      //   })
      // )
    }
  },

  async get(context) {
    const { data, status } = await context.dispatch(
      'reusable/getData',
      {
        type: 'admin/product',
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.allProducts = data.data
    }
  },

  async getSingle(context, id) {
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: 'admin/product',
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      console.log(data.data);
      context.state.nameEn = data.data.name_en
      context.state.nameAr = data.data.name_ar
      context.state.descriptionEn = data.data.description_en

      context.state.descriptionAr = data.data.description_ar

      context.state.price = data.data.price
      context.state.stock = data.data.stock
      context.state.salePrice = data.data.sale_price
      context.state.categoryId = data.data.category_id
      context.state.categoryName = data.data.category_name
      context.state.subcategoryId = data.data.subcategory_id
      context.state.subcategoryName = data.data.subcategory_name
    }
  },
  async update(context, id) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/product/${id}`,
        hasImage: true,
        objectData: {
          name_en: context.state.nameEn,
          name_ar: context.state.nameAr,
          description_en: context.state.descriptionEn,
          description_ar: context.state.descriptionAr,
          stock: context.state.stock,
          price: context.state.price,
          sale_price: context.state.salePrice,
          category_id: context.state.categoryId,
          subcategory_id:context.state.subcategoryId,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },

  async paginationData(context, { page, order = null, orderBy = null }) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: 'product',
        page,
        order,
        orderBy,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.products = data.data.data
    }
  },
  async activeProduct(context, { productId, active }) {
    const targetProduct = context.state.products.find(
      (pro) => pro.id == productId
    )
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/product/active/${productId}`,
        hasImage: true,
        objectData: {
          status: targetProduct.active == 1 ? '0' : '1',
        },
        userToken: true,
      },
      {
        root: true,
      }
    )

    if (status) {
      if (targetProduct.active == 1) {
        targetProduct.active = 0
      } else {
        targetProduct.active = 1
      }
    }
  },
  async deleteData(context, productId) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: 'admin/product',
        dataId: productId,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.products = context.state.products.filter(
        (pro) => pro.id != productId
      )
    }
  },
  async search(context, value) {
    const { data, status } = await context.dispatch(
      'reusable/searchData',
      {
        type: 'product',
        searchBy: `name_${this.$i18n.locale}`,
        searchValue: value,
      },
      {
        root: true,
      }
    )

    if (status) {
      context.state.products = []
      data.data.forEach((pro) => context.state.products.push(pro))
    }
  },

  async addData(context, { type, productId }) {
    await context.dispatch(
      'reusable/createData',
      {
        type: `admin/product/${type}`,

        objectData: {
          product_id: productId,
          stock: context.state.stock,
          price: context.state.price,
          product_color_id: context.state.colorId,
          product_size_id: context.state.sizeId,
          sale_price: context.state.salePrice,
          color: context.state.color,

          color_name_en: context.state.nameEn,

          name_en: context.state.nameEn,

          name_ar: context.state.nameAr,
          color_name_ar: context.state.nameAr,

          color_id: context.state.primaryColorId,

          length: Object.keys(context.state.selectedImagesObject).length,
          ...context.state.selectedImagesObject,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },
  async productPaginationData(context, { page, id, type }) {
    const { data, status } = await context.dispatch(
      'reusable/getPaginationData',
      {
        type: `product/${id}/${type}`,
        page,
      },
      {
        root: true,
      }
    )
    if (status) {
      if (type == 'color') {
        context.state.productColors = data.data.data
      }

      if (type == 'size') {
        context.state.productSizes = data.data.data
      } else {
        context.state.productColorsSizes = data.data.data
      }
    }
  },

  async getImages(context, productId) {
    const { data, status } = await context.dispatch(
      'reusable/getData',
      {
        type: `admin/product/${productId}/images`,

        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.productImages = []
      JSON.parse(data.data.images).forEach((im) =>
        context.state.productImages.push(im)
      )
      // context.state.productImages = data.data
    }
  },

  async addImages(context,productId) {
    const { data, status } = await context.dispatch(
      'reusable/createData',
      {
        type: `admin/product/${productId}/images`,
        objectData: {
          length: Object.keys(context.state.selectedImagesObject).length,
          ...context.state.selectedImagesObject,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.selectedImagesObject = []
      context.state.productImages = []
      JSON.parse(data.data).forEach((im) =>
        context.state.productImages.push(im)
      )
 
    }
  },
  async deleteImage(context, { productId, imagePath }) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: `admin/product/${productId}/images`,
        dataId: imagePath.replace('products/', ''),
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      context.state.productImages = []
      JSON.parse(data.data).forEach((im) =>
        context.state.productImages.push(im)
      )
      // context.state.productImages = data.data
    }
  },

  async deleteProductData(context, { type, image, typeId }) {
    const { data, status } = await context.dispatch(
      'reusable/deleteData',
      {
        type: `admin/product/${type}`,

        userToken: true,
        dataId: typeId,
      },
      {
        root: true,
      }
    )
    if (status) {
      if (type == 'image') {
        context.state.productImages = context.state.productImages.filter(
          (ima) => ima != image
        )
      }
      if (type == 'color') {
        context.state.productColors = context.state.productColors.filter(
          (col) => col.id != typeId
        )
      }
      if (type == 'size') {
        context.state.productSizes = context.state.productSizes.filter(
          (si) => si.id != typeId
        )
      }
    }
  },
  async getSingleData(context, { type, id }) {
    const { data, status } = await context.dispatch(
      'reusable/getSingleData',
      {
        type: `admin/product/${type}`,
        id,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      console.log(data.data)

      context.state.stock = Number(data.data.stock)
      context.state.price = data.data.price
      context.state.salePrice = data.data.sale_price
      if (type == 'color') {
        context.state.nameEn = data.data.color_name_en
        context.state.nameAr = data.data.color_name_ar
        context.state.color = data.data.color
      }
    }
  },

  async updateData(context, { type, id }) {
    const { status } = await context.dispatch(
      'reusable/updateData',
      {
        type: `admin/product/${type}/${id}`,
        hasImage: true,
        objectData: {
          color: context.state.color,
          stock: context.state.dataStock,
          product_id: productId,
        },
        userToken: true,
      },
      {
        root: true,
      }
    )
  },

  async getData(context, { type, productId }) {
    const { data, status } = await context.dispatch(
      'reusable/getData',
      {
        type: `admin/product/${type}/${productId}/edit`,
        userToken: true,
      },
      {
        root: true,
      }
    )
    if (status) {
      if (type == 'color') {
        console.log('yes color')
        context.state.allColors = data.data
        console.log(context.state.allColors)
      } else if (type == 'size') {
        context.state.allSizes = data.data
      }
    }
  },
}
