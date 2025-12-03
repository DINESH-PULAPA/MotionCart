import { create } from 'zustand';

interface SlideshowState {
    current: number;
    isAnimating: boolean;
    totalSlides: number;
    setTotalSlides: (total: number) => void;
    setCurrent: (index: number) => void;
    setIsAnimating: (isAnimating: boolean) => void;
    next: () => void;
    prev: () => void;
}

export const useSlideshowStore = create<SlideshowState>((set, get) => ({
    current: 0,
    isAnimating: false,
    totalSlides: 0,
    setTotalSlides: (total) => set({ totalSlides: total }),
    setCurrent: (index) => set({ current: index }),
    setIsAnimating: (isAnimating) => set({ isAnimating }),
    next: () => {
        const { current, totalSlides, isAnimating } = get();
        if (isAnimating) return;
        const nextIndex = current < totalSlides - 1 ? current + 1 : 0;
        // State update logic is handled in the component via GSAP callbacks to ensure sync
        // But we can update the target index here if needed, 
        // strictly speaking the GSAP animation drives the visual state.
        // For this port, we'll let the component handle the logic to match the imperative GSAP code closely.
    },
    prev: () => {
        // Similar to next()
    },
}));
