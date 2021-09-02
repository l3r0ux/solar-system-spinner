const container = document.getElementById('background-stars');
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