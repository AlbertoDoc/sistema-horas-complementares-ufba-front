import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

const baremaEndpoint = "http://localhost:8000/api/v1/barema/register";
const categoryEndpoint = "http://localhost:8000/api/v1/auth/login";
const subCategoryEndpoint = "http://localhost:8000/api/v1/auth/login";
const activityEndpoint = "http://localhost:8000/api/v1/auth/login";

export function registerBarema(categories) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        baremaEndpoint,
        {
          courseCode: localStorage.getItem("courseId"),
          creationYear: new Date().getFullYear(),
          categories: categories
        },
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