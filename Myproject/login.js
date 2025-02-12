// login.js
document.addEventListener("DOMContentLoaded", function() {
  updateTopMenu();

  // 상단 메뉴의 회원가입, 게시글 목록 링크 처리
  document.getElementById("link-register").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "register.html";
  });
  document.getElementById("link-post-list").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "postlist.html";
  });

  document.getElementById("login-button").addEventListener("click", function() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    if (!username || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", username);
      alert("로그인 성공");
      window.location.href = "postlist.html";
    } else {
      alert("사용자 이름 또는 비밀번호가 올바르지 않습니다.");
    }
  });
});

// 상단 메뉴 업데이트 함수 (공통)
function updateTopMenu() {
  const loginLink = document.getElementById("link-login");
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    loginLink.textContent = "로그아웃";
    loginLink.onclick = function(e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      alert("로그아웃 되었습니다.");
      window.location.href = "index.html";
    };
  } else {
    loginLink.textContent = "로그인";
    loginLink.onclick = function(e) {
      e.preventDefault();
      window.location.href = "login.html";
    };
  }
}
