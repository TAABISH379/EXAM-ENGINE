const { GoogleGenAI } = require('@google/genai');

// Global model initialization is not needed with the new SDK style where we specify model in the call usually. 
// but we will initialize the client here.

exports.generateExamPaper = async ({ board, className, subject, difficulty = 'medium' }) => {
  let boardRules = "";
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
    You are an expert Indian school examination paper setter and ed-tech system designer.

    Task: Generate a Class ${className} ${board} ${subject} Question Paper.
    Difficulty Level: ${difficulty}

    STRICT RULES:
    1. Follow ONLY the latest official ${board} syllabus for Class ${className}.
    2. Follow the exact board-wise exam pattern, marks distribution, and section structure.
    3. Do NOT copy past-year questions verbatim.
    4. Do NOT include out-of-syllabus topics.
    5. Use board-appropriate language and formatting.
    6. All numerical data must be mathematically valid.

    ${boardRules}

    3. MARKING SCHEME
    For every non-MCQ question:
    - Provide a clear, step-wise marking scheme
    - Allocate marks explicitly
    - No extra or missing steps

    4. FORMATTING RULES:
    - Do NOT include question numbers in the "text" field (e.g., just "Define force", NOT "1. Define force").
    - Do NOT include option labels in "options" (e.g., just "Blue", NOT "(a) Blue").
    - Do NOT include numbers in "instructions" (e.g., just "All questions compulsory", NOT "1. All questions compulsory").

    OUTPUT FORMAT:
    Provide the output in JSON format with the following structure:
    {
      "metadata": {
        "board": "${board}",
        "class": "${className}",
        "subject": "${subject}",
        "time": "3 Hours",
        "maxMarks": 80
      },
      "instructions": ["General instruction 1", "General instruction 2"],
      "sections": [
        {
          "name": "Section A",
          "marks": 20,
          "questions": [
            {
              "questionNumber": 1,
              "text": "Question text here...",
              "marks": 1,
              "type": "MCQ", 
              "options": ["A", "B", "C", "D"], // Only for MCQs
              "answer": "Correct Answer", // Brief answer or option
              "markingScheme": "1 mark for correct option" 
            }
          ]
        }
      ]
    }
    
    Ensure the marking scheme is detailed for descriptive questions.
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
      "maxMarks": 80
    },
    "instructions": [
      `This is a ${board} Class ${className} Mock Paper.`,
      "Questions are randomized from a backup pool (API Rate Limit Active).",
      "All questions are compulsory."
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

