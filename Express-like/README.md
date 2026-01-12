# Mini Express-like Framework

## Overview
This project is a custom mini framework built from scratch using Node.js `http` module.  
It supports:

- Middleware chaining with `use()` and `next()`
- Error middleware `(err, req, res, next)`
- Basic routing: `get`, `post`, `put`, `delete`
- Route parameters: `/users/:id`
- Body parsing: `application/json` and `application/x-www-form-urlencoded`

The `app/` folder contains a demo API built using this framework.


   Manual Testing (commands)
Health
curl -i http://localhost:3000/health
JSON
curl -i -H "Content-Type: application/json" -d '{"a":1}' http://localhost:
3000/echo-json
Form
curl -i -H "Content-Type: application/x-www-form-urlencoded" -d
"name=John&age=25" http://localhost:3000/echo-form
Query
curl -i "http://localhost:3000/query?x=10&y=20"
Error
curl -i http://localhost:3000/boom

Note.
On window powershell we must use curl.exe for every testing url


