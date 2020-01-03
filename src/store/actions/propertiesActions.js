import * as types from '../actionTypes'
import ApiCalls from '../api/apiCalls'

export function requestMSIProperties() {
  return {
    type: types.REQUEST_MSI_PROPERTIES
  }
}

export function successFetchMSIProperties(response) {
  return {
    type: types.SUCCESS_FETCH_MSI_PROPERTIES,
    response
  }
}

export function errorFetchMSIProperties(error) {
  return {
    type: types.ERROR_FETCH_MSI_PROPERTIES,
    error
  }
}

export function fetchMSIProperties() {
  return dispatch => {
    dispatch(requestMSIProperties())
    return ApiCalls.msiProperties().then(response => {
      dispatch(successFetchMSIProperties(response, cursor, gameId))
    }).catch(error => {
      dispatch(errorFetchMSIProperties(error))
      throw (error)
    })
  }
}