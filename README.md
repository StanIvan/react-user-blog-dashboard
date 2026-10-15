# Fern & Folio — User & Blog Dashboard

A React dashboard for browsing users and managing their blog posts. The project demonstrates a typed React application with reusable UI components, state management, client-side routing, and an interactive data table.

## Features

- Browse, sort, filter, and paginate a user list.
- Expand a user to see their blog posts.
- Create, edit, and delete blog posts.
- Delete users.
- Navigate directly to a blog post page.
- Switch between light and dark themes.
- Use a responsive interface with loading and confirmation states.

The app uses in-memory mock data from `src/data`. Changes are available while the app is running and reset when it is reloaded; no backend is required.

## Tech stack

- React and TypeScript
- Redux Toolkit
- Tailwind CSS with reusable Shadcn/UI-style components
- Radix UI primitives and Lucide icons
- React Router
- Jest and React Testing Library
- Webpack

The UI uses a light, soft-green palette by default, with an optional dark theme.
Shadcn-style components live in `src/common/ui` and can be customized locally.

## Getting started

Install dependencies and start the development server:

```sh
yarn install
yarn start
```

Run the test suite and lint checks:

```sh
yarn test
yarn lint
```
