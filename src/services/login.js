import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function login(email, password) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email: email,
          password: password
        },
        reqConfig,
      )
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          localStorage.clear()
          localStorage.setItem("accessToken", response.data.data.token)
          localStorage.setItem("role", response.data.data.role)
          localStorage.setItem("courseId", response.data.data.courseId)
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response)
        reject(processErrorResponse(error.response));
      });
  }, 20000);
}