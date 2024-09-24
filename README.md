# Fleet - Study Case

This is an example monorepo with a simple Express backend and React frontend.
To keep things simple the monorepo is handle with npm workspaces.

## React App

### Get Started

- This project has been developped and tested with `node 22.9.0`
- You need an API key from https://developer.themoviedb.org and set `API_READ_ACCESS_TOKEN` environment variable on your host

1. Install dependencies

```
npm install
```

2. You can create a `.env` file at the root of the repository to set `NODE_ENV` and
   `API_READ_ACCESS_TOKEN` environment variables

```bash
NODE_ENV=production // will run the app in development mode if not set to "production"
API_READ_ACCESS_TOKEN=put_your_api_read_access_token_here // https://developer.themoviedb.org/docs/getting-started
```

3. Local dev mode with hot-reloading

```
npm run dev
```

4. (For production only) Build and start for deployment

```
npm run build
npm run start
```

## SQL Database

### Get started
