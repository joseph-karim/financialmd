# Primary Care Financial Masterclass App - Project Summary

## Project Overview

- **Goal:** Transform a static presentation on medical billing/coding into an interactive web app designed for primary care physicians (PCPs) to improve their earning potential.
- **Target Audience:** Primary Care Physicians (Family Medicine, Internal Medicine).
- **Key Features:**
  - **Modular Content:** Structured content derived from the masterclass presentation.
  - **AI-Powered Guidance:** Integrated chatbot for clarifications and guidance regarding presentation content (e.g., RVU, MDM, G-codes).
  - **Interactive Elements:** Tools such as cheat sheets, RVU lookup, and quizzes with immediate feedback.
  - **User Authentication:** Using Supabase Auth for secure sign-up via email/password or magic links.
  - **Payment Integration:** Stripe for one-time payment transactions (ensuring compliance with PCI-DSS guidelines).
  - **Progress Tracking:** Ability to sync progress across multiple devices.
- **Freemium Model:** Limited preview content available for free; full access unlocks with a one-time payment.
- **User Interface:** Clean, modern design with a light medical aesthetic using whites, light grays, blues, and greens.
- **Hosting:** Netlify, which also provides email and analytics functionalities.

## Technical Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI
  - Zustand (state management)

- **Backend:**
  - Supabase (PostgreSQL, Authentication, and Functions)

- **AI Integration:**
  - OpenAI API (GPT-4 or similar) via Supabase Edge Functions

- **Payment Processing:**
  - Stripe

- **Tooling:**
  - Bolt (project setup and scaffolding)
  - Git & GitHub (version control)

## Functional Requirements

- **Content Delivery:**
  - Transformation of static presentation content into structured, interactive web modules.
  - Expanded content as needed to support the masterclass objectives.

- **AI Chatbot:**
  - Provides interactive guidance on the presentation content and example cases.
  - Offers definitions and explanations of key terms (e.g., RVU, MDM, G-codes).

- **Interactive Quizzes:**
  - Provides immediate feedback to the learner.

- **User Roles:**
  - Initially supports two user tiers: Free (preview) and Paid (full access).
  - Future expansion for Admin and Team roles is possible.

- **Payment:**
  - One-time payment mechanism to unlock full content.

- **Progress Tracking:**
  - Synchronizes user progress across multiple devices.

## Security Guidelines

- **Data Protection:**
  - All user data must be securely stored in Supabase.

- **Authentication:**
  - Use secure mechanisms (e.g., email/password or magic links) provided by Supabase Auth.

- **Payment Processing:**
  - Stripe integration must comply with PCI-DSS guidelines.

## Non-Goals

- The application will not provide personalized financial or legal advice.
- There will be no integration with Electronic Medical Record (EMR) systems.
- The app does not involve complex financial modeling.
- Real-time CPT/RVU updates are out of scope.

## Potential Pitfalls & Issues

- **OpenAI API:** Rate limits may impact responses – consider caching strategies.
- **Stripe Integration:** Rigorous testing necessary to avoid payment processing issues.
- **Responsive Design:** Ensure compatibility across various devices – extensive testing required.
- **Progress Syncing:** Handle potential network issues to reliably sync users' progress.

## Success Metrics

- Number of sign-ups
- Conversion rate from free to paid users
- Module completion and engagement rates
- AI chatbot session duration and frequency
- Overall session duration and frequency per user

## App Flow Details

- **Authentication System:** Secure login/signup using Supabase Auth.
- **Content Consumption:** Modular content consumption with interactive and AI-powered guidance.
- **Interactive Learning:** AI guidance integrated with quizzes, cheat sheets, and simulation capabilities.
- **Payment System:** One-time payment processing via Stripe.
- **Progress Tracking:** Synchronizing user progress and ensuring consistency across devices.

This summary encapsulates the core concepts and security measures required to create a secure, interactive web application tailored specifically for primary care physicians, ensuring that every aspect from authentication to data handling adheres to a robust and secure-by-design approach.