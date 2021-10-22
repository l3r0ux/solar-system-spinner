const root = document.querySelector(':root');
const container = document.getElementById('background-stars');
const zoomSlider = document.getElementById('zoom-slider');
const solarSystem = document.getElementById('solar-system');
const playAnim = document.getElementById('play-button');
const pauseAnim = document.getElementById('pause-button');
const planets = document.querySelectorAll('.planet');
const planetLabels = document.querySelectorAll('#planet-names div');
const planetDetails = document.querySelectorAll('.planet-details');

const colors = ['#97e1ff', '#ffae80', '#6171ff'];
const shadows = ['#c0edff', '#ffd4bb', '#c0c1ff'];
// Default zoom
let zoom = zoomSlider.value;

makeStars(800);

root.style.setProperty('--zoom', zoom);

zoomSlider.addEventListener('input', (e) => {
    zoom = e.target.value;
    root.style.setProperty('--zoom', zoom);
})

draggable(solarSystem);

// Playback controls
playAnim.addEventListener('click', () => {
    root.style.setProperty('--playState', '');
    playAnim.classList.toggle('hide');
    pauseAnim.classList.toggle('hide');
});
pauseAnim.addEventListener('click', () => {
    root.style.setProperty('--playState', 'paused');
    playAnim.classList.toggle('hide');
    pauseAnim.classList.toggle('hide');
})

planetLabels.forEach((label, i) => {
    label.addEventListener('mouseover', () => {
        if (planets[i].id.includes('sun')) {
            planetDetails[i].classList.add('show');
            planets[i].classList.add('sun-focus');
        } else {
            planetDetails[i].classList.add('show');
            planets[i].classList.add('planet-focus');
        }
    })
    label.addEventListener('mouseout', () => {
        if (planets[i].id.includes('sun')) {
            planetDetails[i].classList.remove('show');
            planets[i].classList.remove('sun-focus');
        } else {
            planetDetails[i].classList.remove('show');
            planets[i].classList.remove('planet-focus');
        }
    })
})


function makeStars(count) {
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

function draggable(el) {
    let isMouseDown = false;

    let mouseX;
    let mouseY;

    let elementX = el.getBoundingClientRect().left;
    let elementY = el.getBoundingClientRect().top;

    el.addEventListener('mousedown', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseDown = true;
    });

    el.addEventListener('mouseup', () => {
        isMouseDown = false;
        elementX = parseInt(el.style.left) || 0;
        elementY = parseInt(el.style.top) || 0;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        // The Deltas here are the differences in location to where the mouse was moved
        let deltaX = e.clientX - mouseX;
        let deltaY = e.clientY - mouseY;
        el.style.left = elementX + deltaX + 'px';
        el.style.top = elementY + deltaY + 'px';
    });
}