// app.js
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

  // 게시글 등록 기능
  document.getElementById("create-post-button").addEventListener("click", function() {
    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const post = {
      id: Date.now(),
      title: title,
      content: content,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
      comments: []  // 댓글들을 저장할 배열
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("게시글이 등록되었습니다.");
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
  });
});

// 상단 메뉴 업데이트 함수: 로그인 상태에 따라 "로그인" / "로그아웃" 표시 및 동작 처리
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
