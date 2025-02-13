import gsap from "gsap";

export const parallaxAnimation = ({
  child,
  movement = 10,
  container,
  duration = 2,
  parallaxMultiplier = 0.7,
  scale = 1,
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
      });
  });
  container.addEventListener("mouseleave", (e) => {
    resetParallax({
      container: e.currentTarget as HTMLButtonElement,
      child,
      duration,
    });
  });
};

export const parallaxIt = ({
  e,
  child,
  movement,
  container,
  duration = 2,
  ease,
  parallaxMultiplier = 0.7,
  scale = 1,
}: {
  e: MouseEvent;
  child?: HTMLElement | SVGElement;
  movement: number;
  container: HTMLElement;
  duration?: number;
  ease?: string;
  parallaxMultiplier?: number;
  scale?: number;
}) => {
  const containerPosition = {
    left: container.getBoundingClientRect().left,
    top: container.getBoundingClientRect().top,
  };

  const containerSize = {
    width: container.getBoundingClientRect().width,
    height: container.getBoundingClientRect().height,
  };

  const relX = e.clientX - containerPosition.left;
  const relY = e.clientY - containerPosition.top;

  const parallaxAnim = gsap.timeline({ id: "parallax" });

  parallaxAnim.to(container, {
    x: ((relX - containerSize.width / 2) * movement) / 100,
    y: ((relY - containerSize.height / 2) * movement) / 100,
    duration,
    scale,
    ease: ease ?? "circ.out",
  });

  child &&
    parallaxAnim.to(
      child,
      {
        x:
          ((relX - containerSize.width / 2) * movement * parallaxMultiplier) /
          100,
        y:
          ((relY - containerSize.height / 2) * movement * parallaxMultiplier) /
          100,
        duration,
        ease: ease ?? "circ.out",
      },
      "<"
    );
};

export const resetParallax = ({
  container,
  child,
  duration = 2,
}: {
  child?: HTMLElement | SVGElement;
  container: HTMLElement;
  duration?: number;
}) => {
  const resetAnim = gsap.timeline({ delay: 0 });

  resetAnim.to(container, {
    x: 0,
    y: 0,
    scale: 1,
    duration,
    ease: "expo.out",
  });

  child &&
    resetAnim.to(
      child,
      {
        x: 0,
        y: 0,
        scale: 1,
        duration,
        ease: "expo.out",
      },
      "<"
    );
};
