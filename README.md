# To-Do List

## Technology Stack / 技術スタック

+ [Next.js 13](https://nextjs.org/docs/app/building-your-application) (App Router)
+ TypeScript
+ [Material UI](https://mui.com/material-ui/)
+ [Zod](https://zod.dev/) for validation
+ MongoDB ([Mongoose](https://mongoosejs.com/))

## Quick Start

### Dev

```sh
# Set local env variable
cp .env.example .env.local

# Run MongoDB, MongoDB's admin board http://127.0.0.1:8081/ user/password(demo/demo)
docker-compose up -d

# Run Server
npm run dev
```

### Prod

```sh
# Set env

# Build
npm run build

# Run Server
npm run start
```
