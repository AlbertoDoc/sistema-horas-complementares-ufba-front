import axios from 'axios';
import { processErrorResponse } from '../utils/Helpers';

const baremaEndpoint = "http://localhost:8000/api/v1/barema/register";
const categoryEndpoint = "http://localhost:8000/api/v1/category/register";
const subCategoryEndpoint = "http://localhost:8000/api/v1/subCategory/register";
const activityEndpoint = "http://localhost:8000/api/v1/activity/register";

export function registerBarema(categories) {
  return new Promise((resolve, reject) => {
    createBarema()
    .then((response) => {
      const baremaId = response.id
      console.log(categories)

      categories.forEach(category => {
        console.log(category)
        createCategory(category.name, baremaId)
        .then((response) => {
          console.log(response)
          const categoryId = response.id

          category.subcategories.forEach(subcategory => {
            createSubCategory(subcategory.name, subcategory.maxHours, categoryId)
            .then(response => {
              console.log(response)
              const subCategoryId = response.id

              subcategory.activities.forEach(activity => {
                createActivity(activity.name, 0, activity.maxHours, activity.period, subCategoryId)
                .then(response => {
                  console.log(response)
                  resolve(response)
                })
              })
            })
            .catch(error => reject(error))
          })
        })
        .catch((error) => reject(error))
      });
    })
    .catch((error) => reject(error))
  }, 20000)
}

function createBarema() {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        baremaEndpoint,
        {
          courseId: localStorage.getItem("courseId"),
          creationYear: new Date().getFullYear(),
          categories: []
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

function createCategory(name, baremaId) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        categoryEndpoint,
        {
          name: name,
          baremaId: baremaId,
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

function createSubCategory(name, maxHours, categoryId) {
return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        subCategoryEndpoint,
        {
          name: name,
          maxHours: maxHours,
          categoryId: categoryId,
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

function createActivity(name, hours, maxHours, period, subCategoryId) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: { 'content-type': 'application/json' },
    };

    axios
      .post(
        activityEndpoint,
        {
          name: name,
          hours: hours,
          maxHours: maxHours,
          period: period,
          subCategoryId: subCategoryId,
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