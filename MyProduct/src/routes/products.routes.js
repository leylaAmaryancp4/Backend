const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const parseUrl = require("../utils/parseUrl");
const sendResponse = require("../utils/sendResponse");
const bodyParser = require("../utils/bodyParser");

const filePath = path.join(__dirname, "../../data/products.json");

module.exports = async function (req, res) {
  const { resource, id } = parseUrl(req);
  if (resource !== "products") return;

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // GET /products
    if (req.method === "GET" && !id) {
      return sendResponse(res, 200, data);
    }

    // GET /products/:id
    if (req.method === "GET" && id) {
      const product = data.find(p => p.id === id);
      if (!product) {
        return sendResponse(res, 404, { message: "Product not found" });
      }
      return sendResponse(res, 200, product);
    }

    // POST /products
    if (req.method === "POST" && !id) {
      const body = await bodyParser(req);

      if (
        !body.title ||
        typeof body.price !== "number" ||
        typeof body.inStock !== "boolean"
      ) {
        return sendResponse(res, 400, { message: "Invalid product data" });
      }

      const now = new Date().toISOString();

      const newProduct = {
        id: crypto.randomUUID(),
        title: body.title,
        price: body.price,
        inStock: body.inStock,
        createdAt: now,
        updatedAt: now,
      };

      data.push(newProduct);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return sendResponse(res, 201, newProduct);
    }

    // PUT /products/:id
    if (req.method === "PUT" && id) {
      const body = await bodyParser(req);
      const index = data.findIndex(p => p.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: "Product not found" });
      }

      if (
        !body.title ||
        typeof body.price !== "number" ||
        typeof body.inStock !== "boolean"
      ) {
        return sendResponse(res, 400, { message: "Invalid product data" });
      }

      data[index] = {
        ...data[index],
        title: body.title,
        price: body.price,
        inStock: body.inStock,
        updatedAt: new Date().toISOString(),
      };

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return sendResponse(res, 200, data[index]);
    }

    // PATCH /products/:id
    if (req.method === "PATCH" && id) {
      const body = await bodyParser(req);
      const product = data.find(p => p.id === id);

      if (!product) {
        return sendResponse(res, 404, { message: "Product not found" });
      }

      if (body.price !== undefined && typeof body.price !== "number") {
        return sendResponse(res, 400, { message: "Invalid price" });
      }

      if (body.inStock !== undefined && typeof body.inStock !== "boolean") {
        return sendResponse(res, 400, { message: "Invalid inStock value" });
      }

      Object.assign(product, body, {
        updatedAt: new Date().toISOString(),
      });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return sendResponse(res, 200, product);
    }

    // DELETE /products/:id
    if (req.method === "DELETE" && id) {
      const index = data.findIndex(p => p.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: "Product not found" });
      }

      data.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return sendResponse(res, 204);
    }

    return sendResponse(res, 405, { message: "Method Not Allowed" });

  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, { message: "Server error" });
  }
};
