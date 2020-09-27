const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '69ff3333681a426da4275aa550341ed8'
});

const handleApiCall = (req,res) =>{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("Unable to run API"));

} 





const handleImage = (req,res, postgres)=>{
	const {id} = req.body;
	postgres('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("Cannot update entries"))
}

module.exports = {
	handleImage,
	handleApiCall
}