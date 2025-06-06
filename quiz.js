document.addEventListener('DOMContentLoaded', function() {
    const quizTitleElement = document.getElementById('quizTitle');
    const questionArea = document.getElementById('questionArea');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const resultArea = document.getElementById('resultArea');
    const finalScoreDisplay = document.getElementById('finalScore');
    const goHomeButton = document.getElementById('goHome');
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const quizQuestions = JSON.parse(localStorage.getItem('quizContent')) || {
        gk: [
            { q: 'Capital of France?', a: ['Berlin', 'Madrid', 'Paris', 'Rome'], correct: 'Paris' },
            { q: '2 + 2 = ?', a: ['3', '4', '5'], correct: '4' },
            { q: 'Biggest planet?', a: ['Mars', 'Jupiter', 'Saturn'], correct: 'Jupiter' } ],
        sci: [
            { q: 'H2O is?', a: ['Hydrogen Dioxide', 'Water', 'Oxygen Hydride'], correct: 'Water' },
            { q: 'Cell power?', a: ['Nucleus', 'Mitochondria', 'Ribosome'], correct: 'Mitochondria' },
            { q: 'Plants breathe in?', a: ['Oxygen', 'CO2', 'Nitrogen'], correct: 'CO2' }  ]   };

    if (!currentUser) {
        window.location.href = 'index.html';
        return;  }

    const currentQuiz = quizQuestions[quizId];
    if (!currentQuiz) {
        questionArea.textContent = 'Quiz not found!';
        return; }

    const quizInfo = (JSON.parse(localStorage.getItem('quizzes')) || []).find(q => q.id === quizId);
    quizTitleElement.textContent = quizInfo ? quizInfo.title : 'Quiz';

    let score = 0;
    let questionCounter = 0;

    function displayQuestion() {
        if (questionCounter < 3 && questionCounter < currentQuiz.length) {
            const questionData = currentQuiz[questionCounter];
            const qDiv = document.createElement('div');
            qDiv.innerHTML = `<h3>${questionData.q}</h3><div class="options"></div>`;
            const optionsDiv = qDiv.querySelector('.options');
            questionData.a.forEach((option, index) => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${questionCounter}`;
                input.value = option;
                const label = document.createElement('label');
                label.textContent = option;
                optionsDiv.appendChild(input);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement('br'));
            });
            questionArea.appendChild(qDiv);
            questionCounter++;
          } else {
            submitAnswerButton.style.display = 'block'    }}

    displayQuestion();
    displayQuestion();
    displayQuestion();

    submitAnswerButton.onclick = function() {
        let currentScore = 0;
        for (let i = 0; i < 3 && i < currentQuiz.length; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected && selected.value === currentQuiz[i].correct) {
                currentScore++;   } }
        score = currentScore;
        finalScoreDisplay.textContent = `${score} out of 3`;
        questionArea.style.display = 'none';
        submitAnswerButton.style.display = 'none';
        resultArea.style.display = 'block';

        const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
        if (!userScores[currentUser.email]) {
            userScores[currentUser.email] = {};  }
        userScores[currentUser.email][quizId] = score;
        localStorage.setItem('userScores', JSON.stringify(userScores));};

    goHomeButton.onclick = function() {
        window.location.href = 'home.html' };
});