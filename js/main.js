'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var LOCATION_MIN_X = 0;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_X = 1200;
var LOCATION_MAX_Y = 630;
var offerType = ['palace', 'flat', 'house', 'bungalo'];

var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

// Функции генерации случайных данных
var getRandomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomType = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Создаем массив для генерации 8 объявлений
var getApartmentList = function () {
  var apartmentList = [];
  for (var i = 0; i <= 8; i++) {
    apartmentList[i] = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        type: getRandomType(offerType)
      },
      location: {
        x: getRandomLocation(LOCATION_MIN_X, LOCATION_MAX_X),
        y: getRandomLocation(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
    };
  }
  return apartmentList;
};

var advertisement = getApartmentList();
var similarApartmentTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Создание DOM-элементов на основе JS-объекта
var getPinStyle = function (apartment) {
  var pin = similarApartmentTemplate.cloneNode(true);
  var pinImage = document.querySelector('#pin').content.querySelector('img');

  pin.style.top = apartment.location.y - HEIGHT_PIN + 'px';
  pin.style.left = apartment.location.x - WIDTH_PIN + 'px';
  pinImage.src = apartment.author.avatar;
  pinImage.alt = 'здесь будет загловок';

  return pin;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
// Добавляем пины на карту
var addPinMap = function () {
  for (var i = 0; i < advertisement.length; i++) {
    fragment.appendChild(getPinStyle(advertisement[i]));
  }
  mapPins.appendChild(fragment);
};

addPinMap();

