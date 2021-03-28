import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
      "API-KEY": "b3c57f67-b4e1-4144-b0d1-08d0b81333e0"
    }
})

export const usersAPI = {
  getUsers(pageSize = 5, currentPage) {
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
  },
}

export const profileAPI = {
  getProfileInfo(userID) {
    return instance.get(`profile/${userID}`).then( response => {
      return response.data;
    })
  },
  getUserStatus(userID) {
    return instance.get(`profile/status/${userID}`).then( response => {
      return response.data;
    })
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status}).then(response => {
      return response.resultCode;
    })
  }
}

export const authAPI = {
  setUserData() {
    return instance.get(`auth/me`).then( response => {
      return response.data
    })
  }
}