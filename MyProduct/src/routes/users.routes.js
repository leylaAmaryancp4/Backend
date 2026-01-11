const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const parseUrl = require('../utils/parseUrl');
const sendResponse = require('../utils/sendResponse');
const bodyParser = require('../utils/bodyParser');

const filePath = path.join(__dirname, '../../data/users.json');

module.exports = async function (req, res) {
  const { resource, id } = parseUrl(req);
  if (resource !== 'users') return;

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // GET /users
    if (req.method === 'GET' && !id) {
      return sendResponse(res, 200, data);
    }

    // GET /users/:id
    if (req.method === 'GET' && id) {
      const user = data.find(u => u.id === id);
      if (!user) {
        return sendResponse(res, 404, { message: 'User not found' });
      }
      return sendResponse(res, 200, user);
    }

    // POST /users
    if (req.method === 'POST' && !id) {
      const body = await bodyParser(req);

      if (!body.name || !body.email || !body.role) {
        return sendResponse(res, 400, { message: 'Missing fields' });
      }

      if (data.some(u => u.email === body.email)) {
        return sendResponse(res, 400, { message: 'Email must be unique' });
      }

      const now = new Date().toISOString();

      const newUser = {
        id: crypto.randomUUID(),
        name: body.name,
        email: body.email,
        role: body.role,
        createdAt: now,
        updatedAt: now,
      };

      data.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return sendResponse(res, 201, newUser);
    }

    // DELETE /users/:id
    if (req.method === 'DELETE' && id) {
      const index = data.findIndex(u => u.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: 'User not found' });
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
