// postlist.js
document.addEventListener("DOMContentLoaded", function() {
  // 상단 메뉴 링크 처리
  document.getElementById("link-login").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "login.html";
  });
  document.getElementById("link-register").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "register.html";
  });
  document.getElementById("link-post-list").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "postlist.html";
  });

  // 게시글 목록 출력
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postListContainer = document.getElementById("post-list");
  if (!postListContainer) {
    console.error("게시글 목록을 표시할 요소가 없습니다.");
    return;
  }
  postListContainer.innerHTML = "";

  if (posts.length === 0) {
    postListContainer.innerHTML = "<p>등록된 게시글이 없습니다.</p>";
    return;
  }

  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.className = "post-item";

    // 게시글 제목을 클릭하면 상세보기 페이지로 이동
    const postLink = document.createElement("a");
    postLink.href = "postdetail.html?id=" + post.id;
    postLink.textContent = post.title;
    postItem.appendChild(postLink);

    // 좋아요/싫어요 정보 표시
    const info = document.createElement("div");
    info.innerHTML = `좋아요: ${post.likes} / 싫어요: ${post.dislikes}`;
    postItem.appendChild(info);

    postListContainer.appendChild(postItem);
  });
});
