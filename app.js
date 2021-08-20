"use strict";

const images = [...document.querySelectorAll(".slider_image")];
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const indicatorsList = document.querySelector("#indicators");
let currentImage;
let indicators;

for (let i = 1; i <= images.length; i++) {
  images[i - 1].dataset.sliderNumber = i;
}

const initializeSlider = function () {
  currentImage = images[0];
  currentImage.style.left = "0";

  for (let i = 1; i < images.length; i++) {
    images[i].style.left = "-100%";
  }

  for (const image of images) {
    indicatorsList.innerHTML += "<li class='ind'></li>";
  }

  indicators = [...document.querySelectorAll(".ind")];

  for (let i = 0; i < indicators.length; i++) {
    indicators[i].dataset.sliderNumber = `${i + 1}`;
  }

  toggleIndicator(indicators[0]);
};

const moveImage = function (cImg, newImg, leftOrRight) {
  if (leftOrRight == "right") {
    cImg.style.animation = "rightOut 1s";
    cImg.style.left = "-100%";
    newImg.style.animation = "leftIn 1s";
    newImg.style.left = "0";
  }
  if (leftOrRight == "left") {
    cImg.style.animation = "leftOut 1s";
    cImg.style.left = "100%";
    newImg.style.animation = "rightIn 1s";
    newImg.style.left = "0";
  }
};

const setCurrentImage = function (dataSliderNumber) {
  const newImage = images[dataSliderNumber - 1];
  const leftOrRight =
    newImage.dataset.sliderNumber < currentImage.dataset.sliderNumber
      ? "left"
      : "right";
  if (currentImage) {
    moveImage(currentImage, newImage, leftOrRight);
    toggleIndicator(getIndicator(currentImage));
  }
  currentImage = newImage;
  toggleIndicator(getIndicator(currentImage));
};

const toggleIndicator = function (ind) {
  ind.classList.toggle("indicator_active");
};

const getIndicator = function (img) {
  return indicators.find((i) => getSliderNumber(i) === getSliderNumber(img));
};

const getSliderNumber = function (i) {
  return Number(i.dataset.sliderNumber);
};

left.addEventListener("click", function () {
  if (getSliderNumber(currentImage) > 1) {
    setCurrentImage(getSliderNumber(currentImage) - 1);
  }
});

right.addEventListener("click", function () {
  const currentNumber = getSliderNumber(currentImage);
  if (currentNumber < images.length) {
    setCurrentImage(currentNumber + 1);
  }
});

initializeSlider();
