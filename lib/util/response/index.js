const success = {
  code: 200,
  message: 'Success'
}
const badRequest = {
  code: 400,
  message: 'Bad Request'
}
const notFound = {
  code: 404,
  message: 'Not Found'
}
const conflict = {
  code: 409,
  message: 'Conflict'
}
const forbidden = {
  code: 503,
  message: 'forbidden'
}

module.exports = {
  success,
  forbidden,
  notFound,
  conflict,
  badRequest
}