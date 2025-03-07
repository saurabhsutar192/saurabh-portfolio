import gsap from "gsap";

export const parallaxAnimation = ({
  child,
  movement = 10,
  container,
  duration = 1,
  parallaxMultiplier = 0.7,
  scale = 1,
  ease = "circ.out",
}: {
  child?: HTMLElement | SVGElement;
  movement?: number;
  container: HTMLElement;
  duration?: number;
  ease?: string;
  parallaxMultiplier?: number;
  scale?: number;
}) => {
  container.addEventListener("mousemove", (e) => {
    e.currentTarget &&
      parallaxIt({
        e: e,
        container: e.currentTarget as HTMLElement,
        child,
        movement,
        parallaxMultiplier,
        scale,
        duration,
        ease,
      });
  });
  container.addEventListener("mouseleave", (e) => {
    resetParallax({
      container: e.currentTarget as HTMLButtonElement,
      child,
      duration,
      ease,
    });
  });
};

const parallaxIt = ({
  e,
  child,
  movement,
  container,
  duration,
  ease,
  parallaxMultiplier,
  scale,
}: {
  e: MouseEvent;
  child?: HTMLElement | SVGElement;
  movement: number;
  container: HTMLElement;
  duration: number;
  ease: string;
  parallaxMultiplier: number;
  scale: number;
}) => {
  const { left, top, width, height } = container.getBoundingClientRect();

  const movementX = ((e.clientX - left - width / 2) * movement) / 100;
  const movementY = ((e.clientY - top - height / 2) * movement) / 100;

  const parallaxAnim = gsap.timeline();

  parallaxAnim.to(container, {
    x: movementX,
    y: movementY,
    duration,
    scale,
    ease: ease,
  });

  child &&
    parallaxAnim.to(
      child,
      {
        x: movementX * parallaxMultiplier,
        y: movementY * parallaxMultiplier,
        duration,
        ease: ease,
      },
      "<"
    );
};

const resetParallax = ({
  container,
  child,
  duration,
  ease,
}: {
  child?: HTMLElement | SVGElement;
  container: HTMLElement;
  duration: number;
  ease: string;
}) => {
  const resetAnim = gsap.timeline();

  resetAnim.to(container, {
    x: 0,
    y: 0,
    scale: 1,
    duration,
    ease,
  });

  child &&
    resetAnim.to(
      child,
      {
        x: 0,
        y: 0,
        scale: 1,
        duration,
        ease,
      },
      "<"
    );
};
