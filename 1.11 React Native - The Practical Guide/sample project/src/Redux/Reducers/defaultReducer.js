import { DEFAULT_TYPE } from "../Constants";

const INITIAL_STATE = {
  username: '',
  password: ''
}

const defaultReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DEFAULT_TYPE:
        return {...action.payload}
    default:
      return state
  }
}

export default defaultReducer;