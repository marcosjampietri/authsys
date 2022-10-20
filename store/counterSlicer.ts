import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './index'

interface CounterState {
    count: number
}
const initialState = { count: 0 } as CounterState

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.count += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectNodes = (state: AppState) => state.nodes.list;
export default counterSlice.reducer

