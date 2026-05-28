export const technicalNotes = [
  {
    id: "tech-dbms",
    topic: "DBMS",
    title: "Database Management Systems (DBMS)",
    summary: "A DBMS is software used to manage databases. Core topics for interviews include ACID properties, Normalization, SQL vs NoSQL, and indexing architectures.",
    keyPoints: [
      "**ACID Properties**: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't clash), Durability (committed data is permanent).",
      "**Normalization**: Process of organizing data to reduce redundancy. 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (every determinant is a candidate key).",
      "**Indexing**: Speeds up data retrieval using B/B+ Trees. While it improves SELECT query performance, it adds overhead to INSERT, UPDATE, and DELETE operations.",
      "**SQL vs NoSQL**: SQL databases are relational, table-based, structured, schema-defined, and vertically scalable. NoSQL databases are non-relational, document/key-value/graph-based, dynamic schema, and horizontally scalable."
    ],
    questions: [
      {
        id: "dbms-q1",
        question: "Which normal form is concerned with eliminating transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answerIdx: 2,
        explanation: "Third Normal Form (3NF) requires the table to be in 2NF, and all non-key columns must be mutually independent (no transitive functional dependency on the primary key)."
      },
      {
        id: "dbms-q2",
        question: "What does the 'Isolation' property in ACID transactions ensure?",
        options: [
          "Data is written to persistent disk storage",
          "Concurrent transaction execution leaves the database in the same state as sequential execution",
          "A transaction is treated as a single indivisible unit of work",
          "The database remains structurally valid after transaction completion"
        ],
        answerIdx: 1,
        explanation: "Isolation ensures that transactions are securely and independently processed at the same time without interference, mimicking sequential execution."
      }
    ]
  },
  {
    id: "tech-os",
    topic: "Operating Systems",
    title: "Operating Systems (OS)",
    summary: "An OS acts as an intermediary between a user and computer hardware. Key interview areas include Process Management, Memory Management, CPU Scheduling, and Deadlocks.",
    keyPoints: [
      "**Process vs Thread**: A process is an executing program with its own memory space (code, data, heap, stack). A thread is a lightweight unit of execution within a process that shares the parent process's memory space.",
      "**Deadlock**: A state where a set of processes are blocked because each process holds a resource and waits for another resource held by some other process. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
      "**Virtual Memory**: A technique that allows the execution of processes that are not completely in main memory. It uses paging to map virtual addresses to physical frames.",
      "**Thrashing**: A state where the CPU spends more time swapping pages in and out of disk than executing instructions, caused by insufficient physical frames."
    ],
    questions: [
      {
        id: "os-q1",
        question: "Which of the following is NOT a necessary condition for a deadlock to occur?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "Preemption",
          "Circular Wait"
        ],
        answerIdx: 2,
        explanation: "Deadlock requires 'No Preemption' (resources cannot be forcibly taken from a process). If preemption is allowed, deadlocks can be resolved/prevented."
      },
      {
        id: "os-q2",
        question: "What is a 'thread' sharing with other threads of the same process?",
        options: [
          "Stack pointer and program counter",
          "Register values and local variables",
          "Address space, code section, and data files",
          "None of the above"
        ],
        answerIdx: 2,
        explanation: "Threads of the same process share the process's code section, data section, and system resources (like open files). They do NOT share stacks or registers."
      }
    ]
  },
  {
    id: "tech-cn",
    topic: "Computer Networks",
    title: "Computer Networks (CN)",
    summary: "Computer networks allow computers to share resources and communicate. Understand the OSI Model layers, TCP vs UDP, IP addressing, and common application protocols.",
    keyPoints: [
      "**OSI Model**: 7 layers: Physical (bits), Data Link (frames), Network (packets), Transport (segments), Session (sessions), Presentation (syntax/encryption), Application (user services).",
      "**TCP vs UDP**: TCP is connection-oriented, reliable (acknowledgments, retransmissions), ordered, and performs flow/congestion control. UDP is connectionless, fast, unreliable, and unordered (ideal for streaming/gaming).",
      "**DNS (Domain Name System)**: Translates human-readable domain names (e.g. google.com) to machine-readable IP addresses.",
      "**HTTP Status Codes**: 1xx (Informational), 2xx (Success, e.g. 200 OK), 3xx (Redirection, e.g. 301 Moved Permanently), 4xx (Client Error, e.g. 404 Not Found), 5xx (Server Error, e.g. 500 Internal Server Error)."
    ],
    questions: [
      {
        id: "cn-q1",
        question: "At which layer of the OSI model does a router primarily operate?",
        options: [
          "Data Link Layer",
          "Transport Layer",
          "Network Layer",
          "Physical Layer"
        ],
        answerIdx: 2,
        explanation: "Routers forward packets based on logical IP addresses, which happens at the Network Layer (Layer 3)."
      },
      {
        id: "cn-q2",
        question: "Which transport layer protocol is connectionless and does not guarantee packet delivery?",
        options: ["TCP", "UDP", "FTP", "HTTP"],
        answerIdx: 1,
        explanation: "User Datagram Protocol (UDP) is a connectionless protocol that sends packets without establishing a connection or checking if they arrive."
      }
    ]
  },
  {
    id: "tech-oops",
    topic: "OOPs",
    title: "Object-Oriented Programming (OOPs)",
    summary: "OOPs is a programming paradigm based on the concept of 'objects' containing data and methods. The four core pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    keyPoints: [
      "**Encapsulation**: Binding data (variables) and methods (functions) together into a single unit (class), and restricting direct access to object components using private access modifiers.",
      "**Abstraction**: Hiding internal implementation details and showing only essential interfaces. Achieved using abstract classes and interfaces.",
      "**Inheritance**: The mechanism where a new class (subclass/child) inherits properties and behaviors from an existing class (superclass/parent), promoting code reusability.",
      "**Polymorphism**: The ability of a message or method to be processed in more than one form. Types: Compile-time (Method Overloading) and Runtime (Method Overriding)."
    ],
    questions: [
      {
        id: "oops-q1",
        question: "What is it called when two methods in the same class have the same name but different signatures?",
        options: [
          "Method Overriding",
          "Method Overloading",
          "Encapsulation",
          "Abstraction"
        ],
        answerIdx: 1,
        explanation: "Method Overloading (Compile-time polymorphism) is when multiple methods in the same class have the same name but differ in parameters (number, type, or order)."
      },
      {
        id: "oops-q2",
        question: "Which pillar of OOPs is primarily concerned with restricting direct access to an object's internal fields?",
        options: [
          "Inheritance",
          "Polymorphism",
          "Abstraction",
          "Encapsulation"
        ],
        answerIdx: 3,
        explanation: "Encapsulation achieves data hiding by making member variables private and exposing them only through public getter/setter methods."
      }
    ]
  }
];
export const hrQuestions = [
  {
    id: "hr-1",
    question: "Tell me about yourself.",
    category: "Introduction",
    tips: "Focus on the 'Present-Past-Future' formula. Talk about your current role/studies, highlight key achievements from your past, and transition to why you are excited about this specific opportunity.",
    sample: "I am a final-year Computer Science student at XYZ University, specializing in full-stack web development. Recently, I completed an internship at ABC Corp where I improved database query performance by 25% using custom index strategies. In my studies, I have maintained a 9.2 CGPA and developed a passion for building scalable web services. I am looking forward to joining your team as a Software Engineer, where I can apply my problem-solving skills to real-world cloud architectures."
  },
  {
    id: "hr-2",
    question: "What are your strengths and weaknesses?",
    category: "Self-Reflection",
    tips: "For strengths, align them with the job description and share a quick example. For weaknesses, pick a real but minor professional weakness and explain how you are actively working to improve it.",
    sample: "My greatest strength is my persistence in debugging complex issues; during my college capstone project, I led the team in resolving a subtle race condition that occurred in our notification engine. My weakness is that I sometimes struggle with public speaking, particularly in large groups. However, to overcome this, I have joined my college toastmasters club and volunteered to present weekly project stand-ups, which has significantly boosted my confidence."
  },
  {
    id: "hr-3",
    question: "Describe a challenge you faced and how you overcame it.",
    category: "Behavioral",
    tips: "Use the STAR framework: Situation, Task, Action, Result. Frame the challenge positively, showing collaboration, structured thinking, and a successful resolution.",
    sample: "Situation: During a 48-hour hackathon, our database server crashed 8 hours before the submission deadline due to an unexpected load spike.\nTask: As the backend lead, I had to restore data integrity and scale our setup under tight time pressure.\nAction: I analyzed the logs, identified an unindexed query causing CPU starvation, created index mappings, and implemented a Redis caching layer to handle read requests.\nResult: We successfully restored the app within 2 hours, and it handled over 500 concurrent evaluations during judging, leading us to win the 2nd runner-up prize."
  },
  {
    id: "hr-4",
    question: "Why do you want to join our company?",
    category: "Alignment",
    tips: "Show that you did your homework. Mention the company's recent achievements, core values, products, or engineering blog posts, and connect them with your career goals.",
    sample: "I have been following your company's work in AI integration and developer tooling. Your engineering team recently published a blog post on optimizing serverless latency, which aligned perfectly with my interests in cloud performance. I want to work in an environment that values engineering excellence and continuous learning, and I believe my background in React and microservices will allow me to contribute immediately to your product pipeline."
  }
];
