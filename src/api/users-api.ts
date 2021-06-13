import {UserType} from "../Types/types";
import {instance, PrimaryResponseType} from "./api";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
};

export const usersAPI = {
    getUsers(pageSize: number = 5, currentPage: number) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(response => {
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
