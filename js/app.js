// select elements
const btns = document.querySelectorAll('.btn');
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const negativeBtn = document.querySelector('#negative');
const openBtn = document.querySelector('#openBtn');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('#result');


btns.forEach(btn => {
  btn.classList.add('disable');
})

openBtn.addEventListener('click', () => {
  openBtn.classList.toggle('switch');
  operators.forEach(item => {
    item.classList.toggle('btn-blue');
    let svgSrc = item.firstChild.src;
    if (openBtn.classList.contains('switch') && item.firstChild) {
      let newSrc = String(svgSrc).replace('-cl', '');
      item.firstChild.src = newSrc;
    } else {
      let newSrc = String(svgSrc).replace('.svg', '-cl.svg');
      item.firstChild.src = newSrc;
      result.textContent = '';
    }
  });
  btns.forEach(btn => {
    btn.classList.toggle('disable');
  })
});

function writeNum(btn) {
  let number = btn.dataset.num;
  result.textContent += number;
}

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.num !== undefined) {
      writeNum(btn);
    }
  });
});

function equal() {
  if (result.textContent === '') {
    result.textContent = 'Please enter a value';
  } else {
    let value = eval(result.textContent);
    result.textContent = value;
  }
}

window.addEventListener('keyup', (e) => {
  btns.forEach(btn => {
    if (!btn.classList.contains('disable')) {
      if (e.key === btn.dataset.num) {
        writeNum(btn);
      } else if (e.key === 'Enter') {
        equal();
      }
    }
  })
  if (e.key === 'Backspace') {
    resultEdit('slice');
  }
});



equalBtn.addEventListener('click', equal);

clearBtn.addEventListener('click', () => {
  result.textContent = '';
});

backspaceBtn.addEventListener('click', () => {
  resultEdit('slice');
});

negativeBtn.addEventListener('click', () => {
  if (result.textContent.indexOf('-') < 0) {
    resultEdit('replace');
  }
});

function resultEdit(method) {
  let newResult = '';
  if (method === 'slice') {
    newResult = result.textContent.slice(0, result.textContent.length - 1);
  } else if (method === 'replace') {
    newResult = result.textContent.replace('', '-');
  }
  result.textContent = newResult;
}