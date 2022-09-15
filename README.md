# Timeline Web Component

The **Timeline Web Component** represents a sequence of tracks and events across a time span.

![Screenshot](packages/timeline/playground/assets/screenshot.png)

[![Open in StackBlitz][stackblitz-img]][stackblitz-url]

**[Timeline Documentation](packages/timeline#readme)**

## Project Structure

Inside of this project, you'll see the following folders and files:

```
/
└── packages/
    ├── Element/
    ├── TimelineElement/
    ├── WeakRef/
    └── useElementInternals/
```

This project uses **workspaces** to develop a single package, `timeline-web-component`.

It also includes a minimal Vite project for developing and demonstrating the component.

## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                       |
|:----------------|:---------------------------------------------|
| `npm install`   | Installs dependencies                        |
| `npm run start` | Starts local dev server at `localhost:3000`  |
| `npm run build` | Build all of the components in the project   |

[stackblitz-img]: https://img.shields.io/badge/-Open%20in%20Stackblitz-%231374EF?color=%23444&labelColor=%231374EF&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwIDggMTIgMTgiIGhlaWdodD0iMTgiIGZpbGw9IiNGRkYiPjxwYXRoIGQ9Ik0xMCAxNy42aDUuMmwtMyA3LjRMMjIgMTQuNGgtNS4ybDMtNy40TDEwIDE3LjZaIi8+PC9zdmc+&style=for-the-badge
[stackblitz-url]: https://stackblitz.com/github/jonathantneal/timeline-web-component?file=README.md&initialpath=/themed/
