
# MemoAI: Your Intelligent Knowledge Hub (React + Vite)

This is a React + Vite starter project for MemoAI, an intelligent knowledge hub application, built in Firebase Studio.

To get started:

1.  **Install Dependencies**: If you haven't already, open your terminal in the project folder and run `npm install` (or `yarn install` if you use Yarn). This will update your `node_modules` based on the `package.json`.
2.  **Run Development Server**: After installing dependencies, run `npm run dev` (or `yarn dev`) to start the Vite development server and preview the application.
3.  **Explore the Code**: The main application component is `src/App.tsx`. Components for different sections of the landing page are located in `src/app/(components)/`. AI-related flows using Genkit are in `src/ai/flows/`.

## Project Structure

-   `public/`: Static assets.
-   `src/`: Source code for the application.
    -   `ai/`: Genkit AI flows and configuration.
    -   `app/(components)/`: React components for different sections of the landing page.
    -   `components/ui/`: Reusable UI components (e.g., from ShadCN).
    -   `hooks/`: Custom React hooks.
    -   `lib/`: Utility functions.
    -   `App.tsx`: Main application component that lays out the page.
    -   `main.tsx`: Entry point for the React application, sets up React Router.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `index.html`: The main HTML file for the Vite application.
-   `vite.config.ts`: Vite configuration file.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `tsconfig.json`: TypeScript configuration for the project.

Enjoy building with MemoAI!
