# CareerUp | Premium Job Portal and Preparation Platform

CareerUp is a feature-rich, high-performance web application designed to streamline job search pipelines and candidate interview preparation. Built using **React**, **Vite**, and styled with custom **Vanilla CSS** for a premium dark glassmorphism design, it integrates all components of the hiring funnel: job search, DSA problem solving, aptitude training, CS fundamentals review, and behavioral interview coaching.

---

## 🚀 Live Preview & Aesthetics

The application features:
- **Premium Dark Mode**: Tailored HSL color variables and neon-accented glows.
- **Glassmorphic Components**: Micro-animations, responsive layout transitions, and visual progress meters.
- **Client-Side Storage**: LocalStorage sync ensures all your checkmarks, application pipelines, and quiz scores persist on reload.

---

## 🌟 Key Features

### 1. Interactive Candidate Dashboard
- **Preparation Analytics**: Real-time progress trackers for DSA sheets, Aptitude tests, and HR drafts.
- **Application Tracker**: Kanban-style status overview (Applied, Interviewing, Offer, Rejected) with status updates.
- **Personalized Recommendations**: Dynamic prompts suggesting the most high-impact next task.

### 2. Job Portal
- **Advanced Filtering**: Live search by keyword and dropdown filters for Category, Location (Remote/Hybrid/Onsite), and Experience Levels.
- **Job Details Drawer**: Sliding side-pane detailing role specifications, requirements, and responsibilities.
- **Mock Apply Flow**: Upload dummy resumes and write statement-of-interest responses.
- **Job Poster Form**: Mock portal supporting publishing customized job openings.

### 3. Comprehensive Prep Hub
- **DSA Practice Sheet**: 
  - Curated, topic-wise spreadsheet spanning Arrays, Strings, Linked Lists, Trees, Graphs, and DP.
  - **Embedded Sandbox Code Runner**: Solves problems in JavaScript directly inside the browser. It evaluates code against actual inputs and checks outputs using a custom local execution container.
  - Simulated compiling indicators for C++, Java, and Python.
- **Aptitude Quizzes**:
  - Quantitative, Logical, and Verbal reasoning tests.
  - Complete with ticking clock timers, correctness badges, and step-by-step mathematical/logical explanations.
- **Technical CS Core**:
  - Accordion cheat sheets covering DBMS, OS, Computer Networks, and OOPs.
  - Features concept-validation mini-quizzes.
- **HR Interview STAR Builder**:
  - Highlights top behavioral questions (e.g., "Tell me about yourself", "Strengths and weaknesses").
  - Outlines the **Situation, Task, Action, Result (STAR)** structure.
  - Evaluates drafted text on word length, structural parameters, and metrics-based results, providing automated feedback logs.

### 4. Company Hiring Information
- Complete profiles for top tier tech firms: **Google**, **Microsoft**, **Amazon**, **TCS**, **Infosys**, and **Wipro**.
- Details: eligibility requirements (CGPA/backlog thresholds), recruitment round outlines, topic weightages, and actual recent exam questions.

---

## 📂 Project Structure

```text
job_prep_portal/
├── public/                 # Static asset resources
├── src/
│   ├── components/         # Shared UI components
│   ├── context/            # AppContext state persistence
│   ├── data/               # Static dataset configurations
│   │   ├── jobListings.js
│   │   ├── dsaQuestions.js
│   │   ├── aptitudeData.js
│   │   ├── technicalNotes.js
│   │   └── companyData.js
│   ├── pages/              # Primary tab views
│   │   ├── Dashboard.jsx
│   │   ├── JobPortal.jsx
│   │   ├── PrepHub.jsx
│   │   ├── CompanyProfiles.jsx
│   │   └── DsaDetailEditor.jsx
│   ├── App.jsx             # Shell container & router
│   ├── App.css             # Main styling, theme variables
│   ├── index.css           # Global typography & resets
│   └── main.jsx            # Entry point configuration
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Installation and Run Instructions

### Prerequisites
- Node.js (v16.0 or higher recommended)
- npm (v8.0 or higher)

### Setup Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/careerup-job-prep-portal.git
   cd careerup-job-prep-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally in Development Mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

4. **Build for Production**
   ```bash
   npm run build
   ```
   The compiled production assets will be generated in the `/dist` directory.
