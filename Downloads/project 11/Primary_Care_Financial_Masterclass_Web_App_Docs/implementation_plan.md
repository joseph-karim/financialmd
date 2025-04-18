# Implementation plan

## Phase 1: Environment Setup

1. **Prevalidation:** Check if the current directory contains a project (e.g., look for a `package.json`). If it exists, confirm you are not reinitializing an existing project. (Reference: Starter Kit, Project Overview)
2. **Clone Starter Kit:** Clone the React + Supabase starter kit from [https://github.com/codeGuide-dev/codeguide-vite-supabase](https://github.com/codeGuide-dev/codeguide-vite-supabase) and create a new repository based on the template. (Reference: Starter Kit, Project Overview)
3. **Node.js Version Check:** Verify that Node.js v20.2.1 is installed by running `node -v`. If not installed, install Node.js v20.2.1. (Reference: Tech Stack)
4. **Install Dependencies:** In the project root, run `npm install` (or your preferred package manager command) to install project dependencies. (Reference: Starter Kit)
5. **Environment Variables Setup:** Create a `.env` file in the project root to store environment variables such as `SUPABASE_URL` and `SUPABASE_ANON_KEY`. (Reference: Starter Kit, Tech Stack)
6. **Validation:** Run `npm run dev` to start the development server and confirm that the starter kit loads correctly. (Reference: Starter Kit)

## Phase 2: Frontend Development

7. **Routing Setup:** In `/src/App.tsx`, configure routing (e.g., using react-router-dom) to manage navigation between the Home page and module pages. (Reference: Starter Kit Project Structure, Key Features)
8. **Home Page Creation:** Create `/src/pages/Home.tsx` to serve as an introductory landing page for the app, featuring limited preview content. (Reference: Key Features: User Authentication & Access Control)
9. **Module Page Creation:** Create `/src/pages/Module.tsx` to display individual content sections from the masterclass agenda. (Reference: Key Features: Modular Content Delivery)
10. **AI Chatbot Component:** Develop `/src/components/AIChatbot.tsx` to serve as the contextual AI chatbot. This component should send user queries to a backend endpoint (Supabase Edge Function) that interfaces with the OpenAI API (GPT-4o). (Reference: Key Features: AI-Powered Guidance)
11. **Interactive Component - Coding Cheat Sheet:** Create `/src/components/CodingCheatSheet.tsx` for a searchable digital coding reference. (Reference: Key Features: Interactive Elements)
12. **Interactive Component - RVU Lookup:** Create `/src/components/RVULookup.tsx` to enable users to look up wRVU values for CPT/G-codes. (Reference: Key Features: Interactive Elements)
13. **Interactive Component - Quiz:** Create `/src/components/Quiz.tsx` to deliver short quizzes after modules, including immediate feedback upon answer submission. (Reference: Key Features: Interactive Elements)
14. **State Management with Zustand:** Configure a Zustand store in `/src/store/useProgress.ts` for user progress tracking (module completion, resume point, etc.). (Reference: Tech Stack: State Management, Key Features: Progress Tracking)
15. **Styling:** Apply Tailwind CSS and Shadcn UI styling to all components to ensure a clean, modern UI with a light medical aesthetic. (Reference: Key Features: Design)
16. **Validation:** Run `npm run dev`, navigate the app, and verify that all pages and components (Home, Module, AI Chatbot, Cheat Sheet, RVU Lookup, Quiz) render and function appropriately. (Reference: Q&A: Pre-Launch Checklist)

## Phase 3: Backend Development

17. **Supabase Project Setup:** Log into Supabase and set up a new project. Retrieve the connection parameters (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) and update the `.env` file accordingly. (Reference: Tech Stack: Backend & Database)
18. **Authentication Configuration:** Enable and configure Supabase Auth for email/password and magic link sign-in. Create front-end forms that interface with these endpoints. (Reference: Key Features: User Authentication & Access Control)
19. **Database Schema Creation:** In the Supabase PostgreSQL dashboard, create the following tables:
    - **users:** Contains columns for `auth_id`, `email`, and `role` (free or paid).
    - **progress:** Contains `user_id`, `module_id`, `completed` (boolean), and `updated_at` timestamp.
    - **quiz_results:** Contains `user_id`, `module_id`, and `score`.
    (Reference: Key Features: Progress Tracking)
20. **Validation:** Confirm table creation through the Supabase dashboard. (Reference: Q&A: Data Integrity)
21. **Supabase Edge Functions for AI Chatbot:** In `/supabase/functions/`, create an edge function endpoint (e.g., `ai-chat.js` or `ai-chat.ts`) which receives user questions, forwards them to the OpenAI API (GPT-4o), and returns the response. (Reference: Key Features: AI-Powered Guidance)
22. **Validation:** Test the AI Edge Function using a POST request (e.g., via Postman or cURL) to ensure a valid response is received.
23. **Stripe Payment Integration:** Set up a Stripe account (in test mode first) and retrieve API keys. Create an endpoint (via Supabase Edge Function or serverless function) to handle one-time payment processing. (Reference: Key Features: Payment)
24. **Validation:** Simulate a payment process using Stripe test cards to confirm that payment statuses are communicated back (unlocking full access upon success). (Reference: Q&A: Payment Integration)

## Phase 4: Integration

25. **Connect Frontend & Supabase Auth:** Link the frontend registration and login forms to the Supabase Auth endpoints to manage user sessions. (Reference: Key Features: User Authentication & Access Control)
26. **Integrate AI Chatbot:** Wire the `/src/components/AIChatbot.tsx` component to call the Supabase Edge Function for AI responses. (Reference: Key Features: AI-Powered Guidance)
27. **Interactive Elements Integration:** Connect the Coding Cheat Sheet, RVU Lookup, and Quiz components to display dynamic content as needed. For quizzes, ensure user answers update the `quiz_results` table in Supabase. (Reference: Key Features: Interactive Elements)
28. **Stripe Payment Flow:** In the payment section of the frontend, set up a button that triggers the payment intent; after successful payment, update the user’s role or access level in the Supabase database to unlock full content. (Reference: Key Features: Payment)
29. **Progress Tracking Integration:** Update the Zustand store so that when the user completes a module, an API call updates the `progress` table in Supabase. (Reference: Key Features: Progress Tracking)
30. **Validation:** Simulate an end-to-end user journey (from signup, previewing content, interacting with AI, taking quizzes, to processing a payment) and verify that all API calls and state updates function correctly. (Reference: Q&A: Pre-Launch Checklist)

## Phase 5: Deployment

31. **Project Build:** Run `npm run build` to build the project for production. (Reference: Starter Kit)
32. **Netlify Deployment - Frontend:**
    - Connect your GitHub repository to Netlify.
    - Set the build command to `npm run build` and the publish directory to `dist`.
    (Reference: Tech Stack: Hosting)
33. **Environment Variables on Netlify:** Configure environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, Stripe keys, etc.) in the Netlify dashboard. (Reference: Tech Stack: Hosting)
34. **CI/CD Pipeline Setup:** Configure GitHub Actions to automatically run tests and build the project on every push. Create a YAML configuration file (e.g., `.github/workflows/deploy.yml`) with steps to install dependencies, run tests, and deploy to Netlify. (Reference: Tech Stack: DevOps)
35. **Validation (Deployment):** After deployment, visit the production URL and test core functionalities (login, AI chatbot, module navigation, payment processing).
36. **Monitoring & Logging:** Set up error monitoring and logging (using Netlify’s analytics and Supabase logging features) to track any runtime issues. (Reference: Tech Stack: DevOps)

## Additional Documentation & Final Checks

37. **Documentation Update:** Update the repository’s README file with project configuration details, API endpoints, and instructions for local setup and deployment. (Reference: Starter Kit)
38. **User Guide:** Create a user guide/documentation page for PCP users explaining how to use the app (navigating modules, accessing the cheat sheet, using the AI chatbot, etc.). (Reference: Project Overview, Key Features)
39. **Final End-to-End Testing:** Perform a full simulation from user registration to consuming all modules (including payment step) to ensure seamless integration and functionality. (Reference: Q&A: Pre-Launch Checklist)

This plan outlines the step-by-step implementation for the Primary Care Financial Masterclass App, ensuring that all technical requirements and project specifics are met.