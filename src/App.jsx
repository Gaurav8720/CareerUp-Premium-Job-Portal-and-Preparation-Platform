import React, { useContext } from "react";
import "./App.css";
import { AppContext, AppProvider } from "./context/AppContext";
import { Dashboard } from "./pages/Dashboard";
import { JobPortal } from "./pages/JobPortal";
import { PrepHub } from "./pages/PrepHub";
import { CompanyProfiles } from "./pages/CompanyProfiles";
import { DsaDetailEditor } from "./pages/DsaDetailEditor";

const AppContent = () => {
  const { currentTab, changeTab, resetAllProgress } = useContext(AppContext);

  // Render appropriate page
  const renderActivePage = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "jobs":
        return <JobPortal />;
      case "prep":
        return <PrepHub />;
      case "companies":
        return <CompanyProfiles />;
      case "dsa-editor":
        return <DsaDetailEditor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          {/* Logo and Brand */}
          <div className="brand-logo">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h1 className="brand-name">CareerUp</h1>
          </div>

          {/* Nav Links */}
          <nav className="nav-links">
            <button
              className={`nav-item ${currentTab === "dashboard" ? "active" : ""}`}
              onClick={() => changeTab("dashboard")}
            >
              📊 <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${currentTab === "jobs" ? "active" : ""}`}
              onClick={() => changeTab("jobs")}
            >
              💼 <span>Job Portal</span>
            </button>
            <button
              className={`nav-item ${currentTab === "prep" || currentTab === "dsa-editor" ? "active" : ""}`}
              onClick={() => changeTab("prep")}
            >
              ⚡ <span>Prep Hub</span>
            </button>
            <button
              className={`nav-item ${currentTab === "companies" ? "active" : ""}`}
              onClick={() => changeTab("companies")}
            >
              🏢 <span>Company Info</span>
            </button>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <div className="user-profile" style={{ marginBottom: "1rem" }}>
            <div className="avatar">U</div>
            <div className="user-info">
              <span className="user-name">User Candidate</span>
              <span className="user-role">Premium Member</span>
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={resetAllProgress}
            style={{ width: "100%", padding: "0.5rem", fontSize: "0.75rem" }}
          >
            Reset Progress 🧹
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Render Page */}
        {renderActivePage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
