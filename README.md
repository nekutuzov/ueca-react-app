# UECA-React App Template

A minimal, production-ready template for building web applications with [UECA-React](https://www.npmjs.com/package/ueca-react).

## What's Included

This template provides everything you need to start building with UECA-React:

- **Core Infrastructure**: Complete application lifecycle, routing, and message bus
- **Component Library**: Pre-built UI components following UECA patterns
- **Layout System**: App layout with collapsible sidebar navigation
- **TypeScript Configuration**: Optimized setup for UECA-React development
- **Development Tools**: Vite dev server, ESLint configuration, and build scripts

## Quick Start

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5001

### Build

Build for production:

```bash
npm run build
```

### Lint

Check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── screens/          # Application screens
│   └── home/        # Home screen example
├── components/      # Reusable UI components
│   ├── base/       # Base component patterns
│   ├── buttons/    # Button components
│   ├── inputs/     # Form input components
│   ├── navigation/ # Navigation components
│   └── ...         # Other component categories
├── core/           # Application infrastructure
│   ├── appLayout/  # App layout and navigation
│   └── infrastructure/ # Routing, messaging, theming
└── api/            # API clients and mocks
```

## Creating Your First Screen

1. **Create a new screen file** in src/screens/:

```typescript
// src/screens/myScreen/myScreen.tsx
import * as UECA from "ueca-react";
import { ScreenBaseModel, useScreenBase } from "@components";

function useMyScreen(params) {
    const struct = {
        props: { id: useMyScreen.name },
        View: () => <div>My Screen Content</div>
    };
    
    const model = useScreenBase(struct, params);
    return model;
}

export const MyScreen = UECA.getFC(useMyScreen);
```

2. **Add route** in src/core/infrastructure/appRoutes.tsx:

```typescript
const screenRoutes = {
    "/my-screen": () => <MyScreen id={"myScreen"} />,
    // ... existing routes
};
```

3. **Add menu item** in src/core/appLayout/appMenu.tsx:

```typescript
children: {
    myMenuItem: useMenuItem({
        text: "My Screen",
        route: { path: "/my-screen" },
        icon: <MyIcon />
    }),
}
```

## Path Aliases

Configured in 	sconfig.app.json:

- @components → src/components
- @core → src/core
- @api → src/api
- @screens → src/screens

## UECA-React Principles

Every component follows the same structure:

- **Properties**: Configuration and state
- **Events**: Automatic onChange events
- **Methods**: Component behavior
- **Messages**: Decoupled communication via message bus
- **View**: React JSX rendering

## Development Guidelines

- Use UECA component patterns (no React hooks or class components)
- Follow the established component structure
- Keep components pure and predictable
- Use message bus for cross-component communication
- Maintain TypeScript compatibility

## Resources

- **UECA-React Framework**: [GitHub Repository](https://github.com/nekutuzov/ueca-react-npm)
- **NPM Package**: [ueca-react](https://www.npmjs.com/package/ueca-react)
- **Local Documentation**: `node_modules/ueca-react/docs/index.md` - Complete framework reference
- **Example Applications**:
  - [Main Reference Implementation](https://github.com/nekutuzov/ueca-react-app)
  - [Demo Application 1](https://github.com/nekutuzov/ueca-react-app-demo1) - [Live Demo](https://nekutuzov.github.io/ueca-react-app-demo1)
  - [Demo Application 2](https://github.com/nekutuzov/ueca-react-app-demo2)

## License

MIT

---

**Ready to build?** Start by exploring the home screen and creating your first custom component!
