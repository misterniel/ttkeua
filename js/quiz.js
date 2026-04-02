/**
 * Quiz questions and logic
 */

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "How would you rate your overall TikTok experience?",
    options: [
      { emoji: "😍", text: "Excellent" },
      { emoji: "😊", text: "Good" },
      { emoji: "😐", text: "Average" },
      { emoji: "😒", text: "Poor" }
    ]
  },
  {
    id: 2,
    question: "What is your favorite video format on TikTok?",
    options: [
      { emoji: "🎥", text: "Short video" },
      { emoji: "📹", text: "Medium video" },
      { emoji: "⏳", text: "Long video" },
      { emoji: "📺", text: "Live" }
    ]
  },
  {
    id: 3,
    question: "How do you discover new videos on TikTok?",
    options: [
      { emoji: "🎯", text: "\"For You\" feed" },
      { emoji: "👤", text: "Following creators" },
      { emoji: "🔍", text: "Through hashtags" },
      { emoji: "📜", text: "\"Following\" feed" },
      { emoji: "💡", text: "Recommendations" }
    ]
  },
  {
    id: 4,
    question: "How many hours per day do you spend on TikTok?",
    options: [
      { emoji: "⏳", text: "Less than 1 hour" },
      { emoji: "⏳", text: "1 to 2 hours" },
      { emoji: "⏳", text: "2 to 4 hours" },
      { emoji: "⏳", text: "4 to 6 hours" },
      { emoji: "⏳", text: "More than 6 hours" }
    ]
  },
  {
    id: 5,
    question: "What makes you follow a creator on TikTok?",
    options: [
      { emoji: "🎉", text: "Fun content" },
      { emoji: "📚", text: "Educational content" },
      { emoji: "🤝", text: "Personal connection" },
      { emoji: "🔥", text: "Challenge participation" },
      { emoji: "📅", text: "Posting frequency" }
    ]
  },
  {
    id: 6,
    question: "Which of these content themes do you most enjoy watching on TikTok?",
    options: [
      { emoji: "😂", text: "Comedy" },
      { emoji: "💃", text: "Dance" },
      { emoji: "ℹ️", text: "Tutorials and tips" },
      { emoji: "📹", text: "Daily vlogs" },
      { emoji: "💄", text: "Fashion and beauty" }
    ]
  },
  {
    id: 7,
    question: "What time of day do you most use TikTok?",
    options: [
      { emoji: "🌅", text: "Morning" },
      { emoji: "🌞", text: "Afternoon" },
      { emoji: "🌜", text: "Evening" },
      { emoji: "🌙", text: "Late night" }
    ]
  },
  {
    id: 8,
    question: "Which TikTok section do you access the most?",
    options: [
      { emoji: "🎯", text: "For You" },
      { emoji: "👥", text: "Following" },
      { emoji: "📺", text: "TikTok Live" },
      { emoji: "🔍", text: "Discover" },
      { emoji: "➕", text: "Other" }
    ]
  },
  {
    id: 9,
    question: "How often do you comment on TikTok videos?",
    options: [
      { emoji: "🔄", text: "Always" },
      { emoji: "📆", text: "Frequently" },
      { emoji: "⏳", text: "Sometimes" },
      { emoji: "🌧️", text: "Rarely" },
      { emoji: "🚫", text: "Never" }
    ]
  },
  {
    id: 10,
    question: "What type of interaction do you most do on TikTok videos?",
    options: [
      { emoji: "👍", text: "Like" },
      { emoji: "💬", text: "Comment" },
      { emoji: "🔄", text: "Share" },
      { emoji: "📌", text: "Save" },
      { emoji: "🚫", text: "None" }
    ]
  },
  {
    id: 11,
    question: "What is your age range?",
    options: [
      { emoji: "🧑‍🎓", text: "13-17 years old" },
      { emoji: "🎉", text: "18-24 years old" },
      { emoji: "👩‍💼", text: "25-34 years old" },
      { emoji: "👵", text: "35 years or older" }
    ]
  }
];

// Quiz state
let currentQuestionIndex = 0;
let selectedOption = null;
const quizContainer = document.getElementById('quiz-container');

// Render a question
function renderQuestion(questionIndex) {
  const question = quizQuestions[questionIndex];
  
  // Update progress
  updateProgressBar(questionIndex, quizQuestions.length);
  
  // Create the question HTML
  const questionHTML = `
    <div class="quiz-title">${question.question}</div>
    <div class="quiz-subtitle">Select an option to continue:</div>
    <div class="options-container">
      ${question.options.map((option, index) => `
        <div class="option" data-index="${index}">
          <div class="option-content">
            <div class="option-emoji">${option.emoji}</div>
            <div class="option-text">${option.text}</div>
          </div>
          <div class="custom-checkbox"></div>
        </div>
      `).join('')}
    </div>
    <button id="continue-btn" class="continue-btn" disabled>Continue</button>
    <div class="bonus-text">Compete for an additional bonus</div>
    <div class="divider"></div>
  `;
  
  // Set the HTML
  quizContainer.innerHTML = questionHTML;
  
  // Add event listeners to options
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selection from all options
      options.forEach(opt => opt.classList.remove('selected'));
      
      // Select this option
      option.classList.add('selected');
      
      // Enable the continue button
      document.getElementById('continue-btn').disabled = false;
      
      // Store the selected option
      selectedOption = parseInt(option.dataset.index);
      
      // Rastrear interação (Contact event)
      if (typeof trackContact === 'function') {
        trackContact();
      }
    });
  });
  
  // Add event listener to continue button
  document.getElementById('continue-btn').addEventListener('click', () => {
    if (selectedOption !== null) {
      // Notificar resposta da pergunta
      const selectedAnswer = question.options[selectedOption].text;
      if (typeof notifyQuestionAnswered === 'function') {
        notifyQuestionAnswered(questionIndex + 1, selectedAnswer);
      }
      
      // Show reward
      showReward(currentQuestionIndex);
    }
  });
  
  // Animate the new question in
  animateElement(quizContainer, 'fade-in');
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  selectedOption = null;
  
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion(currentQuestionIndex);
  } else {
    // Show final reward
    showFinalReward();
  }
}

// Reset the quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  selectedOption = null;
  totalEarned = 0;
  rewards = generateRewards();
  currentBalance.textContent = "0";
  renderQuestion(currentQuestionIndex);
}