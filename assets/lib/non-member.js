"use strict";// Dataset
var data={};data={order:"",movie:{name:"",time:[]},count:{total:0,adult:0,teen:0,kid:0,discount:0},seat:[],price:0};// 상영시간표 출력
var reservationTimeData=state.reservation.time,stepTimeLists=document.querySelector("#step-time .movie-list");function templateTimeTable(){return"<li aria-label='\uC2DC\uAC04'>\n    <input id='' class='hidden' type='checkbox' name='' value=''/>\n    <label></label>\n  </li>"}function populateTimetable(data,index,key){var div=document.createElement("div");return div.innerHTML=templateTimeTable(),div.querySelector("input").setAttribute("id",key+index),div.querySelector("input").setAttribute("name",key),div.querySelector("input").setAttribute("value",data),div.querySelector("label").setAttribute("for",key+index),div.querySelector("label").textContent=data,div.firstChild}function templateMovieListItem(){return"<li class='movie' data-timetable='' aria-label='\uC0C1\uC601 \uC911\uC778 \uC601\uD654'>\n    <h4 class='movie-name'></h4>\n    <ol class='time-list d-flex flex-wrap justify-content-between' aria-label='\uC0C1\uC601\uC2DC\uAC04'></ol>\n  </li>"}(function(){var _loop=function(key){var data=reservationTimeData[key].timetable,div=document.createElement("div"),fragment=document.createDocumentFragment();fragment.appendChild(div),div.innerHTML=templateMovieListItem(),div.querySelector(".movie").setAttribute("data-timetable",key),div.querySelector(".movie-name").textContent=reservationTimeData[key].name,data.forEach(function(data,index){div.querySelector(".time-list").appendChild(populateTimetable(data,index,key))}),stepTimeLists.appendChild(fragment.querySelector("div").firstChild)};for(var key in reservationTimeData)_loop(key)})();// 상영시간표 영화 선택
var timetableForEachMovie=document.querySelectorAll(".movie"),prototypeTimetable={inActiveAllTimetables:function inActiveAllTimetables(){timetableForEachMovie.forEach(function(timetable){return timetable.classList.add("inactive")})},activeSelectedTimeTable:function activeSelectedTimeTable(){this.timetable.classList.remove("inactive"),this.timetable.classList.add("active")},inActiveAllTheTime:function inActiveAllTheTime(){this.times.forEach(function(time){return time.classList.add("inactive")})},activeSelectedTime:function activeSelectedTime(selectedTime){selectedTime.classList.remove("inactive")},init:function(){timetableForEachMovie.forEach(function(timetable){return timetable.classList.remove("inactive")}),this.timetable.classList.remove("active"),this.times.forEach(function(list){return list.classList.remove("inactive")}),document.querySelector("#check-name .mypage-desc").innerHTML="",document.querySelector("#check-seat .mypage-desc").innerHTML="",data.seat=[]},changeData:function changeData(input){data.movie.name=input.name,data.movie.time=[input.value,input.id]},displayData:function displayData(){var section=document.querySelector("#check-name .mypage-desc"),koreanName=state.reservation.time[data.movie.name].name,time=data.movie.time[0],nameHTML="<strong>".concat(koreanName,"</strong>"),timeHTML="<strong>(".concat(time,")</strong>");section.innerHTML=nameHTML+timeHTML},toggleSeatTable:function toggleSeatTable(){var isBanned=this.seatTableWrapper.classList.contains("inactive");this.seatTableWrapper.classList[isBanned?"remove":"add"]("inactive")},alertMessage:function alertMessage(){this.classList.contains("inactive")&&alert("\uAD00\uB78C\uD558\uC2E4 \uC601\uD654\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.")}};function movieAndTime(timetable){var movie=Object.create(prototypeTimetable);return movie.timetable=document.querySelector(timetable),movie.times=movie.timetable.querySelectorAll("li"),movie.labels=movie.timetable.querySelectorAll("label"),movie.seatTableWrapper=document.querySelector(".table-wrapper"),movie.labels.forEach(function(label){var input=label.previousElementSibling,selectedTime=label.parentElement;input.addEventListener("change",function(){return!1===input.checked?(movie.init(),void movie.toggleSeatTable()):void(movie.inActiveAllTimetables(),movie.activeSelectedTimeTable(),movie.inActiveAllTheTime(),movie.activeSelectedTime(selectedTime),movie.changeData(input),movie.displayData(),movie.toggleSeatTable())})}),movie.seatTableWrapper.addEventListener("click",movie.alertMessage),movie}var rocky=movieAndTime("[data-timetable=rocky]"),matilda=movieAndTime("[data-timetable=matilda]"),mean=movieAndTime("[data-timetable=mean]"),harry=movieAndTime("[data-timetable=harry]"),marie=movieAndTime("[data-timetable=marie]"),truman=movieAndTime("[data-timetable=truman]"),checkboxesInTimeList=document.querySelectorAll(".time-list input");function matchSeatDataAndDomTable(){var movieName=data.movie.name,movieTime=data.movie.time[1],seatData=JSON.parse(window.localStorage.getItem("seatData")),checkboxesInSeatTable=document.querySelectorAll(".seat-table .seat-input");// checkboxesInSeatTable 전역변수로 선언하지 않은 이유
// 좌석(.seat-input) 출력은 현재 함수보다 아래에 존재하므로, 전역변수로 설정하면 오류가 발생한다.
// 동기-좌석 출력, 비동기-데이터와 화면 매칭(현재 함수)
checkboxesInSeatTable.forEach(function(checkbox){var seatKey=checkbox.id.split("-")[0],seatIndex=+checkbox.id.split("-")[1]-1,thisData=seatData[movieName][movieTime][seatKey][seatIndex],isChecked=!(1!==thisData);checkbox.checked=!!isChecked,checkbox.classList[isChecked?"add":"remove"]("already-booked")})}checkboxesInTimeList.forEach(function(checkbox){checkbox.addEventListener("change",matchSeatDataAndDomTable)});// 인원 선택 - 중복 출력
var reservationCountData=state.reservation.count,sectionCountList=document.querySelector("#step-count ol"),originListItem=sectionCountList.querySelector("li");function templateCountList(){return"<li class=\"d-flex align-center\" data-count=\"\" aria-label='\uAD6C\uBD84'>\n    <p class=\"count-type\"><strong></strong></p>\n    <div class=\"d-flex button-group\">\n      <button class=\"square count-button down inactive\" type=\"button\">-</button>\n      <p class=\"square\"><strong>0</strong></p>\n      <button class=\"square count-button up\" type=\"button\">+</button>\n    </div>\n  </li>"}(function(){for(var key in reservationCountData){var _data=reservationCountData[key],div=document.createElement("div"),fragment=document.createDocumentFragment();div.innerHTML=templateCountList(),div.querySelector("li").dataset.count=key,div.querySelector(".count-type").textContent=_data.text,fragment.appendChild(div),sectionCountList.appendChild(fragment.querySelector("div").firstChild)}})();// 인원선택 버튼 이벤트
var prototypeCount={plus:function plus(displayCount,downButton,upButton,type){// 인원이 5면 alert
if(5===data.count.total)return void alert("\uC120\uD0DD \uAC00\uB2A5 \uC778\uC6D0 5\uBA85\uC744 \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4.");// 데이터 변경과 화면 매칭
data.count.total+=1,data.count[type]+=1,displayCount.textContent=data.count[type];var numberOfPeaple=data.count[type];1===numberOfPeaple&&downButton.classList.remove("inactive"),5===numberOfPeaple&&upButton.classList.add("inactive")},minus:function minus(displayCount,downButton,upButton,type){data.count.total-=1,data.count[type]-=1,displayCount.textContent=data.count[type];var numberOfPeaple=data.count[type];0===numberOfPeaple&&downButton.classList.add("inactive"),4===numberOfPeaple&&upButton.classList.remove("inactive")},totalHTML:function totalHTML(){var section=document.querySelector("#check-count .total");section.innerHTML="<strong>\uCD1D ".concat(data.count.total,"\uBA85</strong>")},detailsHTML:function(){var section=document.querySelector("#check-count .details"),detailsHTML="";for(var key in data.count)if(data.count[key]&&"total"!=key){var value=data.count[key],text=state.reservation.count[key].text,textHTML="<span>".concat(text," ").concat(value,"\uBA85</span>");detailsHTML+=textHTML}section.innerHTML=detailsHTML},priceHTML:function priceHTML(){var section=document.querySelector("#check-price .mypage-desc");for(var key in data.price=0,data.count)if(data.count[key]&&"total"!=key){var calculate=state.reservation.count[key].price*+data.count[key];data.price+=calculate}var accountExp=data.price.toLocaleString();section.innerHTML="<strong>".concat(accountExp,"\uC6D0</strong>")}};function Count(wrapper){var count=Object.create(prototypeCount);return count.wrapper=document.querySelector(wrapper),count.upButton=count.wrapper.querySelector(".count-button.up"),count.downButton=count.wrapper.querySelector(".count-button.down"),count.displayCount=count.wrapper.querySelector(".button-group > p"),count.type=count.wrapper.dataset.count,count.upButton.addEventListener("click",function(){count.plus(count.displayCount,count.downButton,count.upButton,count.type),count.totalHTML(),count.detailsHTML(),count.priceHTML()}),count.downButton.addEventListener("click",function(){count.minus(count.displayCount,count.downButton,count.upButton,count.type),count.totalHTML(),count.detailsHTML(),count.priceHTML()}),count}var adultGroup=Count("li[data-count=adult]"),teenGroup=Count("li[data-count=teen]"),kidGroup=Count("li[data-count=kid]"),discountGroup=Count("li[data-count=discount]"),seatTableHead=document.querySelector("#step-seat table thead"),seatTableBody=document.querySelector("#step-seat table tbody");function populateTableHead(){var fragment=document.createDocumentFragment(),tr=document.createElement("tr"),th=document.createElement("th");tr.appendChild(th);// 나머지 15칸 생성
for(var _th,i=0;15>i;i+=1)_th=document.createElement("th"),_th.textContent=i+1,tr.appendChild(_th);fragment.appendChild(tr),seatTableHead.appendChild(fragment)}function templateSeat(){return"<input id='' class='seat-input hidden' type='checkbox'/>\n    <label for='' class='seat-label'></label>"}function populateTableBody(){for(var key in seat){// 열 생성
var fragment=document.createDocumentFragment(),tr=document.createElement("tr"),column=key,th=document.createElement("th");th.textContent=column,tr.appendChild(th);// 나머지 15칸 생성
for(var i=0;i<seat[key].length;i+=1){var checkboxId=column+"-"+(i+1),td=document.createElement("td");td.innerHTML=templateSeat(),td.querySelector("input").setAttribute("id",checkboxId),td.querySelector("label").setAttribute("for",checkboxId),tr.appendChild(td)}fragment.appendChild(tr),seatTableBody.appendChild(fragment)}}function setSeatDataInLocalStorage(){var resourceData=state.reservation.time,newObject={},test=window.localStorage.getItem("seatData");if(!test){for(var key in resourceData){newObject[key]={};for(var length=resourceData[key].timetable.length,i=0;i<length;i+=1)newObject[key][key+i]=Object.assign(seat)}window.localStorage.setItem("seatData",JSON.stringify(newObject))}}function init(){populateTableHead(),populateTableBody(),setSeatDataInLocalStorage()}init();// 좌석선택 - 선택 이벤트(데이터 변경)
var stepSeatCheckboxes=document.querySelectorAll("#step-seat .seat-input"),seatData=JSON.parse(window.localStorage.getItem("seatData")),lastOption=[];function changeSeatData(){var movieName=data.movie.name,movieTime=data.movie.time[1],seatKey=this.id.split("-")[0],seatIndex=+this.id.split("-")[1]-1,keepOptions=lastOption[0]===movieName&&lastOption[1]===movieTime;// 데이터 변경
// 화면 매칭 필요 없음 (CSS로 구현)
if(keepOptions||(data.seat=[]),this.checked)seatData[movieName][movieTime][seatKey][seatIndex]=1,data.seat.push(this.id);else{seatData[movieName][movieTime][seatKey][seatIndex]=0;var index=data.seat.indexOf(this.id);data.seat.splice(index,1)}displaySeat(),lastOption=[movieName,movieTime]}function displaySeat(){var section=document.querySelector("#check-seat .mypage-desc"),sortNumber=data.seat.sort(function(a,b){var lastNumber=a.split("-")[1],nextNumber=b.split("-")[1];return 0>lastNumber-nextNumber?-1:1}),sortText=sortNumber.sort(function(a,b){var lastText=a.split("-")[0],nextText=b.split("-")[0];return lastText<nextText?-1:1}),arrayOfseatsHTML=sortText.map(function(seat){return"<span>"+seat.split("-").join("")+"</span>"});section.innerHTML="<strong>"+arrayOfseatsHTML+"</strong>"}function limitCheck(){data.seat.length>data.count.total&&(alert("\uC120\uD0DD \uC778\uC6D0 "+data.count.total+"\uBA85\uC744 \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4."),this.checked=!1,changeSeatData.call(this))}stepSeatCheckboxes.forEach(function(checkbox){checkbox.addEventListener("change",changeSeatData.bind(checkbox)),checkbox.addEventListener("change",limitCheck.bind(checkbox))});// 선택확인 - 선택완료버튼 활성화
function activeButton(){var play=!!(0<data.count.total);if(play){var checkName=0<data.movie.name.length,checkCount=0<data.count.total,checkSeat=!(data.seat.length!==data.count.total),_finishButton=document.querySelector(".finish");checkName&&checkCount&&checkSeat&&_finishButton.classList.remove("inactive"),data.seat.length<data.count.total&&_finishButton.classList.add("inactive")}}window.addEventListener("click",function(){setTimeout(activeButton,500)});// 선택확인 - 선택 이벤트(주문번호 생성)
var finishButton=document.querySelector(".finish");function changeExpression(zeroLength,inputValue,displayLength){return(zeroLength+inputValue).slice(displayLength)}function saveDataIntoLocalStorage(key,value){window.localStorage.setItem(key,value)}function createLeftSideOfOrderNumber(){var newDate=new Date,year=newDate.getFullYear(),month=changeExpression("0",newDate.getMonth()+1,-2),date=changeExpression("0",newDate.getDate(),-2),hours=changeExpression("0",newDate.getHours(),-2),minutes=changeExpression("0",newDate.getMinutes(),-2),seconds=changeExpression("0",newDate.getSeconds(),-2);return year+month+date+hours+minutes+seconds}function createRightSideOfOrderNumber(){var newDate=new Date,lastDate=window.localStorage.getItem("lastDate")||newDate.getDate(),today=newDate.getDate(),lastOrder=+window.localStorage.getItem("lastOrder")||0;return lastDate!=today&&(lastOrder=0),lastOrder+=1,saveDataIntoLocalStorage("lastOrder",lastOrder),saveDataIntoLocalStorage("lastDate",today),changeExpression("00",lastOrder,-3)}function createOrderNumber(){var order=[];order=[createLeftSideOfOrderNumber(),createRightSideOfOrderNumber()],data.order=order.join("-")}finishButton.addEventListener("click",createOrderNumber);// 선택확인 - 선택 이벤트(선택완료)
function returnMessage(){var infoName=state.movieList[data.movie.name].name,infoTime=data.movie.time[0],infoCount=data.count.total;return"\uC601\uD654\uBA85: "+infoName+"("+infoTime+")\n\uC778\uC6D0: \uCD1D"+infoCount+"\uBA85\n\n\uACC4\uC18D \uC9C4\uD589\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"}function saveSeatData(){window.localStorage.setItem("seatData",JSON.stringify(seatData)),alert("\uC608\uB9E4\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")}function initStepTime(){var timetables=document.querySelectorAll(".movie-list > li");timetables.forEach(function(timetable){if(timetable.classList.contains("active"))for(var timelistItmes=timetable.querySelectorAll("li"),i=0;i<timelistItmes.length;i+=1)timelistItmes[i].classList.remove("inactive"),timelistItmes[i].children[0].checked=!1;timetable.classList.remove("inactive"),timetable.classList.remove("active")})}function initStepCount(){for(var key in data.count)data.count[key]=0;for(var displayCount=document.querySelectorAll(".button-group > p"),i=0;i<displayCount.length;i+=1){displayCount[i].textContent=0;var downButton=displayCount[i].previousElementSibling,upButton=displayCount[i].nextElementSibling;downButton.classList.add("inactive"),upButton.classList.remove("inactive")}}function initStepSeat(){matchSeatDataAndDomTable();// 191번째 줄에 위치
// 좌석 테이블 inactive 설정
var tableWrapper=document.querySelector("#step-seat .table-wrapper");tableWrapper.classList.add("inactive")}function initStepCheck(){for(var key in document.querySelector("#check-name .mypage-desc").innerHTML="",document.querySelector("#check-seat .mypage-desc").innerHTML="",document.querySelector("#check-count .total").innerHTML="",document.querySelector("#check-count .details").innerHTML="",document.querySelector("#check-price .mypage-desc").innerHTML="",data.movie.name="",data.movie.time=[],data.count)data.count[key]=0;data.seat=[],data.price=0}function initOrderNumber(){data.order=""}function saveUserOrderData(){var localStorageData=JSON.parse(window.localStorage.getItem("userOrderData"))||[];localStorageData.push(data),window.localStorage.setItem("userOrderData",JSON.stringify(localStorageData))}function confirmOptionAndInit(){var message=returnMessage();// 선택 옵션 확인
if(!0===confirm(message))// 확인 선택
saveSeatData();else// 취소 선택
return;saveUserOrderData(),initStepTime(),initStepCount(),initStepSeat(),initStepCheck(),initOrderNumber()}finishButton.addEventListener("click",confirmOptionAndInit);