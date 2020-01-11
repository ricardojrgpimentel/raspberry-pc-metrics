let options = {}
if (window.localStorage.getItem('options')) {
  options = JSON.parse(window.localStorage.getItem('options'))
}
export default {
  propertiesReducer: {
    contentMSIProperties: undefined,
    attemptMSIProperties: 0
  },
  optionReducer: {
    ...options
  }
}