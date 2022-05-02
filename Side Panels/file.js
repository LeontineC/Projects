const button = document.querySelector('.button');
const panels = document.querySelectorAll('.panel');
const panelOne = document.querySelector('.panel-one');
const panelTwo = document.querySelector('.panel-two');
const panelThree = document.querySelector('.panel-three');


descend = () => {
    panels.forEach(item => {
        item.classList.add('descend');
    })
};

handleWiden = (e) => {
    let item = e.target.closest('.panel');
    console.log(item);
    item.classList.toggle('widen');
    let letters = item.querySelector('h2');
    letters.classList.toggle('horizontal');
    
};

handleButton = (e) => {
    panels.forEach(panel => {
        panel.classList.remove('widen');
        let letters = panel.querySelector('h2');
        letters.classList.remove('horizontal');
    })
};



setTimeout(descend, 1000);
panels.forEach(item => item.addEventListener('click', handleWiden));
button.addEventListener('click', handleButton);
