const createApp = require('../framework/createApp');
const jsonParser = require('../framework/middlewares/jsonParser');
const urlencodedParser = require('../framework/middlewares/urlencodedParser');

const app = createApp();
const users = [];

/* Logger middleware */
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(jsonParser());
app.use(urlencodedParser());

/* Routes */

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/echo-json', (req, res) => {
  res.json({ received: req.body });
});

app.post('/echo-form', (req, res) => {
  res.json({ received: req.body });
});

app.get('/query', (req, res) => {
  res.json({ query: req.query });
});

app.post('/users', (req, res) => {
  const user = {
    id: Date.now().toString(),
    ...req.body,
  };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  Object.assign(user, req.body);
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.status(204).send('');
});

app.get('/boom', (req, res, next) => {
  next(new Error('Boom'));
});

/* Error middleware */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
