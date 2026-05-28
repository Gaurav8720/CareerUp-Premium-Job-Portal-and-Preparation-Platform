import React, { useState } from "react";
import { companyData } from "../data/companyData";

export const CompanyProfiles = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const activeCompany = companyData.find(c => c.id === selectedCompanyId);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div>
        <h1 className="page-title">Companies Hiring Information</h1>
        <p className="page-subtitle">Learn about eligibility requirements, recruitment patterns, and interview syllabus of top recruiters</p>
      </div>

      {/* Grid Showcase */}
      <div className="companies-grid">
        {companyData.map((company) => {
          return (
            <div key={company.id} className="card company-card">
              <div>
                <div className="company-logo-strip">
                  <span className="company-logo" style={{ backgroundColor: company.logoBg }}>
                    {company.logoText}
                  </span>
                  <span className={`badge ${
                    company.difficulty === "High" ? "badge-hard" : "badge-medium"
                  }`}>
                    {company.difficulty} Difficulty
                  </span>
                </div>
                
                <h3 style={{ fontSize: "1.3rem", marginTop: "1rem", marginBottom: "0.25rem" }}>{company.name}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginHeight: "1.5" }}>
                  {company.roundsSummary}
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                <button className="btn btn-teal" style={{ width: "100%" }} onClick={() => setSelectedCompanyId(company.id)}>
                  View Hiring Process
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {activeCompany && (
        <div className="company-detail-modal-overlay" onClick={() => setSelectedCompanyId(null)}>
          <div className="company-detail-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="company-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="company-logo" style={{ backgroundColor: activeCompany.logoBg, fontSize: "0.95rem", padding: "0.35rem 0.75rem" }}>
                  {activeCompany.logoText}
                </span>
                <h2 style={{ fontSize: "1.4rem" }}>{activeCompany.name} Hiring Process</h2>
              </div>
              <button
                onClick={() => setSelectedCompanyId(null)}
                style={{ fontSize: "1.5rem", color: "var(--text-secondary)", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="company-modal-body">
              {/* Eligibility */}
              <div className="drawer-section">
                <h3 style={{ color: "var(--secondary)" }}>Eligibility Criteria</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: "1.5", padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)" }}>
                  {activeCompany.eligibility}
                </p>
              </div>

              {/* Recruitment Rounds */}
              <div className="drawer-section">
                <h3>Recruitment Rounds & Pattern</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
                  {activeCompany.examPattern.map((p, idx) => (
                    <div key={idx} className="round-item">
                      <div className="round-bullet">{idx + 1}</div>
                      <div className="round-info">
                        <span className="round-title">{p.round}</span>
                        <span className="round-desc">{p.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Grid */}
              <div className="drawer-section">
                <h3>Exam Syllabus & Weights</h3>
                <div className="dsa-table-wrap" style={{ marginTop: "0.5rem" }}>
                  <table className="dsa-table">
                    <thead>
                      <tr>
                        <th style={{ width: "150px" }}>Subject</th>
                        <th>Core Topics</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCompany.syllabus.map((s, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: "600", color: "white" }}>{s.subject}</td>
                          <td style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.4" }}>{s.topics}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent actual questions */}
              <div className="drawer-section">
                <h3 style={{ color: "var(--warning)" }}>Recent Interview Questions</h3>
                <ul className="bullet-list" style={{ marginTop: "0.5rem" }}>
                  {activeCompany.recentQuestions.map((q, idx) => (
                    <li key={idx} style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                      "{q}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "1.25rem 2rem", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.1)" }}>
              <button className="btn btn-secondary" onClick={() => setSelectedCompanyId(null)}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
