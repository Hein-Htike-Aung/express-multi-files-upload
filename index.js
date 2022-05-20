const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname),
		);
	},
});

var upload = multer({ storage: storage });

var multipleUpload = upload.fields([
	{ name: 'file1', maxCount: 1 },
	{ name: 'file2', maxCount: 8 },
]);

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', multipleUpload, (req, res) => {
	if (req.files) {
		console.log('files uploaded');
		console.log(req.files);
		res.json({ message: 'successfully uploaded' });
	}
});

app.listen(PORT, () => {
	console.log(`App is listening on Port ${PORT}`);
});
