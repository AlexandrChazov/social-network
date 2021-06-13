const initialState = {
  fake: 0
}

const fakeReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "fake":
      return {...state, fake: state.fake + 1}
    default:
      return state
  }
}

export default fakeReducer;


type InitialStateType = typeof initialState
