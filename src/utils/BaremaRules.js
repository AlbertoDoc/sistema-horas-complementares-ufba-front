export function isBaremaEmpty(categories) {
  return categories === null || categories === undefined || categories.length === 0;
}

export function isCategoryNameEmpty(category) {
  if (category.name === "") {
    return true;
  }

  return false;
}

export function isSubCategoryNameEmpty(subCategory) {
  if (subCategory.name === "") {
    return true;
  }

  return false;
}

export function isSubCategoryMaxHoursLessOrEqualZero(subCategory) {
  if (subCategory.maximoHoras <= 0) {
    return true;
  }

  return false;
}

export function isActivityNameEmpty(activity) {
  if (activity.name === "") {
    return true;
  }

  return false;
}

export function isActivityHoursLessOrEqualZero(activity) {
  if (activity.cargaHoraria <= 0) {
    return true;
  }

  return false;
}

export function isActivitiesHoursGreaterThanSubCategoriesMaxHours(subCategory) {
  let subCategoryMaxHour = Number(subCategory.maximoHoras)
  var hourCounter = 0

  subCategory.activities.map((activity) => {
    hourCounter += Number(activity.cargaHoraria)
  })

  return hourCounter > subCategoryMaxHour
}