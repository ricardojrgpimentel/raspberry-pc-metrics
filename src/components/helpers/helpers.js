import * as propertyType from './propertyTypes'

class Helpers {
  static oneOfTypes(type) {
    return type === propertyType.TEMP ||
      type === propertyType.FAN ||
      type === propertyType.CLOCK ||
      type === propertyType.LOAD ||
      type === propertyType.POWER ||
      type === propertyType.VOLTAGE ||
      type === propertyType.CONTROL
  }
}

export default Helpers