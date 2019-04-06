const allObjs = Array.from(document.querySelectorAll('.object'));
const list = Array.from(document.querySelectorAll('li'));
let values = [];

for(item of list) {
  values.push(item.dataset.value)
}

function ClickableObject (elem) {
  this.id = elem.getAttribute('id');
  this.secret = elem.dataset.value;
  elem.addEventListener('click', () => {
    if(values.includes(this.secret)){
      let item = list.find( x => x.dataset.value === this.secret);
      item.classList.add('found');
      elem.classList.add('found')
      window.dispatchEvent(new Event('objectFound'))
    }
  });
}

let vw = Math.max(window.innerWidth, window.innerHeight);

let ulY = toVW(window.innerHeight - document.querySelector('ul').getBoundingClientRect().top);
for(obj of allObjs){
  let objW =toVW(obj.offsetWidth);
  let objH = toVW(obj.offsetHeight);
  let winW = toVW(window.innerWidth);
  let winH = toVW(window.innerHeight);
  console.log(winW, winH)
  let objX = toVW(obj.dataset.x);
  let objY = toVW(obj.dataset.y);
  let x = Math.floor(Math.random() * (winW - objW));
  let y =  Math.floor(Math.random() * (winH - ( objH + ulY)));
  obj.style.left = (objX || x) + 'vw';
  obj.style.top = (objY || y) + 'vw';
  obj.co = new ClickableObject(obj);
}

window.addEventListener('objectFound', () => {
  console.log('Achou um negócio aqui ó!')
})

function toVW(n){
  if(n){
    return parseInt(((n * 100) / vw).toFixed(2));
  }else{
    return false
  }
}