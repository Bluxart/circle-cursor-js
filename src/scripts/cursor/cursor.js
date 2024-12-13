import gsap from 'gsap';
import { lerp } from '../utils/utils';

const Cursor = (() => {

    const cursorArea  = document.querySelector('.cursor');
    const cursorSmall = document.querySelector('.cursor__circle--small');
    const cursorLarge = document.querySelector('.cursor__circle--large');

    if (!cursorSmall || !cursorLarge) {
        console.error('Cursor elements not found in the DOM.');
        return null;
    }

    let smallPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let largePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateCursor = () => {

        smallPos.x = lerp(smallPos.x, mousePos.x, 0.2);
        smallPos.y = lerp(smallPos.y, mousePos.y, 0.2);

        largePos.x = lerp(largePos.x, mousePos.x, 0.1);
        largePos.y = lerp(largePos.y, mousePos.y, 0.1);

        gsap.set(cursorSmall, { x: smallPos.x, y: smallPos.y });
        gsap.set(cursorLarge, { x: largePos.x, y: largePos.y });

    };

    const handleMouseMove = (e) => {

        mousePos.x = e.clientX;
        mousePos.y = e.clientY;

    };

    const handlePointerEnter = (e) => {

        const pointerType = e.target.getAttribute('data-pointer');

        // Check the value of `data-pointer` and apply animations accordingly.
        // You can extend this logic to add more animations for different `data-pointer` values.
        if ( pointerType == 'hover' ) {

            gsap.to(cursorLarge, { scale: 2, opacity: 1, duration: 0.3 });
            gsap.to(cursorSmall, { scale: 0, opacity: 0, duration: 0.3 });

        }

    };

    const handlePointerLeave = () => {

        gsap.to(cursorLarge, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(cursorSmall, { scale: 1, opacity: 1, duration: 0.3 });

    };

    const addPointerEvents = () => {

        document.querySelectorAll('[data-pointer]').forEach((element) => {

            element.addEventListener('mouseenter', handlePointerEnter);
            element.addEventListener('mouseleave', handlePointerLeave);

        });

    };

    const removePointerEvents = () => {

        document.querySelectorAll('[data-pointer]').forEach((element) => {

            element.removeEventListener('mouseenter', handlePointerEnter);
            element.removeEventListener('mouseleave', handlePointerLeave);

        });

    };

    const init = () => {

        window.addEventListener('mousemove', handleMouseMove);
        addPointerEvents();
        gsap.ticker.add(updateCursor);

    };

    const destroy = () => {

        window.removeEventListener('mousemove', handleMouseMove);
        removePointerEvents();
        gsap.ticker.remove(updateCursor);

    };

    const disable = () => {

        destroy();
        cursorArea.classList.add('cursor-hide');

    }

    return { init, destroy, disable };

})();

export default Cursor;
