// Seed content for AI Learning Adventure.
// 8 missions across 5 levels, 5 quiz questions + 3 flashcards + 1 badge each.
// This is the curriculum backbone — edit here, then run `npm run db:seed`.

export interface SeedMission {
  slug: string;
  title: string;
  level:
    | "Beginner"
    | "Basic Understanding"
    | "Applied Practice"
    | "Responsible Use"
    | "Builder Mindset";
  objective: string;
  lessonContent: string;
  scenario: string;
  badge: { name: string; description: string; icon: string };
  quiz: {
    type: "mcq" | "true_false" | "scenario";
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  flashcards: { concept: string; definition: string; example: string; tip: string }[];
}

export const missions: SeedMission[] = [
  // 1 ----------------------------------------------------------------------
  {
    slug: "what-is-ai",
    title: "What is AI?",
    level: "Beginner",
    objective: "Understand what artificial intelligence actually is, in plain language.",
    lessonContent:
      "Artificial intelligence (AI) is software that performs tasks which normally need human thinking — recognizing images, understanding language, making predictions, or generating new content. It isn't magic and it isn't a robot with a personality; under the hood it's a program trained on large amounts of data to find patterns and use them to produce useful outputs.\n\nMost AI you'll interact with day to day is 'narrow AI' — it's very good at a specific task (like writing text or recommending a video) but doesn't 'understand' the world the way a person does. It has no goals, feelings, or awareness. It's a powerful pattern-matching and prediction tool.",
    scenario:
      "When your phone's camera auto-detects a face and adjusts focus, that's AI: a model trained on millions of photos to recognize the pattern of a human face.",
    badge: { name: "First Steps", description: "Took the first step into the AI adventure.", icon: "footprints" },
    quiz: [
      {
        type: "mcq",
        question: "Which best describes what AI systems actually do?",
        options: [
          "They think and feel the way humans do",
          "They find patterns in data and use them to produce outputs",
          "They are always connected to the internet to 'know' things",
          "They can only follow instructions written by their creator, word for word",
        ],
        correctAnswer: "They find patterns in data and use them to produce outputs",
        explanation:
          "AI systems are trained on data to recognize patterns and generate predictions or content — they don't have understanding, feelings, or awareness the way people do.",
      },
      {
        type: "true_false",
        question: "Most AI you use today is 'narrow AI' — good at a specific task, not general reasoning about anything.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Narrow AI is trained for a specific job (e.g. recognizing faces or writing text). General AI, with broad human-like reasoning, doesn't exist yet.",
      },
      {
        type: "mcq",
        question: "A photo app that automatically tags your friends in pictures is an example of AI doing what?",
        options: ["Random guessing", "Pattern recognition learned from data", "Manually programmed rules for each friend", "Reading your mind"],
        correctAnswer: "Pattern recognition learned from data",
        explanation: "Face-tagging models are trained on labeled photo data to recognize visual patterns associated with each person.",
      },
      {
        type: "scenario",
        question: "A friend says, 'The AI chatbot understands how I feel, just like a person would.' What's the most accurate response?",
        options: [
          "That's exactly right, AI has feelings",
          "AI can respond in ways that sound empathetic, but it doesn't actually have feelings or understanding",
          "AI never produces empathetic-sounding responses",
          "Only some AI models have feelings",
        ],
        correctAnswer: "AI can respond in ways that sound empathetic, but it doesn't actually have feelings or understanding",
        explanation: "AI can be very good at producing language that sounds empathetic because it learned that pattern from data — but there's no actual feeling behind it.",
      },
      {
        type: "true_false",
        question: "AI systems have their own goals and intentions, separate from what they were trained to do.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "AI systems don't have independent goals or intentions — they produce outputs based on patterns learned during training and the input they're given.",
      },
    ],
    flashcards: [
      { concept: "Artificial Intelligence (AI)", definition: "Software that performs tasks normally requiring human thinking, by finding patterns in data.", example: "A spam filter that learns which emails look like spam.", tip: "AI = pattern-matching at scale, not human-like understanding." },
      { concept: "Narrow AI", definition: "AI built to do one specific task well, rather than reason generally like a human.", example: "A model that only classifies images of cats vs. dogs.", tip: "Almost every AI product you use today is narrow AI." },
      { concept: "Training Data", definition: "The examples an AI system learns patterns from before it's used.", example: "Millions of labeled photos used to teach a face-detection model.", tip: "An AI is only as good as the data it was trained on." },
    ],
  },

  // 2 ----------------------------------------------------------------------
  {
    slug: "what-is-generative-ai",
    title: "What is Generative AI?",
    level: "Beginner",
    objective: "Understand how generative AI creates new text, images, or audio instead of just classifying things.",
    lessonContent:
      "Generative AI is a category of AI that creates new content — text, images, audio, video, or code — rather than just labeling or sorting existing content. Tools like chatbots, image generators, and music generators are all generative AI.\n\nIt works by learning the statistical structure of huge amounts of existing content (millions of sentences, images, or songs) and then generating new examples that follow similar patterns. It's not copying and pasting from its training data — it's predicting what a plausible next word, pixel, or sound should be, based on everything it learned.",
    scenario:
      "You type 'write a two-line poem about rain' into a chatbot and it produces original lines it has never seen before — that's generative AI predicting plausible, fitting text step by step.",
    badge: { name: "Creator's Spark", description: "Understood how generative AI creates new content.", icon: "sparkles" },
    quiz: [
      {
        type: "mcq",
        question: "What makes generative AI different from earlier 'classification' AI?",
        options: [
          "It creates new content instead of just labeling existing content",
          "It doesn't need any training data",
          "It only works with numbers, never text",
          "It's not really AI, just a search engine",
        ],
        correctAnswer: "It creates new content instead of just labeling existing content",
        explanation: "Generative AI produces new text, images, or audio, whereas classification AI sorts or labels existing inputs (like 'spam' vs 'not spam').",
      },
      {
        type: "true_false",
        question: "When a generative AI writes a poem, it is copying a pre-written poem from its training data.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "It generates new text by predicting plausible next words based on patterns it learned — it isn't retrieving and pasting a stored poem.",
      },
      {
        type: "mcq",
        question: "Which of these is a generative AI task?",
        options: ["Sorting emails into spam or not spam", "Generating a brand-new product description from a short prompt", "Detecting whether a photo contains a cat", "Predicting tomorrow's weather from sensor data"],
        correctAnswer: "Generating a brand-new product description from a short prompt",
        explanation: "Creating new original text from a prompt is a generative task — the others are classification or prediction tasks on existing data.",
      },
      {
        type: "scenario",
        question: "An AI image generator produces a picture of 'a cat wearing a spacesuit on the moon' — an image that never existed before. What best explains how?",
        options: [
          "It found and slightly edited a real existing photo",
          "It generated new pixels based on patterns learned from many images, guided by your description",
          "A human artist secretly drew it on demand",
          "It's impossible, the image must already exist somewhere online",
        ],
        correctAnswer: "It generated new pixels based on patterns learned from many images, guided by your description",
        explanation: "Generative image models learn visual patterns from huge image datasets and combine them in new ways guided by your text prompt.",
      },
      {
        type: "true_false",
        question: "Generative AI can only produce text — never images, audio, or code.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Generative AI spans many content types: text, images, audio, video, and code are all common outputs.",
      },
    ],
    flashcards: [
      { concept: "Generative AI", definition: "AI that creates new content (text, images, audio, code) rather than just classifying existing content.", example: "A chatbot writing an original bedtime story from your prompt.", tip: "If it's creating something new, it's generative; if it's sorting/labeling, it's not." },
      { concept: "Prediction, not retrieval", definition: "Generative models predict the next plausible word/pixel/sound rather than copying stored examples.", example: "Predicting the next word in 'The sun rose over the ___' as 'mountains' or 'ocean'.", tip: "Think 'plausible next step,' not 'search and paste.'" },
      { concept: "Multimodal generation", definition: "Generative AI that works across content types — text, image, audio, video.", example: "One tool that can turn a text prompt into both an image and a matching caption.", tip: "Modern generative tools increasingly combine multiple content types." },
    ],
  },

  // 3 ----------------------------------------------------------------------
  {
    slug: "what-is-an-llm",
    title: "What is an LLM?",
    level: "Basic Understanding",
    objective: "Understand what a Large Language Model is and how it produces text.",
    lessonContent:
      "A Large Language Model (LLM) is a type of generative AI trained on enormous amounts of text to predict the next word (technically, the next 'token') in a sequence. By doing this prediction extremely well across billions of examples, an LLM becomes capable of writing essays, answering questions, summarizing documents, translating languages, and holding conversations.\n\n'Large' refers to the size of the model (the number of internal parameters it adjusts during training) and the size of the training data. LLMs don't 'look up' answers in a database — they generate a response one token at a time, each token chosen based on everything that came before it.",
    scenario:
      "When you ask an LLM-based chatbot a question, it isn't searching a library of pre-written answers — it's generating a fresh response, token by token, based on patterns learned during training.",
    badge: { name: "Language Model Explorer", description: "Learned how LLMs generate language.", icon: "brain-circuit" },
    quiz: [
      {
        type: "mcq",
        question: "What does an LLM fundamentally do when generating a response?",
        options: [
          "Searches a fixed database of pre-written answers",
          "Predicts the next token, one step at a time, based on learned patterns",
          "Randomly picks words with no pattern",
          "Copies the closest matching webpage exactly",
        ],
        correctAnswer: "Predicts the next token, one step at a time, based on learned patterns",
        explanation: "LLMs generate text by repeatedly predicting the most plausible next token given everything generated so far.",
      },
      {
        type: "true_false",
        question: "An LLM stores a complete lookup table of every possible question and its answer.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "LLMs don't store question-answer pairs — they learn general language patterns and generate responses dynamically.",
      },
      {
        type: "mcq",
        question: "What does the 'Large' in Large Language Model mainly refer to?",
        options: [
          "The size of the screen needed to run it",
          "The scale of its parameters and training data",
          "The number of languages it can translate",
          "The physical size of the servers",
        ],
        correctAnswer: "The scale of its parameters and training data",
        explanation: "'Large' refers to the model's scale — billions of adjustable parameters trained on massive text datasets.",
      },
      {
        type: "scenario",
        question: "You ask an LLM a follow-up question referencing something said three messages ago, and it responds appropriately. What made that possible?",
        options: [
          "It saved your data permanently to a personal profile",
          "It used the conversation history provided as context for this prediction",
          "It phoned a human support agent",
          "It's guessing randomly and got lucky",
        ],
        correctAnswer: "It used the conversation history provided as context for this prediction",
        explanation: "LLMs generate each response using the text provided as context — including earlier turns in the conversation, if included in the input.",
      },
      {
        type: "true_false",
        question: "LLMs generate text one token at a time, with each token influenced by everything generated before it.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "This is the core mechanism of autoregressive text generation used by LLMs.",
      },
    ],
    flashcards: [
      { concept: "Large Language Model (LLM)", definition: "A generative AI model trained on huge text datasets to predict and generate language.", example: "The model behind an AI writing assistant or chatbot.", tip: "LLM = next-token prediction at massive scale." },
      { concept: "Parameters", definition: "The internal numeric values a model adjusts during training to capture patterns in data.", example: "A model with billions of parameters can capture very nuanced language patterns.", tip: "More parameters generally means more capacity to learn patterns, not automatic accuracy." },
      { concept: "Autoregressive generation", definition: "Generating text by predicting one token at a time, each based on all previous tokens.", example: "Predicting 'mat' after 'The cat sat on the' one word at a time.", tip: "This is why LLM responses can be cut off mid-thought if generation stops early." },
    ],
  },

  // 4 ----------------------------------------------------------------------
  {
    slug: "prompt-engineering-basics",
    title: "Prompt Engineering Basics",
    level: "Basic Understanding",
    objective: "Learn how to write clear, effective prompts that get better AI responses.",
    lessonContent:
      "Prompt engineering is the practice of writing inputs that guide an AI model toward the response you actually want. Because LLMs generate based on patterns in your input, small changes in wording, structure, or examples can meaningfully change the output quality.\n\nA few reliable techniques: be specific about the task, audience, and format you want; give examples of the style you're after; break complex tasks into steps; and tell the model what NOT to do when relevant. Vague prompts tend to produce vague, generic answers — specific prompts tend to produce specific, useful ones.",
    scenario:
      "Instead of asking 'write about dogs,' a well-engineered prompt says: 'Write a 3-sentence, upbeat product description for a dog leash aimed at first-time puppy owners.' The second version gives the model a clear task, tone, length, and audience.",
    badge: { name: "Prompt Crafter", description: "Learned to write clear, effective prompts.", icon: "wand-2" },
    quiz: [
      {
        type: "mcq",
        question: "Which prompt is most likely to produce a useful, specific response?",
        options: [
          "'Tell me about marketing'",
          "'Write a 100-word Instagram caption for a new coffee shop, friendly and playful tone'",
          "'Marketing help please'",
          "'Do something good'",
        ],
        correctAnswer: "'Write a 100-word Instagram caption for a new coffee shop, friendly and playful tone'",
        explanation: "Specifying the format, length, subject, and tone gives the model a clear target, producing a much more useful response than a vague request.",
      },
      {
        type: "true_false",
        question: "Giving an AI model an example of the style or format you want almost never helps the output.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Providing an example (sometimes called 'few-shot prompting') is one of the most effective ways to steer output style and format.",
      },
      {
        type: "mcq",
        question: "Breaking a complex task into smaller, ordered steps in your prompt tends to:",
        options: [
          "Confuse the model more than a single vague request",
          "Help the model follow a clearer reasoning path and produce a more structured answer",
          "Have no effect at all",
          "Only work for image generation, never for text",
        ],
        correctAnswer: "Help the model follow a clearer reasoning path and produce a more structured answer",
        explanation: "Step-by-step prompts help the model organize its response and reduce the chance of skipping important parts of the task.",
      },
      {
        type: "scenario",
        question: "You ask an AI tutor to 'explain neural networks' and get a response that's too technical for you. What's the best next prompt?",
        options: [
          "Give up, the AI clearly can't help",
          "Ask again with more detail: 'Explain neural networks like I'm new to AI, using a simple everyday analogy'",
          "Repeat the exact same prompt",
          "Ask an unrelated question instead",
        ],
        correctAnswer: "Ask again with more detail: 'Explain neural networks like I'm new to AI, using a simple everyday analogy'",
        explanation: "Refining your prompt with audience level and a request for an analogy is a core prompt engineering technique — iterating gets better results.",
      },
      {
        type: "true_false",
        question: "Telling a model what NOT to include (e.g. 'don't use jargon') can be a useful part of a prompt.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Negative constraints help narrow the output space and avoid unwanted style or content.",
      },
    ],
    flashcards: [
      { concept: "Prompt Engineering", definition: "Crafting inputs to guide an AI model toward a better, more specific response.", example: "Adding 'in bullet points, for a beginner audience' to a request.", tip: "Specific beats vague, almost every time." },
      { concept: "Few-shot Prompting", definition: "Including one or more examples in your prompt to demonstrate the style or format you want.", example: "Showing two example product taglines before asking for a third.", tip: "Show, don't just tell, when style matters." },
      { concept: "Iterative Prompting", definition: "Refining your prompt based on the AI's previous response until you get what you need.", example: "Asking for 'a simpler version' after a too-technical answer.", tip: "Treat the first response as a draft, not a final answer." },
    ],
  },

  // 5 ----------------------------------------------------------------------
  {
    slug: "tokens-and-context",
    title: "Tokens and Context",
    level: "Applied Practice",
    objective: "Understand what tokens are and why context windows limit how much an AI can 'remember' at once.",
    lessonContent:
      "A token is a chunk of text an AI model processes — often a word, part of a word, or punctuation mark. 'Unbelievable' might be split into tokens like 'un', 'believ', and 'able'. Models read and generate text token by token, and every input and output counts against a limit called the context window.\n\nThe context window is the maximum number of tokens a model can consider at once — including your prompt, any earlier conversation, and its own response. If a conversation grows past that limit, the oldest parts get dropped or summarized, which is why a very long chat can cause a model to 'forget' something mentioned much earlier.",
    scenario:
      "You paste a 50-page document and ask detailed questions about page 2 after a long conversation — if the total token count exceeds the model's context window, earlier details may no longer be available to it.",
    badge: { name: "Context Keeper", description: "Understood tokens and context windows.", icon: "layers" },
    quiz: [
      {
        type: "mcq",
        question: "What is a 'token' in the context of LLMs?",
        options: [
          "A security password for the AI system",
          "A chunk of text — often a word or part of a word — that the model processes",
          "A unit of computing hardware",
          "A type of image file",
        ],
        correctAnswer: "A chunk of text — often a word or part of a word — that the model processes",
        explanation: "Tokens are the basic text units models read and generate, which may be whole words, sub-words, or punctuation.",
      },
      {
        type: "true_false",
        question: "The context window includes your prompt, prior conversation, AND the model's own response, all counted together.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "The context window is a shared token budget across the whole exchange — input and output both count against it.",
      },
      {
        type: "mcq",
        question: "What typically happens when a conversation exceeds the model's context window?",
        options: [
          "The model remembers everything perfectly regardless of length",
          "The oldest parts of the conversation may be dropped or summarized",
          "The model shuts down completely",
          "Nothing changes, there's no limit",
        ],
        correctAnswer: "The oldest parts of the conversation may be dropped or summarized",
        explanation: "Once the token limit is reached, earlier content typically has to be trimmed or summarized to make room for new input.",
      },
      {
        type: "scenario",
        question: "You're pasting a very long document for an AI to analyze and it seems to 'forget' details from the start of the document. What's the most likely cause?",
        options: [
          "The AI is being lazy on purpose",
          "The document length likely exceeded the model's context window",
          "The document format is always the problem",
          "This never happens with any model",
        ],
        correctAnswer: "The document length likely exceeded the model's context window",
        explanation: "Very long inputs can exceed the context window, causing early details to be dropped from what the model can actually consider.",
      },
      {
        type: "true_false",
        question: "A word like 'unbelievable' is always treated as exactly one single token.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Longer or less common words are frequently split into multiple sub-word tokens rather than staying as one token.",
      },
    ],
    flashcards: [
      { concept: "Token", definition: "A chunk of text (word, sub-word, or punctuation) that a model reads or generates.", example: "'Playing' might become tokens 'play' + 'ing'.", tip: "Roughly, 1 token ≈ 4 characters of English text." },
      { concept: "Context Window", definition: "The maximum number of tokens a model can consider at once, across input and output combined.", example: "A 32k-token context window can hold a fairly long document plus a conversation.", tip: "Longer conversations or documents eat into the same shared budget." },
      { concept: "Truncation", definition: "Dropping or summarizing older content when a conversation exceeds the context window.", example: "A chatbot losing track of instructions given very early in a long chat.", tip: "For long tasks, periodically restate key instructions or facts." },
    ],
  },

  // 6 ----------------------------------------------------------------------
  {
    slug: "hallucinations",
    title: "Hallucinations",
    level: "Applied Practice",
    objective: "Understand why AI models sometimes generate confident but false information, and how to catch it.",
    lessonContent:
      "A 'hallucination' is when an AI model generates information that sounds plausible and confident but is actually false or made up — like citing a study that doesn't exist, or stating an incorrect fact with total certainty. This happens because the model is optimized to produce fluent, plausible-sounding text, not to verify truth against a database.\n\nHallucinations are more likely on very specific facts, recent events, obscure topics, or when a model is pushed to answer something it doesn't actually have reliable information about. The best defenses are: verify important facts against a real source, ask the model to cite where information comes from, and stay skeptical of confident-sounding specifics you can't independently check.",
    scenario:
      "You ask an AI for a legal citation and it gives you a real-looking case name and number — but the case doesn't actually exist. That's a hallucination: fluent and confident, but fabricated.",
    badge: { name: "Fact Checker", description: "Learned to spot and handle AI hallucinations.", icon: "search-check" },
    quiz: [
      {
        type: "mcq",
        question: "What is an AI 'hallucination'?",
        options: [
          "The AI system crashing",
          "Confidently generated information that is false or made up",
          "A visual glitch in an image generator only",
          "When the AI refuses to answer",
        ],
        correctAnswer: "Confidently generated information that is false or made up",
        explanation: "Hallucination refers to fluent, confident-sounding output that is factually incorrect or fabricated.",
      },
      {
        type: "true_false",
        question: "AI models hallucinate because they are trying to intentionally deceive the user.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Models don't have intent — hallucinations happen because they're optimized to produce plausible-sounding text, not because they're trying to lie.",
      },
      {
        type: "mcq",
        question: "Which situation is MOST likely to produce a hallucination?",
        options: [
          "Asking for a well-known, widely documented fact",
          "Asking for a very specific citation or recent statistic the model may not reliably know",
          "Asking the model to summarize a document you provided in full",
          "Asking for a simple definition of a common word",
        ],
        correctAnswer: "Asking for a very specific citation or recent statistic the model may not reliably know",
        explanation: "Obscure, highly specific, or very recent facts are where models are most prone to confidently filling gaps with fabricated details.",
      },
      {
        type: "scenario",
        question: "An AI gives you a confident answer with a specific statistic and source. What's the best next step before using it in a report?",
        options: [
          "Trust it completely because it sounded confident",
          "Independently verify the statistic and source before relying on it",
          "Assume all AI statistics are automatically wrong",
          "Ask the AI if it's lying and trust whatever it says",
        ],
        correctAnswer: "Independently verify the statistic and source before relying on it",
        explanation: "Confidence in tone is not evidence of accuracy — independently verifying specific facts is the reliable defense against hallucination.",
      },
      {
        type: "true_false",
        question: "Asking a model to cite its sources guarantees the sources are real.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "A model can hallucinate citations too — asking for sources helps you verify, but doesn't guarantee accuracy on its own.",
      },
    ],
    flashcards: [
      { concept: "Hallucination", definition: "Confident, fluent AI output that is factually false or fabricated.", example: "A made-up book title attributed to a real author.", tip: "Confidence in tone is not proof of accuracy." },
      { concept: "Fabricated Citation", definition: "A reference (study, case, article) that sounds real but doesn't actually exist.", example: "An invented journal article name with a plausible-sounding title.", tip: "Always verify citations independently before relying on them." },
      { concept: "Fact Verification", definition: "Checking AI-generated claims against a trusted, independent source.", example: "Cross-checking an AI's statistic against the original government report.", tip: "Treat AI output on specific facts as a draft to verify, not a final answer." },
    ],
  },

  // 7 ----------------------------------------------------------------------
  {
    slug: "bias-and-responsible-ai",
    title: "Bias and Responsible AI",
    level: "Responsible Use",
    objective: "Understand how bias enters AI systems and what responsible use looks like.",
    lessonContent:
      "AI models learn from data created by people, and that data can reflect historical, social, or sampling biases. If training data over-represents certain groups, viewpoints, or contexts, the model's outputs can systematically reflect that imbalance — for example, associating certain jobs with one gender more than another, simply because that pattern was more common in the training data.\n\nResponsible AI use means being aware that outputs can carry bias, testing AI-assisted decisions (especially high-stakes ones like hiring or lending) for fairness, giving humans final review over consequential decisions, and being thoughtful about the language and assumptions in your own prompts too.",
    scenario:
      "An AI resume-screening tool trained mostly on past hires in a male-dominated field starts favoring resumes with 'masculine-coded' language — reflecting a bias in the training data, not an intentional decision by the model.",
    badge: { name: "Responsible Explorer", description: "Learned how bias enters AI and how to use AI responsibly.", icon: "shield-check" },
    quiz: [
      {
        type: "mcq",
        question: "Where does bias in an AI system most commonly come from?",
        options: [
          "The model deliberately choosing to be unfair",
          "Patterns and imbalances present in the training data",
          "Random chance, with no identifiable cause",
          "Only from the hardware running the model",
        ],
        correctAnswer: "Patterns and imbalances present in the training data",
        explanation: "AI models learn statistical patterns from their training data, so imbalances or historical biases in that data can be reflected in outputs.",
      },
      {
        type: "true_false",
        question: "Because AI is a computer system, its outputs are automatically neutral and unbiased.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "AI systems can absolutely reflect and even amplify biases present in their training data — being a computer system doesn't make output neutral.",
      },
      {
        type: "mcq",
        question: "For a high-stakes decision like hiring or lending, what does responsible AI use look like?",
        options: [
          "Letting the AI make the final decision with no human review",
          "Using AI as one input, with human review and fairness checks before a final decision",
          "Avoiding any human involvement to save time",
          "Ignoring the possibility of bias entirely",
        ],
        correctAnswer: "Using AI as one input, with human review and fairness checks before a final decision",
        explanation: "Responsible use of AI in consequential decisions means treating it as a decision-support tool with human oversight, not an unchecked final authority.",
      },
      {
        type: "scenario",
        question: "You notice an AI writing tool consistently generates examples featuring only one type of family structure. What's a responsible response?",
        options: [
          "Ignore it, it's not important",
          "Notice the pattern, consider it a form of bias, and prompt for more varied, inclusive examples",
          "Assume the AI is broken and stop using it entirely",
          "Report it as a security vulnerability",
        ],
        correctAnswer: "Notice the pattern, consider it a form of bias, and prompt for more varied, inclusive examples",
        explanation: "Recognizing skewed patterns and actively prompting for more balanced output is a practical, responsible way to work around training-data bias.",
      },
      {
        type: "true_false",
        question: "Testing AI-assisted decisions for fairness across different groups is a recommended responsible AI practice.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Fairness testing across groups helps catch biased outcomes before they affect real people in consequential decisions.",
      },
    ],
    flashcards: [
      { concept: "Bias (in AI)", definition: "Systematic skew in AI outputs, usually inherited from imbalances in training data.", example: "A model associating certain occupations with one gender more often, reflecting biased historical data.", tip: "Bias is usually inherited from data, not intentionally programmed." },
      { concept: "Human-in-the-loop", definition: "Keeping a human reviewer involved in AI-assisted, consequential decisions.", example: "A hiring manager reviewing AI-shortlisted resumes rather than auto-rejecting candidates.", tip: "The higher the stakes, the more important human review becomes." },
      { concept: "Fairness Testing", definition: "Checking whether an AI system's outputs or decisions differ unfairly across groups.", example: "Comparing loan-approval rates suggested by an AI tool across different demographic groups.", tip: "Fairness issues are often invisible until you specifically test for them." },
    ],
  },

  // 8 ----------------------------------------------------------------------
  {
    slug: "retrieval-augmented-generation",
    title: "Retrieval-Augmented Generation (RAG)",
    level: "Builder Mindset",
    objective: "Understand how RAG grounds AI answers in real, up-to-date documents instead of relying only on training memory.",
    lessonContent:
      "Retrieval-Augmented Generation (RAG) is a technique that combines an LLM with a search step: before generating an answer, the system retrieves relevant, real documents (from a database, company wiki, or the web) and feeds them into the model's context so it can 'ground' its response in that specific, current information.\n\nThis helps with two big LLM limitations: models can't know about information created after their training cutoff, and they can hallucinate specific facts. By retrieving real source documents first, RAG lets a model answer with information it was never directly trained on, and lets it cite exactly where an answer came from.",
    scenario:
      "A company support chatbot uses RAG to search the company's own help-center articles for the most relevant page, then generates an answer grounded in that page's actual content, rather than guessing from general training knowledge.",
    badge: { name: "Builder's Badge", description: "Understood how retrieval grounds AI answers in real content.", icon: "puzzle" },
    quiz: [
      {
        type: "mcq",
        question: "What does RAG add on top of a plain LLM?",
        options: [
          "A retrieval step that pulls in relevant real documents before generating an answer",
          "A way to make the model faster with no accuracy trade-off",
          "A method for training bigger models",
          "A tool for compressing images",
        ],
        correctAnswer: "A retrieval step that pulls in relevant real documents before generating an answer",
        explanation: "RAG retrieves relevant real content and includes it in the model's context, grounding the generated answer in that source material.",
      },
      {
        type: "true_false",
        question: "RAG helps an AI system answer questions about information created after its training cutoff.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "By retrieving current documents at answer time, RAG lets a model reference information it was never trained on directly.",
      },
      {
        type: "mcq",
        question: "Which limitation of LLMs does RAG specifically help address?",
        options: [
          "Slow typing speed",
          "Hallucinating facts and lacking knowledge of recent/specific information",
          "Difficulty translating between languages",
          "Inability to generate any text at all",
        ],
        correctAnswer: "Hallucinating facts and lacking knowledge of recent/specific information",
        explanation: "Grounding responses in retrieved real documents reduces fabricated facts and extends the model's effective knowledge beyond training data.",
      },
      {
        type: "scenario",
        question: "You're building a support chatbot for a product with a constantly updated help center. Why would RAG be a good architecture choice?",
        options: [
          "It lets the chatbot pull the latest help articles at answer time instead of relying only on stale training knowledge",
          "It removes the need for any AI model at all",
          "It guarantees the chatbot never makes a mistake",
          "It's only useful for image generation",
        ],
        correctAnswer: "It lets the chatbot pull the latest help articles at answer time instead of relying only on stale training knowledge",
        explanation: "RAG lets the system stay current by retrieving live documents rather than depending solely on what the model memorized during training.",
      },
      {
        type: "true_false",
        question: "RAG completely eliminates the possibility of hallucination.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "RAG significantly reduces hallucination risk by grounding answers in real documents, but it doesn't guarantee perfect accuracy — the model can still misinterpret retrieved content.",
      },
    ],
    flashcards: [
      { concept: "Retrieval-Augmented Generation (RAG)", definition: "Combining document retrieval with generation so an AI grounds its answer in real, retrieved source content.", example: "A chatbot searching a knowledge base, then writing an answer based on the top matching article.", tip: "Retrieve first, then generate — grounding beats guessing." },
      { concept: "Grounding", definition: "Basing an AI's output on specific, verifiable source material rather than only general training knowledge.", example: "An answer that quotes and links the exact help-center article it came from.", tip: "Grounded answers are easier to verify and trust." },
      { concept: "Knowledge Cutoff", definition: "The point in time after which a model has no training knowledge of new events or information.", example: "A model trained through early 2026 won't natively know about events from later in the year.", tip: "RAG is one of the main ways to work around a fixed knowledge cutoff." },
    ],
  },
];
