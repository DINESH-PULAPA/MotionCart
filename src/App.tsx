import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import clsx from 'clsx';
import { useSlideshowStore } from './store/useSlideshowStore';
import { demos } from './demos/demos';

gsap.registerPlugin(Observer);

function Slideshow() {
  const [currentDemoId, setCurrentDemoId] = useState(1);
  const demoConfig = demos.find(d => d.id === currentDemoId) || demos[0];
  const slidesData = demoConfig.images.map((img, i) => ({ id: i + 1, img }));

  const { current, isAnimating, setIsAnimating, setCurrent } = useSlideshowStore();
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading] = useState(false);

  // Reset current slide when demo changes
  useEffect(() => {
    setCurrent(0);
    setIsAnimating(false);
  }, [currentDemoId, setCurrent, setIsAnimating]);

  const navigate = (direction: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const totalSlides = slidesData.length;
    const previous = current;
    let nextIndex = current;

    if (direction === 1) {
      nextIndex = current < totalSlides - 1 ? current + 1 : 0;
    } else {
      nextIndex = current > 0 ? current - 1 : totalSlides - 1;
    }

    const currentSlide = slideRefs.current[previous];
    const currentInner = innerRefs.current[previous];
    const upcomingSlide = slideRefs.current[nextIndex];
    const upcomingInner = innerRefs.current[nextIndex];

    if (!currentSlide || !currentInner || !upcomingSlide || !upcomingInner) {
      setIsAnimating(false);
      return;
    }

    const timeline = demoConfig.animation(
      currentSlide,
      currentInner,
      upcomingSlide,
      upcomingInner,
      direction
    );

    const originalOnComplete = timeline.eventCallback("onComplete");
    timeline.eventCallback("onComplete", () => {
      if (originalOnComplete) originalOnComplete();

      // Ensure cleanup happens
      currentSlide.classList.remove('slide--current');
      currentSlide.style.opacity = '0';
      currentSlide.style.pointerEvents = 'none';

      setIsAnimating(false);
      setCurrent(nextIndex);
    });
  };

  // Reset animation state on mount to prevent stuck state
  useEffect(() => {
    setIsAnimating(false);
  }, [setIsAnimating]);

  useEffect(() => {
    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      onDown: () => navigate(-1),
      onUp: () => navigate(1),
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true
    });

    return () => {
      observer.kill();
    };
  }, [current, isAnimating, demoConfig]);



  return (
    <div className={clsx("w-full h-screen overflow-hidden text-text font-anonymous-pro", isLoading && "loading")}>
      <main className="grid w-full h-screen
        grid-cols-[auto_1fr]
        grid-rows-[auto_auto_auto_1fr]
        [grid-template-areas:'title_title'_'prev_back'_'demos_demos'_'nav_nav']
        desktop:grid-cols-[auto_auto_auto_1fr]
        desktop:grid-rows-[auto_auto]
        desktop:[grid-template-areas:'title_back_prev_demos'_'._._._nav']
        p-8 gap-4
        desktop:p-8
        desktop:gap-8
        desktop:content-between"
      >


        <div className="frame fixed inset-0 w-full h-full p-8 grid z-50 pointer-events-none gap-4
          grid-cols-[auto_1fr]
          grid-rows-[auto_auto_auto_1fr]
          [grid-template-areas:'title_title'_'prev_back'_'demos_demos'_'nav_nav']
          desktop:grid-cols-[auto_auto_auto_1fr]
          desktop:grid-rows-[auto_auto]
          desktop:[grid-template-areas:'title_back_prev_demos'_'._._._nav']
          desktop:gap-8
          desktop:content-between
          items-start"
        >
          <div className="frame__title flex items-end font-normal [grid-area:title]">
            <h1
              className="frame__title-main text-inherit m-0 font-inherit text-base font-normal"
              style={{ lineHeight: '17px' }}
            >
              Slideshow <strong className="font-bold">Animations</strong>
            </h1>
          </div>
          <a href="https://tympanus.net/codrops/?p=73708" className="frame__back pointer-events-auto text-link hover:text-link-hover [grid-area:back]" style={{ lineHeight: '17px' }}>Article</a>
          <a href="http://tympanus.net/Development/GridItemHoverEffect/" className="frame__prev pointer-events-auto text-link hover:text-link-hover [grid-area:prev]" style={{ lineHeight: '17px' }}>Previous demo</a>
          <nav className="frame__demos pointer-events-auto grid grid-cols-8 gap-x-4 gap-y-2 [grid-area:demos]
            desktop:justify-self-end desktop:justify-end"
          >
            <span className="col-span-8 desktop:text-right" style={{ lineHeight: '17px' }}>Variations</span>
            {Array.from({ length: 16 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentDemoId(i + 1)}
                className={clsx(
                  "frame__demo font-anonymous-pro text-base no-underline opacity-50 hover:opacity-100 desktop:text-right bg-transparent border-none cursor-pointer p-0",
                  (i + 1) === currentDemoId && "frame__demo--current font-bold opacity-100 text-link-hover"
                )}
                style={{ lineHeight: '17px' }}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </nav>
          <nav className="slides-nav flex gap-2 self-end items-center pointer-events-auto [grid-area:nav] desktop:justify-self-end">
            <span className="mr-8">scroll / drag</span>
            <button
              onClick={() => navigate(-1)}
              className="slides-nav__item slides-nav__item--prev w-[60px] h-[60px] rounded-full bg-white text-black grid place-items-center hover:bg-gray-300 transition-colors border-0 cursor-pointer text-[13.33px]"
              style={{ fontFamily: 'Arial', lineHeight: 'normal' }}
            >
              &larr;
            </button>
            <button
              onClick={() => navigate(1)}
              className="slides-nav__item slides-nav__item--next w-[60px] h-[60px] rounded-full bg-white text-black grid place-items-center hover:bg-gray-300 transition-colors border-0 cursor-pointer text-[13.33px]"
              style={{ fontFamily: 'Arial', lineHeight: 'normal' }}
            >
              &rarr;
            </button>
          </nav>
        </div>

        <div className="slides fixed inset-0 w-full h-full overflow-hidden grid place-items-center z-0" ref={slidesRef}>
          {slidesData.map((slide, index) => (
            <div
              key={`${currentDemoId}-${slide.id}`}
              ref={(el) => { slideRefs.current[index] = el; }}
              className={clsx(
                "slide w-full h-full absolute top-0 left-0 overflow-hidden grid place-items-center will-change-[transform,opacity]",
                index === current ? "slide--current opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}
            >
              <div
                ref={(el) => { innerRefs.current[index] = el; }}
                className="slide__img w-full h-full bg-cover bg-center bg-no-repeat will-change-[transform,opacity,filter]"
                style={{ backgroundImage: `url(${slide.img})` }}
              ></div>
            </div>
          ))}
          {currentDemoId === 11 && <div className="deco"></div>}
          {currentDemoId === 12 && (
            <>
              <div className="deco deco--1"></div>
              <div className="deco deco--2"></div>
              <div className="deco deco--3"></div>
            </>
          )}
          {currentDemoId === 15 && (
            <>
              <div className="deco deco--4"></div>
              <div className="deco deco--4"></div>
            </>
          )}
          {currentDemoId === 16 && (
            <>
              <div className="deco deco--5"></div>
              <div className="deco deco--5"></div>
              <div className="deco deco--6"></div>
              <div className="deco deco--6"></div>
              <div className="deco deco--7"></div>
              <div className="deco deco--7"></div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="*" element={<Slideshow />} />
    </Routes>
  );
}

export default App;
