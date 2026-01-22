# E-commerce App

## Overview
A basic e-commerce application built with Next.js 16, React 19, Prisma ORM, and SQLite database. The app is in Spanish and includes panels for Products (Productos), Orders (Pedidos), and Users (Usuarios).

## Tech Stack
- **Frontend**: Next.js 16.1.4, React 19.2.3, TailwindCSS 4
- **Database**: SQLite with Prisma ORM 5.15.0
- **Language**: TypeScript

## Project Structure
```
ecommerce-app/
  src/
    app/           # Next.js App Router pages
      api/         # API routes
      orders/      # Orders page
      products/    # Products page
      users/       # Users page
    lib/
      prisma.ts    # Prisma client singleton
  prisma/
    schema.prisma  # Database schema
    dev.db         # SQLite database file
```

## Database Schema
- **User**: id, name, email, role, orders, createdAt
- **Product**: id, name, description, price, stock, imageUrl, orders, createdAt
- **Order**: id, userId, productId, quantity, status, createdAt

## Environment Variables
- `SQLITE_URL`: SQLite database connection URL (file:./dev.db)

## Development
Run the development server:
```bash
cd ecommerce-app && SQLITE_URL="file:./dev.db" npm run dev -- -p 5000 -H 0.0.0.0
```

## Prisma Commands
- Generate client: `npx prisma generate`
- Push schema: `npx prisma db push`
- Run migrations: `npx prisma migrate dev`
