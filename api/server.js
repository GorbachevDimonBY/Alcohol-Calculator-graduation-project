const express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	dataFile = 'drinks.json',
	app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/drink/:id', (req, res) => {
	const data = getDrinksFromDB(),
		drink = data.find(drink => drink.id === req.params.id);

	res.send(drink);
});

app.get('/api/drinks', (req, res) => {
	res.send(getDrinksFromDB());
});

app.post('/api/drink', (req, res) => {
	const data = getDrinksFromDB(),
		drink = req.body;

	drink.id = shortId.generate();
	drink.alcohol = drink.alcohol;
	drink.dose = drink.dose;
	drink.value = drink.value;

	data.push(drink);
	setDrinksToDB(data);

	res.send(drink);
});

app.put('/api/drink/:id', (req, res) => {
	const data = getDrinksFromDB(),
		drink = data.find(drink => drink.id === req.params.id),
		updatedDrink = req.body;

	drink.alcohol = updatedDrink.alcohol;
	drink.dose = updatedDrink.dose;
	drink.value = updatedDrink.value;

	setDrinksToDB(data);

	res.sendStatus(204);
});

app.delete('/api/drink/:id', (req, res) => {
	const data = getDrinksFromDB(),
		updatedData = data.filter(drink => drink.id !== req.params.id);

	setDrinksToDB(updatedData);

	res.sendStatus(204);
});

function getDrinksFromDB() {
	return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function setDrinksToDB(data) {
	fs.writeFileSync(dataFile, JSON.stringify(data));
}

app.listen(3100, () => console.log('Server has been started...'));