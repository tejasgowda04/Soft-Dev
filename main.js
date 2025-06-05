// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Replace this with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB1ZhQgkmXgvUuFQoDby1XcbtYAZ0EmmZo",
  authDomain: "softdev-auth-fix.firebaseapp.com",
  projectId: "softdev-auth-fix",
  storageBucket: "softdev-auth-fix.firebasestorage.app",
  messagingSenderId: "605532915107",
  appId: "1:605532915107:web:7e3b00e28eff0ef7e64616",
  measurementId: "G-QJDK807CEN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginButtons = document.querySelectorAll("button[onclick*='openAuthModal']");
const profileNameSpans = document.querySelectorAll(".user-name-placeholder");

// Handle Google Sign-In
window.handleGoogleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
        enrolled: false // default until payment is done
      };
      localStorage.setItem("softDevUser", JSON.stringify(userData));
      updateUI(userData);
      closeAuthModal();
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
};

// Function to simulate payment success or integrate real Razorpay
window.onPaymentSuccess = () => {
  const user = JSON.parse(localStorage.getItem("softDevUser")) || {};
  user.enrolled = true;
  localStorage.setItem("softDevUser", JSON.stringify(user));
  updateUI(user);
};

// Update UI after login or payment
function updateUI(user) {
  loginButtons.forEach(btn => btn.style.display = 'none');
  profileNameSpans.forEach(span => span.textContent = user.name);

  const enrollButtons = document.querySelectorAll(".enroll-btn");
  enrollButtons.forEach(btn => {
    if (user.enrolled) {
      btn.textContent = "Access Now";
      btn.onclick = () => {
        window.location.href = `dashboard.html?course=fullstack`;
      };
    } else {
      btn.textContent = "Enroll Now";
      btn.onclick = () => {
        // Replace this with Razorpay payment integration
        onPaymentSuccess();
      };
    }
  });
}

// Auto-update on load if already signed in
onAuthStateChanged(auth, (user) => {
  const localUser = JSON.parse(localStorage.getItem("softDevUser"));
  if (user && localUser) {
    updateUI(localUser);
  }
});
