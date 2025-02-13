import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

export function postEvaluation(requestId, approved, comment, approvedHours) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        "http://localhost:8000/api/v1/evaluation/submit/",
        {
          requestId: requestId,
          evaluatorId: localStorage.getItem("userId"),
          approved: approved,
          comment: comment,
          approvedHours: approvedHours,
          evaluationDate: new Date().toISOString()
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