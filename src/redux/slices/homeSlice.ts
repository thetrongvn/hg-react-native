import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type HomeState = {
  value: number;
};

const initialState: HomeState = {
  value: 0,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = homeSlice.actions;

export default homeSlice.reducer;
