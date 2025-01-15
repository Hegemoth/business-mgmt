const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const nonRegExpKeys = ['firstName', 'lastName', 'name'];
const jsonServerConditions = ['lte', 'gte', 'ne'];

server.use('/api', (req, res, next) => {
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
      const [customKey, condition] = key.split('_');

      if (jsonServerConditions.includes(condition)) {
        req.query[`${customKey}_${condition}`] = value;
      } else if (nonRegExpKeys.includes(key)) {
        req.query[key] = new RegExp(value, 'i');
      } else {
        req.query[key] = value;
      }
    });
  }

  if (req.query.s) {
    req.query._sort = req.query.s.startsWith('-') ? req.query.s.slice(1) : req.query.s;
    req.query._order = req.query.s.startsWith('-') ? 'desc' : 'asc';
  }

  req.query._limit = Number(req.query.limit) || 10;
  req.query._start = Number(req.query.offset) || 0;

  req.pagination = {
    limit: req.query._limit,
    offset: req.query._start,
  };

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
        limit: req.pagination.limit,
        offset: req.pagination.offset,
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
  console.log('JSON Server is running on http://localhost:3000/api');
});
