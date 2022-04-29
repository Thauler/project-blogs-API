const express = require('express');

const userRoute = require('./src/routes/user');
const loginRoute = require('./src/routes/login');
const categoryRoute = require('./src/routes/category');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);

app.use('/login', loginRoute);

app.use('/categories', categoryRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));