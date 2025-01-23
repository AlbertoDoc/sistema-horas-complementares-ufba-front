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

  if (status !== "fail") {
      return "No error to process.";
  }

  let errorDetails = "";
  if (data && typeof data === "object") {
      errorDetails = Object.entries(data)
          .map(([field, error]) => `${field}: ${error}`)
          .join("; ");
  }

  return `${message}${errorDetails ? ". Details: " + errorDetails : ""}`;
}