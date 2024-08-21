
# Usage

```bash
mustafa-server [--port] [--auth] [--async] [--verbose] [--noreadme]
```

`--port`: Specify the port to run the server by default 3000. All other server features will update the port accordingly.

`--auth`: Run the server with authentication enabled requiring authorization headers with bearer tokens. This will also allow login, registration and checking the user profiles.

`--async`: Specify file processing to simulate cloud operations that require an unknown amount of time to complete.

`--verbose`: Enable more verbose logging for debugging and testing

`--noreadme`: To disable the opening the [home page](http://localhost:3000/) automatically on server startup

# Documentation
Swagger is available on http://localhost:3000/api-docs

You can use Postman or swagger to test the endpoints


# Errors

Errors will contain codes to help identify them. Here is the full list

| Code | Type            | Rest status code | Use case                                                              |
|------|-----------------|------------------|-----------------------------------------------------------------------|
| 101  | unknownCause    | 500              | Generic error when there is not a specific one to handle the case     |
| 102  | unprocessable   | 400              | When the request has invalid data and can't be further processed      |
| 103  | unauthenticated | 401              | When there are no authentication credentials or those are expired     |
| 104  | notFound        | 404              | When the requested resource is not found                              |
| 105  | unauthorized    | 403              | When the user has no access to the resource but is authenticated      |
| 106  | conflict        | 400              | When there is a resource with the same data making processing illegal |
| 107  | fileError       | 500              | When there is an error processing image files                         |
| 108  | databaseError   | 500              | When the data access failed                                           |
| 109  | badCredentials  | 401              | When the credential used to authenticate are not valid                |
