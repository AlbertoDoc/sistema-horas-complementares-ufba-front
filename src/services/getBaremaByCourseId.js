import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function getBaremaByCourseId() {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .get(
        `http://localhost:8000/api/v1/barema/${localStorage.getItem("courseId")}`,
        reqConfig,
      )
      .then((response) => {
        console.log(response)
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