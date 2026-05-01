import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import franchiseReducer from "./slices/franchiseSlice";
import staffReducer from "./slices/staffSlice";
import itemReducer from "./slices/itemSlice";
import pdfReducer from "./slices/pdfSlice";
import notificationReducer from "./slices/notificationSlice";
import pagesReducer from "./slices/pagesSlice";
import qrReducer from "./slices/qrSlice";
import feedbackReducer from "./slices/feedbackSlice";
import bankReducer from "./slices/bankSlice";
import mobileAlertReducer from "./slices/mobileAlertSlice";
import checklistReducer from "./slices/checklistSlice";
import storeReducer from "./slices/storeSlice";
import appUserReducer from "./slices/appUserSlice";
import inventoryMasterReducer from "./slices/inventoryMasterSlice";
import issueReducer from "./slices/issueSlice";

export default combineReducers({
  auth: authReducer,
  order: orderReducer,
  franchise: franchiseReducer,
  staff: staffReducer,
  item: itemReducer,
  pdf: pdfReducer,
  notification: notificationReducer,
  pages: pagesReducer,
  qr: qrReducer,
  feedback: feedbackReducer,
  bank: bankReducer,
  mobileAlert: mobileAlertReducer,
  checklist: checklistReducer,
  store: storeReducer,
  appUser: appUserReducer,
  inventoryMaster: inventoryMasterReducer,
  issue: issueReducer,
});
