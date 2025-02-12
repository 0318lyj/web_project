// post_detail.js
$(document).ready(function() {
  // URL에서 ?id=... 파라미터 읽기
  function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  var postId = getQueryParam('id');
  if (!postId) {
    $('#postDetailContent').html('<p>게시물을 찾을 수 없습니다.</p>');
    return;
  }
  
  // localStorage에서 게시글 배열 가져오기
  var posts = JSON.parse(localStorage.getItem('posts')) || [];
  // 해당 게시글 찾기 (postId는 숫자 형태로 저장되어 있으므로 비교 전 변환)
  var post = posts.find(function(p) {
    return p.id === parseInt(postId);
  });
  
  if (!post) {
    $('#postDetailContent').html('<p>게시물을 찾을 수 없습니다.</p>');
    return;
  }
  
  // 게시글 객체에 좋아요/싫어요 프로퍼티가 없으면 초기화
  if (typeof post.likes === 'undefined') {
    post.likes = 0;
  }
  if (typeof post.dislikes === 'undefined') {
    post.dislikes = 0;
  }
  
  // localStorage에 저장된 투표 기록 객체 (postVotes)
  // 구조: { postId: { userEmail: 'like' 또는 'dislike' } }
  var postVotes = JSON.parse(localStorage.getItem('postVotes')) || {};
  if (!postVotes[postId]) {
    postVotes[postId] = {};  // 해당 게시글에 대한 투표 기록 초기화
  }
  
  // 현재 로그인한 사용자 이메일 (로그인 기능에서 저장된 값 사용)
  var currentUser = localStorage.getItem('loggedInUser');
  
  // 게시글 상세 HTML 구성
  var detailHtml = `
    <div class="post_detail_box">
      <h1 class="post_detail_title">${post.title}</h1>
      <p class="post_detail_date">작성일: ${post.date}</p>
      <div class="post_detail_content">
        ${post.content}
      </div>
      <div class="vote_section">
        <button id="likeBtn" class="vote_button">좋아요</button>
        <span class="vote_count" id="likeCount">${post.likes}</span>
        <button id="dislikeBtn" class="vote_button">싫어요</button>
        <span class="vote_count" id="dislikeCount">${post.dislikes}</span>
      </div>
    </div>
  `;
  
  $('#postDetailContent').html(detailHtml);
  
  // 투표 버튼 클릭 이벤트 처리
  function handleVote(voteType) {
    // 사용자가 로그인되어 있지 않으면 알림
    if (!currentUser) {
      alert('투표를 위해서는 로그인이 필요합니다.');
      return;
    }
    
    // 이미 투표한 경우
    if (postVotes[postId][currentUser]) {
      alert('이미 투표하셨습니다.');
      return;
    }
    
    // 투표 처리: voteType은 "like" 또는 "dislike"
    if (voteType === 'like') {
      post.likes++;
    } else if (voteType === 'dislike') {
      post.dislikes++;
    }
    
    // 투표 기록에 현재 사용자의 투표 저장
    postVotes[postId][currentUser] = voteType;
    
    // localStorage 업데이트
    localStorage.setItem('postVotes', JSON.stringify(postVotes));
    
    // 변경된 게시글 데이터도 posts 배열에서 업데이트 후 저장
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === post.id) {
        posts[i] = post;
        break;
      }
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // UI 업데이트
    $('#likeCount').text(post.likes);
    $('#dislikeCount').text(post.dislikes);
    alert('투표해 주셔서 감사합니다.');
  }
  
  // 이벤트 리스너 부착
  $('#likeBtn').on('click', function() {
    handleVote('like');
  });
  $('#dislikeBtn').on('click', function() {
    handleVote('dislike');
  });
});
