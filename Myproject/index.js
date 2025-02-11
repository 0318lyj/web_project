// ----------------------------
// 데이터 저장/불러오기 (localStorage)
// ----------------------------
function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getPosts() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function getCurrentUser() {
  // 현재 로그인한 사용자 정보(username) 저장
  return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
  localStorage.setItem('currentUser', username);
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

// ----------------------------
// 초기 로드 시 UI 상태
// ----------------------------
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutSection = document.getElementById('logout-section');
const mainSection = document.getElementById('main-section');
const postDetailSection = document.getElementById('post-detail-section');
const welcomeMsg = document.getElementById('welcome-msg');

const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const registerButton = document.getElementById('register-button');

const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// ----------------------------
// 회원가입 / 로그인 / 로그아웃
// ----------------------------
function refreshUI() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    // 로그인 상태
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    logoutSection.classList.remove('hidden');
    mainSection.classList.remove('hidden');
    postDetailSection.classList.add('hidden');

    welcomeMsg.textContent = `${currentUser}님 환영합니다.`;
  } else {
    // 비로그인 상태
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    logoutSection.classList.add('hidden');
    mainSection.classList.add('hidden');
    postDetailSection.classList.add('hidden');
  }
}

showRegister.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

showLogin.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

loginButton.addEventListener('click', () => {
  const usernameInput = document.getElementById('login-username').value.trim();
  const passwordInput = document.getElementById('login-password').value.trim();
  loginError.textContent = '';

  const users = getUsers();
  const found = users.find(u => u.username === usernameInput && u.password === passwordInput);
  if (found) {
    setCurrentUser(usernameInput);
    refreshUI();
    renderPostList(); // 게시글 목록 업데이트
  } else {
    loginError.textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
  }
});

logoutButton.addEventListener('click', () => {
  clearCurrentUser();
  refreshUI();
});

registerButton.addEventListener('click', () => {
  const usernameInput = document.getElementById('register-username').value.trim();
  const passwordInput = document.getElementById('register-password').value.trim();
  registerError.textContent = '';

  if (!usernameInput || !passwordInput) {
    registerError.textContent = '아이디와 비밀번호를 모두 입력해주세요.';
    return;
  }
  
  // 이미 존재하는 아이디인지 체크
  const users = getUsers();
  if (users.some(u => u.username === usernameInput)) {
    registerError.textContent = '이미 존재하는 아이디입니다.';
    return;
  }
  // 새로운 유저 등록
  users.push({ username: usernameInput, password: passwordInput });
  saveUsers(users);
  alert('회원가입이 완료되었습니다. 이제 로그인해주세요.');
  
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// ----------------------------
// 게시글 등록 & 목록
// ----------------------------
const createPostButton = document.getElementById('create-post-button');
const postListDiv = document.getElementById('post-list');

createPostButton.addEventListener('click', () => {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  if (!title || !content) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('로그인 후에 게시글을 작성할 수 있습니다.');
    return;
  }

  const posts = getPosts();
  const newPost = {
    id: Date.now(),
    title,
    content,
    author: currentUser,
    likeCount: 0,
    dislikeCount: 0,
    voteCount: 0,
    comments: []
  };
  posts.push(newPost);
  savePosts(posts);

  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';

  renderPostList();
});

function renderPostList() {
  const posts = getPosts();
  postListDiv.innerHTML = '';

  if (posts.length === 0) {
    postListDiv.innerHTML = '<p>등록된 게시글이 없습니다.</p>';
    return;
  }

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.textContent = `[${post.author}] ${post.title}`;
    postDiv.addEventListener('click', () => {
      openPostDetail(post.id);
    });
    postListDiv.appendChild(postDiv);
  });
}

// ----------------------------
// 게시글 상세 보기 & 댓글
// ----------------------------
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');
const detailAuthor = document.getElementById('detail-author');
const postLikeCountSpan = document.getElementById('post-like-count');
const postDislikeCountSpan = document.getElementById('post-dislike-count');
const postVoteCountSpan = document.getElementById('post-vote-count');

const likePostButton = document.getElementById('like-post-button');
const dislikePostButton = document.getElementById('dislike-post-button');
const voteButton = document.getElementById('vote-button');
const commentList = document.getElementById('comment-list');
const addCommentButton = document.getElementById('add-comment-button');
const commentContent = document.getElementById('comment-content');
const backToMainButton = document.getElementById('back-to-main');

let currentPostId = null; // 상세 보기 중인 게시글 ID

function openPostDetail(postId) {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  currentPostId = postId;

  detailTitle.textContent = post.title;
  detailContent.textContent = post.content;
  detailAuthor.textContent = post.author;
  postLikeCountSpan.textContent = post.likeCount;
  postDislikeCountSpan.textContent = post.dislikeCount;
  postVoteCountSpan.textContent = post.voteCount;

  commentList.innerHTML = '';
  post.comments.forEach((c) => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
      <p><strong>${c.author}</strong>: ${c.content}</p>
      <p>
        <button class="comment-like">좋아요(<span>${c.likeCount}</span>)</button>
        <button class="comment-dislike">싫어요(<span>${c.dislikeCount}</span>)</button>
      </p>
    `;
    const likeBtn = commentDiv.querySelector('.comment-like');
    const dislikeBtn = commentDiv.querySelector('.comment-dislike');
    
    // 댓글 좋아요/싫어요 이벤트
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      c.likeCount++;
      savePosts(posts);
      openPostDetail(postId);
    });
    dislikeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      c.dislikeCount++;
      savePosts(posts);
      openPostDetail(postId);
    });

    commentList.appendChild(commentDiv);
  });

  postDetailSection.classList.remove('hidden');
  mainSection.classList.add('hidden');
}

// 게시글 좋아요
likePostButton.addEventListener('click', () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }
  const posts = getPosts();
  const post = posts.find(p => p.id === currentPostId);
  if (!post) return;

  post.likeCount++;
  savePosts(posts);
  postLikeCountSpan.textContent = post.likeCount;
});

// 게시글 싫어요
dislikePostButton.addEventListener('click', () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }
  const posts = getPosts();
  const post = posts.find(p => p.id === currentPostId);
  if (!post) return;

  post.dislikeCount++;
  savePosts(posts);
  postDislikeCountSpan.textContent = post.dislikeCount;
});

// 게시글 투표
voteButton.addEventListener('click', () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }
  const posts = getPosts();
  const post = posts.find(p => p.id === currentPostId);
  if (!post) return;

  post.voteCount++;
  savePosts(posts);
  postVoteCountSpan.textContent = post.voteCount;
});

// 댓글 등록
addCommentButton.addEventListener('click', () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }

  const commentText = commentContent.value.trim();
  if (!commentText) {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  const posts = getPosts();
  const post = posts.find(p => p.id === currentPostId);
  if (!post) return;

  post.comments.push({
    author: currentUser,
    content: commentText,
    likeCount: 0,
    dislikeCount: 0
  });
  savePosts(posts);

  commentContent.value = '';
  openPostDetail(currentPostId);
});

// 목록으로 돌아가기
backToMainButton.addEventListener('click', () => {
  postDetailSection.classList.add('hidden');
  mainSection.classList.remove('hidden');
  renderPostList();
});

// 페이지 로딩 시
refreshUI();
if (getCurrentUser()) {
  renderPostList();
}
