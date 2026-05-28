import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { dsaQuestions } from "../data/dsaQuestions";
import { aptitudeQuestions } from "../data/aptitudeData";

export const Dashboard = () => {
  const {
    appliedJobs,
    dsaProgress,
    quizHistory,
    hrAnswers,
    changeTab,
    updateApplicationStatus,
  } = useContext(AppContext);

  // Calculate metrics
  const totalDsa = dsaQuestions.length;
  const solvedDsa = Object.values(dsaProgress).filter(Boolean).length;
  const dsaPercent = totalDsa > 0 ? Math.round((solvedDsa / totalDsa) * 100) : 0;

  const totalQuizzes = quizHistory.length;
  const uniqueQuizzesTaken = new Set(quizHistory.map(q => q.category)).size;
  const aptitudePercent = Math.min(Math.round((uniqueQuizzesTaken / 3) * 100), 100);

  const hrPrepared = Object.keys(hrAnswers).length;
  const hrPercent = Math.min(Math.round((hrPrepared / 4) * 100), 100);

  const overallPrepPercent = Math.round((dsaPercent + aptitudePercent + hrPercent) / 3);

  // Status metrics
  const interviewingJobs = appliedJobs.filter(j => j.status === "Interviewing").length;
  const offersJobs = appliedJobs.filter(j => j.status === "Offer").length;

  // Personalized Recommendation
  const getRecommendation = () => {
    if (solvedDsa === 0) {
      return {
        title: "Kickstart DSA Prep",
        desc: "Solve your first array question 'Two Sum' in our coding editor.",
        actionText: "Open DSA Prep",
        tab: "prep",
      };
    }
    if (appliedJobs.length === 0) {
      return {
        title: "Find Your Next Job",
        desc: "There are active SDE & Analyst listings. Filter and apply to one today!",
        actionText: "View Jobs",
        tab: "jobs",
      };
    }
    if (totalQuizzes === 0) {
      return {
        title: "Practice Aptitude Quiz",
        desc: "Test your mathematical and logical skills with a quick 3-minute quiz.",
        actionText: "Take Quiz",
        tab: "prep",
      };
    }
    if (hrPrepared < 2) {
      return {
        title: "Refine HR Reponses",
        desc: "Write your STAR framework answers for 'Tell me about yourself'.",
        actionText: "Practice HR questions",
        tab: "prep",
      };
    }
    return {
      title: "Keep Up The Momentum!",
      desc: "Great job! Check company exam patterns and review recent interview questions.",
      actionText: "View Companies",
      tab: "companies",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div>
        <h1 className="page-title">Candidate Dashboard</h1>
        <p className="page-subtitle">Track preparation goals and manage active applications</p>
      </div>

      {/* Welcome Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)",
        border: "1px solid rgba(99, 102, 241, 0.2)"
      }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>Welcome Back, Candidate! 👋</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "700px", lineHeight: "1.5" }}>
          Track your technical training, practice coding questions, review company-specific interview structures, and manage your job applications—all in one place.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid-4 stats-grid">
        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Jobs Applied</span>
            <span className="stat-value">{appliedJobs.length}</span>
          </div>
          <span className="stat-icon" style={{ color: "var(--primary)" }}>💼</span>
        </div>
        
        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">DSA Solved</span>
            <span className="stat-value">{solvedDsa}/{totalDsa}</span>
          </div>
          <span className="stat-icon" style={{ color: "var(--secondary)" }}>⚡</span>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Interviewing</span>
            <span className="stat-value">{interviewingJobs}</span>
          </div>
          <span className="stat-icon" style={{ color: "var(--warning)" }}>📅</span>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <span className="stat-label">Offers Received</span>
            <span className="stat-value" style={{ color: "var(--success)" }}>{offersJobs}</span>
          </div>
          <span className="stat-icon" style={{ color: "var(--success)" }}>🏆</span>
        </div>
      </div>

      {/* Main Grid: Progress & Actions */}
      <div className="grid-2">
        {/* Prep Progress */}
        <div className="card">
          <h3 style={{ marginBottom: "1.25rem", fontSize: "1.2rem" }}>Preparation Progress</h3>
          <div className="dashboard-progress">
            <div className="progress-item">
              <div className="progress-label-wrap">
                <span>Overall Readiness</span>
                <span style={{ color: "var(--primary)" }}>{overallPrepPercent}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${overallPrepPercent}%`, backgroundColor: "var(--primary)" }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label-wrap">
                <span>DSA Sheet</span>
                <span style={{ color: "var(--secondary)" }}>{dsaPercent}% ({solvedDsa}/{totalDsa})</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${dsaPercent}%`, backgroundColor: "var(--secondary)" }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label-wrap">
                <span>Aptitude Practice</span>
                <span style={{ color: "var(--warning)" }}>{aptitudePercent}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${aptitudePercent}%`, backgroundColor: "var(--warning)" }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label-wrap">
                <span>HR Questions</span>
                <span style={{ color: "var(--accent)" }}>{hrPercent}% ({hrPrepared}/4)</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${hrPercent}%`, backgroundColor: "var(--accent)" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Recommendations & Quick Stats */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="badge badge-medium" style={{ marginBottom: "0.75rem" }}>RECOMMENDED TASK</span>
            <h3 style={{ fontSize: "1.3rem", margin: "0.25rem 0 0.5rem" }}>{recommendation.title}</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
              {recommendation.desc}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => changeTab(recommendation.tab)} style={{ alignSelf: "flex-start" }}>
            {recommendation.actionText} →
          </button>
        </div>
      </div>

      {/* Applied Jobs Tracker Section */}
      <div className="card">
        <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Job Application Pipeline</h3>
        {appliedJobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 0", color: "var(--text-secondary)" }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>📁</span>
            <p>You haven't applied to any jobs yet.</p>
            <button className="btn btn-secondary" onClick={() => changeTab("jobs")} style={{ marginTop: "1rem" }}>
              Browse Job Openings
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dsa-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div style={{ fontWeight: "600", color: "white" }}>{job.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{job.location}</div>
                    </td>
                    <td>
                      <span className="company-badge" style={{ backgroundColor: job.logoBg, fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
                        {job.logoText}
                      </span>{" "}
                      <span style={{ marginLeft: "0.35rem", fontSize: "0.9rem" }}>{job.company}</span>
                    </td>
                    <td style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{job.appliedDate}</td>
                    <td>
                      <span className={`badge ${
                        job.status === "Applied" ? "badge-blue" :
                        job.status === "Interviewing" ? "badge-medium" :
                        job.status === "Offer" ? "badge-easy" : "badge-hard"
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="filter-select"
                        value={job.status}
                        onChange={(e) => updateApplicationStatus(job.id, e.target.value)}
                        style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
