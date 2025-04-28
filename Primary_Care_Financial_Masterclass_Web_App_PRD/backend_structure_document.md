# Backend Structure Document

This document outlines the backend architecture and components of the Primary Care Financial Masterclass App. It is written in an easy-to-understand language and is intended to explain the technical setup without requiring a deep technical background.

## 1. Backend Architecture

The backend of this app is designed to be robust, flexible, and future-proof. We use a modern, serverless approach by leveraging Supabase as the backbone. Here’s how it works:

- **Design Approach:**
  - The architecture is built on a modular design, allowing each component (like authentication, payments, or content management) to operate independently but work together seamlessly.
  - This approach supports scalability, meaning we can add features or handle more users without needing a complete redesign.
  
- **Key Technologies and Frameworks:**
  - **Supabase:** Provides hosting for our PostgreSQL database, authentication services, and server-side functions.
  - **Stripe:** Handles payment processing for one-time purchases.
  - **OpenAI API via Supabase Edge Functions:** Powers the AI guidance features and chatbot interactions.

- **Benefits:**
  - **Scalability:** Easily add new features or increase user volume without performance issues.
  - **Maintainability:** The modular design allows developers to update parts of the backend without affecting the whole system.
  - **Performance:** Using managed services like Supabase means the backend automatically scales to handle load spikes, ensuring smooth performance.

## 2. Database Management

Our project uses Supabase’s PostgreSQL database, which is a reliable, SQL-based system. Here’s a breakdown:

- **Database Type:**
  - **SQL Database (PostgreSQL)**

- **Data Storage and Structure:**
  - Data is organized into tables for different functional areas such as user authentication, content modules, user progress tracking, and payment records.
  - The structured format of PostgreSQL makes it easy to query data efficiently, ensuring fast access and updates.
  - Supabase’s integrated authentication and database functions allow for secure and efficient data management.

- **Management Practices:**
  - Regular backups and version-controlled migrations ensure data integrity during updates.
  - Data access is managed through secure API calls and role-based access controls.

## 3. Database Schema

### Human Readable Format

The database schema is structured around the major components of the app:

- **Users Table:** Contains information about all users, including their authentication details, role (free preview vs. full access), and progress tracking data.
- **Content Modules Table:** Stores modular content data that users interact with, including text, images, and videos.
- **Quiz Data Table:** Contains questions, answers, and any relevant metadata to provide immediate feedback for interactive quizzes.
- **Payment Records Table:** Archives all payment transactions processed via Stripe, linking transaction details to user profiles.

### SQL Schema Example (PostgreSQL)

Below is a simplified SQL schema:

• Users Table:
  - id (Primary Key, UUID)
  - email (Text, Unique)
  - password_hash (Text)
  - role (Text, values: 'free', 'paid')
  - created_at (Timestamp)
  - updated_at (Timestamp)

• Content Modules Table:
  - id (Primary Key)
  - title (Text)
  - content (Text)
  - order_index (Integer) - determines sequence
  - created_at (Timestamp)

• Quiz Data Table:
  - id (Primary Key)
  - module_id (Foreign Key linking to Content Modules)
  - question (Text)
  - options (JSON/BLOB for multiple answer choices)
  - correct_answer (Text)
  - created_at (Timestamp)

• Payment Records Table:
  - id (Primary Key)
  - user_id (Foreign Key linking to Users)
  - stripe_payment_id (Text)
  - amount (Decimal)
  - payment_date (Timestamp)

## 4. API Design and Endpoints

The communication between the frontend and backend is facilitated through well-structured APIs. Here’s what you need to know:

- **API Type:**
  - RESTful APIs are used to ensure a straightforward, predictable interaction between the app and the backend.

- **Key Endpoints Include:**
  - **User Authentication:** Endpoints for sign-up, login, password reset, and user profile management. (Handled by Supabase Auth)
  - **Content Delivery:** Endpoints to fetch modular course content, allowing dynamic access to training modules.
  - **Quiz Interaction:** Endpoints that serve quiz questions and record user responses for immediate feedback.
  - **AI Guidance:** Endpoints that interface with the OpenAI API via Supabase Edge Functions to provide contextual help during case reviews.
  - **Payment Processing:** Endpoints that manage the Stripe payment flow to ensure smooth transactions and activate user access on successful payments.

## 5. Hosting Solutions

- **Primary Hosting Environment:**
  - **Netlify** is used for hosting, which includes built-in email and analytics services.

- **Benefits of Netlify Hosting:**
  - **Reliability:** Managed platform with high uptime and performance.
  - **Scalability:** Can handle traffic spikes as more users access the app.
  - **Cost-Effectiveness:** Competitive pricing with pay-as-you-go options and built-in features that lower maintenance overhead.

## 6. Infrastructure Components

A number of infrastructure elements work together to ensure the app is fast, secure, and reliable. They include:

- **Load Balancers:** Though not manually configured because of Supabase and Netlify’s inherent scalability, load balancing ensures requests are distributed evenly to prevent any one server from getting overloaded.

- **Caching Mechanisms:** Server-side caching is managed by Supabase to optimize repeated database queries, improving response times.

- **Content Delivery Network (CDN):** Netlify’s CDN serves static assets (like images, CSS, and JavaScript files) from locations closer to the user, ensuring faster load times.

- **Edge Functions:** Deployed via Supabase, these functions run code closer to the user’s location, improving performance for the AI chatbot and other dynamic processes.

## 7. Security Measures

Security is a top priority in the app's design, ensuring that user data is protected at all times:

- **Authentication and Authorization:**
  - Supabase Auth manages user sessions and role-based access (free and paid users).
  - All API endpoints are secured to ensure only authenticated users can access sensitive data.

- **Data Encryption:**
  - Data in transit is encrypted using HTTPS.
  - Sensitive data stored in the database, such as user credentials, is encrypted.

- **Payment Security:**
  - Stripe handles all payment processes, ensuring compliance with relevant payment card industry (PCI) standards.

- **Additional Practices:**
  - Regular security audits and automated vulnerability scans help maintain a strong security posture.

## 8. Monitoring and Maintenance

Keeping the backend running smoothly is critical. Here’s how we approach it:

- **Monitoring Tools:**
  - Supabase provides dashboards for monitoring database performance and serverless function usage.
  - Netlify analytics and monitoring tools provide real-time insights into uptime and user traffic.
  - Additional third-party monitoring tools may be integrated for in-depth analysis.

- **Maintenance Strategies:**
  - Scheduled backups and periodic updates ensure that the database and functions remain reliable and current.
  - Automated alerts notify the development team if any anomalies or performance issues are detected.

## 9. Conclusion and Overall Backend Summary

In summary, the backend of the Primary Care Financial Masterclass App is a thoughtfully designed system that leverages modern tools to provide a secure, scalable, and efficient platform for delivering interactive content to primary care physicians. Key points include:

- **Modular Architecture:** Ensures that each component is independent yet integrated, allowing for easy updates and scalability as new features are added.

- **Database Management via Supabase/PostgreSQL:** Provides a robust and reliable data storage solution with structured and manageable data handling practices.

- **RESTful API Endpoints:** Enable clear, secure communication between the frontend and backend, powering everything from user authentication to AI-guided interactions.

- **Reliable Hosting on Netlify:** Fulfills the needs for a scalable, cost-effective, and high-performance hosting solution.

- **Security and Monitoring:** Continuous security assessments and monitoring tools ensure that both user data and the backend remain secure and efficient.

This backend setup is designed with both today's requirements and future growth in mind. It provides a strong foundation for a learning platform that is engaging, user-friendly, and secure, while also being prepared to handle expansions and additional features as the project evolves.