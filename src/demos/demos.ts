import gsap from 'gsap';

export interface DemoConfig {
    id: number;
    images: string[];
    animation: (
        currentSlide: HTMLElement,
        currentInner: HTMLElement,
        upcomingSlide: HTMLElement,
        upcomingInner: HTMLElement,
        direction: number
    ) => gsap.core.Timeline;
}

const getImages = (start: number, count: number = 5) =>
    Array.from({ length: count }, (_, i) => `/img/${start + i}.jpg`);

export const demos: DemoConfig[] = [
    {
        id: 1,
        images: getImages(1),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.5,
                    ease: 'power4.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                    currentSlide.style.opacity = '0';
                    currentSlide.style.pointerEvents = 'none';
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { yPercent: -direction * 100 }, 'start')
                .to(currentInner, { yPercent: direction * 30 }, 'start')
                .fromTo(upcomingSlide, { yPercent: direction * 100 }, { yPercent: 0 }, 'start')
                .fromTo(upcomingInner, { yPercent: -direction * 30 }, { yPercent: 0 }, 'start');
        },
    },
    {
        id: 2,
        images: getImages(6),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.5,
                    ease: 'power4.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                    currentSlide.style.opacity = '0';
                    currentSlide.style.pointerEvents = 'none';
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { yPercent: -direction * 100 }, 'start')
                .to(currentInner, {
                    yPercent: direction * 30,
                    startAt: {
                        transformOrigin: direction === 1 ? '0% 100%' : '100% 0%',
                        rotation: 0
                    },
                    rotation: -direction * 10,
                    scaleY: 2.5
                }, 'start')
                .fromTo(upcomingSlide, { yPercent: direction * 100 }, { yPercent: 0 }, 'start')
                .fromTo(upcomingInner, {
                    yPercent: -direction * 30,
                    startAt: {
                        transformOrigin: direction === 1 ? '0% 0%' : '100% 100%',
                        yPercent: -direction * 30,
                        scaleY: 2.5,
                        rotation: -direction * 10
                    },
                    scaleY: 1,
                    rotation: 0
                }, { yPercent: 0, scaleY: 1, rotation: 0 }, 'start');
        },
    },
    {
        id: 3,
        images: getImages(11),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.1,
                    ease: 'power2.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { scale: 0.4 }, 'start')
                .to(currentInner, { scale: 1.5 }, 'start')
                .addLabel('middle', 'start+=0.65')
                .fromTo(upcomingSlide, { yPercent: direction * 100, scale: 1 }, { duration: 1, ease: 'expo', yPercent: 0 }, 'middle')
                .fromTo(upcomingInner, { scale: 1.5, yPercent: -direction * 30 }, { duration: 1.1, ease: 'expo', scale: 1, yPercent: 0 }, 'middle');
        },
    },
    {
        id: 4,
        images: getImages(16),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.25,
                    ease: 'power4.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { duration: 0.4, ease: 'sine', scale: 0.9, autoAlpha: 0.2 }, 'start')
                .to(currentSlide, { yPercent: -direction * 20, autoAlpha: 0 }, 'start+=0.1')
                .fromTo(upcomingSlide, { autoAlpha: 1, scale: 1, yPercent: direction * 100 }, { yPercent: 0 }, 'start+=0.1')
                .fromTo(upcomingInner, { yPercent: -direction * 50 }, { yPercent: 0 }, 'start+=0.1');
        },
    },
    {
        id: 5,
        images: getImages(21),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.1,
                    ease: 'power2.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { scale: 0.6, yPercent: -direction * 90, rotation: direction * 20, autoAlpha: 0 }, 'start')
                .fromTo(upcomingSlide, { scale: 0.8, yPercent: direction * 100, rotation: 0, autoAlpha: 1 }, { scale: 1, yPercent: 0 }, 'start+=0.1')
                .fromTo(upcomingInner, { scale: 1.1 }, { scale: 1 }, 'start+=0.1');
        },
    },
    {
        id: 6,
        images: getImages(26),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.6,
                    ease: 'power3.inOut'
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                    currentSlide.style.opacity = '0';
                    currentSlide.style.pointerEvents = 'none';
                }
            })
                .addLabel('start', 0)
                .to(currentSlide, { xPercent: -direction * 100 }, 'start')
                .to(currentInner, {
                    startAt: { transformOrigin: direction === 1 ? '100% 50%' : '0% 50%' },
                    scaleX: 4
                }, 'start')
                .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 'start')
                .fromTo(upcomingInner, {
                    transformOrigin: direction === 1 ? '0% 50%' : '100% 50%',
                    xPercent: -direction * 100,
                    scaleX: 4
                }, { xPercent: 0, scaleX: 1 }, 'start');
        },
    },
    {
        id: 7,
        images: getImages(31),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.2,
                    ease: 'expo',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { ease: 'power2', autoAlpha: 0 }, 'start')
                .fromTo(upcomingSlide, { autoAlpha: 1, scale: 0, yPercent: direction * 100 }, { scale: 1, yPercent: 0 }, 'start')
                .fromTo(upcomingInner, { scale: 2, filter: 'brightness(600%)' }, { scale: 1, filter: 'brightness(100%)' }, 'start');
        },
    },
    {
        id: 8,
        images: getImages(36),
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .fromTo(upcomingSlide, { autoAlpha: 1, scale: 0.1, xPercent: direction * 100 }, { duration: 0.7, ease: 'expo', scale: 0.4, xPercent: 0 }, 'start')
                .fromTo(upcomingInner, { filter: 'contrast(100%) saturate(100%)', transformOrigin: '100% 50%', scaleX: 4 }, { duration: 0.7, ease: 'expo', scaleX: 1 }, 'start')
                .fromTo(currentInner, { filter: 'contrast(100%) saturate(100%)' }, { duration: 0.7, ease: 'expo', filter: 'contrast(120%) saturate(140%)' }, 'start')
                .addLabel('middle', 'start+=0.6')
                .to(upcomingSlide, { duration: 1, ease: 'power4.inOut', scale: 1 }, 'middle')
                .to(currentSlide, { duration: 1, ease: 'power4.inOut', scale: 0.98, autoAlpha: 0 }, 'middle');
        },
    },
    {
        id: 9,
        images: ['/img/5.jpg', '/img/4.jpg', '/img/3.jpg', '/img/2.jpg', '/img/1.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.2,
                    ease: 'expo',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, {
                    duration: 1,
                    ease: 'power4',
                    rotation: 500,
                    scale: 0,
                    xPercent: -20,
                    onComplete: () => { gsap.set(currentSlide, { rotation: 0, scale: 1, autoAlpha: 0 }); }
                }, 'start')
                .fromTo(upcomingSlide, {
                    autoAlpha: 0,
                    scale: 1.4,
                    rotation: -90,
                    xPercent: 20,
                }, {
                    duration: 0.6,
                    ease: 'power4',
                    autoAlpha: 1,
                    scale: 1,
                    rotation: 0,
                    xPercent: 0,
                }, 'start+=0.3');
        },
    },
    {
        id: 10,
        images: ['/img/10.jpg', '/img/9.jpg', '/img/8.jpg', '/img/7.jpg', '/img/6.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: 'power3.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    upcomingSlide.style.opacity = '1';
                    upcomingSlide.style.pointerEvents = 'auto';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { xPercent: -direction * 15, yPercent: -direction * 15, autoAlpha: 0 }, 'start')
                .fromTo(upcomingSlide, { autoAlpha: 1, xPercent: direction * 100, yPercent: direction * 100 }, { xPercent: 0, yPercent: 0 }, 'start');
        },
    },
    {
        id: 11,
        images: ['/img/12.jpg', '/img/11.jpg', '/img/13.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            const deco = currentSlide.parentElement?.querySelector('.deco');
            return gsap.timeline({
                defaults: {
                    duration: 1.3,
                },
                onStart: () => {
                    // upcomingSlide.classList.add('slide--current');
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { duration: 0.4, ease: 'power2.in', yPercent: -direction * 100 }, 'start')
                .to(currentInner, { duration: 0.4, ease: 'power2.in', yPercent: direction * 75, rotation: -direction * 2 }, 'start')
                .fromTo(deco!, { yPercent: direction * 100, autoAlpha: 1 }, { duration: 0.4, ease: 'power2.in', yPercent: 0 }, 'start')
                .addLabel('middle', 'start+=0.5')
                .to(deco!, { ease: 'expo', yPercent: -direction * 100 }, 'middle')
                .fromTo(upcomingSlide, { autoAlpha: 1, yPercent: direction * 100 }, { ease: 'expo', yPercent: 0 }, 'middle')
                .fromTo(upcomingInner, { yPercent: -direction * 75, rotation: direction * 2 }, { ease: 'expo', yPercent: 0, rotation: 0 }, 'middle');
        },
    },
    {
        id: 12,
        images: ['/img/3.jpg', '/img/4.jpg', '/img/5.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            const decos = currentSlide.parentElement?.querySelectorAll('.deco');
            const tl = gsap.timeline({
                defaults: {
                    duration: 1.2,
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { duration: 0.4, ease: 'power2.in', xPercent: -direction * 100 }, 'start')
                .to(currentInner, { duration: 0.4, ease: 'power2.in', xPercent: direction * 75, rotation: -direction * 6 }, 'start')
                .fromTo(decos ? decos[0] : null, { xPercent: direction * 100, autoAlpha: 1 }, { duration: 0.4, ease: 'power2.in', xPercent: 0 }, 'start');

            if (decos) {
                [...decos].forEach((_, pos, arr) => {
                    tl.to(arr[arr.length - 1 - pos], { ease: 'power4', xPercent: -direction * 100 }, `start+=${(pos + 1) * 0.2}`);
                });
            }

            tl.addLabel('middle', '<')
                .fromTo(upcomingSlide, { autoAlpha: 1, xPercent: direction * 100 }, { ease: 'power4', xPercent: 0 }, 'middle')
                .fromTo(upcomingInner, { xPercent: -direction * 75, rotation: direction * 6 }, { ease: 'power4', xPercent: 0, rotation: 0 }, 'middle');

            return tl;
        },
    },
    {
        id: 13,
        images: ['/img/21.jpg', '/img/23.jpg', '/img/24.jpg', '/img/25.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.2,
                    ease: 'power3.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
                onComplete: () => {
                    gsap.set(upcomingSlide, { zIndex: 1 });
                    currentSlide.classList.remove('slide--current');
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, { yPercent: -direction * 100 }, 'start')
                .fromTo(upcomingSlide, { yPercent: 0, autoAlpha: 0, rotationX: 140, scale: 0.1, z: -1000 }, { autoAlpha: 1, rotationX: 0, z: 0, scale: 1 }, 'start+=0.1')
                .fromTo(upcomingInner, { scale: 1.8 }, { scale: 1 }, 'start+=0.17');
        },
    },
    {
        id: 14,
        images: ['/img/41.jpg', '/img/42.jpg', '/img/43.jpg', '/img/44.jpg', '/img/45.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            return gsap.timeline({
                defaults: {
                    duration: 1.2,
                    ease: 'power4.inOut',
                },
                onStart: () => {
                    upcomingSlide.classList.add('slide--current');
                },
                onComplete: () => {
                    currentSlide.classList.remove('slide--current');
                },
            })
                .addLabel('start', 0)
                .to(currentSlide, {
                    startAt: { transformOrigin: direction === 1 ? '0% 50%' : '100% 50%' },
                    scaleX: 0,
                    autoAlpha: 0
                }, 'start')
                .fromTo(upcomingSlide, {
                    transformOrigin: direction === 1 ? '100% 50%' : '0% 50%',
                    autoAlpha: 0,
                    scaleX: 0
                }, {
                    autoAlpha: 1,
                    scaleX: 1
                }, 'start');
        },
    },
    {
        id: 15,
        images: ['/img/46.jpg', '/img/47.jpg', '/img/48.jpg', '/img/49.jpg', '/img/50.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            const decos = currentSlide.parentElement?.querySelectorAll('.deco');
            const tl = gsap.timeline({
                defaults: {
                    duration: 0.8,
                    ease: 'power3.inOut',
                },
                onComplete: () => {
                    // Cleanup handled by App.tsx
                },
            })
                .addLabel('start', 0)
                .fromTo(decos ? decos : [], { yPercent: (pos) => (pos ? -100 : 100), autoAlpha: 1 }, { yPercent: (pos) => (pos ? -50 : 50) }, 'start')
                .to(currentSlide, { scale: 1.1, rotation: direction * 2 }, 'start')
                .addLabel('middle', '>')
                .add(() => {
                    currentSlide.classList.remove('slide--current');
                    upcomingSlide.classList.add('slide--current');
                }, 'middle')
                .to(decos ? decos : [], { duration: 1.1, ease: 'expo', yPercent: (pos) => (pos ? -100 : 100) }, 'middle')
                .fromTo(upcomingSlide, { scale: 1.1, rotation: direction * 2 }, { duration: 1.1, ease: 'expo', scale: 1, rotation: 0 }, 'middle');
            return tl;
        },
    },
    {
        id: 16,
        images: ['/img/51.jpg', '/img/52.jpg', '/img/53.jpg', '/img/54.jpg', '/img/55.jpg'],
        animation: (currentSlide, currentInner, upcomingSlide, upcomingInner, direction) => {
            const decos = currentSlide.parentElement?.querySelectorAll('.deco');
            const tl = gsap.timeline({
                defaults: {
                    duration: 0.8,
                    ease: 'power4.inOut',
                },
                onStart: () => {
                    upcomingSlide.style.opacity = '1';
                    gsap.set(upcomingSlide, { zIndex: 99 });
                },
            })
                .addLabel('start', 0);

            if (decos) {
                [...decos].forEach((_, pos, arr) => {
                    const deco = arr[arr.length - 1 - pos];
                    tl.fromTo(deco, { xPercent: (_) => (pos % 2 === 1 ? -100 : 100), autoAlpha: 1 }, {
                        xPercent: (_) => (pos % 2 === 1 ? -50 : 50),
                        onComplete: () => {
                            if (pos === arr.length - 1) {
                                currentSlide.classList.remove('slide--current');
                                upcomingSlide.classList.add('slide--current');
                            }
                        }
                    }, `start+=${Math.floor((arr.length - 1 - pos) / 2) * 0.14}`);
                    if (!pos) {
                        tl.addLabel('middle', '>');
                    }
                });
            }

            tl.to(currentSlide, { ease: 'power4.in', scale: 0.1, onComplete: () => { gsap.set(currentSlide, { scale: 1 }); } }, 'start');

            if (decos) {
                [...decos].forEach((_, pos, arr) => {
                    const deco = arr[arr.length - 1 - pos];
                    tl.to(deco, { xPercent: (_) => (pos % 2 === 1 ? -100 : 100) }, `middle+=${Math.floor(pos / 2) * 0.12}`);
                });
            }

            tl.fromTo(upcomingSlide, { scale: 0.6 }, { duration: 1.1, ease: 'expo', scale: 1 }, '>-0.8');
            return tl;
        },
    },
];
