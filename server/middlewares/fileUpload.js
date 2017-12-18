import multer from 'multer';

const upload = multer();

const handleImageUpload = (req, res, next) => {
  // Extract all the fiels named images and put them in a req.files array
  return upload.array('images');
};

export default handleImageUpload;
