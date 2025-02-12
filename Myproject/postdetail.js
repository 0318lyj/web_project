// postdetail.js
document.addEventListener("DOMContentLoaded", function() {
  const currentUser = localStorage.getItem("currentUser");

  // URL에서 게시글 ID 추출 (예: postdetail.html?id=123456)
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  if (!postId) {
    alert("게시글 ID가 제공되지 않았습니다.");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let post = posts.find(p => p.id == postId);
  if (!post) {
    alert("게시글을 찾을 수 없습니다.");
    return;
  }

  const postDetailContainer = document.getElementById("post-detail");
  const commentSection = document.getElementById("comment-section");

  // 게시글 내용을 localStorage에 저장하는 함수
  function savePost() {
    const index = posts.findIndex(p => p.id == post.id);
    if (index !== -1) {
      posts[index] = post;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }

  // 게시글 상세 내용을 렌더링하는 함수
  function renderPost() {
    postDetailContainer.innerHTML = "";
    const titleEl = document.createElement("h2");
    titleEl.textContent = post.title;
    const contentEl = document.createElement("p");
    contentEl.textContent = post.content;
    const likeInfo = document.createElement("div");
    likeInfo.innerHTML = `좋아요: ${post.likes} / 싫어요: ${post.dislikes}`;

    // 좋아요/싫어요 버튼 생성
    const likeButton = document.createElement("button");
    likeButton.textContent = "좋아요";
    const dislikeButton = document.createElement("button");
    dislikeButton.textContent = "싫어요";

    likeButton.addEventListener("click", function() {
      if (!currentUser) {
        alert("로그인이 필요합니다.");
        return;
      }
      if (post.likedBy.includes(currentUser) || post.dislikedBy.includes(currentUser)) {
        alert("이미 투표하셨습니다.");
        return;
      }
      post.likes++;
      post.likedBy.push(currentUser);
      savePost();
      renderPost();
      renderComments();
    });

    dislikeButton.addEventListener("click", function() {
      if (!currentUser) {
        alert("로그인이 필요합니다.");
        return;
      }
      if (post.likedBy.includes(currentUser) || post.dislikedBy.includes(currentUser)) {
        alert("이미 투표하셨습니다.");
        return;
      }
      post.dislikes++;
      post.dislikedBy.push(currentUser);
      savePost();
      renderPost();
      renderComments();
    });

    postDetailContainer.appendChild(titleEl);
    postDetailContainer.appendChild(contentEl);
    postDetailContainer.appendChild(likeInfo);
    postDetailContainer.appendChild(likeButton);
    postDetailContainer.appendChild(dislikeButton);
  }

  // 댓글(토론) 내용을 렌더링하는 함수
  function renderComments() {
    commentSection.innerHTML = "";
    if (post.comments.length === 0) {
      commentSection.innerHTML = "<p>등록된 댓글이 없습니다.</p>";
      return;
    }
    post.comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      const commentAuthor = document.createElement("strong");
      commentAuthor.textContent = comment.author;
      const commentContent = document.createElement("p");
      commentContent.textContent = comment.content;
      const commentLikeInfo = document.createElement("div");
      commentLikeInfo.innerHTML = `좋아요: ${comment.likes} / 싫어요: ${comment.dislikes}`;

      const commentLikeButton = document.createElement("button");
      commentLikeButton.textContent = "좋아요";
      const commentDislikeButton = document.createElement("button");
      commentDislikeButton.textContent = "싫어요";

      commentLikeButton.addEventListener("click", function() {
        if (!currentUser) {
          alert("로그인이 필요합니다.");
          return;
        }
        if (comment.likedBy.includes(currentUser) || comment.dislikedBy.includes(currentUser)) {
          alert("이미 투표하셨습니다.");
          return;
        }
        comment.likes++;
        comment.likedBy.push(currentUser);
        savePost();
        renderComments();
      });

      commentDislikeButton.addEventListener("click", function() {
        if (!currentUser) {
          alert("로그인이 필요합니다.");
          return;
        }
        if (comment.likedBy.includes(currentUser) || comment.dislikedBy.includes(currentUser)) {
          alert("이미 투표하셨습니다.");
          return;
        }
        comment.dislikes++;
        comment.dislikedBy.push(currentUser);
        savePost();
        renderComments();
      });

      commentDiv.appendChild(commentAuthor);
      commentDiv.appendChild(commentContent);
      commentDiv.appendChild(commentLikeInfo);
      commentDiv.appendChild(commentLikeButton);
      commentDiv.appendChild(commentDislikeButton);
      commentSection.appendChild(commentDiv);
    });
  }

  renderPost();
  renderComments();

  // 새 댓글 등록 기능
  document.getElementById("add-comment-button").addEventListener("click", function() {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    const commentContentEl = document.getElementById("comment-content");
    const commentText = commentContentEl.value.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // 새로운 댓글 객체 생성
    const comment = {
      id: Date.now(),
      author: currentUser,
      content: commentText,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: []
    };
    post.comments.push(comment);
    savePost();
    commentContentEl.value = "";
    renderComments();
  });
});
