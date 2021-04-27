
const initialState = {
  fake: 0
}

export const fakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fake":
      return {...state, fake: state.fake + 1}
    default:
      return state
  }
}