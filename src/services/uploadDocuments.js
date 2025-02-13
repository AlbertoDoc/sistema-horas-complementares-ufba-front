import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';
import { toBase64 } from '../utils/Base64Helper';

export function uploadDocuments(files) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    return Promise.all(
      files.map(async file => {
        const base64File = await toBase64(file)
        console.log(new Date().toISOString())
        axios
        .post(
          "http://localhost:8000/api/v1/document/upload",
          {
            arquivo: base64File,
            dataUpload: new Date().toISOString(),
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
      })
    )
  }, 20000);
}