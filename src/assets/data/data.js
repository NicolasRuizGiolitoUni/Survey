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
    question:
      "How often do you use social media apps (e.g., Instagram, Facebook, Twitter) on your smartphone?",
    type: "multiple",
    answers: [
      { text: "Never" },
      { text: "A few times a month" },
      { text: "A few times a week" },
      { text: "Daily" },
      { text: "Several times a day" },
    ],
  },
  {
    question: "On average, how long do you spend on social media apps per day?",
    type: "multiple",
    answers: [
      { text: "I don’t use social media apps" },
      { text: "Less than 5 minutes" },
      { text: "5-30 minutes" },
      { text: "30 minutes to 1 hour" },
      { text: "More than 1 hour" },
    ],
  },
  {
    question:
      "Overall, which option better describes your social media use habits?",
    type: "multiple",
    answers: [
      { text: "I use social media too little " },
      { text: "I use social media about right " },
      { text: "I use social media too much" },
    ],
  },
  {
    question:
      "How often do you find yourself using social media apps longer than you intended?",
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
      "On average, how many hours a day do you spend using your smartphone?",
    type: "multiple",
    answers: [
      { text: "Less than 1 hour" },
      { text: "1-3 hours" },
      { text: "3-5 hours" },
      { text: "5-7 hours" },
      { text: "More than 7 hours" },
    ],
  },
  {
    question:
      "How dependent are you on your smartphone for daily activities (e.g., communication, work, studies, seek for directions)?",
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
      "Imagine you had to live without your smartphone for a week. What aspects of your daily life would be most affected? (e.g., communictating with loved ones, work, etc)",
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
      "What would be the main reason(s) why you wouldn't switch to a non-smartphone? (select all that apply)",
    type: "checkbox",
    answers: [
      { text: "Need access to work-related apps" },
      {
        text: "Dependence on communication apps (e.g., WhatsApp, Messenger)",
      },
      { text: "Fear of missing out (FOMO) on social media" },
      { text: "Convenience of having everything in one device" },
      { text: "Entertainment purposes (e.g., streaming, gaming)" },
      { text: "Concern about losing functionality" },
      { text: "Other" },
    ],
  },
];
