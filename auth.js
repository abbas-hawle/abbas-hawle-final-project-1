
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const loginMsg = document.getElementById('loginMsg');
    const registerMsg = document.getElementById('registerMsg');

    const users = JSON.parse(localStorage.getItem('users')) || {};

    showRegisterBtn.onclick = () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block'; };

    showLoginBtn.onclick = () => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';};

    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = loginForm.loginEmail.value;
        const password = loginForm.loginPassword.value;

        if (email === 'admin@quiz.com' && password === 'admin123') {
            localStorage.setItem('currentUser', JSON.stringify({ email: email, isAdmin: true }));
            window.location.href = 'dashboard.html';
            return;  }

        if (users[email] && users[email].password === password) {
            localStorage.setItem('currentUser', JSON.stringify({ email: email, isAdmin: false }));
            window.location.href = 'home.html';
        } else {
            loginMsg.textContent = 'Wrong email or password.';
        }};

    registerForm.onsubmit = function(e) {
        e.preventDefault();
        const email = registerForm.registerEmail.value;
        const password = registerForm.registerPassword.value;

        if (users[email]) {
            registerMsg.style.color = 'red';
            registerMsg.textContent = 'Email already taken.';
            return;}

        users[email] = { password: password };
        localStorage.setItem('users', JSON.stringify(users));
        registerMsg.style.color = 'green';
        registerMsg.textContent = 'Account created! You can log in now.';
        registerForm.reset(); };});