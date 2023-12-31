
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'horror'},
    {id: 3, name: 'romance'},
]

app.get('/', (req, res) => {
    res.send('Welcome to vidly!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with this ID does not exist.');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
        
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(g => g.id === genreId);

    if (!genre) return res.status(404).send('The genre with this ID does not exist.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(g => g.id === genreId);

    if (!genre) return res.status(404).send('The genre with this ID does not exist.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    };
    
    return Joi.validate(genre, schema);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));