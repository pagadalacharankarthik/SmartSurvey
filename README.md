# TakeSurvey - Smart Survey Tool

TakeSurvey is an AI-Powered Smart Survey Tool designed for efficient data collection and analysis. It streamlines the survey process with advanced features like AI question extraction, real-time risk monitoring, and comprehensive role-based management.

## 🚀 Key Features

### 🤖 AI Question Extraction
- Automatically extract relevant survey questions from documents (PDF, DOCX, TXT).
- Intelligent keyword analysis and smart question suggestions.

### 🛡️ Risk Monitoring
- Real-time detection of duplicate cellular responses and suspicious patterns.
- Location verification and device fingerprinting to ensure data integrity.

### 👥 Role-Based Access Control
- **Super Admin Dashboard**: Full system oversight and management.
- **Organization Management**: Manage organizations and their specific needs.
- **Survey Conductor Tools**: Dedicated interface for conducting surveys in the field.

### 📝 Survey Management
- Create, edit, and manage surveys with an intuitive interface.
- Support for multiple question types and progress tracking.

### 📍 Location Tracking
- GPS-enabled data collection to verify survey locations.
- Offline capability ensures data is captured even without internet access.

### 📊 Analytics Dashboard
- Comprehensive data visualization tools using Recharts.
- Real-time statistics and progress monitoring.
- Export capabilities for further analysis.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS, PostCSS, Tailwind Animate
- **UI Components**: Radix UI, Lucide React (Icons)
- **Forms & Validation**: React Hook Form, Zod
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Language**: TypeScript

## 🏁 Getting Started

To get started with the project locally, follow these steps:

1.  **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3.  **Build for Production**

    ```bash
    npm run build
    # or
    yarn build
    ```

4.  **Start Production Server**

    ```bash
    npm run start
    # or
    yarn start
    ```

## 📂 Project Structure

- `app/`: Application routes and pages (App Router).
  - `conductor/`: Survey Conductor dashboard and tools.
  - `home/`: Public landing page.
  - `login/`: Authentication page.
  - `org-admin/`: Organization Admin dashboard.
  - `risk-monitoring/`: Risk monitoring features.
  - `super-admin/`: Super Admin dashboard.
  - `survey/`: Survey execution pages.
- `components/`: Reusable UI components.
- `hooks/`: Custom React hooks (e.g., authentication, theming).
- `lib/`: Utility functions and helper libraries.
- `public/`: Static assets.
- `styles/`: Global styles.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
