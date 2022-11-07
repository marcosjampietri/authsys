import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./index";

export interface klassType {
  name: string;
  url: string;
  description: string;
  duration: string;
}
interface klassState {
  Klass: klassType;
}
const initialState = {
  Klass: {
    name: "How to Coffin Meme Filter",
    url: "https://www.youtube.com/embed/Sq93OwYGHvE",
    description: "lorem ispum dolor amet",
    duration: "5min",
  },
} as klassState;

const courseSlicer = createSlice({
  name: "course",
  initialState,
  reducers: {
    // setKlass(state, action: PayloadAction<string>) {
    //   state.Klass = action.payload;
    // },
    setKlass: (state, { payload }: PayloadAction<klassType>) => {
      return {
        ...state,
        Klass: {
          name: payload.name,
          url: payload.url,
          description: payload.description,
          duration: payload.duration,
        },
      };
    },
  },
});

export const { setKlass } = courseSlicer.actions;
export const selectCourses = (state: AppState) => <klassState>state.course;
export default courseSlicer.reducer;
