import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType = {
    users: [
        {
            id: 0, name: "Person0", followed: false, status: "hello", photos: {large: undefined, small: undefined}
        },
        {
            id: 1, name: "Person1", followed: false, status: "hello", photos: {large: undefined, small: undefined}
        },
        {
            id: 2, name: "Person2", followed: true, status: "hello", photos: {large: undefined, small: undefined}
        },
        {
            id: 3, name: "Person3", followed: true, status: "hello", photos: {large: undefined, small: undefined}
        }
    ],
    usersPerPage: 100,
    currentPageNumber: 1,
    totalUsersCount: 0,
    isFetching: true,
    usersWithToggleFollowing: [],
    countOfDisplayingPages: 10
}


describe("Users Reducer tests", () => {

    test("follow success", () => {
        const newState = usersReducer(state, actions.followSuccess(1));
        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeTruthy();
    })

    test("unFollow success", () => {
        const newState = usersReducer(state, actions.unFollowSuccess(2));
        expect(newState.users[1].followed).toBeFalsy();
        expect(newState.users[2].followed).toBeFalsy();
    })

})