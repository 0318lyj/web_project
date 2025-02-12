// register.js
document.addEventListener("DOMContentLoaded", function() {
  updateTopMenu();

  // 상단 메뉴의 게시글 목록, 회원가입 링크 처리
  document.getElementById("link-post-list").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "postlist.html";
  });
  document.getElementById("link-register").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "register.html";
  });

  document.getElementById("register-button").addEventListener("click", function() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();
    if (!username || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.username === username)) {
      alert("이미 존재하는 사용자 이름입니다.");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입 성공. 로그인 페이지로 이동합니다.");
    window.location.href = "login.html";
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
