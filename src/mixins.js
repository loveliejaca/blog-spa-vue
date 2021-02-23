import _ from 'lodash'

export default {
  methods: {
    showPlaceholder (image, background = true) {
      const noImage = require('./assets/images/no-image.jpg')
      const placeholder = { backgroundImage: `url(${noImage})` }

      switch (background) {
        case true: {
          if (_.isNull(image)) return placeholder
          return { backgroundImage: `url(${image})` }
        }
        default: {
          if (_.isNull(image)) return noImage
          return image
        }
      }
    }
  }
}
