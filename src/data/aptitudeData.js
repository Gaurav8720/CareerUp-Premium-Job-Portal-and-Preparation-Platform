export const aptitudeCategories = [
  { id: "quant", name: "Quantitative Aptitude", icon: "📊", desc: "Test your mathematical skills in percentages, ratios, algebra, probability, and arithmetic." },
  { id: "logical", name: "Logical Reasoning", icon: "🧠", desc: "Validate your deduction skills with syllogisms, series completion, blood relations, and coding-decoding." },
  { id: "verbal", name: "Verbal Ability", icon: "🗣️", desc: "Check grammar skills, reading comprehension, vocabulary, and paragraph arrangement." }
];

export const aptitudeQuestions = [
  // QUANTITATIVE
  {
    id: "apt-q1",
    category: "quant",
    topic: "Time & Work",
    question: "A can complete a piece of work in 12 days and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work is left?",
    options: [
      "5 / 9",
      "4 / 9",
      "2 / 9",
      "7 / 18"
    ],
    answerIdx: 1,
    explanation: "1. A's 1-day work = 1 / 12\n2. B's 1-day work = 1 / 18\n3. Combined 1-day work = (1 / 12) + (1 / 18) = (3 + 2) / 36 = 5 / 36\n4. In 4 days, they complete = 4 * (5 / 36) = 20 / 36 = 5 / 9 of the work.\n5. Therefore, work left = 1 - (5 / 9) = 4 / 9."
  },
  {
    id: "apt-q2",
    category: "quant",
    topic: "Profit & Loss",
    question: "A shopkeeper sells an item at a discount of 20% on the marked price and still makes a profit of 12%. By what percentage is the marked price higher than the cost price?",
    options: [
      "32%",
      "40%",
      "25%",
      "30%"
    ],
    answerIdx: 1,
    explanation: "Let Cost Price (CP) = 100.\n1. Profit = 12%, so Selling Price (SP) = 112.\n2. Since SP is after a 20% discount on Marked Price (MP), we have SP = 0.8 * MP.\n3. Therefore, MP = SP / 0.8 = 112 / 0.8 = 140.\n4. Marked price is 140, CP is 100. MP is (140 - 100)% = 40% higher than the Cost Price."
  },
  {
    id: "apt-q3",
    category: "quant",
    topic: "Probability",
    question: "Two dice are thrown simultaneously. What is the probability of obtaining a total score of 7 or 11?",
    options: [
      "1 / 6",
      "2 / 9",
      "5 / 18",
      "7 / 36"
    ],
    answerIdx: 1,
    explanation: "1. Total outcomes when two dice are thrown = 6 * 6 = 36.\n2. Favorable outcomes for a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes.\n3. Favorable outcomes for a sum of 11: (5,6), (6,5) -> 2 outcomes.\n4. Total favorable outcomes = 6 + 2 = 8.\n5. Probability = 8 / 36 = 2 / 9."
  },

  // LOGICAL REASONING
  {
    id: "apt-l1",
    category: "logical",
    topic: "Series Completion",
    question: "Find the next number in the sequence: 3, 5, 9, 17, 33, ...",
    options: [
      "49",
      "65",
      "60",
      "55"
    ],
    answerIdx: 1,
    explanation: "Let's analyze the difference between consecutive numbers:\n- 5 - 3 = 2\n- 9 - 5 = 4\n- 17 - 9 = 8\n- 33 - 17 = 16\nThe differences form a geometric sequence (2, 4, 8, 16). The next difference must be 16 * 2 = 32.\nTherefore, the next number is 33 + 32 = 65."
  },
  {
    id: "apt-l2",
    category: "logical",
    topic: "Syllogisms",
    question: "Statements:\nI. All laptops are computers.\nII. Some computers are calculators.\n\nConclusions:\nI. Some laptops are calculators.\nII. No laptop is a calculator.\n\nWhich of the conclusions logically follows?",
    options: [
      "Only conclusion I follows",
      "Only conclusion II follows",
      "Either conclusion I or II follows",
      "Neither conclusion I nor II follows"
    ],
    answerIdx: 2,
    explanation: "This is a classic 'Either-Or' scenario.\n- From Statement I, all laptops are inside computers.\n- From Statement II, some computers overlap with calculators. This calculators set may or may not overlap with laptops.\n- Therefore, 'Some laptops are calculators' is possible but not certain. 'No laptop is a calculator' is also possible but not certain.\n- Since the two conclusions are complementary (if one is false, the other must be true), either I or II must follow."
  },
  {
    id: "apt-l3",
    category: "logical",
    topic: "Coding-Decoding",
    question: "If in a certain language, 'ROBUST' is coded as 'QNATRS', how is 'FLOWER' coded in that language?",
    options: [
      "EKNVDQ",
      "GKPVFS",
      "EKMVDQ",
      "EJNUDQ"
    ],
    answerIdx: 0,
    explanation: "Let's check the relation between ROBUST and QNATRS:\n- R (-1) -> Q\n- O (-1) -> N\n- B (-1) -> A\n- U (-1) -> T\n- S (-1) -> R\n- T (-1) -> S\nEvery letter is shifted back by 1 alphabetical position. Applying the same rule to 'FLOWER':\n- F (-1) -> E\n- L (-1) -> K\n- O (-1) -> N\n- W (-1) -> V\n- E (-1) -> D\n- R (-1) -> Q\nSo, FLOWER is coded as EKNVDQ."
  },

  // VERBAL ABILITY
  {
    id: "apt-v1",
    category: "verbal",
    topic: "Synonyms & Vocabulary",
    question: "Choose the word that is most nearly synonymous with: **MITIGATE**",
    options: [
      "Enhance",
      "Alleviate",
      "Aggravate",
      "Provoke"
    ],
    answerIdx: 1,
    explanation: "'Mitigate' means to make something less severe, serious, or painful.\n- 'Alleviate' also means to make suffering or a problem less severe, which is a direct synonym.\n- 'Enhance' means to improve or increase.\n- 'Aggravate' and 'Provoke' mean to make something worse or trigger a negative reaction (antonyms)."
  },
  {
    id: "apt-v2",
    category: "verbal",
    topic: "Sentence Correction",
    question: "Identify the part of the sentence that contains a grammatical error:\n\n'Neither the supervisor (A) / nor the interns (B) / was aware of the change (C) / in the project schedule (D).'",
    options: [
      "Part A",
      "Part B",
      "Part C",
      "Part D"
    ],
    answerIdx: 2,
    explanation: "When a compound subject is joined by 'neither... nor', the verb must agree with the subject closest to it.\n- Here, 'the interns' (plural) is closer to the verb than 'the supervisor' (singular).\n- Therefore, the verb should be plural 'were' instead of singular 'was'.\n- Hence, the error is in Part C ('was aware of the change' should be 'were aware of the change')."
  },
  {
    id: "apt-v3",
    category: "verbal",
    topic: "Paragraph Arrangement",
    question: "Arrange the sentences in the most logical order to form a coherent paragraph:\n\nP: It has been the catalyst for rapid urbanization and shift in job markets.\nQ: Technology has fundamentally reshaped human society over the last century.\nR: Consequently, individuals must continuously upskill to remain employable.\nS: Among these shifts, the digital revolution stands out as the most disruptive.",
    options: [
      "QPRS",
      "QPSR",
      "QSPR",
      "PQRS"
    ],
    answerIdx: 1,
    explanation: "1. Sentence Q is the ideal opening sentence as it introduces the general theme: 'Technology reshaping human society'.\n2. Sentence P follows Q by explaining *how* it has reshaped society: 'It (technology) has been the catalyst for rapid urbanization...'\n3. Sentence S narrows down the broad shift to the specific 'digital revolution' ('Among these shifts, the digital revolution...').\n4. Sentence R provides the logical conclusion ('Consequently, individuals must upskill...').\nTherefore, the correct sequence is QPSR."
  }
];
