import * as types from '../actionTypes'
import ApiCalls from '../api/apiCalls'

export function requestMSIProperties() {
  return {
    type: types.REQUEST_MSI_PROPERTIES
  }
}

export function successFetchMSIProperties(response, attempt) {
  return {
    type: types.SUCCESS_FETCH_MSI_PROPERTIES,
    response, attempt
  }
}

export function errorFetchMSIProperties(error) {
  return {
    type: types.ERROR_FETCH_MSI_PROPERTIES,
    error
  }
}

export function fetchMSIProperties(attempt) {
  return dispatch => {
    dispatch(requestMSIProperties())
    return ApiCalls.msiProperties().then(response => {
      dispatch(successFetchMSIProperties(response, attempt))
    }).catch(error => {
      dispatch(errorFetchMSIProperties(error))
      throw (error)
    })
  }
}


export function updateTimeInterval(timer) {
  return dispatch => {
    dispatch(intervalTime(timer))
  }
}

export function intervalTime(timer) {
  return {
    type: types.INTERVAL_TIME,
    timer
  }
}