const allowedExtensions = [
  'jpeg',
  'png',
  'jpg',
  'gif'
];

const validateExtensions = (extension) => {
  return allowedExtensions.includes(extension);
}

const getExtensions = (file) => {
  const filename = file.image.path.split('/')[1];
  const extensions = filename.split('.')[1];
  return extensions;
}

const getFilename = (file) => {
  return file.image.path.split('/')[1];
}

module.exports = {
  validateExtensions,
  getExtensions,
  getFilename
}