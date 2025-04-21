document.addEventListener('DOMContentLoaded', function()      {
    const greeting = document.getElementById('greeting');
    const quizList = document.getElementById('quizList');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [
        { id: 'gk', title: 'General Smarts' },
        { id: 'sci', title: 'Science Fun' }];

    if (!currentUser) {
        window.location.href = 'index.html';
        return; }
    greeting.textContent = `Hey, ${currentUser.email.split('@')[0]}!`;

    quizzes.forEach(quiz => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `quiz.html?quizId=${quiz.id}`;
        link.textContent = quiz.title;
        listItem.appendChild(link);
        quizList.appendChild(listItem); });
});