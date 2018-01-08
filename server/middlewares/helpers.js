const formatInputDatas = (req, res, next) => {
  const inputData = {};
  const inputKeys = Object.keys(req.body);
  for (let i = 0; i < inputKeys.length; i += 1) {
    if (typeof (inputKeys[i]) === 'string') {
      inputData[inputKeys[i].toLowerCase().trim()] = typeof (req.body[inputKeys[i]]) === 'string' ? req.body[inputKeys[i]].trim() : req.body[inputKeys[i]];
    }
  }
  res.locals.formattedInputs = inputData;
  next();
}

export default formatInputDatas;
