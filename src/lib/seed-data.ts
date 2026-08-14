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
  flashcards: {
    concept: string;
    definition: string;
    example: string;
    tip: string;
  }[];
}

export const missions: SeedMission[] = [
  // 1 ----------------------------------------------------------------------
  {
    slug: "what-is-ai",
    title: "What is AI?",
    level: "Beginner",
    objective:
      "Understand what artificial intelligence actually is, in plain language.",
    lessonContent:
      "Artificial intelligence (AI) is software that performs tasks which normally need human thinking - recognizing images, understanding language, making predictions, or generating new content. It isn't magic and it isn't a robot with a personality; under the hood it's a program trained on large amounts of data to find patterns and use them to produce useful outputs.\n\nMost AI you'll interact with day to day is 'narrow AI' - it's very good at a specific task (like writing text or recommending a video) but doesn't 'understand' the world the way a person does. It has no goals, feelings, or awareness. It's a powerful pattern-matching and prediction tool.",
    scenario:
      "When your phone's camera auto-detects a face and adjusts focus, that's AI: a model trained on millions of photos to recognize the pattern of a human face.",
    badge: {
      name: "First Steps",
      description: "Took the first step into the AI adventure.",
      icon: "footprints",
    },
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
        correctAnswer:
          "They find patterns in data and use them to produce outputs",
        explanation:
          "AI systems are trained on data to recognize patterns and generate predictions or content - they don't have understanding, feelings, or awareness the way people do.",
      },
      {
        type: "true_false",
        question:
          "Most AI you use today is 'narrow AI' - good at a specific task, not general reasoning about anything.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "Narrow AI is trained for a specific job (e.g. recognizing faces or writing text). General AI, with broad human-like reasoning, doesn't exist yet.",
      },
      {
        type: "mcq",
        question:
          "A photo app that automatically tags your friends in pictures is an example of AI doing what?",
        options: [
          "Random guessing",
          "Pattern recognition learned from data",
          "Manually programmed rules for each friend",
          "Reading your mind",
        ],
        correctAnswer: "Pattern recognition learned from data",
        explanation:
          "Face-tagging models are trained on labeled photo data to recognize visual patterns associated with each person.",
      },
      {
        type: "scenario",
        question:
          "A friend says, 'The AI chatbot understands how I feel, just like a person would.' What's the most accurate response?",
        options: [
          "That's exactly right, AI has feelings",
          "AI can respond in ways that sound empathetic, but it doesn't actually have feelings or understanding",
          "AI never produces empathetic-sounding responses",
          "Only some AI models have feelings",
        ],
        correctAnswer:
          "AI can respond in ways that sound empathetic, but it doesn't actually have feelings or understanding",
        explanation:
          "AI can be very good at producing language that sounds empathetic because it learned that pattern from data - but there's no actual feeling behind it.",
      },
      {
        type: "true_false",
        question:
          "AI systems have their own goals and intentions, separate from what they were trained to do.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "AI systems don't have independent goals or intentions - they produce outputs based on patterns learned during training and the input they're given.",
      },
      {
        type: "mcq",
        question: "What is 'training data' in the context of AI?",
        options: [
          "Data the AI will process after it's deployed",
          "Examples used to teach an AI system patterns before it's used",
          "Passwords needed to access the AI",
          "The total number of users of the AI system",
        ],
        correctAnswer:
          "Examples used to teach an AI system patterns before it's used",
        explanation:
          "Training data is the dataset an AI learns from during development to recognize patterns and make predictions.",
      },
      {
        type: "scenario",
        question:
          "You notice an AI makes mistakes in a specific area (like identifying certain objects). What would likely help improve it?",
        options: [
          "Training it on more diverse, higher-quality examples in that area",
          "Asking it to work faster",
          "Hiding the mistakes from users",
          "Completely removing that feature",
        ],
        correctAnswer:
          "Training it on more diverse, higher-quality examples in that area",
        explanation:
          "Better training data directly improves AI performance in weak areas.",
      },
    ],
    flashcards: [
      {
        concept: "Artificial Intelligence (AI)",
        definition:
          "Software that performs tasks normally requiring human thinking, by finding patterns in data.",
        example: "A spam filter that learns which emails look like spam.",
        tip: "AI = pattern-matching at scale, not human-like understanding.",
      },
      {
        concept: "Narrow AI",
        definition:
          "AI built to do one specific task well, rather than reason generally like a human.",
        example: "A model that only classifies images of cats vs. dogs.",
        tip: "Almost every AI product you use today is narrow AI.",
      },
      {
        concept: "Training Data",
        definition:
          "The examples an AI system learns patterns from before it's used.",
        example:
          "Millions of labeled photos used to teach a face-detection model.",
        tip: "An AI is only as good as the data it was trained on.",
      },
      {
        concept: "Pattern Recognition",
        definition:
          "The core function of AI - identifying regularities in data that can be used for prediction.",
        example:
          "Recognizing that emails with certain word combinations are usually spam.",
        tip: "All AI, at its core, is sophisticated pattern matching.",
      },
      {
        concept: "Model",
        definition:
          "The trained AI system that has learned patterns and is ready to make predictions.",
        example: "A face-recognition model deployed in a phone's camera app.",
        tip: "Think of it as a tool that applies learned patterns to new situations.",
      },
    ],
  },

  // 2 ----------------------------------------------------------------------
  {
    slug: "what-is-generative-ai",
    title: "What is Generative AI?",
    level: "Beginner",
    objective:
      "Understand how generative AI creates new text, images, or audio instead of just classifying things.",
    lessonContent:
      "Generative AI is a category of AI that creates new content - text, images, audio, video, or code - rather than just labeling or sorting existing content. Tools like chatbots, image generators, and music generators are all generative AI.\n\nIt works by learning the statistical structure of huge amounts of existing content (millions of sentences, images, or songs) and then generating new examples that follow similar patterns. It's not copying and pasting from its training data — it's predicting what a plausible next word, pixel, or sound should be, based on everything it learned.",
    scenario:
      "You type 'write a two-line poem about rain' into a chatbot and it produces original lines it has never seen before - that's generative AI predicting plausible, fitting text step by step.",
    badge: {
      name: "Creator's Spark",
      description: "Understood how generative AI creates new content.",
      icon: "sparkles",
    },
    quiz: [
      {
        type: "mcq",
        question:
          "What makes generative AI different from earlier 'classification' AI?",
        options: [
          "It creates new content instead of just labeling existing content",
          "It doesn't need any training data",
          "It only works with numbers, never text",
          "It's not really AI, just a search engine",
        ],
        correctAnswer:
          "It creates new content instead of just labeling existing content",
        explanation:
          "Generative AI produces new text, images, or audio, whereas classification AI sorts or labels existing inputs (like 'spam' vs 'not spam').",
      },
      {
        type: "true_false",
        question:
          "When a generative AI writes a poem, it is copying a pre-written poem from its training data.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "It generates new text by predicting plausible next words based on patterns it learned - it isn't retrieving and pasting a stored poem.",
      },
      {
        type: "mcq",
        question: "Which of these is a generative AI task?",
        options: [
          "Sorting emails into spam or not spam",
          "Generating a brand-new product description from a short prompt",
          "Detecting whether a photo contains a cat",
          "Predicting tomorrow's weather from sensor data",
        ],
        correctAnswer:
          "Generating a brand-new product description from a short prompt",
        explanation:
          "Creating new original text from a prompt is a generative task - the others are classification or prediction tasks on existing data.",
      },
      {
        type: "scenario",
        question:
          "An AI image generator produces a picture of 'a cat wearing a spacesuit on the moon' - an image that never existed before. What best explains how?",
        options: [
          "It found and slightly edited a real existing photo",
          "It generated new pixels based on patterns learned from many images, guided by your description",
          "A human artist secretly drew it on demand",
          "It's impossible, the image must already exist somewhere online",
        ],
        correctAnswer:
          "It generated new pixels based on patterns learned from many images, guided by your description",
        explanation:
          "Generative image models learn visual patterns from huge image datasets and combine them in new ways guided by your text prompt.",
      },
      {
        type: "true_false",
        question:
          "Generative AI can only produce text - never images, audio, or code.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Generative AI spans many content types: text, images, audio, video, and code are all common outputs.",
      },
      {
        type: "mcq",
        question:
          "If you ask an image generator to create something it has never seen exactly before, how is it possible?",
        options: [
          "It's not possible, it can only reproduce existing images",
          "It combines learned visual patterns in new ways, guided by your description",
          "A human artist draws it secretly",
          "It searches the entire internet instantly",
        ],
        correctAnswer:
          "It combines learned visual patterns in new ways, guided by your description",
        explanation:
          "Generative models learn the building blocks of visual patterns and can combine them in novel ways guided by your prompt.",
      },
      {
        type: "scenario",
        question:
          "You use a generative AI to create a unique logo, but someone claims you just used an AI to steal existing artwork. How would you respond?",
        options: [
          "They're right, generative AI only copies existing work",
          "Generative AI generates novel combinations based on patterns, though it does train on existing artwork",
          "Generative AI creates completely random outputs",
          "This situation is impossible",
        ],
        correctAnswer:
          "Generative AI generates novel combinations based on patterns, though it does train on existing artwork",
        explanation:
          "A nuanced answer: generative models create new outputs but are trained on existing works, so there are legitimate questions about data use and attribution.",
      },
    ],
    flashcards: [
      {
        concept: "Generative AI",
        definition:
          "AI that creates new content (text, images, audio, code) rather than just classifying existing content.",
        example:
          "A chatbot writing an original bedtime story from your prompt.",
        tip: "If it's creating something new, it's generative; if it's sorting/labeling, it's not.",
      },
      {
        concept: "Prediction, not retrieval",
        definition:
          "Generative models predict the next plausible word/pixel/sound rather than copying stored examples.",
        example:
          "Predicting the next word in 'The sun rose over the ___' as 'mountains' or 'ocean'.",
        tip: "Think 'plausible next step,' not 'search and paste.'",
      },
      {
        concept: "Multimodal generation",
        definition:
          "Generative AI that works across content types - text, image, audio, video.",
        example:
          "One tool that can turn a text prompt into both an image and a matching caption.",
        tip: "Modern generative tools increasingly combine multiple content types.",
      },
      {
        concept: "Prompt-guided creation",
        definition:
          "Generative AI that uses your text description to steer what kind of new content to create.",
        example:
          "'A sunset over mountains in oil painting style' guides the image generator.",
        tip: "Better prompts = better creative outputs.",
      },
      {
        concept: "Sampling and creativity",
        definition:
          "Generative models use randomness to create variety - the same prompt can produce different outputs.",
        example:
          "Asking for 'a poem about winter' multiple times produces different poems each time.",
        tip: "This randomness is what makes generative AI feel creative rather than mechanical.",
      },
    ],
  },

  // 3 ----------------------------------------------------------------------
  {
    slug: "what-is-an-llm",
    title: "What is an LLM?",
    level: "Basic Understanding",
    objective:
      "Understand what a Large Language Model is and how it produces text.",
    lessonContent:
      "A Large Language Model (LLM) is a type of generative AI trained on enormous amounts of text to predict the next word (technically, the next 'token') in a sequence. By doing this prediction extremely well across billions of examples, an LLM becomes capable of writing essays, answering questions, summarizing documents, translating languages, and holding conversations.\n\n'Large' refers to the size of the model (the number of internal parameters it adjusts during training) and the size of the training data. LLMs don't 'look up' answers in a database - they generate a response one token at a time, each token chosen based on everything that came before it.",
    scenario:
      "When you ask an LLM-based chatbot a question, it isn't searching a library of pre-written answers - it's generating a fresh response, token by token, based on patterns learned during training.",
    badge: {
      name: "Language Model Explorer",
      description: "Learned how LLMs generate language.",
      icon: "brain-circuit",
    },
    quiz: [
      {
        type: "mcq",
        question:
          "What does an LLM fundamentally do when generating a response?",
        options: [
          "Searches a fixed database of pre-written answers",
          "Predicts the next token, one step at a time, based on learned patterns",
          "Randomly picks words with no pattern",
          "Copies the closest matching webpage exactly",
        ],
        correctAnswer:
          "Predicts the next token, one step at a time, based on learned patterns",
        explanation:
          "LLMs generate text by repeatedly predicting the most plausible next token given everything generated so far.",
      },
      {
        type: "true_false",
        question:
          "An LLM stores a complete lookup table of every possible question and its answer.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "LLMs don't store question-answer pairs - they learn general language patterns and generate responses dynamically.",
      },
      {
        type: "mcq",
        question:
          "What does the 'Large' in Large Language Model mainly refer to?",
        options: [
          "The size of the screen needed to run it",
          "The scale of its parameters and training data",
          "The number of languages it can translate",
          "The physical size of the servers",
        ],
        correctAnswer: "The scale of its parameters and training data",
        explanation:
          "'Large' refers to the model's scale - billions of adjustable parameters trained on massive text datasets.",
      },
      {
        type: "scenario",
        question:
          "You ask an LLM a follow-up question referencing something said three messages ago, and it responds appropriately. What made that possible?",
        options: [
          "It saved your data permanently to a personal profile",
          "It used the conversation history provided as context for this prediction",
          "It phoned a human support agent",
          "It's guessing randomly and got lucky",
        ],
        correctAnswer:
          "It used the conversation history provided as context for this prediction",
        explanation:
          "LLMs generate each response using the text provided as context - including earlier turns in the conversation, if included in the input.",
      },
      {
        type: "true_false",
        question:
          "LLMs generate text one token at a time, with each token influenced by everything generated before it.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "This is the core mechanism of autoregressive text generation used by LLMs.",
      },
      {
        type: "mcq",
        question:
          "Why is 'Large' an important part of the name 'Large Language Model'?",
        options: [
          "It can display text on large screens",
          "It processes large documents only",
          "The size of parameters and training data enables better language understanding",
          "It requires a large physical server room",
        ],
        correctAnswer:
          "The size of parameters and training data enables better language understanding",
        explanation:
          "Scale (billions of parameters + massive datasets) is directly linked to LLM capability.",
      },
      {
        type: "scenario",
        question:
          "An LLM starts a response, but the user cuts off the generation mid-sentence. Why did this happen?",
        options: [
          "The LLM ran out of tokens in the context window",
          "The user or system stopped generation before it naturally finished",
          "The model had an error",
          "All of the above are possible",
        ],
        correctAnswer:
          "The user or system stopped generation before it naturally finished",
        explanation:
          "LLMs generate token by token until instructed to stop, a length limit is reached, or the context window fills - any of these can cause mid-sentence cuts.",
      },
    ],
    flashcards: [
      {
        concept: "Large Language Model (LLM)",
        definition:
          "A generative AI model trained on huge text datasets to predict and generate language.",
        example: "The model behind an AI writing assistant or chatbot.",
        tip: "LLM = next-token prediction at massive scale.",
      },
      {
        concept: "Parameters",
        definition:
          "The internal numeric values a model adjusts during training to capture patterns in data.",
        example:
          "A model with billions of parameters can capture very nuanced language patterns.",
        tip: "More parameters generally means more capacity to learn patterns, not automatic accuracy.",
      },
      {
        concept: "Autoregressive generation",
        definition:
          "Generating text by predicting one token at a time, each based on all previous tokens.",
        example:
          "Predicting 'mat' after 'The cat sat on the' one word at a time.",
        tip: "This is why LLM responses can be cut off mid-thought if generation stops early.",
      },
      {
        concept: "Sequence-to-sequence prediction",
        definition:
          "The LLM mechanism of taking an input sequence and predicting a plausible output sequence.",
        example:
          "Input: 'Translate to Spanish: Hello' → Output predicted token by token.",
        tip: "This applies to any task framed as predicting the next reasonable text.",
      },
      {
        concept: "Context window (for LLMs)",
        definition:
          "The maximum length of input text an LLM can consider when generating a response.",
        example:
          "An 8K context window can fit about 6,000 words of conversation.",
        tip: "Longer conversations require summarization or must drop old content.",
      },
    ],
  },

  // 4 ----------------------------------------------------------------------
  {
    slug: "prompt-engineering-basics",
    title: "Prompt Engineering Basics",
    level: "Basic Understanding",
    objective:
      "Learn how to write clear, effective prompts that get better AI responses.",
    lessonContent:
      "Prompt engineering is the practice of writing inputs that guide an AI model toward the response you actually want. Because LLMs generate based on patterns in your input, small changes in wording, structure, or examples can meaningfully change the output quality.\n\nA few reliable techniques: be specific about the task, audience, and format you want; give examples of the style you're after; break complex tasks into steps; and tell the model what NOT to do when relevant. Vague prompts tend to produce vague, generic answers — specific prompts tend to produce specific, useful ones.",
    scenario:
      "Instead of asking 'write about dogs,' a well-engineered prompt says: 'Write a 3-sentence, upbeat product description for a dog leash aimed at first-time puppy owners.' The second version gives the model a clear task, tone, length, and audience.",
    badge: {
      name: "Prompt Crafter",
      description: "Learned to write clear, effective prompts.",
      icon: "wand-2",
    },
    quiz: [
      {
        type: "mcq",
        question:
          "Which prompt is most likely to produce a useful, specific response?",
        options: [
          "'Tell me about marketing'",
          "'Write a 100-word Instagram caption for a new coffee shop, friendly and playful tone'",
          "'Marketing help please'",
          "'Do something good'",
        ],
        correctAnswer:
          "'Write a 100-word Instagram caption for a new coffee shop, friendly and playful tone'",
        explanation:
          "Specifying the format, length, subject, and tone gives the model a clear target, producing a much more useful response than a vague request.",
      },
      {
        type: "true_false",
        question:
          "Giving an AI model an example of the style or format you want almost never helps the output.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Providing an example (sometimes called 'few-shot prompting') is one of the most effective ways to steer output style and format.",
      },
      {
        type: "mcq",
        question:
          "Breaking a complex task into smaller, ordered steps in your prompt tends to:",
        options: [
          "Confuse the model more than a single vague request",
          "Help the model follow a clearer reasoning path and produce a more structured answer",
          "Have no effect at all",
          "Only work for image generation, never for text",
        ],
        correctAnswer:
          "Help the model follow a clearer reasoning path and produce a more structured answer",
        explanation:
          "Step-by-step prompts help the model organize its response and reduce the chance of skipping important parts of the task.",
      },
      {
        type: "scenario",
        question:
          "You ask an AI tutor to 'explain neural networks' and get a response that's too technical for you. What's the best next prompt?",
        options: [
          "Give up, the AI clearly can't help",
          "Ask again with more detail: 'Explain neural networks like I'm new to AI, using a simple everyday analogy'",
          "Repeat the exact same prompt",
          "Ask an unrelated question instead",
        ],
        correctAnswer:
          "Ask again with more detail: 'Explain neural networks like I'm new to AI, using a simple everyday analogy'",
        explanation:
          "Refining your prompt with audience level and a request for an analogy is a core prompt engineering technique - iterating gets better results.",
      },
      {
        type: "true_false",
        question:
          "Telling a model what NOT to include (e.g. 'don't use jargon') can be a useful part of a prompt.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "Negative constraints help narrow the output space and avoid unwanted style or content.",
      },
      {
        type: "mcq",
        question:
          "Which technique involves showing the AI a few examples of the output style you want?",
        options: [
          "Zero-shot prompting",
          "Few-shot prompting",
          "Random prompting",
          "Brute-force prompting",
        ],
        correctAnswer: "Few-shot prompting",
        explanation:
          "Few-shot prompting uses examples to demonstrate the desired style, and is usually more effective than just describing what you want.",
      },
      {
        type: "scenario",
        question:
          "You've been iterating on prompts for a while and each tweak produces slightly better results. What's the name of this process?",
        options: [
          "Random guessing",
          "Prompt hacking",
          "Iterative prompting / prompt refinement",
          "Trial and error has no name",
        ],
        correctAnswer: "Iterative prompting / prompt refinement",
        explanation:
          "Refining prompts based on results is a core technique called iterative prompting.",
      },
    ],
    flashcards: [
      {
        concept: "Prompt Engineering",
        definition:
          "Crafting inputs to guide an AI model toward a better, more specific response.",
        example:
          "Adding 'in bullet points, for a beginner audience' to a request.",
        tip: "Specific beats vague, almost every time.",
      },
      {
        concept: "Few-shot Prompting",
        definition:
          "Including one or more examples in your prompt to demonstrate the style or format you want.",
        example:
          "Showing two example product taglines before asking for a third.",
        tip: "Show, don't just tell, when style matters.",
      },
      {
        concept: "Iterative Prompting",
        definition:
          "Refining your prompt based on the AI's previous response until you get what you need.",
        example: "Asking for 'a simpler version' after a too-technical answer.",
        tip: "Treat the first response as a draft, not a final answer.",
      },
      {
        concept: "Zero-shot prompting",
        definition:
          "Asking an AI to do a task with no examples - just a description of what you want.",
        example: "'Write a haiku about coffee' with no examples provided.",
        tip: "Works for straightforward tasks, but examples help for complex style requirements.",
      },
      {
        concept: "Chain-of-thought prompting",
        definition:
          "Asking the AI to explain its reasoning step-by-step, which often improves accuracy.",
        example:
          "'Solve this math problem. Show your work step by step.' instead of just 'What's 15 × 8?'",
        tip: "Asking for 'thinking' often produces better results than just the answer.",
      },
    ],
  },

  // 5 ----------------------------------------------------------------------
  {
    slug: "tokens-and-context",
    title: "Tokens and Context",
    level: "Applied Practice",
    objective:
      "Understand what tokens are and why context windows limit how much an AI can 'remember' at once.",
    lessonContent:
      "A token is a chunk of text an AI model processes - often a word, part of a word, or punctuation mark. 'Unbelievable' might be split into tokens like 'un', 'believ', and 'able'. Models read and generate text token by token, and every input and output counts against a limit called the context window.\n\nThe context window is the maximum number of tokens a model can consider at once — including your prompt, any earlier conversation, and its own response. If a conversation grows past that limit, the oldest parts get dropped or summarized, which is why a very long chat can cause a model to 'forget' something mentioned much earlier.",
    scenario:
      "You paste a 50-page document and ask detailed questions about page 2 after a long conversation - if the total token count exceeds the model's context window, earlier details may no longer be available to it.",
    badge: {
      name: "Context Keeper",
      description: "Understood tokens and context windows.",
      icon: "layers",
    },
    quiz: [
      {
        type: "mcq",
        question: "What is a 'token' in the context of LLMs?",
        options: [
          "A security password for the AI system",
          "A chunk of text — often a word or part of a word - that the model processes",
          "A unit of computing hardware",
          "A type of image file",
        ],
        correctAnswer:
          "A chunk of text — often a word or part of a word - that the model processes",
        explanation:
          "Tokens are the basic text units models read and generate, which may be whole words, sub-words, or punctuation.",
      },
      {
        type: "true_false",
        question:
          "The context window includes your prompt, prior conversation, AND the model's own response, all counted together.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "The context window is a shared token budget across the whole exchange — input and output both count against it.",
      },
      {
        type: "mcq",
        question:
          "What typically happens when a conversation exceeds the model's context window?",
        options: [
          "The model remembers everything perfectly regardless of length",
          "The oldest parts of the conversation may be dropped or summarized",
          "The model shuts down completely",
          "Nothing changes, there's no limit",
        ],
        correctAnswer:
          "The oldest parts of the conversation may be dropped or summarized",
        explanation:
          "Once the token limit is reached, earlier content typically has to be trimmed or summarized to make room for new input.",
      },
      {
        type: "scenario",
        question:
          "You're pasting a very long document for an AI to analyze and it seems to 'forget' details from the start of the document. What's the most likely cause?",
        options: [
          "The AI is being lazy on purpose",
          "The document length likely exceeded the model's context window",
          "The document format is always the problem",
          "This never happens with any model",
        ],
        correctAnswer:
          "The document length likely exceeded the model's context window",
        explanation:
          "Very long inputs can exceed the context window, causing early details to be dropped from what the model can actually consider.",
      },
      {
        type: "true_false",
        question:
          "A word like 'unbelievable' is always treated as exactly one single token.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Longer or less common words are frequently split into multiple sub-word tokens rather than staying as one token.",
      },
      {
        type: "mcq",
        question:
          "Roughly, how many characters of English text equal one token?",
        options: [
          "Exactly 1 character",
          "About 2-3 characters",
          "About 4 characters",
          "Always 10+ characters",
        ],
        correctAnswer: "About 4 characters",
        explanation:
          "A rough rule of thumb is that 1 token ≈ 4 characters of English text, though this varies.",
      },
      {
        type: "scenario",
        question:
          "You want to ask an AI a question about a very long PDF, but you're worried it will exceed the context window. What's a good strategy?",
        options: [
          "Just try it and hope for the best",
          "Ask the AI to summarize the document first, then ask follow-up questions about the summary",
          "Give up and don't use AI for this task",
          "Print the document and read it yourself",
        ],
        correctAnswer:
          "Ask the AI to summarize the document first, then ask follow-up questions about the summary",
        explanation:
          "Breaking long content into chunks (summarize first, then explore) is a practical strategy to work within context windows.",
      },
    ],
    flashcards: [
      {
        concept: "Token",
        definition:
          "A chunk of text (word, sub-word, or punctuation) that a model reads or generates.",
        example: "'Playing' might become tokens 'play' + 'ing'.",
        tip: "Roughly, 1 token ≈ 4 characters of English text.",
      },
      {
        concept: "Context Window",
        definition:
          "The maximum number of tokens a model can consider at once, across input and output combined.",
        example:
          "A 32k-token context window can hold a fairly long document plus a conversation.",
        tip: "Longer conversations or documents eat into the same shared budget.",
      },
      {
        concept: "Truncation",
        definition:
          "Dropping or summarizing older content when a conversation exceeds the context window.",
        example:
          "A chatbot losing track of instructions given very early in a long chat.",
        tip: "For long tasks, periodically restate key instructions or facts.",
      },
      {
        concept: "Tokenization",
        definition:
          "The process of breaking text into tokens that a model can process.",
        example:
          "Splitting 'Good morning!' into tokens like 'Good', 'morning', '!'",
        tip: "Different models may tokenize the same text slightly differently.",
      },
      {
        concept: "Token count",
        definition:
          "The number of tokens in a piece of text or a conversation so far.",
        example:
          "A 50-word paragraph might be 60-70 tokens depending on word length.",
        tip: "Knowing token count helps you estimate how much 'room' you have left in a context window.",
      },
    ],
  },

  // 6 ----------------------------------------------------------------------
  {
    slug: "hallucinations",
    title: "Hallucinations",
    level: "Applied Practice",
    objective:
      "Understand why AI models sometimes generate confident but false information, and how to catch it.",
    lessonContent:
      "A 'hallucination' is when an AI model generates information that sounds plausible and confident but is actually false or made up - like citing a study that doesn't exist, or stating an incorrect fact with total certainty. This happens because the model is optimized to produce fluent, plausible-sounding text, not to verify truth against a database.\n\nHallucinations are more likely on very specific facts, recent events, obscure topics, or when a model is pushed to answer something it doesn't actually have reliable information about. The best defenses are: verify important facts against a real source, ask the model to cite where information comes from, and stay skeptical of confident-sounding specifics you can't independently check.",
    scenario:
      "You ask an AI for a legal citation and it gives you a real-looking case name and number - but the case doesn't actually exist. That's a hallucination: fluent and confident, but fabricated.",
    badge: {
      name: "Fact Checker",
      description: "Learned to spot and handle AI hallucinations.",
      icon: "search-check",
    },
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
        correctAnswer:
          "Confidently generated information that is false or made up",
        explanation:
          "Hallucination refers to fluent, confident-sounding output that is factually incorrect or fabricated.",
      },
      {
        type: "true_false",
        question:
          "AI models hallucinate because they are trying to intentionally deceive the user.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Models don't have intent — hallucinations happen because they're optimized to produce plausible-sounding text, not because they're trying to lie.",
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
        correctAnswer:
          "Asking for a very specific citation or recent statistic the model may not reliably know",
        explanation:
          "Obscure, highly specific, or very recent facts are where models are most prone to confidently filling gaps with fabricated details.",
      },
      {
        type: "scenario",
        question:
          "An AI gives you a confident answer with a specific statistic and source. What's the best next step before using it in a report?",
        options: [
          "Trust it completely because it sounded confident",
          "Independently verify the statistic and source before relying on it",
          "Assume all AI statistics are automatically wrong",
          "Ask the AI if it's lying and trust whatever it says",
        ],
        correctAnswer:
          "Independently verify the statistic and source before relying on it",
        explanation:
          "Confidence in tone is not evidence of accuracy - independently verifying specific facts is the reliable defense against hallucination.",
      },
      {
        type: "true_false",
        question:
          "Asking a model to cite its sources guarantees the sources are real.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "A model can hallucinate citations too - asking for sources helps you verify, but doesn't guarantee accuracy on its own.",
      },
      {
        type: "mcq",
        question:
          "Which domain is most likely to trigger hallucinations from an AI?",
        options: [
          "Well-known historical facts",
          "Highly specific recent statistics, niche citations, or current events the model wasn't trained on",
          "Basic math and definitions",
          "Proverbs and famous quotes",
        ],
        correctAnswer:
          "Highly specific recent statistics, niche citations, or current events the model wasn't trained on",
        explanation:
          "Hallucinations are most common when a model is forced to answer on topics it doesn't actually have reliable information about.",
      },
      {
        type: "scenario",
        question:
          "You ask an AI for the name of a famous researcher and their main contribution, and it gives a confident-sounding answer. What's your best strategy?",
        options: [
          "Assume it's correct because it's so confident",
          "Independently verify the researcher's name and work before citing it",
          "Ask the AI a second time and average the answers",
          "Assume all AI answers about people are wrong",
        ],
        correctAnswer:
          "Independently verify the researcher's name and work before citing it",
        explanation:
          "Verification is the only reliable defense against hallucination, especially for specific factual claims.",
      },
    ],
    flashcards: [
      {
        concept: "Hallucination",
        definition:
          "Confident, fluent AI output that is factually false or fabricated.",
        example: "A made-up book title attributed to a real author.",
        tip: "Confidence in tone is not proof of accuracy.",
      },
      {
        concept: "Fabricated Citation",
        definition:
          "A reference (study, case, article) that sounds real but doesn't actually exist.",
        example:
          "An invented journal article name with a plausible-sounding title.",
        tip: "Always verify citations independently before relying on them.",
      },
      {
        concept: "Fact Verification",
        definition:
          "Checking AI-generated claims against a trusted, independent source.",
        example:
          "Cross-checking an AI's statistic against the original government report.",
        tip: "Treat AI output on specific facts as a draft to verify, not a final answer.",
      },
      {
        concept: "Confidence ≠ Accuracy",
        definition:
          "An AI may sound very sure about something while actually being completely wrong.",
        example:
          "An AI confidently stating a fictional person did something real-sounding.",
        tip: "Human-like confidence doesn't mean the information is accurate.",
      },
      {
        concept: "Knowledge Gaps",
        definition:
          "Topics or facts the AI doesn't have reliable information about, even if it will try to answer.",
        example:
          "Very recent events, obscure research, or non-public information.",
        tip: "Hallucinations often happen when you ask outside the model's knowledge zone.",
      },
    ],
  },

  // 7 ----------------------------------------------------------------------
  {
    slug: "bias-and-responsible-ai",
    title: "Bias and Responsible AI",
    level: "Responsible Use",
    objective:
      "Understand how bias enters AI systems and what responsible use looks like.",
    lessonContent:
      "AI models learn from data created by people, and that data can reflect historical, social, or sampling biases. If training data over-represents certain groups, viewpoints, or contexts, the model's outputs can systematically reflect that imbalance - for example, associating certain jobs with one gender more than another, simply because that pattern was more common in the training data.\n\nResponsible AI use means being aware that outputs can carry bias, testing AI-assisted decisions (especially high-stakes ones like hiring or lending) for fairness, giving humans final review over consequential decisions, and being thoughtful about the language and assumptions in your own prompts too.",
    scenario:
      "An AI resume-screening tool trained mostly on past hires in a male-dominated field starts favoring resumes with 'masculine-coded' language - reflecting a bias in the training data, not an intentional decision by the model.",
    badge: {
      name: "Responsible Explorer",
      description: "Learned how bias enters AI and how to use AI responsibly.",
      icon: "shield-check",
    },
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
        explanation:
          "AI models learn statistical patterns from their training data, so imbalances or historical biases in that data can be reflected in outputs.",
      },
      {
        type: "true_false",
        question:
          "Because AI is a computer system, its outputs are automatically neutral and unbiased.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "AI systems can absolutely reflect and even amplify biases present in their training data - being a computer system doesn't make output neutral.",
      },
      {
        type: "mcq",
        question:
          "For a high-stakes decision like hiring or lending, what does responsible AI use look like?",
        options: [
          "Letting the AI make the final decision with no human review",
          "Using AI as one input, with human review and fairness checks before a final decision",
          "Avoiding any human involvement to save time",
          "Ignoring the possibility of bias entirely",
        ],
        correctAnswer:
          "Using AI as one input, with human review and fairness checks before a final decision",
        explanation:
          "Responsible use of AI in consequential decisions means treating it as a decision-support tool with human oversight, not an unchecked final authority.",
      },
      {
        type: "scenario",
        question:
          "You notice an AI writing tool consistently generates examples featuring only one type of family structure. What's a responsible response?",
        options: [
          "Ignore it, it's not important",
          "Notice the pattern, consider it a form of bias, and prompt for more varied, inclusive examples",
          "Assume the AI is broken and stop using it entirely",
          "Report it as a security vulnerability",
        ],
        correctAnswer:
          "Notice the pattern, consider it a form of bias, and prompt for more varied, inclusive examples",
        explanation:
          "Recognizing skewed patterns and actively prompting for more balanced output is a practical, responsible way to work around training-data bias.",
      },
      {
        type: "true_false",
        question:
          "Testing AI-assisted decisions for fairness across different groups is a recommended responsible AI practice.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "Fairness testing across groups helps catch biased outcomes before they affect real people in consequential decisions.",
      },
      {
        type: "mcq",
        question:
          "If you notice an AI system seems to favor one demographic group in its outputs, what's the first responsible step?",
        options: [
          "Ignore it and use the system anyway",
          "Stop using AI entirely",
          "Document the bias, investigate the cause, and consider how to fix or mitigate it",
          "Blame the users for being sensitive",
        ],
        correctAnswer:
          "Document the bias, investigate the cause, and consider how to fix or mitigate it",
        explanation:
          "Recognizing, documenting, and addressing bias is how responsible AI improves over time.",
      },
      {
        type: "scenario",
        question:
          "A company uses AI to recommend job candidates. To ensure fairness, what should they do?",
        options: [
          "Trust the AI completely and hire its top recommendation automatically",
          "Ignore AI suggestions and hire only from manual applications",
          "Use AI as one input, audit for demographic fairness, and maintain human review of final hiring decisions",
          "Hire randomly to avoid any systematic bias",
        ],
        correctAnswer:
          "Use AI as one input, audit for demographic fairness, and maintain human review of final hiring decisions",
        explanation:
          "Responsible AI in consequential decisions combines AI tools with fairness audits and human judgment.",
      },
    ],
    flashcards: [
      {
        concept: "Bias (in AI)",
        definition:
          "Systematic skew in AI outputs, usually inherited from imbalances in training data.",
        example:
          "A model associating certain occupations with one gender more often, reflecting biased historical data.",
        tip: "Bias is usually inherited from data, not intentionally programmed.",
      },
      {
        concept: "Human-in-the-loop",
        definition:
          "Keeping a human reviewer involved in AI-assisted, consequential decisions.",
        example:
          "A hiring manager reviewing AI-shortlisted resumes rather than auto-rejecting candidates.",
        tip: "The higher the stakes, the more important human review becomes.",
      },
      {
        concept: "Fairness Testing",
        definition:
          "Checking whether an AI system's outputs or decisions differ unfairly across groups.",
        example:
          "Comparing loan-approval rates suggested by an AI tool across different demographic groups.",
        tip: "Fairness issues are often invisible until you specifically test for them.",
      },
      {
        concept: "Training Data Imbalance",
        definition:
          "When training data over-represents or under-represents certain groups or perspectives.",
        example:
          "A facial recognition model trained mostly on certain skin tones performs worse on others.",
        tip: "Balanced, representative data is key to reducing AI bias.",
      },
      {
        concept: "Mitigation Strategies",
        definition:
          "Techniques to reduce bias in AI systems, like diverse data, fairness testing, or human oversight.",
        example:
          "Augmenting training data with underrepresented groups, then testing for fairness.",
        tip: "No perfect solution - mitigation is an ongoing practice.",
      },
    ],
  },

  // 8 ----------------------------------------------------------------------
  {
    slug: "retrieval-augmented-generation",
    title: "Retrieval-Augmented Generation (RAG)",
    level: "Builder Mindset",
    objective:
      "Understand how RAG grounds AI answers in real, up-to-date documents instead of relying only on training memory.",
    lessonContent:
      "Retrieval-Augmented Generation (RAG) is a technique that combines an LLM with a search step: before generating an answer, the system retrieves relevant, real documents (from a database, company wiki, or the web) and feeds them into the model's context so it can 'ground' its response in that specific, current information.\n\nThis helps with two big LLM limitations: models can't know about information created after their training cutoff, and they can hallucinate specific facts. By retrieving real source documents first, RAG lets a model answer with information it was never directly trained on, and lets it cite exactly where an answer came from.",
    scenario:
      "A company support chatbot uses RAG to search the company's own help-center articles for the most relevant page, then generates an answer grounded in that page's actual content, rather than guessing from general training knowledge.",
    badge: {
      name: "Builder's Badge",
      description:
        "Understood how retrieval grounds AI answers in real content.",
      icon: "puzzle",
    },
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
        correctAnswer:
          "A retrieval step that pulls in relevant real documents before generating an answer",
        explanation:
          "RAG retrieves relevant real content and includes it in the model's context, grounding the generated answer in that source material.",
      },
      {
        type: "true_false",
        question:
          "RAG helps an AI system answer questions about information created after its training cutoff.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "By retrieving current documents at answer time, RAG lets a model reference information it was never trained on directly.",
      },
      {
        type: "mcq",
        question:
          "Which limitation of LLMs does RAG specifically help address?",
        options: [
          "Slow typing speed",
          "Hallucinating facts and lacking knowledge of recent/specific information",
          "Difficulty translating between languages",
          "Inability to generate any text at all",
        ],
        correctAnswer:
          "Hallucinating facts and lacking knowledge of recent/specific information",
        explanation:
          "Grounding responses in retrieved real documents reduces fabricated facts and extends the model's effective knowledge beyond training data.",
      },
      {
        type: "scenario",
        question:
          "You're building a support chatbot for a product with a constantly updated help center. Why would RAG be a good architecture choice?",
        options: [
          "It lets the chatbot pull the latest help articles at answer time instead of relying only on stale training knowledge",
          "It removes the need for any AI model at all",
          "It guarantees the chatbot never makes a mistake",
          "It's only useful for image generation",
        ],
        correctAnswer:
          "It lets the chatbot pull the latest help articles at answer time instead of relying only on stale training knowledge",
        explanation:
          "RAG lets the system stay current by retrieving live documents rather than depending solely on what the model memorized during training.",
      },
      {
        type: "true_false",
        question: "RAG completely eliminates the possibility of hallucination.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "RAG significantly reduces hallucination risk by grounding answers in real documents, but it doesn't guarantee perfect accuracy - the model can still misinterpret retrieved content.",
      },
      {
        type: "mcq",
        question:
          "What is the main advantage of RAG over asking an LLM a question directly?",
        options: [
          "It's faster",
          "It grounds the answer in real, current documents rather than relying only on training knowledge",
          "It requires no AI model at all",
          "It eliminates the need for human review",
        ],
        correctAnswer:
          "It grounds the answer in real, current documents rather than relying only on training knowledge",
        explanation:
          "The key win of RAG is access to current, specific source material that the model was never trained on directly.",
      },
      {
        type: "scenario",
        question:
          "A company's internal documentation changes frequently, but users ask an AI chatbot questions. Why is RAG a good solution?",
        options: [
          "It retains all memory automatically",
          "It retrieves the latest documentation at query time, staying current without retraining",
          "It makes the company's AI faster",
          "It prevents users from asking questions",
        ],
        correctAnswer:
          "It retrieves the latest documentation at query time, staying current without retraining",
        explanation:
          "RAG's live retrieval lets systems stay current without expensive retraining cycles.",
      },
    ],
    flashcards: [
      {
        concept: "Retrieval-Augmented Generation (RAG)",
        definition:
          "Combining document retrieval with generation so an AI grounds its answer in real, retrieved source content.",
        example:
          "A chatbot searching a knowledge base, then writing an answer based on the top matching article.",
        tip: "Retrieve first, then generate — grounding beats guessing.",
      },
      {
        concept: "Grounding",
        definition:
          "Basing an AI's output on specific, verifiable source material rather than only general training knowledge.",
        example:
          "An answer that quotes and links the exact help-center article it came from.",
        tip: "Grounded answers are easier to verify and trust.",
      },
      {
        concept: "Knowledge Cutoff",
        definition:
          "The point in time after which a model has no training knowledge of new events or information.",
        example:
          "A model trained through early 2026 won't natively know about events from later in the year.",
        tip: "RAG is one of the main ways to work around a fixed knowledge cutoff.",
      },
      {
        concept: "Retrieval + Generation pipeline",
        definition:
          "The two-step RAG process: first retrieve relevant documents, then use them as context for generation.",
        example:
          "Search customer support tickets → feed top 3 matches into an LLM → generate personalized answer.",
        tip: "The quality of retrieved documents directly affects output quality.",
      },
      {
        concept: "Live versus Stale Knowledge",
        definition:
          "RAG uses live retrieval for current data; pure LLMs are limited to training-time knowledge.",
        example:
          "RAG can answer 'what's the latest policy?' by retrieving today's document; an LLM guesses from training.",
        tip: "This is why RAG is crucial for any system where information changes frequently.",
      },
    ],
  },

  // 9 -----------------------------------------------------------------------
  {
    slug: "fine-tuning-and-transfer-learning",
    title: "Fine-tuning and Transfer Learning",
    level: "Builder Mindset",
    objective:
      "Understand how to customize pre-trained AI models for specific tasks without retraining from scratch.",
    lessonContent:
      "Fine-tuning is the process of taking a pre-trained model and training it further on a smaller, task-specific dataset to adapt it to your needs. Transfer learning is the broader concept of using knowledge learned on one task to improve performance on another.\n\nInstead of training a massive model from scratch (which requires enormous compute and data), you start with a foundation model already trained on billions of examples, then refine it with just hundreds or thousands of your own examples. This is much faster and cheaper, and often produces better results than training from scratch, because the model already understands general language, images, or code patterns.",
    scenario:
      "A medical company has a pre-trained text model but needs it to understand medical terminology and clinical scenarios better. Rather than training a new model from scratch, they fine-tune the existing model on 5,000 labeled medical documents - a fraction of what full training would require.",
    badge: {
      name: "Model Customizer",
      description: "Learned how to adapt AI models for specific tasks.",
      icon: "cog",
    },
    quiz: [
      {
        type: "mcq",
        question: "What is fine-tuning in the context of AI model development?",
        options: [
          "Training a model from scratch with no prior knowledge",
          "Taking a pre-trained model and training it further on task-specific data",
          "Making the model run faster with no accuracy changes",
          "Randomly adjusting model settings",
        ],
        correctAnswer:
          "Taking a pre-trained model and training it further on task-specific data",
        explanation:
          "Fine-tuning adapts an existing trained model to your specific use case by training it on your data.",
      },
      {
        type: "true_false",
        question:
          "Fine-tuning a model typically requires more data than training from scratch.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Fine-tuning needs much less data than training from scratch because the model already knows general patterns.",
      },
      {
        type: "mcq",
        question: "What is 'transfer learning'?",
        options: [
          "Copying one model's code into another",
          "Using knowledge learned on one task to improve performance on another task",
          "Moving a model from one computer to another",
          "Teaching a human to use AI",
        ],
        correctAnswer:
          "Using knowledge learned on one task to improve performance on another task",
        explanation:
          "Transfer learning leverages patterns learned in one domain to speed up learning in a related domain.",
      },
      {
        type: "scenario",
        question:
          "You want to build a model that classifies customer support tickets by urgency, but you have only 500 labeled examples. What's a practical approach?",
        options: [
          "Collect 100,000 examples to train a model from scratch",
          "Use transfer learning: start with a pre-trained language model and fine-tune it on your 500 examples",
          "Give up because 500 examples is too few",
          "Manually classify every incoming ticket forever",
        ],
        correctAnswer:
          "Use transfer learning: start with a pre-trained language model and fine-tune it on your 500 examples",
        explanation:
          "With transfer learning, 500 examples is often sufficient to fine-tune a pre-trained model effectively.",
      },
      {
        type: "true_false",
        question:
          "Fine-tuning always requires retraining every parameter in the model.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Often, only the final layers are fine-tuned while earlier layers remain frozen, making training faster.",
      },
      {
        type: "mcq",
        question:
          "Why is fine-tuning usually more practical than training a model from scratch?",
        options: [
          "It's slower but cheaper",
          "It requires less compute, less data, and is faster to set up",
          "It always produces better results regardless of the task",
          "It's the only way to build AI models",
        ],
        correctAnswer:
          "It requires less compute, less data, and is faster to set up",
        explanation:
          "Fine-tuning leverages pre-existing knowledge, making it more practical for real-world applications.",
      },
    ],
    flashcards: [
      {
        concept: "Fine-tuning",
        definition:
          "Adapting a pre-trained model by training it further on task-specific data.",
        example:
          "Starting with a language model trained on general English, then fine-tuning on legal documents.",
        tip: "You get a specialized model without the cost of training from scratch.",
      },
      {
        concept: "Transfer Learning",
        definition:
          "Leveraging knowledge learned on one task to improve performance on another related task.",
        example:
          "A face-recognition model trained on millions of faces helps kickstart a dog-breed classifier.",
        tip: "The more similar the tasks, the better transfer learning works.",
      },
      {
        concept: "Pre-trained Model",
        definition:
          "A model already trained on large, general datasets and ready to be fine-tuned for specific tasks.",
        example:
          "GPT-3 or BERT, which have learned general language patterns and are available for fine-tuning.",
        tip: "Pre-trained models are your starting point for building custom AI quickly.",
      },
      {
        concept: "Frozen Layers",
        definition:
          "Earlier layers in a model that remain unchanged during fine-tuning, preserving general knowledge.",
        example:
          "Keeping the first 10 layers of a model fixed, only training the final 2 layers on new data.",
        tip: "Freezing layers speeds up fine-tuning and reduces overfitting on small datasets.",
      },
      {
        concept: "Overfitting (in fine-tuning context)",
        definition:
          "When a fine-tuned model memorizes the small training dataset rather than learning generalizable patterns.",
        example:
          "Fine-tuning on 100 very similar examples, so the model works well only on those and fails on new data.",
        tip: "With small datasets, overfitting is a risk—use regularization and early stopping.",
      },
    ],
  },

  // 10 -----------------------------------------------------------------------
  {
    slug: "ai-safety-and-alignment",
    title: "AI Safety and Alignment",
    level: "Builder Mindset",
    objective:
      "Understand key concepts in AI safety and the challenge of aligning AI systems to human values.",
    lessonContent:
      "As AI systems become more powerful, AI safety—ensuring they behave as intended and don't cause harm—becomes critical. 'Alignment' refers to the challenge of making AI systems pursue goals that are actually beneficial and aligned with human values, not unintended side effects of their training.\n\nKey safety considerations include: adversarial robustness (protecting AI from bad-faith inputs), interpretability (understanding why an AI made a decision), scalable oversight (monitoring AI behavior as it scales), and value alignment (ensuring AI systems pursue the right goals). This is an active research area where technical work combines with policy and ethics.",
    scenario:
      "An AI optimization system is told to 'maximize user engagement on social media'—a vague goal. Without careful alignment, it might learn to promote addictive, polarizing, or false content because that maximizes clicks. Good safety practices mean specifying the goal more precisely and monitoring for harmful outcomes.",
    badge: {
      name: "Safety Guardian",
      description: "Understood AI safety and alignment challenges.",
      icon: "shield-alert",
    },
    quiz: [
      {
        type: "mcq",
        question: "What does 'alignment' mean in the context of AI safety?",
        options: [
          "Making AI models run on the same hardware",
          "Ensuring AI systems pursue goals that are beneficial and aligned with human values",
          "Organizing AI code in a neat file structure",
          "Aligning training data in sorted order",
        ],
        correctAnswer:
          "Ensuring AI systems pursue goals that are beneficial and aligned with human values",
        explanation:
          "Alignment is the challenge of encoding human values into AI objectives so systems do what we actually want.",
      },
      {
        type: "true_false",
        question:
          "If you specify an AI's goal perfectly clearly, it will never cause unintended harm.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Even clear goals can have unintended side effects (the alignment problem: easy to specify bad outcomes, hard to specify nuanced human values).",
      },
      {
        type: "mcq",
        question: "What is 'adversarial robustness' in AI safety?",
        options: [
          "The ability to fight physical adversaries",
          "Protecting an AI system from bad-faith inputs designed to trick it or cause it to malfunction",
          "Making AI systems competitive against each other",
          "Teaching AI to be aggressive",
        ],
        correctAnswer:
          "Protecting an AI system from bad-faith inputs designed to trick it or cause it to malfunction",
        explanation:
          "Adversarial robustness means the AI is resilient against inputs carefully designed to fool it.",
      },
      {
        type: "scenario",
        question:
          "An AI recommendation system is optimized only for 'user clicks.' Without additional safeguards, what's a likely risk?",
        options: [
          "The system will become self-aware",
          "The system might learn to recommend addictive, misleading, or polarizing content because it maximizes clicks",
          "The system will refuse to work",
          "Nothing, clicks are a perfect measure of quality",
        ],
        correctAnswer:
          "The system might learn to recommend addictive, misleading, or polarizing content because it maximizes clicks",
        explanation:
          "This is a classic misalignment: the stated goal (clicks) doesn't match the actual goal (quality, truth, user wellbeing).",
      },
      {
        type: "true_false",
        question:
          "AI safety and alignment are important research areas that combine technical work with ethics and policy.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation:
          "Modern AI safety involves computer scientists, ethicists, policymakers, and domain experts working together.",
      },
      {
        type: "mcq",
        question: "What does 'interpretability' mean in AI safety?",
        options: [
          "Teaching the AI to translate languages",
          "Understanding why an AI system made a particular decision or prediction",
          "Making AI code easier to type",
          "Allowing humans to interpret results in different languages",
        ],
        correctAnswer:
          "Understanding why an AI system made a particular decision or prediction",
        explanation:
          "Interpretability research aims to open the 'black box' and explain AI reasoning—critical for safety and trust.",
      },
    ],
    flashcards: [
      {
        concept: "AI Alignment",
        definition:
          "The challenge of ensuring AI systems pursue goals aligned with human values and beneficial outcomes.",
        example:
          "An AI that prioritizes user wellbeing and truthfulness, not just maximizing engagement.",
        tip: "Alignment is harder than it sounds—vague goals lead to unintended side effects.",
      },
      {
        concept: "AI Safety",
        definition:
          "The research field focused on ensuring AI systems are safe, beneficial, and don't cause unintended harm.",
        example:
          "Testing a medical AI for failures, biases, and adversarial robustness before deployment.",
        tip: "Safety becomes more critical as AI systems become more powerful and autonomous.",
      },
      {
        concept: "Adversarial Robustness",
        definition:
          "The ability of an AI system to resist intentionally designed adversarial inputs meant to fool it.",
        example:
          "An image classifier that still correctly identifies a stop sign even if an attacker adds subtle pixel changes.",
        tip: "Security-critical AI systems need adversarial robustness testing.",
      },
      {
        concept: "Interpretability",
        definition:
          "Understanding why an AI model made a particular decision or produced a particular output.",
        example:
          "For a loan-approval AI, explaining which factors led to a 'deny' decision.",
        tip: "Interpretability is essential for trust, debugging, and regulatory compliance.",
      },
      {
        concept: "Goal Specification / Reward Design",
        definition:
          "Precisely defining what you want an AI system to optimize for—harder than it seems.",
        example:
          "Saying 'maximize user satisfaction' is vague; better to specify measurable outcomes like 'helpful ratings.'",
        tip: "Poor goal specification is a root cause of misaligned AI behavior.",
      },
    ],
  },
];
