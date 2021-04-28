// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const buttons = header.querySelectorAll(".button-group > *");
const threeLinesButton = header.querySelector('.three-lines-button');
const screen = {
  desktop: 768,
  tablet: 576,
};
let onTablet = false;
let isActived = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function handleTabIndexOfBanner() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active');

  setTabIndex(threeLinesButton, 0);

  if (onTablet) {
    buttons.forEach(function(button) {setTabIndex(button, 0);});
    setTabIndex(threeLinesButton, -1);
  } else if (!onTablet && isActived) { // Mobile & 활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, 0);});
  } else if (!onTablet && !isActived) { // Mobile & 비활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, -1);});
  }
}

function activeOrInactiveHeader() {
  const buttonGroup = header.querySelector('.button-group');

  isActived = header.classList.contains('active');

  if (onTablet || isActived) {
    isActived = false;
    header.classList.remove('active');
    threeLinesButton.setAttribute('aria-expanded', false);
    handleTabIndexOfBanner();
  } else {
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
    handleTabIndexOfBanner();
  }
}

function toggleBannerButtons(state) {
  if (state === 'show') {
    threeLinesButton.classList.remove('hidden');
  } else if (state === 'hide') {
    threeLinesButton.classList.add('hidden');
  }
}

function displayHeaderButtons() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) {
    toggleBannerButtons('hide');
    activeOrInactiveHeader();
  } else { // Mobile
    toggleBannerButtons('show');
    handleTabIndexOfBanner();
  }
}

window.addEventListener('resize', displayHeaderButtons);
window.addEventListener("DOMContentLoaded", displayHeaderButtons);
window.addEventListener("DOMContentLoaded", handleTabIndexOfBanner);
threeLinesButton.addEventListener('click', activeOrInactiveHeader);



// 스크롤 이동 (인터넷에서 긁어옴)
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});




// 관람 내역, 리뷰
const prototypeHistory = {
  showHistory: function(isMultiple, hidden, button) {
    button.classList.add('hidden');

    if (isMultiple) {
      for (let i=0; i < hidden.length; i++) {
        hidden[i].classList.remove('hidden');
        hidden[i].classList.add('active');
      }
    } else {
      hidden.classList.remove('hidden');
      hidden.classList.add('active');
    }
  },

  applyEvent: function(button) {
    button.addEventListener('click',
      this.showHistory.bind(null, this.isMultiple, this.hidden, this.button));
  },
};

function historyFactory(isMultiple, hidden, button) {
  let history = Object.create({});
  history.button = document.querySelector(button);
  history.isMultiple = isMultiple;
  history.multiple = document.querySelectorAll(hidden);
  history.one = document.querySelector(hidden);
  history.hidden = isMultiple ? history.multiple : history.one;

  history.__proto__ = prototypeHistory;

  history.applyEvent(history.button); // 클릭 이벤트 실행

  return history;
}

const seen = historyFactory(false, '.reservation-confirm-seen', '.seen-confirm-button');
const review = historyFactory(true, '[data-review="hidden"]', '.more-button');





// 프로필 사진 변경 (인터넷에서 긁어옴)
const profileImage = document.querySelector('.profile-image');
const inputFiles = document.querySelector("#files");

function readURL() {
  var reader = new FileReader();

  reader.onload = function (e) {
    profileImage.setAttribute('src', e.target.result);
  }

  reader.readAsDataURL(this.files[0]);
}

inputFiles.addEventListener('change', readURL);


// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기부터 다시 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// Booking System - Click Event (Movie name/Start time)
// 1. 영화이름/영화시간 누르면 '진하기 700', '글자색 #181818'로 변경.
// (Click movie name/time, it changes to fontWeight 700 & color #181818)
// 2. 선택한 영화이름/영화시간이 HTML Booking Section에 출력.
// (Output movie name/time to HTML Booking Section)
// 3. 영화이름 누르면, 시간 선택 파트와 영화의 상영시간표가 출력.
let timetables = document.querySelectorAll("[id^=Timetable]");
let movieNames = document.querySelectorAll("input[name=movie-name]");
let nameLabels = document.querySelectorAll("[id^=name]");


let bookingEvent = {
  // 폰트 변경 & HTML Booking Section에 출력하는 함수.
  changeFont: function(checkedElem, fontElem, showElem){
    for(let i=0; i<checkedElem.length; i++){
      if(checkedElem[i].checked){
        // 폰트 변경.
        fontElem[i].style.fontWeight = '700';
        fontElem[i].style.color = '#181818';
        // Booking Section에 출력.
        document.getElementById(showElem).innerHTML= fontElem[i].innerHTML;
      } else{
        fontElem[i].style.fontWeight = '400';
        fontElem[i].style.color = '#C4C4C4';
      }
    }
  },
  // 해당 영화의 시간표 출력
  showTimetable: function(movie, timetable){
    for(let j=1; j<=movie.length; j++){
      if(document.getElementById('movie-name'+j).checked){
        for(let i=0; i<timetable.length; i++){
          timetable[i].style.display = 'none';
        }
        document.getElementById('Timetable'+j).style.display = 'flex';
      }
    }
  }
};

// 영화이름 클릭 이벤트
// 1. 클릭한 영화이름의 폰트스타일 변화.
// 2. '시간 선택' 파트 출력.
// 3. 해당 영화의 시간표 출력.
$("input[name=movie-name]").click(function(){
  bookingEvent.changeFont(movieNames, nameLabels, "seat-desc-name");
  // HTML에서 같은 섹션 안의 '시간 선택' 파트가 출력.
  document.querySelector('div.option-items:nth-child(2)').style.display = 'block';

  bookingEvent.showTimetable(movieNames, timetables);
});

// 영화시간 클릭 이벤트
// 클릭한 영화시간 폰트스타일 변화.
let startTimes = document.querySelectorAll("input[name=start-time]");
let timeLabels = document.querySelectorAll("[id^=time]");

$("input[name=start-time]").click(function(){
  bookingEvent.changeFont(startTimes, timeLabels, "seat-desc-time");
});




// Booking System - Click Event ('start time')
// 상영시간 누르면, 좌석 선택 버튼이 활성화 됨.
$('[id^=Timetable]').click(function (){
  document.querySelector('.select-seat-button').disabled = false;
});



// Booking System - Click Event ('select-seat-button')
// 좌석선택 버튼 누르면, Booking 파트 출력.
$('.select-seat-button').click(function(){
  document.querySelector(".booking").style.display = 'block';
});





// Booking System - Select option ('num of person' and 'price')
// 1. 인원수 제한-5명 (Limit the number of person to five)
// 2. '누적' 인원 5명 이상 - alert 발생 & '인원'과 '금액' 초기화
// (Over 5, alert message & reset 'number of person' and 'price')
// 3. '누적' 인원 5명 이하 - '최종결정금액' 계산
// (Under 5, accumulate total price)
let numOfTotal = 0;
let priceOfTotal = 0;

function Accumulate(option, price){
  this.ageOption = document.querySelectorAll(option);
  this.optionValue = 0;
  this.price = price;
  this.saveOptionValue = [0];

  // value 자료형 변경 함수 (문자형 -> 정수형)
  this.changeDataType = function (){
    for(let i=0; i<this.ageOption.length; i++){
      if(this.ageOption[i].selected){
        this.optionValue = Number(this.ageOption[i].value);
      }
    }
    this.saveOptionValue.push(this.optionValue);  // Option 선택값 저장
  }

  // '인원' & '금액' 누적값 계산 함수.
  this.$Sum = function (){
    let current=this.saveOptionValue[this.saveOptionValue.length-1];  //선택된 옵션 현재 값.
    let past=this.saveOptionValue[this.saveOptionValue.length-2]; //선택된 옵션 이전 값.

    // '누적' 인원 & 총금액.
    numOfTotal += (current - past);
    console.log("총원 "+numOfTotal);
    priceOfTotal += this.price * (current - past);
    console.log("총금액 "+priceOfTotal);

    // 누적 인원수 5명 초과시, 선택한 인원과 금액을 초기화.
    if(numOfTotal>5){
      alert("인원 선택은 최대 5명입니다.");
      numOfTotal -= current;
      this.saveOptionValue[this.saveOptionValue.length-1]="0";
      console.log("수정된 총원 "+numOfTotal);
      priceOfTotal -= this.price * current;
      console.log("수정된 총금액 "+priceOfTotal);
      this.ageOption[0].selected = 'true';
    }
  }

  // '인원' & '금액' 누적값 출력 함수.
  // 1. 좌석예약 Booking-desc의 dd에 출력.
  // 2. 좌석 선택 활성화.
  this.output$Sum = function(){
    document.getElementById("seat-desc-count").innerHTML = "총 "+ numOfTotal +"명";
    document.getElementById("seat-desc-price").innerHTML = this.numberWithCommas(priceOfTotal)+"원";
    document.getElementById("seat-desc-count").style.opacity = '1';
    document.getElementById("seat-desc-price").style.opacity = '1';
    // 좌석 선택 활성화.
    document.querySelector(".seat-table").style.pointerEvents = "auto";
    document.querySelector(".seat-table").style.opacity = "1";
  }

  // 회계형 숫자표현 - stackoverflow에서 긁어옴.
  this.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

let ageType1 = new Accumulate('#adult option', 12000);
let ageType2 = new Accumulate('#Teenager option', 9000);
let ageType3 = new Accumulate('#child option', 6000);
let ageType4 = new Accumulate('#preferential-treatment option', 3000);

// Click Event (Type of age)
$("select[name=adult]").change(function(){
  ageType1.changeDataType();
  ageType1.$Sum();
  ageType1.output$Sum();
});
$("select[name=Teenager]").change(function(){
  ageType2.changeDataType();
  ageType2.$Sum();
  ageType2.output$Sum();
});
$("select[name=child]").change(function(){
  ageType3.changeDataType();
  ageType3.$Sum();
  ageType3.output$Sum();
});
$("select[name=preferential-treatment]").change(function(){
  ageType4.changeDataType();
  ageType4.$Sum();
  ageType4.output$Sum();
});




// Booking System - Checked 수 한정 함수.
// 1. 인원 수 지정한 만큼만 체크 가능.
// 2. Input:checked.value는 Booking-desc에 출력.
// 3. 인원 수 만큼 체크되면, 모든 체크박스 & 인원 선택 불가.
let checkboxs = document.querySelectorAll('input[name=seat]');
let seatInHtml = document.getElementById("seat-desc-seat");
let ageTypes = document.querySelectorAll('.age');
let checkedSeat = []; // Input:checked 값 저장.

function toUseElem(elem, pointer, opacity){
  for(let i=0; i<elem.length; i++){
    elem[i].style.pointerEvents = pointer;
    elem[i].style.opacity = opacity;
  }
}

$("input[name=seat]").change(function(){
  let checkedBoxs = document.querySelectorAll('.seat-table input[type=checkbox]:checked').length;

  for(let i=0; i<checkboxs.length; i++){
    if(checkboxs[i].checked){
      checkedSeat.push(checkboxs[i].value);
    }
  }

  console.log(checkedBoxs);
  console.log(numOfTotal);

  // 인원 선택 수만큼 체크되면, 모든 체크박스 & 인원 선택불가로 변경.
  if(checkedBoxs>=numOfTotal){
    document.querySelector(".seat-table table").style.pointerEvents = "none";
    document.querySelector(".seat-table table").style.opacity = "0.5";
    toUseElem(ageTypes, 'none', '0.5');
  }

  // Input:checked.value는 Booking-desc에 출력.
  seatInHtml.innerHTML = checkedSeat.slice(checkedSeat.length - numOfTotal,checkedSeat.length);
  seatInHtml.style.opacity = '1';
});






// Click Event - Reset button
// 좌석 선택 초기화
// 1. 인원 선택 활성화.
// 2. 누적값 (인원 & 금액) 0으로 초기화.
// 3. 인원 [option:selected].value 저장한 배열 [0]으로 초기화.
// 4. 좌석 [input[name=seat]:checked].value 저장한 배열 [0]으로 초기화.
// 5. HTML Booking-desc part 출력값 초기화.
// 6. HTML - <div class="seat-table">의 자식태그 <table> pointerEvents 활성화.
// 변수 중복 사용
// let checkedSeat = []; // Input:checked 값 저장. (Output - HTML Booking-desc part)
// ageTypes = document.querySelectorAll('.age');
// 함수 중복 사용 toUseElem();
$('.reset-button').click(function(){
  toUseElem(ageTypes, 'auto', '1');

  numOfTotal = 0;
  priceOfTotal = 0;

  ageType1.saveOptionValue = [0];
  ageType2.saveOptionValue = [0];
  ageType3.saveOptionValue = [0];
  ageType4.saveOptionValue = [0];

  checkedSeat = [0];

  document.getElementById('seat-desc-count').innerHTML = "";
  document.getElementById('seat-desc-seat').innerHTML = "";
  document.getElementById('seat-desc-price').innerHTML = "";

  for(let i=0; i<checkboxs.length; i++){
    document.querySelector(".seat-table table").style.pointerEvents = "auto";
    document.querySelector(".seat-table table").style.opacity = "1";
  }
});
