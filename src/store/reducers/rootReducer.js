import { combineReducers } from 'redux'
import propertiesReducer from './propertiesReducer'
import optionReducer from './optionReducer'
const rootReducer = combineReducers({
  propertiesReducer,
  optionReducer
})

export default rootReducer