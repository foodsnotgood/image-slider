"use strict";

const images = document.querySelectorAll(".slider_image");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const indicatorsList = document.querySelector("#indicators");
let currentImage;
let indicators;

for (let i = 1; i <= images.length; i++) {
  images[i - 1].dataset.sliderNumber = i;
}

const moveImage = function (img, newImg, leftOrRight) {
  if (leftOrRight == "right") {
    img.style.animation = "rightOut 1s";
    img.style.left = "-100%";
    newImg.style.animation = "leftIn 1s";
    newImg.style.left = "0";
  }
  if (leftOrRight == "left") {
    img.style.animation = "leftOut 1s";
    img.style.left = "100%";
    newImg.style.animation = "rightIn 1s";
    newImg.style.left = "0";
  }
};

const initializeSlider = function () {
  const img = images[0];
  img.style.left = "1%";
  currentImage = images[0];

  for (let i = 1; i < images.length; i++) {
    images[i].style.left = "100%";
  }

  for (const image of images) {
    indicatorsList.innerHTML += "<li class='ind'></li>";
  }

  indicators = document.querySelectorAll(".ind");

  for (let i = 0; i < indicators.length; i++) {
    indicators[i].dataset.sliderNumber = `${i + 1}`;
  }
};

const setCurrentImage = function (dataSliderNumber, leftOrRight) {
  const newImage = images[dataSliderNumber - 1];
  if (currentImage) {
    moveImage(currentImage, newImage, leftOrRight);
    const indicator = getIndicator(currentImage);
    indicator.classList.remove("indicator_active");
  }
  currentImage = newImage;
  const indicator = getIndicator(currentImage);
  indicator.classList.add("indicator_active");
};

const getIndicator = function (img) {
  return indicators[img.dataset.sliderNumber - 1];
};

const getSliderNumber = function (image) {
  return Number(image.dataset.sliderNumber);
};

left.addEventListener("click", function () {
  if (getSliderNumber(currentImage) > 1) {
    setCurrentImage(getSliderNumber(currentImage) - 1, "left");
  }
});

right.addEventListener("click", function () {
  if (getSliderNumber(currentImage) < images.length) {
    setCurrentImage(getSliderNumber(currentImage) + 1, "right");
  }
});

initializeSlider();
