import { configureStore } from '@reduxjs/toolkit'
import blogDataReducer from './blogDataSlice'

export default configureStore({  
  reducer: {
    blogData: blogDataReducer
  },
})