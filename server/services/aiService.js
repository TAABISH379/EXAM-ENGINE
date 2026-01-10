const { GoogleGenAI } = require('@google/genai');

// Global model initialization is not needed with the new SDK style where we specify model in the call usually. 
// but we will initialize the client here.

exports.generateExamPaper = async ({ board, className, subject, difficulty = 'medium' }) => {
  if (board === "CBSE") {
    boardRules = `
        2. BOARD-SPECIFIC STYLE (CBSE):
        - Competency-based questions (minimum 40% for Class 10, 30% for Class 12).
        - Case-study/Source-based questions where applicable.
        - NCERT-aligned phrasing.
        - Step-wise marking schemes.
        `;
  } else if (board === "ICSE") {
    boardRules = `
        2. BOARD-SPECIFIC STYLE (ICSE):
        - Descriptive and structured questions.
        - Formal academic language.
        - Emphasis on explanation and clarity.
        - Proper answer presentation format.
        `;
  }

  const prompt = `
    You are an expert Chief Examiner and Question Paper Setter for ${board} Board India.
    Your task is to create a realistic, high-quality "Question Paper" for Class ${className}, Subject: ${subject}.
    Difficulty Level: ${difficulty}

    STRICT ACADEMIC STANDARDS:
    1. TONE: Use formal, authoritative academic English (British spelling). Avoid conversational or AI-like phrasing.
    2. FORMAT: The output must purely return JSON, but the content within must mimic real physical papers.
    3. CURRICULUM: Stick strictly to the latest ${board} syllabus.
    4. QUESTION TYPES:
       - ${board} includes Competency-based questions (Source-based, Case-based).
       - Use "Or" options for internal choices where applicable (e.g., "(a) ... OR (b) ...").
    
    METADATA & BOILERPLATE:
    - Include realistic header data: Time (variable per subject), Max Marks (e.g., 80 or 70), Series Code (e.g., Q.P. Code 30/1/1), and Set No.

    JSON OUPUT STRUCTURE:
    {
      "metadata": {
        "board": "${board}",
        "class": "${className}",
        "subject": "${subject}",
        "time": "3 Hours",
        "maxMarks": 80,
        "qpCode": "30/1/1",
        "set": "4"
      },
      "instructions": [
        "Please check that this question paper contains XX printed pages.",
        "Q.P. Code given on the right hand side of the question paper should be written on the title page of the answer-book by the candidate.",
        "Please check that this question paper contains XX questions.",
        "15 minute time has been allotted to read this question paper."
      ],
      "sections": [
        {
          "name": "SECTION A",
          "marks": 20,
          "descriptor": "(Reading Skills / Objective type)",
          "questions": [
             {
               "questionNumber": 1,
               "text": "Read the following passage and answer the questions execution...",
               "marks": 1,
               "type": "MCQ",
               "options": ["Option A", "Option B", "Option C", "Option D"],
               "answer": "Option A",
               "markingScheme": "1 mark for correct identification."
             }
          ]
        }
      ]
    }
    
    IMPORTANT: Provide purely the JSON. Do not write "Here is the paper".
    `;


  try {
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.log("Using Mock Data due to missing/invalid API Key. Key check failed. Loaded key length: " + apiKey.length);
      return getMockPaper(board, className, subject);
    }

    // Use the trimmed key for the model
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "";

    // Clean up markdown code blocks if present
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    if (error.status === 429 || error.message.includes('429') || error.message.includes('Quota')) {
      console.warn("\x1b[33m%s\x1b[0m", "⚠️ Gemini API Quota Exceeded. Falling back to Mock Data.");
    } else {
      console.error("AI Generation Error (Falling back to mock):", error.message);
    }
    return { ...getMockPaper(board, className, subject), isMock: true };
  }
};

function getMockPaper(board, className, subject) {
  const pool = {
    mcq: [
      { text: "Which is an endothermic reaction?", options: ["Burning of coal", "Respiration", "Calcium Carbonate Decomp", "None"], answer: "Calcium Carbonate Decomp" },
      { text: "Power of lens is measured in:", options: ["Diopter", "Meter", "Watt", "Joule"], answer: "Diopter" },
      { text: "The pH of pure water is:", options: ["0", "7", "14", "1"], answer: "7" },
      { text: "What is the unit of current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" },
      { text: "Blue color of sky is due to:", options: ["Refraction", "Dispersion", "Scattering", "Reflection"], answer: "Scattering" }
    ],
    short: [
      { text: "Define 'Power of Accommodation'.", answer: "Ability of lens to adjust focal length." },
      { text: "State Ohm's Law.", answer: "V = IR at constant temperature." },
      { text: "What is a balanced chemical equation?", answer: "Equation with equal atoms on both sides." },
      { text: "Why do stars twinkle?", answer: "Due to atmospheric refraction." },
      { text: "Define 'Reflex Action'.", answer: "Sudden involuntary response to stimulus." },
      { text: "What are amphoteric oxides?", answer: "Oxides reacting with both acids and bases." },
      { text: "State the Modern Periodic Law.", answer: "Properties are periodic function of atomic number." }
    ],
    long: [
      { text: "Explain Rainbow formation with a diagram.", marks: 3 },
      { text: "Describe the structure of the human eye.", marks: 3 },
      { text: "Explain the working of an Electric Motor.", marks: 5 },
      { text: "Differentiate between aerobic and anaerobic respiration.", marks: 3 },
      { text: "Explain the formation of Urine in humans.", marks: 5 },
      { text: "Describe the extraction of Copper from its ore.", marks: 5 },
      { text: "Draw and explain the ray diagram for Concave Mirror.", marks: 5 }
    ]
  };

  const getRandom = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const mcqs = getRandom(pool.mcq, 2).map((q, i) => ({
    questionNumber: i + 1,
    text: q.text,
    marks: 1,
    type: "MCQ",
    options: q.options,
    answer: q.answer,
    markingScheme: "1 mark for correct option."
  }));

  const shortQs = getRandom(pool.short, 1).map((q, i) => ({
    questionNumber: 3 + i,
    text: q.text,
    marks: 1,
    type: "Very Short",
    answer: q.answer,
    markingScheme: "1 mark for correct answer."
  }));

  const longQs = getRandom(pool.long, 1).map((q, i) => ({
    questionNumber: 15 + i,
    text: q.text,
    marks: q.marks,
    type: "Long Answer",
    markingScheme: "Stepwise marking applicable."
  }));

  return {
    "metadata": {
      "board": board,
      "class": className,
      "subject": subject,
      "time": "3 Hours",
      "maxMarks": 80,
      "qpCode": "30/1/1",
      "set": "1"
    },
    "instructions": [
      "Please check that this question paper contains 4 printed pages.",
      "Q.P. Code given on the right hand side of the question paper should be written on the title page of the answer-book by the candidate.",
      "Please check that this question paper contains 20 questions.",
      "15 minute time has been allotted to read this question paper."
    ],
    "sections": [
      {
        "name": "Section A (Objective)",
        "marks": 20,
        "questions": [...mcqs, ...shortQs]
      },
      {
        "name": "Section B (Descriptive)",
        "marks": 60,
        "questions": longQs
      }
    ]
  };
}

