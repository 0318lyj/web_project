// post_create.js
$(document).ready(function() {
  $('#postCreateForm').on('submit', function(e) {
    e.preventDefault();
    
    // 폼에서 입력값 가져오기
    var title = $('#postTitle').val().trim();
    var content = $('#postContent').val().trim();
    
    // 제목 또는 내용이 비어있을 경우 에러 메시지 출력
    if (!title || !content) {
      $('#postCreateMessage').css('color', 'red').text('제목과 내용을 모두 입력하세요.');
      return;
    }
    
    // localStorage에서 기존 게시글 가져오기 (저장된 게시글이 없으면 빈 배열 사용)
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // 새 게시글 객체 생성 (게시글 고유 id는 타임스탬프 사용)
    var newPost = {
      id: Date.now(), // 게시글 고유 ID
      title: title,
      content: content,
      date: new Date().toLocaleString()
    };
    
    // 게시글 배열에 추가하고 localStorage에 저장
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // 성공 메시지 출력 후 폼 초기화 및 1초 후 게시물 목록 페이지로 리디렉션
    $('#postCreateMessage').css('color', 'green').text('게시물이 등록되었습니다. 게시물 목록으로 이동합니다.');
    $('#postCreateForm')[0].reset();
    
    setTimeout(function(){
      window.location.href = 'courses.html';  // 게시물 목록 페이지 URL
    }, 1000);
  });
});
