# Overview
This is a skeleton JS backend application to be used for testing interview candidate's FE application development skills in any framework or vanilla JS.

See the swagger definition for details about its capabilities.

# Prerequisites
- Node >= 14.15

# Build
```bash
npm install
```

# Usage
```bash
npm start
```

You can modify the contents of the `start` script with the following parameters 

```bash
node index.js [--port] [--auth] [--async]
```

`--port`: Change the port to run the server by default 3000.

`--auth`: Run the server with authentication enabled requiring authorization headers with bearer tokens. This will also allow login, registration and checking the user profiles.

`--async`: Specify file processing to be asynchronous to simulate real life scenarios with expensive cloud operations.

`--verbose`: Enable more verbose logging for debugging and testing

`--noreadme`: Only for candidates to disable opening home page automatically

The port for all the features described next is also updated accordingly based on the previous configuration

# Documentation
Swagger documentation is available on http://localhost:3000/api-docs


# Test
```bash
npm run test


