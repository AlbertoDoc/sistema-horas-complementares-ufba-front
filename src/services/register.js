import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function register(firstName, lastName, email, role, courseId, password, confirmPassword, enrollmentNumber) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        "http://localhost:8000/api/v1/auth/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          courseId: courseId,
          password: password,
          confirmPassword: confirmPassword,
          enrollmentNumber: enrollmentNumber
        },
        reqConfig,
      )
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response)
        reject(processErrorResponse(error.response));
      });
  }, 20000);
}