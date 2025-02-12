import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function getRequestsByUserId() {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .get(
        `http://localhost:8000/api/v1/request/${localStorage.getItem("userId")}/${localStorage.getItem("role")}`,
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