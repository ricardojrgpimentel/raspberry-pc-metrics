import * as types from '../actionTypes'
import initialState from './initialState'

export default function optionReducer(state = initialState.optionReducer, action) {
  switch (action.type) {
    case types.ENABLE_OPTION:
      let options = {
        ...state,
        [action.option]: true
      }
      window.localStorage.setItem('options', JSON.stringify(options))
      return {
        ...options
      }
    case types.DISABLE_OPTION:
      let oldOptions = {}
      for (let property in state) {
        if (property !== action.option) {
          oldOptions = {
            ...oldOptions,
            [property]: true
          }
        }
      }
      window.localStorage.setItem('options', JSON.stringify(oldOptions))
      return {
        ...oldOptions,
      }
    default:
      return state
  }
}