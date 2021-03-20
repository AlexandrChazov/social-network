import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
      "API-KEY": "b3c57f67-b4e1-4144-b0d1-08d0b81333e0"
    }
})

export const usersAPI = {
  getUsers(pageSize = 5, currentPage = 1) {
    return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => {
      return response.data
    })
  },
  unFollow(id) {
    return instance.delete(`follow/${id}`).then(response => {
      return response.data
    })
  },
  follow(id) {
    return instance.post(`follow/${id}`).then(response => {
      return response.data
    })
  }
}

