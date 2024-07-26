import {createSlice } from "@reduxjs/toolkit";
const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNumberOfLectures:0,
}

const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,actions)=>{
            state.courseSectionData=actions.payload
        },
        setEntireCourseData:(state,actions)=>{
            state.courseEntireData=actions.payload
        },
        setTotalNumberOfLectures:(state,actions)=>{
            state.totalNumberOfLectures=actions.payload
        },
        setCompletedLectures:(state,actions)=>{
            state.completedLectures=actions.payload
        },
        updateCompletedLectures:(state,actions)=>{
            state.completedLectures=[...state.completedLectures,actions.payload]
        }
    }
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNumberOfLectures,
    setCompletedLectures,
    updateCompletedLectures
}=viewCourseSlice.actions;

export default viewCourseSlice.reducer;