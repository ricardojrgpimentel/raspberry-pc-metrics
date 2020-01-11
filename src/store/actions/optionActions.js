import * as types from '../actionTypes'

export function addOption(option) {
  return dispatch => {
    dispatch(enableOption(option))
  }
}

export function enableOption(option) {
  return {
    type: types.ENABLE_OPTION,
    option
  }
}

export function removeOption(option) {
  return dispatch => {
    dispatch(disableOption(option))
  }
}

export function disableOption(option) {
  return {
    type: types.DISABLE_OPTION,
    option
  }
}