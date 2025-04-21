document.addEventListener('DOMContentLoaded', function() {
    const scoreTableBody = document.getElementById('userScoreTable').querySelector('tbody');
    const logoutBtn = document.getElementById('adminLogout');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
        return;  }

    function displayScores() {
        scoreTableBody.innerHTML = '';
        for (const email in userScores) {
            const row = scoreTableBody.insertRow();
            const emailCell = row.insertCell();
            const scoresCell = row.insertCell();
            emailCell.textContent = email;
            let scoreText = '';
            for (const quizId in userScores[email]) {
                const quizTitle = quizzes.find(q => q.id === quizId)?.title || quizId;
                scoreText += `${quizTitle}: ${userScores[email][quizId]}, `;
            }
            scoresCell.textContent = scoreText.slice(0, -2); // Remove trailing comm;  }   }

    displayScores();

    logoutBtn.onclick = function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; };
});