Element.prototype.show = function() {
  console.log(this);
  this.style.visibility = "visible";
  return this;
};

Element.prototype.hide = function() {
  console.log(this);
  this.style.visibility = "hidden";
};

const allObjs = Array.from(document.querySelectorAll(".object"));
const list = Array.from(document.querySelectorAll("li"));
const modal = document.querySelector(".congrats");

modal.hide();

let values = list.map(item => {
  item.addEventListener("objectFound", e => {
    console.log("Você encontrou:", e.target.textContent);
  });
  return item.dataset.value;
});

function ClickableObject(elem) {
  this.id = elem.getAttribute("id");
  this.secret = elem.dataset.value;
  elem.addEventListener("click", () => {
    if (values.includes(this.secret)) {
      let item = list.find(x => x.dataset.value === this.secret);
      item.classList.add("found");
      elem.classList.add("found");
      item.dispatchEvent(new Event("objectFound"));
      values = values.filter(value => value !== this.secret);
      if (!values.length) {
        modal.show();
      }
    }
  });
}

let vw = 1440;

let ulY = toVW(
  window.innerHeight - document.querySelector("ul").getBoundingClientRect().top
);

for (obj of allObjs) {
  let objW = toVW(obj.offsetWidth);
  let objH = toVW(obj.offsetHeight);
  let winW = toVW(window.innerWidth);
  let winH = toVW(window.innerHeight);
  let x = obj.dataset.x
    ? toVW(obj.dataset.x)
    : Math.floor(Math.random() * (winW - objW));
  let y = obj.dataset.y
    ? toVW(obj.dataset.y)
    : Math.floor(Math.random() * (winH - (objH + ulY)));
  obj.style.left = x + "vw";
  obj.style.top = y + "vw";
  obj.co = new ClickableObject(obj);
}

function toVW(n) {
  if (n) {
    let result = (n * 100) / vw;
    return result.toFixed(3);
  } else {
    return false;
  }
}
