const first = document.querySelector('.first');
const second = document.querySelector('.second');
const parent = document.querySelector('.wrapper');


setInterval(() => {
    first.innerHTML = Math.floor(Math.random()*100) + 1;
}, 1000);

const mutationObserver = new MutationObserver(entries => {
    console.log(entries);
    if(MutationRecord) {
        second.innerHTML = first.innerHTML;
    } else {
        return;
    }
});
   


mutationObserver.observe(parent.children[0], { childList: true})
