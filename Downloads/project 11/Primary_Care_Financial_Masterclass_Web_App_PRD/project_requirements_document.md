# Project Requirements Document (PRD): Primary Care Financial Masterclass App

## 1. Project Overview

The Primary Care Financial Masterclass App is a web-based mini-app that transforms a static presentation on medical billing and coding into an interactive learning experience. It is designed specifically for primary care physicians (PCPs) in family and internal medicine, offering simplified guidance on complex billing rules, RVUs, and coding strategies. This app will deliver the masterclass content through a modular, easy-to-navigate interface, while incorporating AI-driven assistance to answer questions in real time and provide proactive explanations of complicated topics.

The main purpose of this project is to increase user understanding and retention of essential billing and coding principles, while providing a practical tool that PCPs can refer to in their daily practice. By integrating interactive quizzes, searchable cheat sheets, and an AI chatbot that responds to module-specific inquiries, the platform aims to boost engagement and lead to higher conversion rates. The app also supports a freemium model by allowing users to preview the content before unlocking full access through a one-time payment process.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   Modular delivery of the masterclass content with a clean, medical-themed UI that follows the presentation agenda.
*   Display of detailed tables and examples from the provided presentation content.
*   An integrated AI-powered chatbot that answers module-specific queries and explains complex terms like RVU, MDM, and G-codes.
*   Interactive elements such as a digital cheat sheet, searchable RVU lookup tool, and quizzes that provide immediate feedback.
*   User authentication and access control using Supabase Auth, including free preview access and a one-time payment process (Stripe integration) to unlock full content.
*   Progress tracking for logged-in users across devices, ensuring they can resume where they left off.
*   A fully responsive design compatible with desktop, tablet, and mobile devices.

**Out-of-Scope:**

*   Offering personalized financial or legal advice.
*   Integrations with EMR systems.
*   Developing complex financial modeling or practice management tools.
*   Automating real-time updates to CPT codes or RVU values beyond the static presentation content.
*   Advanced role management beyond basic free (preview) and paid (full access) distinctions; although future admin and team roles are anticipated, they are not part of the first version.

## 3. User Flow

A typical user’s journey begins when a visitor lands on the app’s landing page, which is designed with a clean and modern medical aesthetic. Upon arrival, the visitor is greeted with a preview of introductory content including the course objective, agenda, and an overview of physician reimbursement strategies. At this stage, non-logged-in users have easy access to selected sections to experience the quality and style of the content without any commitment.

Once the visitor has sampled the preview, they are smoothly guided toward signing up or logging in using the Supabase authentication process (with options for email/password or magic link). After authentication, the user is prompted to make a one-time payment via Stripe to unlock the full masterclass content. Post-payment, the user navigates through the modules using a sidebar layout that offers clear navigation. Throughout the interactive learning journey, the AI-powered chat interface is readily available for contextual help, and interactive quizzes provide immediate feedback to reinforce learning—all while progress is tracked and synced across devices.

## 4. Core Features

*   **Modular Content Delivery:**

    *   Breaks down the masterclass into distinct sections matching the original presentation agenda.
    *   Utilizes a clean, modern, medical-themed UI with clear typography and light colors (whites, light grays, blues, greens).

*   **AI-Powered Guidance:**

    *   Contextual AI Chatbot allowing users to ask specific questions about the module they are viewing (e.g., “Explain the MDM requirements for a Level 4 visit”).
    *   Proactive AI prompts that clarify complex terms (RVU, MDM, G-codes) and summarize key takeaways.
    *   Potential scenario-based assistance where users can input patient details to get coding recommendations.

*   **Interactive Learning Elements:**

    *   Digital, searchable cheat sheet containing key coding rules and billing strategies.
    *   RVU lookup tool for common CPT/G-codes.
    *   Quizzes at the end of modules with immediate feedback and scoring, helping to reinforce learning and clarity.

*   **User Authentication & Access Control:**

    *   Freemium model allowing non-logged-in users to explore introductory modules.
    *   Secure account creation and login via Supabase Auth.
    *   One-time payment integration using Stripe to unlock full content.
    *   Progress tracking to indicate completed modules and resume user sessions across devices.

*   **Clean, Professional UI/UX:**

    *   Sidebar navigation and a main content area for content consumption.
    *   A collapsible AI chat interface available on every screen.
    *   Responsive design for use on desktop, tablet, and mobile devices.

## 5. Tech Stack & Tools

*   **Frontend:**

    *   React with TypeScript for developing a robust and maintainable user interface.
    *   Vite JS as a fast and modern build tool.
    *   Tailwind CSS for styling, inspired by project 10 but customized for a light, medical-themed aesthetic.
    *   Shadcn UI for pre-built UI components that fit the clean design principles.

*   **State Management:**

    *   Zustand for efficient and straightforward state management across the application.

*   **Backend & Database:**

    *   Supabase for user authentication, database (PostgreSQL), and serverless functions.
    *   Supabase Edge Functions for integrating AI functionalities and handling backend logic.

*   **AI Integration:**

    *   OpenAI API (GPT-4o or similar) integrated via Supabase Edge Functions to power the context-aware chatbot and proactive AI assistance features.

*   **Payment Integration:**

    *   Stripe for handling one-time payments and unlocking full access to the masterclass content.

*   **Hosting & Deployment:**

    *   Netlify for hosting, which also provides built-in email and analytics services.

*   **Development Tools:**

    *   Bolt for AI-powered scaffolding and quick project setup with best practices integrated from the starter kit provided.

## 6. Non-Functional Requirements

*   **Performance:**

    *   The app should load pages quickly, ideally within 2-3 seconds on a standard broadband connection.
    *   AI responses should be delivered with minimal lag to ensure a smooth user experience.

*   **Security:**

    *   All user data and progress should be securely stored using Supabase.
    *   Use of secure authentication methods (email/password or magic link) is mandatory.
    *   Payment processing with Stripe should comply with standard PCI-DSS guidelines.

*   **Usability:**

    *   The interface must be intuitive, with clear navigation and legible fonts designed for quick comprehension.
    *   The responsive design must ensure usability across devices (desktop, tablet, mobile).

*   **Compliance:**

    *   Data handling must adhere to common data protection standards and guidelines applicable in healthcare-related sectors.

## 7. Constraints & Assumptions

*   **Constraints:**

    *   The masterclass content is primarily static based on the initially provided presentation but may be expanded in future releases.
    *   AI functionalities are tuned specifically to the masterclass content, and may not handle broader inquiries outside of this scope.
    *   The system assumes a one-time payment model using Stripe without additional subscription complexities.
    *   Basic role differentiation is limited to free preview users and paid full-access users; any future admin or team features are out-of-scope for this version.

*   **Assumptions:**

    *   Users will benefit from having pre-loaded modules and immediate AI feedback to clarify complex billing topics.
    *   The provided design guidelines (color palette, typography, layout) will be sufficient to communicate a professional and medical-oriented aesthetic.
    *   The developer environment will have access to the necessary APIs (Supabase, OpenAI, Stripe) without significant rate limiting.
    *   The project will initially deploy on Netlify for hosting, utilizing its built-in email and analytics services.

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limits:**

    *   The OpenAI API might face rate limits affecting the responsiveness of the AI chat feature. Mitigation includes monitoring API usage and possibly implementing caching strategies for common queries.

*   **Payment Integration:**

    *   Stripe integration requires careful handling of one-time payments and webhook management. Delays or misconfigurations could lead to user access issues. It is recommended to perform thorough testing during development.

*   **Content Updates:**

    *   Although the content is mostly static, future expansions may necessitate a dynamic content update mechanism. For now, assume the content is fixed with potential manual updates if needed.

*   **Responsive Design Challenges:**

    *   Ensuring that the interactive elements, especially the AI chat interface and quizzes, work seamlessly across all device types could pose challenges. Testing on a variety of devices is essential during development.

*   **User Progress Syncing:**

    *   The reliability of syncing progress across devices depends on the robustness of the Supabase backend. Data consistency and handling network issues should be considered in the implementation.

*   **Scalability:**

    *   As the content expands or if more interactive simulations and future roles are added, scaling the system could require architectural changes. Keep an eye on early designs to ensure they can accommodate future growth.

This PRD provides a comprehensive blueprint for transforming a static masterclass into an interactive, engaging online learning platform. It covers the core features, technical choices, and guidelines to ensure that every aspect of development is crystal clear, leaving no room for guesswork during the subsequent stages of the project.
