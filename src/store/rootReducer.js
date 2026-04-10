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
});