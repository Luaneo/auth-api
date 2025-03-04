# auth-api

### Environment requirements

`.env` file requires the `DATABASE_URL` key

`db.env` file requires the following keys:

- `POSTGRES_PASSWORD`
- `POSTGRES_USER`
- `POSTGRES_DB`

### Spinning up a Docker compose stack

```
docker compose up --build
```

## Available routes

The following HTTP routes are available using port 13000

### `api/register`

Request payload schema:

```ts
type _ = {
    username: string;
    email: string;
    password: string;
}
```

Response (code 201) payload schema:

```ts
type _ = {
    message: "User registered successfully";
}
```

Response (code 400) payload schema:

```ts
type _ = {
    message: "User already exists";
} | {
    message: "Validation error";
    error: string;
}
```

Response (code 500) payload schema:

```ts
type _ = {
    message: "Internal server error";
}
```

### `api/login`

Request payload schema:

```ts
type _ = {
    email: string;
    password: string;
}
```

Response (code 200) payload schema:

```ts
type _ = {
    message: "Login successful";
    user: {
        id: number;
        username: string;
        email: string;
    }
}
```

Response (code 400) payload schema:
```ts
type _ = {
    message: "User not found" | "Invalid password";
} | {
    message: "Validation error";
    error: string;
}
```
