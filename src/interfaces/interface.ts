export interface Idata {
  email: string
  password: string
}

export interface Teacher {
  fullname: string
  email: string
  phone: string
  _id: string
  status: string
  about: string
  image: string
  address: string
}

export interface LoginResponse {
  status: string
  message: string
  data: LoginResponseData
}

export interface LoginResponseData {
  teacher: Teacher
  token: string
}
