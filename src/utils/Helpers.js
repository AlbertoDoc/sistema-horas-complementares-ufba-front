export function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

export function validateUFBAEmail(email) {
  return email.endsWith('@ufba.br')
}

export function isOnlyNumbers(input) {
  return /^[0-9]+$/.test(input);
}

export function processErrorResponse(response) {
  if (!response || typeof response !== 'object' || !response.data) {
      return "Invalid response format.";
  }

  const { status, message, data } = response.data;


  let errorDetails = "";
  if (data && typeof data === "object") {
      errorDetails = Object.entries(data)
          .map(([field, error]) => `${field}: ${error}`)
          .join("; ");
  }

  return `${message}${errorDetails ? ". Details: " + errorDetails : ""}`;
}

/**
 * Verifica se uma string contém apenas números.
 * @param {string} input - A string a ser verificada.
 * @returns {boolean} - Retorna `true` se a string contém apenas números, caso contrário `false`.
 */
export function isNumeric(input) {
  const regex = /^\d+$/;
  return regex.test(input);
}

export function isUserLogged() {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken || accessToken == null || accessToken == undefined) {
    return false
  }

  return true
}