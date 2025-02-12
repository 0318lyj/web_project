// register.js
$(document).ready(function() {
  $('#registerForm').on('submit', function(e) {
    e.preventDefault();
    
    // 폼에서 입력값 가져오기
    var username = $('#username').val().trim();
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    
    // 메시지 초기화
    $('#registerMessage').css('color', 'red').text('');
    
    // 비밀번호 일치 여부 체크
    if (password !== confirmPassword) {
      $('#registerMessage').text('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    
    // localStorage에서 기존 사용자 정보 읽기 (저장된 사용자가 없으면 빈 배열 사용)
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 이메일 중복 체크
    var emailExists = users.some(function(user) {
      return user.email === email;
    });
    if (emailExists) {
      $('#registerMessage').text('이미 등록된 이메일입니다.');
      return;
    }
    
    // 새 사용자 객체 생성 (실제 서비스에서는 평문 비밀번호 저장은 위험합니다)
    var newUser = {
      username: username,
      email: email,
      password: password
    };
    
    // 사용자 목록에 추가 후 localStorage에 저장
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // 성공 메시지 출력 후 폼 초기화
    $('#registerMessage').css('color', 'green').text('회원가입이 완료되었습니다.');
    $('#registerForm')[0].reset();
    
    // 2초 후 로그인 페이지로 리디렉션
    setTimeout(function(){
      window.location.href = 'login.html';
    }, 2000);
  });
});
