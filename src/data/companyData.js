export const companyData = [
  {
    id: "google",
    name: "Google",
    logoBg: "#4285F4",
    logoText: "GOOG",
    difficulty: "High",
    eligibility: "B.Tech/M.Tech/Dual Degree in CS, IT, ECE or related engineering fields. No active backlogs. Typically demands 7.5+ CGPA/75% standard.",
    roundsSummary: "Online Assessment -> 4 Technical Interviews (Coding/DS/Algo) -> 1 Googlyness (Behavioral/Leadership) Interview",
    examPattern: [
      { round: "Round 1: Online Assessment (OA)", details: "2 Coding Questions on graph, DP, or tree structures. Time: 90 minutes. Platforms: Hackerearth/HackerRank." },
      { round: "Round 2-5: Technical Coding Rounds", details: "45 minutes each. Interactive coding on Google Docs or virtual canvas. Expect high focus on algorithmic efficiency, space-time complexities, edge cases, and optimization." },
      { round: "Round 6: Googlyness & Leadership", details: "45 minutes. Scenarios to test culture fit, teamwork, handling ambiguity, bias for action, and ethical decisions." }
    ],
    syllabus: [
      { subject: "Data Structures", topics: "Graphs (Dijkstra, DFS, BFS), Trees (Segment Trees, Trie, BST), Advanced Heaps, HashMaps." },
      { subject: "Algorithms", topics: "Dynamic Programming (Grid, Strings), Binary Search, Two Pointers, Divide and Conquer, Bit Manipulation." },
      { subject: "System Design", topics: "Only for mid/senior roles. Scalability, Caching, Load Balancers, Sharding, microservices." }
    ],
    recentQuestions: [
      "Given a binary tree, return the maximum path sum between any two nodes.",
      "Design an autocomplete system that recommends top 3 searched terms based on historical prefixes.",
      "Given an array of strings, group anagrams together.",
      "How would you handle a situation where your project requirement changes 2 days before deployment?"
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoBg: "#F25022",
    logoText: "MSFT",
    difficulty: "High",
    eligibility: "BE/B.Tech/MCA/MS in Computer Science or related fields. Minimum 70% or 7.0 CGPA in academics. No active backlogs.",
    roundsSummary: "Coding OA -> 3-4 Technical rounds (DS/Algo, System Design, OOPs) -> AA (As appropriate/Managerial) Round",
    examPattern: [
      { round: "Round 1: Codility Online Test", details: "2-3 coding problems on Arrays, Strings, or Stack/Queue. Time: 70-90 minutes. Focus is on correctness and test suite coverage." },
      { round: "Round 2-3: Technical Rounds", details: "Focus on Core DS (Linked Lists, Binary Trees, Strings), Object-Oriented Design (OOD), and CS fundamentals (Threads, Memory management)." },
      { round: "Round 4: AA / Director Round", details: "Combines technical design discussion, project deep-dive, and behavioral queries on growth mindset." }
    ],
    syllabus: [
      { subject: "Data Structures", topics: "Linked Lists (floyd cycle, reverse, merge), Trees (LCA, diameter), Stacks/Queues." },
      { subject: "Object-Oriented Design", topics: "Liskov substitution, SOLID design patterns, Parking lot design, Movie booking system design." },
      { subject: "OS Concepts", topics: "Multi-threading, semaphores, virtual memory, concurrency bottlenecks." }
    ],
    recentQuestions: [
      "Detect and remove a loop in a singly linked list.",
      "Write a function to serialize and deserialize a binary tree.",
      "Implement a Least Recently Used (LRU) Cache.",
      "How would you design a parking lot system using OOPs principles?"
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logoBg: "#FF9900",
    logoText: "AMZN",
    difficulty: "High",
    eligibility: "B.Tech/BE/MCA/M.Tech with strong programming roots. Minimum 65% / 6.5 CGPA required.",
    roundsSummary: "Online Coding OA -> 3-4 Technical Rounds -> Bar Raiser (Critical Culture Fit + Coding)",
    examPattern: [
      { round: "Round 1: Online Assessment", details: "2 coding questions + Work Style assessment + Aptitude. Focuses on Amazon Leadership Principles throughout the test." },
      { round: "Round 2-3: Technical Coding Rounds", details: "DS & Algorithms heavy. Every coding question is paired with a Leadership Principle check. Time: 1 hour each." },
      { round: "Round 4: Bar Raiser", details: "Conducted by an independent evaluator. Focuses heavily on Leadership Principles, system design, and coding optimizations under stress." }
    ],
    syllabus: [
      { subject: "Data Structures", topics: "Heaps (K-way merge), HashTables, Trees, Matrix traversals, Graphs." },
      { subject: "Algorithms", topics: "Greedy, Sliding Window, Backtracking, Dynamic Programming (Knapsack, LCS)." },
      { subject: "Leadership Principles", topics: "Customer Obsession, Ownership, Deliver Results, Bias for Action (Must study)." }
    ],
    recentQuestions: [
      "Find the length of the longest substring without repeating characters.",
      "Find the median of a running stream of integers using heaps.",
      "Given a 2D grid of land and water, find the number of distinct islands.",
      "Describe a time when you took a calculated risk and failed. What did you learn?"
    ]
  },
  {
    id: "tcs",
    name: "TCS (Tata Consultancy Services)",
    logoBg: "#1E2A38",
    logoText: "TCS",
    difficulty: "Medium",
    eligibility: "B.E/B.Tech/M.E/M.Tech/MCA/M.Sc. Min 60% in class 10th, 12th, and graduation. Max 1 active backlog. Age limit: 18-28 years.",
    roundsSummary: "TCS NQT (National Qualifier Test) -> Technical Interview -> HR/Managerial Interview",
    examPattern: [
      { round: "Round 1: National Qualifier Test (NQT)", details: "Part A (Foundation): Traits, Cognitive (Numerical, Verbal, Reasoning). Part B (Advanced): Advanced Quant, Reasoning, 2 Coding questions (1 Easy, 1 Medium in 45 mins)." },
      { round: "Round 2: Technical Interview", details: "Usually covers basic programming (Java/Python/C), OOPs concepts, DBMS queries (SQL Joins), final year project walkthrough, and certifications." },
      { round: "Round 3: Managerial & HR Round", details: "Discussion on relocation, night shifts, communication checks, background verification, and company values." }
    ],
    syllabus: [
      { subject: "Cognitive Aptitude", topics: "Ratios, Percentages, Time & Work, Coding-Decoding, Syllogisms, Reading Comprehension." },
      { subject: "Coding Section", topics: "Basic Array manipulations, String processing (anagram, palindrome), Fibonacci, prime numbers, patterns." },
      { subject: "Core CS", topics: "SQL Joins, ACID Properties, OOPs pillars (Polymorphism, Inheritance), basic SDLC concepts." }
    ],
    recentQuestions: [
      "Write a program to check if a given string is an anagram of another.",
      "What is the difference between primary key, foreign key, and unique key in SQL?",
      "Explain the concept of method overloading vs overriding with examples.",
      "Are you comfortable relocating to any city in India, and how do you feel about working night shifts?"
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    logoBg: "#007CC3",
    logoText: "INFY",
    difficulty: "Medium",
    eligibility: "BE/B.Tech/ME/M.Tech/MCA/M.Sc (Maths/CS/IT). Minimum 60% or 6.0 CGPA throughout 10th, 12th, and graduation.",
    roundsSummary: "Online Recruitment Test (InfyTQ or System Test) -> Single Technical + HR Interview",
    examPattern: [
      { round: "Round 1: Online System Test", details: "Divided into: Mathematical Ability, Logical Reasoning, Verbal Ability, Pseudo-code analysis, and 2 Coding Questions." },
      { round: "Round 2: Combined Technical & HR Interview", details: "Lasts 20-30 minutes. Focuses on OOPs concepts, database systems, basic data structures (Stack, Queue), project details, and basic puzzle solving." }
    ],
    syllabus: [
      { subject: "Aptitude & Logic", topics: "Permutations & Combinations, Data Interpretation, Crypto-arithmetic puzzles, Syllogisms." },
      { subject: "Technical Fundamentals", topics: "OOPs programming, DBMS fundamentals, SDLC (Agile, Waterfall), basic HTML/CSS/JS knowledge." },
      { subject: "Pseudo-code", topics: "Output prediction of code snippets using pointers, loops, and conditions." }
    ],
    recentQuestions: [
      "Predict the output of the given recursive function (provided on paper/screen).",
      "Write SQL query to find the second highest salary of an employee from the Employee table.",
      "Explain the difference between abstract class and interface.",
      "Why do you want to join Infosys and what are your plans for upskilling over the next 2 years?"
    ]
  },
  {
    id: "wipro",
    name: "Wipro",
    logoBg: "#252B33",
    logoText: "WIPR",
    difficulty: "Medium",
    eligibility: "B.E/B.Tech/M.E/M.Tech (regular). 60% in 10th, 12th, and 6.0 CGPA/60% in graduation. Max 1 active backlog.",
    roundsSummary: "Elite NTH Online Assessment -> Technical Interview -> HR Interview",
    examPattern: [
      { round: "Round 1: Wipro Elite NTH Assessment", details: "Aptitude (Quantitative, Logical, Verbal), Written English Test (Essay writing - automated grading), and Online Coding (2 questions in 45 mins)." },
      { round: "Round 2: Technical Interview", details: "Discussion on final year project, basic coding logic (e.g., swapping without 3rd variable), basic HTML, and relational databases." },
      { round: "Round 3: HR Interview", details: "Basic HR queries: strength/weakness, willingness to sign service agreement (if any), shift timings check." }
    ],
    syllabus: [
      { subject: "Aptitude", topics: "Speed, Distance & Time, Simple & Compound Interest, Number Series, Analogies, Sentence completion." },
      { subject: "Automated Essay", topics: "Grammar, spellings, sentence structure, coherence on a given social or technical topic." },
      { subject: "Basic Coding", topics: "Array sorting, searching, prime factors, matrix addition, string reversal." }
    ],
    recentQuestions: [
      "Write a program to reverse a string without using library functions.",
      "What is normalization and explain 1NF, 2NF, 3NF?",
      "Explain the difference between compiled and interpreted languages.",
      "What is your final year project about? What was your individual role in it?"
    ]
  }
];
