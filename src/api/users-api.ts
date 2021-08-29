import {UserType} from "../Types/types";
import {instance, PrimaryResponseType} from "./api";
import {FilterType} from "../redux/users-reducer";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
};

export const usersAPI = {
    getUsers(pageSize: number = 5, currentPage: number, filter: FilterType) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}&term=${filter.term}&friend=${filter.friend? filter.friend : ``}`).then(response => {
            return response.data
        })
    },
    unFollow(id: number) {
        return instance.delete<PrimaryResponseType>(`follow/${id}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post<PrimaryResponseType>(`follow/${id}`).then(response => {
            return response.data;
        });
    },
};
