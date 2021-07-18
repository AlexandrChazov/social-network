import {actions, follow, unFollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {PrimaryResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api');  // замокали объект "usersAPI", теперь это уже не тот "usersAPI" который мы импортировали, а фиктивный чтобы не обращаться к апишке, а тестировать лишь санку
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>; // это для TS, чтобы он не ругался будто-бы у "usersAPI" нет такого метода "mockReturnValue"

const dispatchMock = jest.fn();  // вместо метода dispatch будет использоваться не метод редакс-стора, а просто фиктивная функция
const getStateMock = jest.fn();  // вместо метода getState будет использоваться не метод редакс-стора, а просто фиктивная функция

// beforeEach(()=>{                      // очищать счётчик моков при запуске каждого нового теста, можно это и не
//    dispatchMock.mockClear();             // писать так как в любом случае вроде работает нормально
//     getStateMock.mockClear();
//     usersAPIMock.follow.mockClear();
//     usersAPIMock.unFollow.mockClear();
// })

const result: PrimaryResponseType = {    // этот объект вернётся при фиктивном обращении к апишке
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}

test("success follow thunk", async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));   // при обращении к методу "follow" фиктивной апишки вернуть объект "result"

    const thunk = follow(1);
    await thunk(dispatchMock, getStateMock, {});   // можно передать только "dispatchMock", остальные два параметра сугубо для TS

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 1));  // первый диспатч вызовет экшн toggleFollowing с аргументами "true" и "1"
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));                   // второй диспатч вызовет экшн followSuccess с аргументом "1"
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 1)); // третий диспатч вызовет экшн toggleFollowing с указанными аргументами
})

test("success unFollow thunk", async () => {
    usersAPIMock.unFollow.mockReturnValue(Promise.resolve(result)); // при обращении к методу "unFollow" фиктивной апишки вернуть объект "result"

    const thunk = unFollow(1);
    await thunk(dispatchMock, getStateMock, {});   // можно передать только "dispatchMock", остальные два параметра сугубо для TS

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 1));  // первый диспатч вызовет экшн toggleFollowing с аргументами "true" и "1"
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1));                   // второй диспатч вызовет экшн followSuccess с аргументом "1"
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 1)); // третий диспатч вызовет экшн toggleFollowing с указанными аргументами
})