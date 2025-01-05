const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

let l = null;
let o = 0;

server.use((req, res, next) => {
  const orgId = req.headers['x-org-id'];

  if (orgId) {
    req.query.orgId = orgId;
  }

  if (orgId && req.method === 'POST') {
    req.body.orgId = orgId;
  }

  if (req.query.f && req.query.f.length) {
    const filters = req.query.f.split(',');
    filters.forEach((f) => {
      const [key, value] = f.split(':');
      req.query[key] = value;
    });
  }

  if (req.query.s) {
    req.query._sort = req.query.s.startsWith('-')
      ? req.query.s.slice(1)
      : req.query.s;
    req.query._order = req.query.s.startsWith('-') ? 'desc' : 'asc';
  }

  if (req.query.limit) {
    req.query._limit = req.query.limit;
  }

  if (req.query.offset) {
    req.query._start = req.query.offset;
  }

  l = Number(req.query.limit) || null;
  o = Number(req.query.offset) || 0;

  next();
});

server.use('/api', (req, res, next) => {
  const originalSend = res.send;

  res.send = (data) => {
    const parsedData = JSON.parse(data);

    if (Array.isArray(parsedData)) {
      const response = {
        items: parsedData,
        total: Number(res.getHeader('X-Total-Count')) || 0,
        limit: l,
        offset: o,
      };

      originalSend.call(res, JSON.stringify(response));
    } else {
      originalSend.call(res, data);
    }
  };

  next();
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
