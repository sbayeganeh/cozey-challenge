# Cozey Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite

### 2. Install npm dependencies

```
npm i
```


### 3. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from [`prisma/seed.js`](./prisma/seed.js).
Run the following command and select yes when prompted

```
npx prisma migrate dev --name init && npx prisma db push --force-reset  && npx prisma db seed
```

### 4. Start the app

```
npm run dev
```

The app is now running, navigate to the address shown in the terminal in your browser to explore the assignment.

### 5. Running tests

```
./node_modules/mocha/bin/mocha.js
```