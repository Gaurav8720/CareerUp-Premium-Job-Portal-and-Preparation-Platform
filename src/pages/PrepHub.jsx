import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { dsaQuestions, dsaTopics } from "../data/dsaQuestions";
import { aptitudeQuestions, aptitudeCategories } from "../data/aptitudeData";
import { technicalNotes } from "../data/technicalNotes";
import { hrQuestions } from "../data/technicalNotes"; // hrQuestions is exported in technicalNotes.js

export const PrepHub = () => {
  const {
    currentTab,
    changeTab,
    dsaProgress,
    toggleDsaProgress,
    quizHistory,
    addQuizScore,
    hrAnswers,
    saveHrAnswer,
    setSelectedDsaQuestionId
  } = useContext(AppContext);

  // Sub-tabs: dsa, aptitude, technical, hr
  const [activePrepTab, setActivePrepTab] = useState("dsa");
  
  // DSA Filters
  const [dsaSearch, setDsaSearch] = useState("");
  const [dsaTopicFilter, setDsaTopicFilter] = useState("All");

  // Aptitude States
  const [selectedQuizCategory, setSelectedQuizCategory] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizTimer, setQuizTimer] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  // Technical Accordion State
  const [activeTechTopic, setActiveTechTopic] = useState(null);
  const [techQuizAnswers, setTechQuizAnswers] = useState({}); // { questionId: selectedIndex }
  const [techQuizSubmitted, setTechQuizSubmitted] = useState({}); // { topicId: true }

  // HR Prep States
  const [activeHrQuestionId, setActiveHrQuestionId] = useState(hrQuestions[0]?.id || "");
  const [hrResponseText, setHrResponseText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState(null);

  // Timer Effect for Aptitude Quiz
  useEffect(() => {
    if (selectedQuizCategory && !quizFinished) {
      const interval = setInterval(() => {
        setQuizTimer((prev) => prev + 1);
      }, 1000);
      setTimerIntervalId(interval);
      return () => clearInterval(interval);
    } else {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
        setTimerIntervalId(null);
      }
    }
  }, [selectedQuizCategory, quizFinished]);

  // Format Quiz Timer (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Start Aptitude Quiz
  const startQuiz = (categoryId) => {
    setSelectedQuizCategory(categoryId);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizTimer(0);
  };

  const currentQuizQuestions = aptitudeQuestions.filter(
    (q) => q.category === selectedQuizCategory
  );

  const handleOptionSelect = (idx) => {
    if (quizSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const submitQuizAnswer = () => {
    if (selectedOptionIdx === null) return;
    const currentQ = currentQuizQuestions[currentQuestionIdx];
    if (selectedOptionIdx === currentQ.answerIdx) {
      setQuizScore((prev) => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const nextQuizQuestion = () => {
    if (currentQuestionIdx < currentQuizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      addQuizScore(selectedQuizCategory, quizScore, currentQuizQuestions.length);
    }
  };

  // HR Evaluation Mock logic
  const handleHrEvaluate = () => {
    if (!hrResponseText.trim()) return;
    setIsEvaluating(true);
    setEvaluationFeedback(null);
    
    setTimeout(() => {
      setIsEvaluating(false);
      
      // Dynamic evaluations based on length and core terms
      const wordCount = hrResponseText.trim().split(/\s+/).length;
      let score = 6.5;
      let positive = [];
      let constructive = [];
      
      const containsSituation = hrResponseText.toLowerCase().includes("situation") || hrResponseText.toLowerCase().includes("when") || hrResponseText.toLowerCase().includes("during");
      const containsTask = hrResponseText.toLowerCase().includes("task") || hrResponseText.toLowerCase().includes("responsibility") || hrResponseText.toLowerCase().includes("goal");
      const containsAction = hrResponseText.toLowerCase().includes("action") || hrResponseText.toLowerCase().includes("solved") || hrResponseText.toLowerCase().includes("i did") || hrResponseText.toLowerCase().includes("implemented");
      const containsResult = hrResponseText.toLowerCase().includes("result") || hrResponseText.toLowerCase().includes("consequently") || hrResponseText.toLowerCase().includes("leading to") || hrResponseText.toLowerCase().includes("percent") || hrResponseText.toLowerCase().includes("%");

      if (wordCount > 100) score += 1.0;
      if (wordCount > 180) score += 0.5;
      if (containsSituation) { score += 0.5; positive.push("Defined the initial Situation clearly."); }
      else constructive.push("Detail the Situation more explicitly (e.g., context, team size, or timeline).");
      
      if (containsTask) { score += 0.5; positive.push("Identified the core Task responsibilities."); }
      else constructive.push("Explain your specific Task objective (what you were personally responsible for resolving).");

      if (containsAction) { score += 0.5; positive.push("Explained the tactical Action steps you took."); }
      else constructive.push("Elaborate on your Action steps: detail *how* you solved it, frameworks used, or tools engineered.");

      if (containsResult) { score += 0.5; positive.push("Quantified the Result / business impact."); }
      else constructive.push("Your Result description is missing impact metrics. Try to include numbers (e.g. 'reduced latency by 20%' or 'completed 2 days ahead').");

      score = Math.min(Math.max(score, 4.0), 10.0);
      
      if (positive.length === 0) {
        positive.push("Provided a structured outline of your professional background.");
      }

      const feedbackData = {
        score: score.toFixed(1),
        strengths: positive,
        improvements: constructive,
      };

      setEvaluationFeedback(feedbackData);
      saveHrAnswer(activeHrQuestionId, hrResponseText, feedbackData.score, feedbackData);
    }, 2000);
  };

  // Switch Active HR Question
  const handleHrQuestionChange = (qId) => {
    setActiveHrQuestionId(qId);
    setEvaluationFeedback(null);
    if (hrAnswers[qId]) {
      setHrResponseText(hrAnswers[qId].answerText);
      setEvaluationFeedback(hrAnswers[qId].feedback);
    } else {
      setHrResponseText("");
    }
  };

  // Technical practice submissions
  const handleTechQuizSelect = (qId, optionIndex) => {
    setTechQuizAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const handleTechQuizSubmit = (topicId) => {
    setTechQuizSubmitted((prev) => ({
      ...prev,
      [topicId]: true,
    }));
  };

  // Sync HR loaded question details on mount
  useEffect(() => {
    if (hrQuestions[0] && !hrAnswers[hrQuestions[0].id]) {
      setHrResponseText("");
    } else if (hrQuestions[0]) {
      setHrResponseText(hrAnswers[hrQuestions[0].id].answerText);
      setEvaluationFeedback(hrAnswers[hrQuestions[0].id].feedback);
    }
  }, []);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div>
        <h1 className="page-title">Preparation Hub</h1>
        <p className="page-subtitle">Learn core concepts, complete DSA problem sheets, and practice aptitude & HR tests</p>
      </div>

      {/* Navigation tabs */}
      <div className="prep-tabs">
        <button
          className={`prep-tab ${activePrepTab === "dsa" ? "active" : ""}`}
          onClick={() => setActivePrepTab("dsa")}
        >
          💻 DSA Practice Sheet
        </button>
        <button
          className={`prep-tab ${activePrepTab === "aptitude" ? "active" : ""}`}
          onClick={() => setActivePrepTab("aptitude")}
        >
          📊 Aptitude Quizzes
        </button>
        <button
          className={`prep-tab ${activePrepTab === "technical" ? "active" : ""}`}
          onClick={() => setActivePrepTab("technical")}
        >
          📚 Technical Notes
        </button>
        <button
          className={`prep-tab ${activePrepTab === "hr" ? "active" : ""}`}
          onClick={() => setActivePrepTab("hr")}
        >
          🤝 HR Interview Builder
        </button>
      </div>

      {/* TAB 1: DSA Practice Sheet */}
      {activePrepTab === "dsa" && (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="dsa-search-bar">
            <div className="search-bar-wrap" style={{ flex: 1, padding: "0.5rem 1rem" }}>
              <div className="search-input-group">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Filter questions by name..."
                  value={dsaSearch}
                  onChange={(e) => setDsaSearch(e.target.value)}
                />
              </div>
            </div>

            <select
              className="filter-select"
              value={dsaTopicFilter}
              onChange={(e) => setDsaTopicFilter(e.target.value)}
            >
              <option value="All">All Topics</option>
              {dsaTopics.map((topic, idx) => (
                <option key={idx} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="dsa-table-wrap">
            <table className="dsa-table">
              <thead>
                <tr>
                  <th style={{ width: "60px", textAlign: "center" }}>Status</th>
                  <th>Problem</th>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th style={{ textAlign: "right" }}>Code Practice</th>
                </tr>
              </thead>
              <tbody>
                {dsaQuestions
                  .filter((q) => {
                    const matchesSearch = q.title.toLowerCase().includes(dsaSearch.toLowerCase());
                    const matchesTopic = dsaTopicFilter === "All" || q.topic === dsaTopicFilter;
                    return matchesSearch && matchesTopic;
                  })
                  .map((q) => {
                    const isChecked = !!dsaProgress[q.id];
                    return (
                      <tr key={q.id}>
                        <td style={{ textAlign: "center" }}>
                          <div
                            className={`dsa-checkbox ${isChecked ? "checked" : ""}`}
                            onClick={() => toggleDsaProgress(q.id)}
                          >
                            {isChecked && "✓"}
                          </div>
                        </td>
                        <td>
                          <span
                            className="dsa-title-link"
                            onClick={() => {
                              setSelectedDsaQuestionId(q.id);
                              changeTab("dsa-editor");
                            }}
                          >
                            {q.title}
                          </span>
                        </td>
                        <td style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{q.topic}</td>
                        <td>
                          <span className={`badge ${
                            q.difficulty === "Easy" ? "badge-easy" :
                            q.difficulty === "Medium" ? "badge-medium" : "badge-hard"
                          }`}>
                            {q.difficulty}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedDsaQuestionId(q.id);
                              changeTab("dsa-editor");
                            }}
                            style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                          >
                            Solve 🛠️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Aptitude Practice Quizzes */}
      {activePrepTab === "aptitude" && (
        <div className="fade-in">
          {!selectedQuizCategory ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="grid-3">
                {aptitudeCategories.map((cat) => {
                  const history = quizHistory.filter(h => h.category === cat.id);
                  const bestScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : null;

                  return (
                    <div key={cat.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                      <div>
                        <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>{cat.icon}</span>
                        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{cat.name}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                          {cat.desc}
                        </p>
                      </div>
                      
                      <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "1rem" }}>
                        {bestScore !== null ? (
                          <div style={{ fontSize: "0.85rem", color: "var(--success)", marginBottom: "0.75rem" }}>
                            Best Score: {bestScore} / 3
                          </div>
                        ) : (
                          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                            Not yet attempted
                          </div>
                        )}
                        <button className="btn btn-teal" style={{ width: "100%" }} onClick={() => startQuiz(cat.id)}>
                          Start Prep Quiz
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quiz History Table */}
              {quizHistory.length > 0 && (
                <div className="card">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Quiz History Log</h3>
                  <table className="dsa-table" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Score Obtained</th>
                        <th>Accuracy</th>
                        <th style={{ textAlign: "right" }}>Attempted On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizHistory.map((item) => {
                        const catDetails = aptitudeCategories.find(c => c.id === item.category);
                        const accuracy = Math.round((item.score / item.total) * 100);
                        return (
                          <tr key={item.id}>
                            <td>{catDetails ? catDetails.name : item.category}</td>
                            <td style={{ fontWeight: "600", color: item.score >= 2 ? "var(--success)" : "var(--danger)" }}>
                              {item.score} / {item.total}
                            </td>
                            <td>{accuracy}%</td>
                            <td style={{ textAlign: "right", color: "var(--text-muted)", fontSize: "0.85rem" }}>{item.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE QUIZ SCREEN */
            <div className="card" style={{ maxWidth: "700px", margin: "0 auto" }}>
              {quizFinished ? (
                /* QUIZ END / RESULTS SCREEN */
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1.5rem" }}>
                  <div style={{ fontSize: "4rem" }}>
                    {quizScore === currentQuizQuestions.length ? "🏆" : quizScore >= 2 ? "🌟" : "📚"}
                  </div>
                  <h2>Quiz Completed!</h2>
                  <div style={{ fontSize: "1.25rem" }}>
                    Your Score: <span style={{ fontWeight: "700", color: quizScore >= 2 ? "var(--success)" : "var(--warning)", fontSize: "1.8rem" }}>{quizScore}</span> / {currentQuizQuestions.length}
                  </div>
                  <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.4" }}>
                    {quizScore === currentQuizQuestions.length
                      ? "Flawless score! You have mastered this aptitude category."
                      : "Good effort! Review the step-by-step explanations below to fix incorrect concepts."}
                  </p>
                  
                  <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
                    <button className="btn btn-teal" onClick={() => startQuiz(selectedQuizCategory)}>
                      Retake Quiz
                    </button>
                    <button className="btn btn-secondary" onClick={() => setSelectedQuizCategory(null)}>
                      Close Quiz
                    </button>
                  </div>
                </div>
              ) : (
                /* ACTIVE QUESTION SCREEN */
                <div>
                  <div className="quiz-header">
                    <h3 style={{ fontSize: "1.1rem" }}>
                      Question {currentQuestionIdx + 1} of {currentQuizQuestions.length}
                    </h3>
                    <span className="quiz-timer">⏱️ {formatTime(quizTimer)}</span>
                  </div>

                  <div className="quiz-progress-bar">
                    <div
                      className="quiz-progress-fill"
                      style={{
                        width: `${((currentQuestionIdx) / currentQuizQuestions.length) * 100}%`
                      }}
                    ></div>
                  </div>

                  <div className="question-text">
                    <strong>Topic: {currentQuizQuestions[currentQuestionIdx].topic}</strong>
                    <div style={{ marginTop: "0.75rem" }}>
                      {currentQuizQuestions[currentQuestionIdx].question}
                    </div>
                  </div>

                  <div className="quiz-options">
                    {currentQuizQuestions[currentQuestionIdx].options.map((option, idx) => {
                      const alphabet = ["A", "B", "C", "D"];
                      const isSelected = selectedOptionIdx === idx;
                      const isCorrect = currentQuizQuestions[currentQuestionIdx].answerIdx === idx;
                      
                      let optionClass = "";
                      if (isSelected) optionClass = "selected";
                      if (quizSubmitted) {
                        if (isCorrect) optionClass = "correct";
                        else if (isSelected) optionClass = "incorrect";
                      }

                      return (
                        <button
                          key={idx}
                          className={`quiz-option ${optionClass}`}
                          onClick={() => handleOptionSelect(idx)}
                        >
                          <span className="option-prefix">{alphabet[idx]}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="quiz-explanation">
                      <strong style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Solution Explanation:</strong>
                      <div style={{ whiteSpace: "pre-line" }}>
                        {currentQuizQuestions[currentQuestionIdx].explanation}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    {!quizSubmitted ? (
                      <button
                        className="btn btn-primary"
                        onClick={submitQuizAnswer}
                        disabled={selectedOptionIdx === null}
                        style={{ opacity: selectedOptionIdx === null ? 0.6 : 1 }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button className="btn btn-teal" onClick={nextQuizQuestion}>
                        {currentQuestionIdx < currentQuizQuestions.length - 1 ? "Next Question →" : "View Results 🏁"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Technical Fundamentals Cheat Sheets */}
      {activePrepTab === "technical" && (
        <div className="fade-in notes-accordion">
          {technicalNotes.map((note) => {
            const isOpen = activeTechTopic === note.id;
            const isSubmitted = !!techQuizSubmitted[note.id];
            
            return (
              <div key={note.id} className="accordion-item card" style={{ padding: 0 }}>
                <div
                  className="accordion-header"
                  onClick={() => setActiveTechTopic(isOpen ? null : note.id)}
                >
                  <h3 style={{ fontSize: "1.1rem" }}>{note.title}</h3>
                  <span style={{ fontSize: "1.2rem" }}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {isOpen && (
                  <div className="accordion-content">
                    <p className="note-summary">{note.summary}</p>
                    
                    {/* Cheat Sheet Bullet Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.95rem", color: "white", fontWeight: "600" }}>Core Cheat Sheet:</h4>
                      <ul className="bullet-list" style={{ paddingLeft: "1.2rem" }}>
                        {note.keyPoints.map((pt, i) => (
                          <li key={i} style={{ marginBottom: "0.35rem" }}>
                            <span dangerouslySetInnerHTML={{ __html: pt.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mini Quiz Practice Section */}
                    <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
                      <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "1rem" }}>Concept Practice Mini Quiz:</h4>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {note.questions.map((q) => {
                          const userAns = techQuizAnswers[q.id];
                          const hasSelected = userAns !== undefined;
                          
                          return (
                            <div key={q.id} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                              <p style={{ fontSize: "0.95rem", fontWeight: "500", color: "white" }}>Q: {q.question}</p>
                              
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = userAns === oIdx;
                                  const isCorrect = q.answerIdx === oIdx;
                                  
                                  let optionStyle = {
                                    backgroundColor: "rgba(255,255,255,0.01)",
                                    borderColor: "var(--border-color)",
                                  };
                                  
                                  if (isSelected) {
                                    optionStyle.backgroundColor = "rgba(99, 102, 241, 0.05)";
                                    optionStyle.borderColor = "var(--primary)";
                                  }
                                  
                                  if (isSubmitted) {
                                    if (isCorrect) {
                                      optionStyle.backgroundColor = "rgba(16, 185, 129, 0.08)";
                                      optionStyle.borderColor = "var(--success)";
                                    } else if (isSelected) {
                                      optionStyle.backgroundColor = "rgba(239, 68, 68, 0.08)";
                                      optionStyle.borderColor = "var(--danger)";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => !isSubmitted && handleTechQuizSelect(q.id, oIdx)}
                                      className="quiz-option"
                                      style={{ ...optionStyle, padding: "0.75rem 1rem", fontSize: "0.85rem" }}
                                    >
                                      <span className="option-prefix">{String.fromCharCode(65 + oIdx)}.</span>
                                      <span>{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {isSubmitted && (
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", backgroundColor: "rgba(0,0,0,0.15)", padding: "0.75rem", borderRadius: "6px", borderLeft: "2.5px solid var(--secondary)", lineHeight: "1.4" }}>
                                  <strong>Explanation: </strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {!isSubmitted && (
                        <button
                          className="btn btn-teal"
                          onClick={() => handleTechQuizSubmit(note.id)}
                          style={{ marginTop: "1.5rem" }}
                        >
                          Submit Mini Quiz Answers
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: HR Interview Builder */}
      {activePrepTab === "hr" && (
        <div className="fade-in hr-split-container">
          {/* Question List Left Sidebar */}
          <div className="hr-questions-list">
            {hrQuestions.map((q) => {
              const hasDrafted = !!hrAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`hr-question-item ${activeHrQuestionId === q.id ? "active" : ""}`}
                  onClick={() => handleHrQuestionChange(q.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <span className="badge badge-blue" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>{q.category}</span>
                    {hasDrafted && <span style={{ color: "var(--success)", fontSize: "0.75rem" }}>Drafted ✓</span>}
                  </div>
                  <h4 style={{ fontSize: "0.95rem", color: "white", marginTop: "0.25rem", lineHeight: "1.3" }}>{q.question}</h4>
                </div>
              );
            })}
          </div>

          {/* Answer Workspace Right Panel */}
          {activeHrQuestionId && (
            <div className="card hr-workspace-panel">
              {(() => {
                const currentQ = hrQuestions.find(q => q.id === activeHrQuestionId);
                if (!currentQ) return null;

                return (
                  <>
                    <div>
                      <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{currentQ.question}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.4", backgroundColor: "rgba(0,0,0,0.15)", padding: "0.85rem", borderRadius: "6px", borderLeft: "2.5px solid var(--warning)" }}>
                        💡 <strong>Answering Tip:</strong> {currentQ.tips}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.95rem", color: "white", marginBottom: "0.5rem" }}>Example Outstanding Answer:</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.5", fontStyle: "italic", border: "1px solid var(--border-color)", padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.01)" }}>
                        "{currentQ.sample}"
                      </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.95rem", color: "white" }}>Your Structured Answer:</h4>
                      <textarea
                        className="hr-answer-textarea"
                        placeholder="Draft your response using the STAR method (Situation, Task, Action, Result) if applicable..."
                        value={hrResponseText}
                        onChange={(e) => setHrResponseText(e.target.value)}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        className="btn btn-primary"
                        onClick={handleHrEvaluate}
                        disabled={isEvaluating || !hrResponseText.trim()}
                        style={{ opacity: !hrResponseText.trim() ? 0.6 : 1 }}
                      >
                        {isEvaluating ? "Mock Evaluating AI..." : "Evaluate Answer ✨"}
                      </button>
                    </div>

                    {evaluationFeedback && (
                      <div className="feedback-card">
                        <div className="feedback-score">
                          Mock Score: <span>{evaluationFeedback.score} / 10.0</span>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                          <div>
                            <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>STRENGTHS:</strong>
                            <ul className="bullet-list" style={{ paddingLeft: "1.25rem", marginTop: "0.25rem" }}>
                              {evaluationFeedback.strengths.map((str, idx) => (
                                <li key={idx} style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{str}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {evaluationFeedback.improvements.length > 0 && (
                            <div>
                              <strong style={{ color: "var(--warning)", fontSize: "0.85rem" }}>AREAS TO IMPROVE:</strong>
                              <ul className="bullet-list" style={{ paddingLeft: "1.25rem", marginTop: "0.25rem" }}>
                                {evaluationFeedback.improvements.map((imp, idx) => (
                                  <li key={idx} style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{imp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
