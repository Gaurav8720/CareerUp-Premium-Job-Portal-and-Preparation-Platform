import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { jobListings as initialJobListings } from "../data/jobListings";

export const JobPortal = () => {
  const { appliedJobs, applyToJob } = useContext(AppContext);
  const [jobs, setJobs] = useState(initialJobListings);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  
  // Modal/Drawer States
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  
  // Post Job Modal State
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    salary: "",
    location: "",
    type: "Full-time",
    category: "Software Engineering",
    experience: "Entry Level",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter;
    const matchesExperience = experienceFilter === "All" || job.experience === experienceFilter;
    const matchesLocation =
      locationFilter === "All" ||
      (locationFilter === "Remote" && job.location.toLowerCase().includes("remote")) ||
      (locationFilter === "Hybrid" && job.location.toLowerCase().includes("hybrid")) ||
      (locationFilter === "Onsite" && job.location.toLowerCase().includes("onsite") && !job.location.toLowerCase().includes("hybrid"));

    return matchesSearch && matchesCategory && matchesExperience && matchesLocation;
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    applyToJob(selectedJob, coverLetter);
    setShowApplySuccess(true);
    setCoverLetter("");
    setResumeUploaded(false);
    setTimeout(() => {
      setShowApplySuccess(false);
      setSelectedJob(null);
    }, 1800);
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const mockId = "job-" + Date.now();
    const colors = ["#4285F4", "#FF9900", "#F25022", "#007CC3", "#1E2A38", "#252B33", "#A855F7", "#14B8A6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const formattedJob = {
      id: mockId,
      title: newJob.title,
      company: newJob.company,
      logoBg: randomColor,
      logoText: newJob.company.substring(0, 4).toUpperCase(),
      salary: newJob.salary || "Not Disclosed",
      location: newJob.location,
      type: newJob.type,
      category: newJob.category,
      experience: newJob.experience,
      postedDate: "Just now",
      description: newJob.description,
      requirements: newJob.requirements.split("\n").filter(r => r.trim() !== ""),
      responsibilities: newJob.responsibilities.split("\n").filter(r => r.trim() !== ""),
    };

    setJobs([formattedJob, ...jobs]);
    setShowPostJobModal(false);
    // Reset Form
    setNewJob({
      title: "",
      company: "",
      salary: "",
      location: "",
      type: "Full-time",
      category: "Software Engineering",
      experience: "Entry Level",
      description: "",
      requirements: "",
      responsibilities: "",
    });
  };

  const hasAlreadyApplied = (jobId) => {
    return appliedJobs.some((j) => j.id === jobId);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Panel */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Job Portal</h1>
          <p className="page-subtitle">Find and apply to active job listings from top companies</p>
        </div>
        <button className="btn btn-teal" onClick={() => setShowPostJobModal(true)}>
          <span>➕</span> Post a Mock Job
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="search-bar-wrap">
        <div className="search-input-group">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by role, company, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Product Management">Product Management</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="IT Support">IT Support</option>
        </select>

        <select
          className="filter-select"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="All">All Experience Levels</option>
          <option value="Entry Level">Entry Level (0-2 years)</option>
          <option value="Mid Level">Mid Level (2-5 years)</option>
          <option value="Senior Level">Senior Level (5+ years)</option>
        </select>

        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>
      </div>

      {/* Listings Grid */}
      {filteredJobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🔍</span>
          <h3>No matching job listings found</h3>
          <p style={{ marginTop: "0.5rem" }}>Try expanding your filter selections or tweaking your search term.</p>
        </div>
      ) : (
        <div className="grid-3">
          {filteredJobs.map((job) => {
            const isApplied = hasAlreadyApplied(job.id);
            return (
              <div key={job.id} className="card job-card">
                <div>
                  <div className="job-card-header">
                    <span
                      className="company-badge"
                      style={{ backgroundColor: job.logoBg }}
                    >
                      {job.logoText}
                    </span>
                    <span className="badge badge-blue">{job.type}</span>
                  </div>

                  <div className="job-info-brief">
                    <h3 className="job-title">{job.title}</h3>
                    <span className="company-name">{job.company}</span>
                  </div>

                  <div className="job-meta-row" style={{ marginTop: "1rem" }}>
                    <span className="job-meta-item">📍 {job.location}</span>
                    <span className="job-meta-item">🎓 {job.experience}</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                  <span className="job-salary">{job.salary}</span>
                  <button
                    className={`btn ${isApplied ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => setSelectedJob(job)}
                    style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                  >
                    {isApplied ? "Applied ✓" : "View & Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View/Apply Side-Drawer */}
      {selectedJob && (
        <div className="drawer-overlay" onClick={() => setSelectedJob(null)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <span className="drawer-close" onClick={() => setSelectedJob(null)}>
              ← Back to Listings
            </span>

            {showApplySuccess ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: "1rem" }}>
                <div style={{ fontSize: "4rem", animation: "scaleUp 0.3s ease-out" }}>🎉</div>
                <h3 style={{ fontSize: "1.5rem" }}>Application Submitted!</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Your profile has been shared with {selectedJob.company}. You can track status on your Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>{selectedJob.type}</span>
                  <h2 style={{ fontSize: "1.5rem" }}>{selectedJob.title}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span className="company-badge" style={{ backgroundColor: selectedJob.logoBg, fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
                      {selectedJob.logoText}
                    </span>
                    <span style={{ fontSize: "1.1rem", fontWeight: "500", color: "var(--text-primary)" }}>{selectedJob.company}</span>
                  </div>
                </div>

                <div className="job-meta-row">
                  <span>📍 {selectedJob.location}</span>
                  <span>💼 {selectedJob.category}</span>
                  <span>🎓 {selectedJob.experience}</span>
                  <span style={{ color: "var(--secondary)" }}>💰 {selectedJob.salary}</span>
                </div>

                <div className="drawer-section">
                  <h3>About the Role</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    {selectedJob.description}
                  </p>
                </div>

                <div className="drawer-section">
                  <h3>Requirements</h3>
                  <ul className="bullet-list">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="drawer-section">
                  <h3>Key Responsibilities</h3>
                  <ul className="bullet-list">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Apply Section */}
                <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                  {hasAlreadyApplied(selectedJob.id) ? (
                    <div style={{ backgroundColor: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "1rem", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)" }}>
                      You have already submitted an application for this role. Check Dashboard to update pipeline status.
                    </div>
                  ) : (
                    <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <h4 style={{ color: "white", fontWeight: "600" }}>Apply for this position</h4>
                      
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                          Upload Resume (Mock)
                        </label>
                        <div style={{
                          border: "2px dashed var(--border-color)",
                          borderRadius: "8px",
                          padding: "1rem",
                          textAlign: "center",
                          cursor: "pointer",
                          backgroundColor: resumeUploaded ? "rgba(16, 185, 129, 0.05)" : "transparent",
                          borderColor: resumeUploaded ? "var(--success)" : "var(--border-color)"
                        }} onClick={() => setResumeUploaded(true)}>
                          {resumeUploaded ? (
                            <span style={{ color: "var(--success)" }}>✓ resume_developer.pdf attached!</span>
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>📄 Click to attach a mock resume</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                          Why are you a good fit for this role?
                        </label>
                        <textarea
                          placeholder="Brief statement of interest..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          style={{
                            width: "100%",
                            minHeight: "100px",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "6px",
                            padding: "0.75rem",
                            fontSize: "0.9rem",
                            resize: "vertical"
                          }}
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                        Submit Mock Application
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="company-detail-modal-overlay" onClick={() => setShowPostJobModal(false)}>
          <div className="company-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="company-modal-header">
              <h2 style={{ fontSize: "1.3rem" }}>Post a Mock Job Listing</h2>
              <button onClick={() => setShowPostJobModal(false)} style={{ color: "var(--text-secondary)", fontSize: "1.2rem", cursor: "pointer" }}>×</button>
            </div>
            
            <form onSubmit={handlePostJob} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Engineer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Remote / Bangalore"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Salary Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹15 - ₹20 LPA"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Job Type</label>
                  <select
                    className="filter-select"
                    style={{ width: "100%", padding: "0.5rem" }}
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Category</label>
                  <select
                    className="filter-select"
                    style={{ width: "100%", padding: "0.5rem" }}
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="IT Support">IT Support</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Experience Level</label>
                  <select
                    className="filter-select"
                    style={{ width: "100%", padding: "0.5rem" }}
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Job Description *</label>
                <textarea
                  required
                  placeholder="Describe the role..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  style={{ width: "100%", height: "80px", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)", resize: "vertical" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Requirements (one per line) *</label>
                  <textarea
                    required
                    placeholder="e.g. 3+ years React experience&#10;BS in Computer Science"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    style={{ width: "100%", height: "80px", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)", resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Key Responsibilities (one per line) *</label>
                  <textarea
                    required
                    placeholder="e.g. Write clean React code&#10;Mentor junior developers"
                    value={newJob.responsibilities}
                    onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                    style={{ width: "100%", height: "80px", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)", resize: "vertical" }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-teal" style={{ width: "100%", marginTop: "0.5rem" }}>
                Publish Mock Job
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
