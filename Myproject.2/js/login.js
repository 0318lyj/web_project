// login.js

$(document).ready(function() {

  // 로그인 상태에 따라 상단 메뉴 업데이트
  function updateNav() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      // 로그인 상태이면 "로그인" 메뉴를 "로그아웃"으로 변경
      $('#loginNavItem a')
        .text('로그아웃')
        .attr('href', '#')
        .off('click')
        .on('click', function(e) {
          e.preventDefault();
          localStorage.removeItem('loggedInUser');
          updateNav();
          alert('로그아웃 되었습니다.');
          // 필요 시 메인페이지로 리디렉션
          window.location.href = 'courses.html';
        });
    } else {
      // 로그아웃 상태이면 "로그인" 메뉴 유지
      $('#loginNavItem a')
        .text('로그인')
        .attr('href', 'login.html')
        .off('click');
    }
  }

  // 페이지 로드 시 메뉴 업데이트
  updateNav();

  // 로그인 폼 제출 이벤트 처리
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();
    
    var email = $('#loginEmail').val().trim();
    var password = $('#loginPassword').val();
    
    $('#loginMessage').css('color', 'red').text('');
    
    // localStorage에 저장된 사용자 목록 가져오기 (등록된 사용자가 없으면 빈 배열)
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 입력된 이메일로 사용자 찾기
    var user = users.find(function(u) {
      return u.email === email;
    });
    
    if (!user) {
      $('#loginMessage').text('등록된 이메일이 없습니다.');
      return;
    }
    
    if (user.password !== password) {
      $('#loginMessage').text('비밀번호가 틀렸습니다.');
      return;
    }
    
    // 로그인 성공: localStorage에 로그인 사용자 정보 저장
    localStorage.setItem('loggedInUser', email);
    $('#loginMessage').css('color', 'green').text('로그인 성공!');
    
    // 메뉴 업데이트 및 일정 시간 후 메인페이지로 이동
    updateNav();
    setTimeout(function() {
      window.location.href = 'courses.html';
    }, 1500);
  });
});
