import { createSlice } from '@reduxjs/toolkit'

export const blogDataSlice = createSlice({
  name: 'blogData',
  initialState: {
    blogs: {}
  },
  reducers: {
    addBlogData: (state, action) => {
      state.blogs[action.payload.blogId] = action.payload.blogData
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBlogData } = blogDataSlice.actions

export default blogDataSlice.reducer