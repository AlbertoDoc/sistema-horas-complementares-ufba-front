import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function getCourses() {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .get(
        "http://localhost:8000/api/v1/course/",
        reqConfig,
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response)
        reject(processErrorResponse(error.response));
      });
  }, 20000);
}