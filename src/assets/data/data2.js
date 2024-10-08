export const data = [
  {
    question: "What is your age group?",
    type: "multiple",
    answers: [
      { text: "18-24" },
      { text: "25-34" },
      { text: "35-44" },
      { text: "45-54" },
      { text: "55+" },
    ],
  },
  {
    question: "What is your gender?",
    type: "multiple",
    answers: [
      { text: "Female" },
      { text: "Male" },
      { text: "Non-binary" },
      { text: "Prefer not to say" },
    ],
  },
  {
    question: "What is your country of origin?",
    type: "open",
    placeholder: "Type here",
  },
  {
    question: "What language(s) do you speak?",
    type: "open",
    placeholder: "Separate with commas",
  },
  {
    question: "What is your highest level of education? ",
    type: "multiple",
    subquestion:
      "If you are currently in full-time education please put the highest qualification you have already completed (e.g., you are doing your master’s degree, therefore your highest qualification is bacherlors or equivalent level degree)",
    answers: [
      { text: "I did not complete any formal education" },
      { text: "Early childhood education" },
      { text: "Primary education" },
      { text: "Lower secondary education (GCSEs or equivalent level)" },
      { text: "Upper secondary education (A-Levels or baccalaureate)" },
      {
        text: "Post-secondary, non-tertiary education (generally vocational/ professional qualification of 1-2 years, e.g. college, trade school)",
      },
      { text: "Bachelors or equivalent level degree" },
      { text: "Masters or equivalent level degree" },
      { text: "Doctoral or equivalent level degree" },
    ],
  },
  {
    question: "What is your current employment status? (select all that apply)",
    type: "checkbox",
    answers: [
      { text: "Student" },
      { text: "Part-time employed" },
      { text: "Full-time employed" },
      { text: "Unemployed" },
      { text: "Retired" },
    ],
  },
  {
    question: "What is your primary profession or field of study?",
    type: "open",
    placeholder: "Type here",
  },
  {
    question: "How often do you have your phone with you?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },
  {
    question:
      "When you get a notification, how often do you check it immediately?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },
  {
    question:
      "How often do you find yourself checking your phone for new events such as text messages or notifications?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },
  {
    question:
      "How often do you check social media apps such as Facebook, Instagram, Twitter, etc.?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },
  {
    question:
      "How often do you find yourself checking your phone “for no good reason”?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },
  {
    question: "How often do you lose track of time while using your phone?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "Rarely" },
      { text: "Sometimes" },
      { text: "Often" },
      { text: "Always" },
    ],
  },

  {
    question:
      "How dependent are you on your smartphone for daily activities (e.g., communication, work, studies, entretainment)?",
    type: "multiple",
    answers: [
      { text: "Not dependent at all" },
      { text: "Somewhat dependent" },
      { text: "Moderately dependent" },
      { text: "Very dependent" },
      { text: "Extremely dependent" },
    ],
  },
  {
    question:
      "Imagine you had to live without your smartphone for a week. What aspects of your daily life would be most affected? (e.g., communictating with loved ones, work, studies, etc)",
    type: "open",
    placeholder: "Type here",
  },
  {
    question:
      "Have you ever considered switching to a non-smartphone (e.g., a basic phone or feature phone)?",
    type: "multiple",
    answers: [
      { text: "Yes" },
      { text: "No" },
      { text: "I already use a non-smartphone" },
    ],
  },
  {
    question:
      "What would be the main reason(s) why you wouldn't switch to a non-smartphone?",
    type: "open",
    placeholder: "Type here",
  },
];
