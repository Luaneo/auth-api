# auth-api

### Environment requirements

`.env` file requires the `DATABASE_URL` key

`db.env` file requires the following keys:

- POSTGRES_PASSWORD
- POSTGRES_USER
- POSTGRES_DB

### Spinning up a Docker compose stack

```
docker compose up --build
```

## Available routes

The following HTTP routes are available using port 13000

### `api/register`

Request payload schema:

```ts
{
    username: string;
    email: string;
    password: string;
}
```

Response (code 201) payload schema:

```ts
{
    message: "User registered successfully";
}
```

Response (code 400) payload schema:

```ts
{
    message: "User already exists"
}
```

Response (code 500) payload schema:

```ts
{
    message: "Internal server error"
}
```

### `api/login`

Request payload schema:

```ts
{
    email: string;
    password: string;
}
```

Response (code 200) payload schema:

```ts
{
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
{
    message: "User not found" | "Invalid password";
}
```
