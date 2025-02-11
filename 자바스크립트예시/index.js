//index.js
let members = [
  {id: 'user01', pw:'11111', name:'홍길동'},
  {id: 'user02', pw:'2222', name:'김민서'},
  {id: 'user03', pw:'3333', name:'유길동'}
]


let members_json = JSON.stringify(members);
//회원정보 
localStorage.setItem('members', members_json);




//연습 
let name = 'Honkildong';
localStorage.setItem('name', 'Hongkildong');
console.log(localStorage.getItem('name'));

//json 문자열 
let json = `{
  "name": "Hongkildong", 
  "age":20
}`
//문자열 -> 객체
let obj = JSON.parse(json);
console.log(json, obj);

//obj.name = , obj.age
localStorage.setItem('friend', json);
let info = localStorage.getItem('friend');
console.log(JSON.parse(info)['age']); // 문자열 -> 객체

localStorage.setItem('friend2', obj);
info = localStorage.getItem('friend2');
console.log(info.name);


//객체 -> 문자열
obj = {
  name: '홍길동',
  friends: [{
    name:'김민수', 
    phone: '010-1111'
  }, {
  name:'박현수',
  phone: '010-2222'
  }]
}

json = JSON.stringify(obj); //객체 -> 문자열
console.log(json);
localStorage.setItem('myfriend', json);



