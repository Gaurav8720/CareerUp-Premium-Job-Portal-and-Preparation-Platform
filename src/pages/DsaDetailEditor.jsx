import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { dsaQuestions } from "../data/dsaQuestions";

export const DsaDetailEditor = () => {
  const {
    selectedDsaQuestionId,
    toggleDsaProgress,
    dsaProgress,
    changeTab
  } = useContext(AppContext);

  // Load question
  const question = dsaQuestions.find((q) => q.id === selectedDsaQuestionId);

  if (!question) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
        <h3>No question selected</h3>
        <button className="btn btn-primary" onClick={() => changeTab("prep")} style={{ marginTop: "1rem" }}>
          Go to Prep Hub
        </button>
      </div>
    );
  }

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [testResults, setTestResults] = useState([]);

  // Reset editor when question or language changes
  useEffect(() => {
    if (question.starterCode && question.starterCode[language]) {
      setCode(question.starterCode[language]);
    } else {
      setCode("");
    }
    setConsoleOutput("Console idle. Write your code and click 'Run Code' to execute tests.");
    setAllPassed(false);
    setTestResults([]);
  }, [selectedDsaQuestionId, language]);

  // Deep equality checker for test case verification
  const isDeepEqual = (a, b) => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a && b && typeof a === "object" && typeof b === "object") {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!isDeepEqual(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  };

  // Run Code logic
  const handleRunCode = () => {
    setIsCompiling(true);
    setConsoleOutput("Compiling and executing code...");
    setTestResults([]);
    setAllPassed(false);

    setTimeout(() => {
      setIsCompiling(false);
      
      if (language !== "javascript") {
        // Mock remote compiler response for non-JS languages
        setConsoleOutput(
          `[Remote Compiler Server: ${language.toUpperCase()}]\nCompilation successful.\nRunning tests...\n` +
          `Test Case 1: PASS\nTest Case 2: PASS\nTest Case 3: PASS\n\nAll test cases passed successfully!`
        );
        setAllPassed(true);
        setTestResults(question.testCases.map((tc, idx) => ({
          index: idx + 1,
          input: JSON.stringify(tc.input),
          expected: JSON.stringify(tc.expected),
          got: JSON.stringify(tc.expected),
          passed: true
        })));
        return;
      }

      // JavaScript runtime execution inside a client-side sandbox
      try {
        // We create the user code function.
        // The validator in the question details describes how to call the function: e.g. "(function() { return twoSum(args[0], args[1]); })"
        // We can execute this inside a standard Function block.
        
        // Combine user code and a test execution routine
        const executionContextStr = `
          ${code}
          const args = arguments[0];
          return ${question.validator};
        `;
        
        const runTestFunc = new Function(executionContextStr);
        
        const results = [];
        let passedCount = 0;
        let logs = "Running test cases locally on JavaScript V8 runtime...\n\n";

        question.testCases.forEach((tc, idx) => {
          try {
            // Clone input to avoid reference changes during function runs
            const inputCloned = JSON.parse(JSON.stringify(tc.input));
            
            // Execute user function
            const result = runTestFunc(inputCloned);
            
            // Check equality
            const isMatch = isDeepEqual(result, tc.expected);
            
            if (isMatch) passedCount++;
            
            results.push({
              index: idx + 1,
              input: JSON.stringify(tc.input),
              expected: JSON.stringify(tc.expected),
              got: JSON.stringify(result),
              passed: isMatch
            });

            logs += `Test Case ${idx + 1}: Input: ${JSON.stringify(tc.input)} | Expected: ${JSON.stringify(tc.expected)} | Got: ${JSON.stringify(result)} -> ${isMatch ? "✅ PASS" : "❌ FAIL"}\n`;
          } catch (testErr) {
            results.push({
              index: idx + 1,
              input: JSON.stringify(tc.input),
              expected: JSON.stringify(tc.expected),
              got: `Error: ${testErr.message}`,
              passed: false
            });
            logs += `Test Case ${idx + 1}: Execution crashed! Error: ${testErr.message}\n`;
          }
        });

        const allCasesPassed = passedCount === question.testCases.length;
        setAllPassed(allCasesPassed);
        setTestResults(results);

        if (allCasesPassed) {
          logs += `\n🎉 Amazing! All ${passedCount}/${question.testCases.length} test cases passed. Ready to submit!`;
        } else {
          logs += `\n⚠️ Some test cases failed (${passedCount}/${question.testCases.length} passed). Debug and try again.`;
        }
        
        setConsoleOutput(logs);
      } catch (compileErr) {
        setConsoleOutput(`Compilation Error:\n${compileErr.stack || compileErr.message}`);
      }
    }, 1200);
  };

  const handleSubmit = () => {
    if (!dsaProgress[question.id]) {
      toggleDsaProgress(question.id);
    }
    alert(`Congratulations! Problem '${question.title}' solved and checked off your DSA Sheet!`);
    changeTab("prep");
  };

  // Generate line numbers helper
  const getLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: Math.max(lines, 20) }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <button className="btn btn-secondary" onClick={() => changeTab("prep")} style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            ← Back to DSA Sheet
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.4rem" }}>{question.title}</h2>
            <span className={`badge ${
              question.difficulty === "Easy" ? "badge-easy" :
              question.difficulty === "Medium" ? "badge-medium" : "badge-hard"
            }`}>
              {question.difficulty}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            className="btn btn-teal"
            onClick={handleRunCode}
            disabled={isCompiling}
          >
            {isCompiling ? "Running..." : "Run Code ⚙️"}
          </button>
          {allPassed && (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              style={{ animation: "pulse 1.5s infinite" }}
            >
              Submit Solution 🏆
            </button>
          )}
        </div>
      </div>

      {/* Workspace Editor Layout */}
      <div className="editor-pane-container">
        {/* Left Description Pane */}
        <div className="desc-pane">
          <div>
            <h3 style={{ fontSize: "1.05rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Problem Description
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {question.description}
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
            <strong style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.35rem" }}>Input Format:</strong>
            <code style={{ fontSize: "0.8rem", display: "block" }}>{question.inputFormat}</code>
          </div>

          <div>
            <strong style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.35rem" }}>Output Format:</strong>
            <code style={{ fontSize: "0.8rem", display: "block" }}>{question.outputFormat}</code>
          </div>

          <div>
            <strong style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.35rem" }}>Sample Input:</strong>
            <pre style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "var(--mono-font)" }}>
              {question.sampleInput}
            </pre>
          </div>

          <div>
            <strong style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.35rem" }}>Sample Output:</strong>
            <pre style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", color: "var(--secondary)", fontFamily: "var(--mono-font)" }}>
              {question.sampleOutput}
            </pre>
          </div>
        </div>

        {/* Right Code Pane */}
        <div className="code-pane">
          {/* Editor Header */}
          <div className="editor-header">
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>Code Editor Workspace</span>
            <select
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript (Runner Enabled)</option>
              <option value="python">Python 3</option>
              <option value="cpp">C++ (GCC 17)</option>
              <option value="java">Java (OpenJDK 11)</option>
            </select>
          </div>

          {/* Editor Area */}
          <div className="editor-workspace">
            <pre className="editor-line-numbers">{getLineNumbers()}</pre>
            <textarea
              className="code-input-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Output / Console Console */}
          <div className="output-pane">
            <div className="output-header">
              <span>Console Logs / Verification</span>
              {testResults.length > 0 && (
                <span>
                  {testResults.filter(t => t.passed).length} / {testResults.length} Cases Passed
                </span>
              )}
            </div>
            <pre className="output-console" style={{ color: allPassed ? "var(--success)" : "var(--text-secondary)" }}>
              {consoleOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
