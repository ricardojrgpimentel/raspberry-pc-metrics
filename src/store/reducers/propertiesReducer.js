import * as types from '../actionTypes'
import initialState from './initialState'

export default function propertiesReducer(state = initialState.propertiesReducer, action) {
  switch (action.type) {
    case types.REQUEST_MSI_PROPERTIES:
      return {
        ...state,
        loadingMSIProperties: true,
        errorMSIProperties: false,
      }
    case types.ERROR_FETCH_MSI_PROPERTIES:
      return {
        ...state,
        loadingMSIProperties: false,
        errorMSIProperties: action.error,
      }
    case types.SUCCESS_FETCH_MSI_PROPERTIES:
      return {
        loadingMSIProperties: false,
        errorMSIProperties: false,
        contentMSIProperties: action.response
      }
    default:
      return state
  }
}