// 모달 열림/닫힘
const prototypeModal = {
  handleModal: function() {
    // bind로 인해 this 변경 (window --> modalFactory의 변수 'modal')
    this.wrapper.classList.toggle('hidden');
    this.wrapper.classList.toggle('modal-active');
    this.nonModal.classList.toggle('modal-active');
  },
  clickEvent: function(openButton, closeButton) {
    // this: modalFactory의 변수 'modal'
    openButton.addEventListener('click', this.handleModal.bind(this));
    closeButton.addEventListener('click', this.handleModal.bind(this));
  },
};

function modalFactory(wrapper, openButton) {
  let modal = Object.create(prototypeModal);
  modal.wrapper = document.querySelector(wrapper);
  modal.closeButton = document.querySelector(wrapper+' .modal-close');
  modal.openButton = document.querySelector(openButton);

  // 클릭 이벤트 실행
  if (modal.wrapper) modal.clickEvent(modal.openButton, modal.closeButton);

  return modal;
}

const login = modalFactory('#login-modal', '.login-button');




// 로그인 모달 - 아이디(input.value) 전송
const loginModal = document.querySelector('#login-modal');

if (loginModal) {
  const loginButton = loginModal.querySelector('.login-button');

  function sendUserId(e) {
    e.preventDefault();
    let userId = loginModal.querySelector("#user-id").value;
    location.href="./01-main-after-login.html?userId="+userId;  //데이터 전송
  }

  loginButton.addEventListener('click', sendUserId);
}
