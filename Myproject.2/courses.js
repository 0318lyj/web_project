// courses.js
$(document).ready(function() {
  // localStorage에서 게시글 목록 가져오기
  var posts = JSON.parse(localStorage.getItem('posts')) || [];
  
  // 게시글 카드들을 추가할 컨테이너 선택 (게시물 목록 Section 내 row 요소)
  var $row = $('.board_list .row');
  
  // 기존 내용을 초기화 (기본 샘플 카드 제거)
  $row.empty();
  
  // 각 게시글에 대해 카드 HTML 생성 후 추가
  posts.forEach(function(post) {
    // 게시글 내용이 길면 100자까지만 보여주고 '...' 추가
    var previewContent = post.content.length > 100 
      ? post.content.substring(0, 100) + '...'
      : post.content;
    
    // 카드 HTML (이미지의 경우 기본 이미지 사용, 필요에 따라 post 객체에 이미지 URL 추가 가능)
    var cardHtml = `
      <div class="col-lg-4 col-md-6">
        <div class="card board_card">
          <img class="card-img-top" src="images/post_sample_default.jpg" alt="게시물 이미지">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${previewContent}</p>
            <a href="post_detail.html?id=${post.id}" class="btn board_btn">자세히 보기</a>
          </div>
        </div>
      </div>
    `;
    
    $row.append(cardHtml);
  });
});
