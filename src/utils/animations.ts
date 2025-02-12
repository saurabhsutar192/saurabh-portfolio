import gsap from "gsap";

export const parallaxIt = ({
  e,
  child,
  movement,
  container,
  duration = 1,
  ease,
  parallaxMultiplier = 0.7,
}: {
  e: MouseEvent;
  child?: HTMLElement;
  movement: number;
  container: HTMLElement;
  duration?: number;
  ease?: string;
  parallaxMultiplier?: number;
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

  const parallaxAnim = gsap.timeline();

  parallaxAnim.to(container, {
    x: ((relX - containerSize.width / 2) * movement) / 100,
    y: ((relY - containerSize.height / 2) * movement) / 100,
    duration,
    ease: ease ?? "Power2.easeOut",
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
        ease: ease ?? "Power2.easeOut",
      },
      "<"
    );
};

export const resetParallax = (container: HTMLElement, child?: HTMLElement) => {
  const resetAnim = gsap.timeline({ delay: 0 });

  resetAnim.to(container, {
    x: 0,
    y: 0,
    duration: 1,
  });

  child &&
    resetAnim.to(
      child,
      {
        x: 0,
        y: 0,
        duration: 1,
      },
      "<"
    );
};
