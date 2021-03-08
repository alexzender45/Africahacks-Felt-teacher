/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import {
  Idata,
  LoginResponse,
  LoginResponseData,
  Teacher,
} from '../interfaces/interface'

export const loginTeacher = async (
  data: Idata,
  history: any
): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(
      'https://felt-teacher.herokuapp.com/api/login',
      data
    )
    const loginData: LoginResponseData = response.data.data
    const teacher: Teacher = loginData.teacher

    if (response.data.status === 'success') {
      localStorage.setItem('token', loginData.token)
      localStorage.setItem('teacher', JSON.stringify(teacher))
      history.push('/profile')
    }
  } catch (err) {
    alert('error logging in')
  }
}
