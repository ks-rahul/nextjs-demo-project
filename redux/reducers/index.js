import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  authentication: authReducer,
  othersData: dataReducer,
});

export default rootReducer;
