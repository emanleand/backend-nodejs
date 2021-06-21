const allowedExtensions = [
  'jpeg',
  'png',
  'jpg',
  'gif'
];

const validateExtensions = (extension) => {
  return allowedExtensions.includes(extension);
}

module.exports = {
  validateExtensions
}