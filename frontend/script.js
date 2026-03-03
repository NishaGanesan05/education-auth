// ================= Role Selection =================

function selectRole(role) {

    localStorage.setItem("role", role);

    document.getElementById("rolePage").classList.add("hidden");
    document.getElementById("authPage").classList.remove("hidden");

    document.getElementById("roleTitle").innerText =
        role + " Portal";

    // Dynamic Register ID Placeholder
    const roleIdField =
        document.getElementById("roleIdField");
    roleIdField.placeholder = role + " ID";

    // Dynamic Login Placeholder
    const loginField =
        document.getElementById("loginIdField");
    loginField.placeholder =
        "Email / " + role + " ID";

    showLogin();
}

function goBack() {
    document.getElementById("authPage")
        .classList.add("hidden");

    document.getElementById("rolePage")
        .classList.remove("hidden");
}

// ================= Toggle Forms =================

function showLogin() {
    document.getElementById("loginForm")
        .classList.remove("hidden");

    document.getElementById("registerForm")
        .classList.add("hidden");
}

function showRegister() {
    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("registerForm")
        .classList.remove("hidden");
}

// ================= Password Strength =================

function checkPasswordStrength() {

    const password =
        document.getElementById("passwordField").value;

    const strengthFill =
        document.getElementById("strengthFill");

    let strength = 0;

    if (password.length > 5) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const colors = ["red", "orange", "yellow", "green"];

    strengthFill.style.width =
        (strength * 25) + "%";

    strengthFill.style.background =
        colors[strength - 1] || "transparent";
}

// ================= Authentication =================

async function handleAuth(type) {

    const role = localStorage.getItem("role");

    if (type === "register") {

        const name =
            document.querySelector("#registerForm input[name='name']").value;

        const roleId =
            document.querySelector("#registerForm input[name='roleId']").value;

        const email =
            document.querySelector("#registerForm input[name='email']").value;

        const password =
            document.querySelector("#registerForm input[name='password']").value;

        const confirm =
            document.querySelector("#registerForm input[name='confirm']").value;

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch("https://education-auth.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                role,
                roleId,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            showLogin();   // switch to login tab after successful registration
        } else {
            alert(data.message);
        }

    }

    if (type === "login") {

        const loginId =
            document.querySelector("#loginForm input[name='loginId']").value;

        const password =
            document.querySelector("#loginForm input[name='password']").value;

        const response = await fetch("https://education-auth.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                loginId,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.name);
            localStorage.setItem("role", data.role);

            window.location.href = "welcome.html";

        } else {
            alert(data.message);
        }
    }
}

// ================= Forgot Password =================

function forgotPassword() {
    alert("Password reset link sent (Demo).");
}

// ================= Social Login Demo =================

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(
        ".google-btn, .facebook-btn, .apple-btn"
    ).forEach(btn => {

        btn.addEventListener("click", function () {
            alert("Social login demo only.");
        });

    });

});
function loadWelcomePage() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    const name = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    document.getElementById("welcomeText").innerText =
        "Welcome, " + name + " (" + role + ")";

    document.getElementById("dashboardTitle").innerText =
        role + " Dashboard";
}
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}