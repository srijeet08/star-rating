/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  // write logic to create star rating utility.
  this.element = document.querySelector(el);
  this.count = count;
  this.callback = callback;

  this.active = -1;

  this.init();
  this.bindEvents();
}

Star.prototype.init = function () {
  this.fragment = document.createDocumentFragment();

  for (let i = 0; i < this.count; i++) {
    const iElem = document.createElement("i");
    iElem.classList.add("fa");
    iElem.classList.add("fa-star-o");
    iElem.dataset["ratingVal"] = i;

    this.fragment.appendChild(iElem);
  }
  this.element.appendChild(this.fragment);
};

Star.prototype.bindEvents = function () {
  this.element.addEventListener("click", this.clickHandler.bind(this));
  this.element.addEventListener("mouseover", this.mouseOverHandler.bind(this));
  this.element.addEventListener(
    "mouseleave",
    this.mouseLeaveHandler.bind(this)
  );
};

Star.prototype.fillStar = function (activeVal) {
  for (let i = 0; i < this.count; i++) {
    if (i <= activeVal) {
      this.element.children[i].classList.add("fa-star");
      this.element.children[i].classList.remove("fa-star-o");
    } else {
      this.element.children[i].classList.remove("fa-star");
      this.element.children[i].classList.add("fa-star-o");
    }
  }
};

Star.prototype.mouseOverHandler = function (e) {
  const currRatingVal = e.target.dataset["ratingVal"];
  this.fillStar(currRatingVal);
};

Star.prototype.mouseLeaveHandler = function (e) {
  this.fillStar(this.active);
};

Star.prototype.clickHandler = function (e) {
  const currRatingVal = e.target.dataset["ratingVal"];
  this.active = currRatingVal;
  this.callback(this.active);
};
