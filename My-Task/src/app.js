const fs = require('fs');
const path = require('path');
const PORT = 3001;
  const filePath = path.join(__dirname, '../data.json')
  

  module.exports = async function (req, res) {
    const { resource, id } = parseUrl(req);
    if (resource !== 'tasks') return;
  
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
      // GET /u
      if (req.method === 'GET' && !id) {
        return sendResponse(res, 200, data);
      } 
  
      
      if (req.method === 'GET' && id) {
        const task  = data.find(u => u.id === id);
        if (!task) {
          return sendResponse(res, 404, { message: 'task not found' });
        }
        return sendResponse(res, 200, task);
      }
  
      // POST /
      if (req.method === 'POST' && !id) {
        const body = await bodyParser(req);
  
 const now = new Date().toISOString();
  
        const newTask = {
          id: crypto.randomUUID(),
         title: "Learn Express",
         completed:false,
         description: "Build a REST API using Express",
          createdAt: now,
          createAt: now
        };
  
        data.push(newUser);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
        return sendResponse(res, 201, newTask);
      }
  
      // DELETE 
      if (req.method === 'DELETE' && id) {
        const index = data.findIndex(u => u.id === id);
  
        if (index === -1) {
          return sendResponse(res, 404, { message: 'task not found' });
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
  

