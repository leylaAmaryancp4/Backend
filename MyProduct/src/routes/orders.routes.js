const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const parseUrl = require('../utils/parseUrl');
const sendResponse = require('../utils/sendResponse');
const bodyParser = require('../utils/bodyParser');

const filePath = path.join(__dirname, '../../data/orders.json');

const VALID_STATUSES = ['pending', 'completed', 'cancelled'];

module.exports = async function (req, res) {
  const { resource, id } = parseUrl(req);

  if (resource !== 'orders') return;

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // GET /orders
    if (req.method === 'GET' && !id) {
      return sendResponse(res, 200, data);
    }

    // GET /orders/:id
    if (req.method === 'GET' && id) {
      const order = data.find(o => o.id === id);
      if (!order) {
        return sendResponse(res, 404, { message: 'Order not found' });
      }
      return sendResponse(res, 200, order);
    }

    // POST /orders
    if (req.method === 'POST' && !id) {
      const body = await bodyParser(req);

      if (
        !body.title ||
        typeof body.amount !== 'number' ||
        body.amount <= 0 ||
        !VALID_STATUSES.includes(body.status)
      ) {
        return sendResponse(res, 400, { message: 'Invalid order data' });
      }

      const now = new Date().toISOString();

      const newOrder = {
        id: crypto.randomUUID(),
        title: body.title,
        amount: body.amount,
        status: body.status,
        createdAt: now,
        updatedAt: now,
      };

      data.push(newOrder);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return sendResponse(res, 201, newOrder);
    }

    // PUT /orders/:id
    if (req.method === 'PUT' && id) {
      const body = await bodyParser(req);
      const index = data.findIndex(o => o.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: 'Order not found' });
      }

      if (
        !body.title ||
        typeof body.amount !== 'number' ||
        body.amount <= 0 ||
        !VALID_STATUSES.includes(body.status)
      ) {
        return sendResponse(res, 400, { message: 'Invalid order data' });
      }

      data[index] = {
        ...data[index],
        title: body.title,
        amount: body.amount,
        status: body.status,
        updatedAt: new Date().toISOString(),
      };

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return sendResponse(res, 200, data[index]);
    }

    // PATCH /orders/:id
    if (req.method === 'PATCH' && id) {
      const body = await bodyParser(req);
      const order = data.find(o => o.id === id);

      if (!order) {
        return sendResponse(res, 404, { message: 'Order not found' });
      }

      if (body.amount !== undefined && (typeof body.amount !== 'number' || body.amount <= 0)) {
        return sendResponse(res, 400, { message: 'Invalid amount' });
      }

      if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
        return sendResponse(res, 400, { message: 'Invalid status' });
      }

      Object.assign(order, body, {
        updatedAt: new Date().toISOString(),
      });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return sendResponse(res, 200, order);
    }

    // DELETE /orders/:id
    if (req.method === 'DELETE' && id) {
      const index = data.findIndex(o => o.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: 'Order not found' });
      }

      data.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return sendResponse(res, 204);
    }

    return sendResponse(res, 405, { message: 'Method Not Allowed' });

  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, { message: 'Server error' });
  }
};
