import { combineReducers } from 'redux'

const initialState = {
  anbyaBoilerplate: 'Anbya Boilerplate',
  formState: 'true',
  toolTipmobilenumber: 'hidden',
  toolTipemail: 'hidden',
  testredux:"Hello From Redux",
  aksespage:"",
  userinfo:"",
  navState:"",
  OutletName:""
};


const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SETOUTLETNAME":
      return { ...state, OutletName: action.payload };
    case "SETNAVSTATE":
      return { ...state, navState: action.payload };
    case "SETAKSES":
      return { ...state, aksespage: action.payload };
    case "SETUSERINFO":
      return { ...state, userinfo: action.payload };
    case "MOBILENUMBERERROR":
      return { ...state, toolTipmobilenumber: 'visible' };
    case "MOBILENUMBERFINE":
      return { ...state, toolTipmobilenumber: 'hidden' };
    case "EMAILERROR":
      return { ...state, toolTipemail: 'visible' };
    case "EMAILFINE":
      return { ...state, toolTipemail: 'hidden' };
    default:
      return state;
  }
};
export default combineReducers({
  reducer
});
