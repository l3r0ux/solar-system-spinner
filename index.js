const container = document.getElementById('background-stars');
const zoomSlider = document.getElementById('zoom-slider');
const root = document.querySelector(':root');

const colors = ['#97e1ff', '#ffae80', '#6171ff'];
const shadows = ['#c0edff', '#ffd4bb', '#c0c1ff'];

const makeStars = (count) => {
    for (let i = 0; i < count; i++) {
        // Generate random top position, select correct colors and randomize size for star
        const randSelectedColor = Math.floor(Math.random() * colors.length);
        const randVerticalPos = Math.random() * container.offsetHeight + container.offsetTop;
        const randSize = Math.floor(Math.random() * (3 - 1) + 1)

        let horizontalPos = Math.random() * container.offsetWidth + container.offsetLeft;

        // Make star
        const star = document.createElement('span');
        star.style.width = `${randSize}px`;
        star.style.height = `${randSize}px`;
        star.style.backgroundColor = `${colors[randSelectedColor]}`;
        star.style.boxShadow = `0 0 10px ${shadows[randSelectedColor]}`;
        star.style.top = `${randVerticalPos}px`;
        star.style.left = `${horizontalPos}px`;
        star.classList.add('star');
        container.append(star)
    }
}

makeStars(1000);

// Default zoom
let zoom = zoomSlider.value;

root.style.setProperty('--zoom', zoom);

zoomSlider.addEventListener('input', (e) => {
    zoom = e.target.value;
    root.style.setProperty('--zoom', zoom);
})

const solarSystem = document.getElementById('solar-system')
draggable(solarSystem);

function draggable(el) {
    let isMouseDown = false;

    let mouseX;
    let mouseY;

    let elementX = el.getBoundingClientRect().left;
    let elementY = el.getBoundingClientRect().top;

    el.addEventListener('mousedown', onMouseDown);

    function onMouseDown(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseDown = true;

        // set all z-indeces to 0
        document.querySelectorAll('.todo-list').forEach((list) => {
            list.style.zIndex = 0;
        })
        // and put the clicked on to 1 to make it stand out above others
        this.style.zIndex++
    }

    el.addEventListener('mouseup', onMouseUp);

    function onMouseUp() {
        isMouseDown = false;
        elementX = parseInt(el.style.left) || 0;
        elementY = parseInt(el.style.top) || 0;
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseMove(e) {
        if (!isMouseDown) return;
        let deltaX = e.clientX - mouseX;
        let deltaY = e.clientY - mouseY;
        el.style.left = elementX + deltaX + 'px';
        el.style.top = elementY + deltaY + 'px';
    }
}