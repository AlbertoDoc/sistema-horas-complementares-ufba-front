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