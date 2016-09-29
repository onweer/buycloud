'use script';

var $ = document.querySelector.bind(document);

var joinBtn = $('.buy-button');
var plusTime = $('.plus-time');
var minsTime = $('.minus-time');
var buyTime = $('.buy-time');

joinBtn.onclick = function (evt) {

}

plusTime.onclick = function (evt) {
  if (buyTime.value === '0') return evt.preventDefault();
  buyTime.value -= 1;
}

minsTime.onclick = function (evt) {
  buyTime.value = parseInt(buyTime.value) + 1;
}
