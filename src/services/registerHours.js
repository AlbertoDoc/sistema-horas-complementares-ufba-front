import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function registerHours(category, requestedHours, subcategory, activity, startDate, endDate, observations, documents) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        "http://localhost:8000/api/v1/request/register",
        {
          categoryId: category,
          subCategoryId: subcategory,
          activityId: activity,
          activityStartDate: startDate,
          activityEndDate: endDate,
          submissionDate: new Date(),
          studentComment: observations,
          requestedHours: requestedHours,
          userId: localStorage.getItem("userId"),
          documents: documents
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