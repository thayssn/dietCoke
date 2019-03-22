const allObjs = Array.from(document.querySelectorAll('.object'));
const list = Array.from(document.querySelectorAll('li'));
let values = [];

for(item of list) {
  values.push(item.dataset.value)
}
console.log(allObjs)
console.log(list)
console.log(values)

function ClickableObject (elem) {
  this.id = elem.getAttribute('id');
  this.secret = '';
  switch(this.id){
    case 'OBJ1':
      this.secret = '1'
      break;
    case 'OBJ2':
      this.secret = '2'
      break;
    case 'OBJ3':
      this.secret = '3'
      break;
  }
  elem.addEventListener('click', () => {
    if(values.includes(this.secret)){
      let item = list.find( x => x.dataset.value === this.secret);
      item.classList.add('found');
      elem.classList.add('found')
      window.dispatchEvent(new Event('objectFound'))
    }
  });
}

for(obj of allObjs){
  let ob = new ClickableObject(obj);
}

window.addEventListener('objectFound', () => {
  console.log('Achou um negócio aqui ó!')
})