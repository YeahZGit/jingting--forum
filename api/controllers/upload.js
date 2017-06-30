var crypto = require('crypto');

var uploadController = {};

function getNewNameByHash() {
  var string = Date.now().toString().substring(5, 13)
  return crypto.createHash('md5').update(string).digest('hex');
}

uploadController.storagePicture = {
	destination: (req, file, callback) =>{
		callback(null, './upload/picture/');
	},
	filename: (req, file, callback) =>{
		var filenameArr = file.originalname.split('.');
		callback(null, getNewNameByHash() + '.' + filenameArr[filenameArr.length-1]);
	}
}

uploadController.handleResult = (req, res, next) =>{
	var path = req.file.path.replace('upload', '');
	res.success({url:path.replace(/\\/g,'/')});
}

module.exports = uploadController;