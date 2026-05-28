import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation Routing Tab: dashboard, jobs, prep, companies, dsa-editor
  const [currentTab, setCurrentTab] = useState("dashboard");
  
  // Selected items for modal/editor views
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedDsaQuestionId, setSelectedDsaQuestionId] = useState(null);
  
  // Persisted state using localStorage
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem("job_prep_applied_jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [dsaProgress, setDsaProgress] = useState(() => {
    const saved = localStorage.getItem("job_prep_dsa_progress");
    return saved ? JSON.parse(saved) : {};
  });

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem("job_prep_quiz_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [hrAnswers, setHrAnswers] = useState(() => {
    const saved = localStorage.getItem("job_prep_hr_answers");
    return saved ? JSON.parse(saved) : {};
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("job_prep_applied_jobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem("job_prep_dsa_progress", JSON.stringify(dsaProgress));
  }, [dsaProgress]);

  useEffect(() => {
    localStorage.setItem("job_prep_quiz_history", JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem("job_prep_hr_answers", JSON.stringify(hrAnswers));
  }, [hrAnswers]);

  // Actions
  const changeTab = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyToJob = (job, coverLetter = "") => {
    if (appliedJobs.some((j) => j.id === job.id)) return;
    const newApplication = {
      ...job,
      appliedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Applied", // Applied, Interviewing, Offer, Rejected
      coverLetter,
    };
    setAppliedJobs([newApplication, ...appliedJobs]);
  };

  const updateApplicationStatus = (jobId, newStatus) => {
    setAppliedJobs(
      appliedJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const toggleDsaProgress = (questionId) => {
    setDsaProgress((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const addQuizScore = (category, score, total) => {
    const newRecord = {
      id: "quiz-" + Date.now(),
      category,
      score,
      total,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setQuizHistory([newRecord, ...quizHistory]);
  };

  const saveHrAnswer = (questionId, answerText, score, feedback) => {
    setHrAnswers((prev) => ({
      ...prev,
      [questionId]: {
        answerText,
        score,
        feedback,
        date: new Date().toLocaleDateString(),
      },
    }));
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all your preparation progress? This will delete all DSA checks, quiz history, and applied jobs.")) {
      setAppliedJobs([]);
      setDsaProgress({});
      setQuizHistory([]);
      setHrAnswers({});
      setCurrentTab("dashboard");
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        changeTab,
        selectedJobId,
        setSelectedJobId,
        selectedDsaQuestionId,
        setSelectedDsaQuestionId,
        appliedJobs,
        applyToJob,
        updateApplicationStatus,
        dsaProgress,
        toggleDsaProgress,
        quizHistory,
        addQuizScore,
        hrAnswers,
        saveHrAnswer,
        resetAllProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
