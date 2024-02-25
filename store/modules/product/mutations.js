export default {
  
  addImageToList(state, va) {
    state.selectedImages = va.target.files

    for (let index = 0; index < state.selectedImages.length; index++) {
      state.selectedImagesObject[`image${index}`] = state.selectedImages[index]
    }
  },
  
}
