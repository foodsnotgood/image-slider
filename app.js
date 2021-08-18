"use strict";

const images = document.querySelectorAll(".slider_image");
const left = document.querySelector(".arrow_left");
const right = document.querySelector(".arrow_right");

for (let i = 1; i <= images.length; i++) {
  images[i - 1].dataset.sliderNumber = i;
}

let currentImage;

const moveImage = function (img, leftOrRight) {
  if (leftOrRight == "right") {
    img.style.left = "-100%";
  }
  if (leftOrRight == "left") {
    img.style.left = "100%";
  }
};

const setCurrentImage = function (dataSliderNumber, leftOrRight) {
  const image = images[dataSliderNumber - 1];
  if (currentImage) moveImage(currentImage, leftOrRight);
  image.style.left = "0";
  currentImage = image;
  //   for (const image of images) {
  //     const imageNumber = getSliderNumber(image);
  //     if (imageNumber == dataSliderNumber) {
  //       if (currentImage) moveImage(currentImage, leftOrRight);
  //       image.style.left = "0";
  //       currentImage = image;
  //     }
  //   }
};

const getSliderNumber = function (image) {
  return Number(image.dataset.sliderNumber);
};

setCurrentImage(1, "right");

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
