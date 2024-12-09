# Task Management Application

## Objective

The objective is to build a task management application that allows users to effciently organize and manage tasks. Key features include:

1. User authentication (Sign up/Login). ✅
2. CRUD operations for tasks. ✅
3. Pagination or innite scrolling for task lists. ✅
4. Search functionality. ✅
5. Automatic notications for overdue tasks using Cron Jobs. ✅

---

#### Tools choosen:

1. Vite React(Proxy to avoid CORS during development)
2. Backend with tsx for typescript support
3. Dockerized ❌
4. Available on both Github/Lab(two upstreams)

---

### Requirements:

1. Backend with TS ✅
2. Task Management | CRUD | specified schema ✅
3. Pagination| Infinite Scrolling & Search (used react-query's useInfiniteQuery with intersection-observer, and search as client component to reduce number of req to server and complex query) ✅
4. SQl indexed with prisma from [docs](https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes#:~:text=The%20type%20argument%20is%20available,0%20and%20later.) ✅
5. Cron to shift from _pending_ status to _overdue_

6. Auth(SignIn and SignUp) with passportjs-jwt(no refresh token, need to relogin; avoided compelxity of refresh token for the context) ✅
7. Dashboard ✅
8. Task Form (react-hook-form ✅, zod validtion pendingg)

---

### Extras

1. Notification log in backend, no real time notification. ❌

---

# Setting Up

1. Setup backend

- set **.env** with specified variables in **.env.example** like **DATABASE_URL**.

```sh
cd server
pnpm i
pnpm seed
pnpm dev
```

2. Setup frontend

```sh
cd client
pnpm i
pnpm dev
```
Navigate to url specified in dev server as configured.