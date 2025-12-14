// Timeline data and initialization (adapted from UHack)
// Minimal helpers (debounce & throttle) to avoid depending on other scripts
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const timeline = [
  {
    date: "6th November 2025",
    title: "Registration Opens",
    description:
      "Read guidelines and register your team now for U-HACK 4.0. Choose one problem statement and create a unique presentation showcasing your vision and strategy to build solution.",
  },
  {
    date: "5th January 2026",
    title: "Registration Closes",
    description:
      "Final deadline to register your team for U-HACK 4.0. Ensure all team members are enrolled and your problem statement is selected.",
  },
  {
    date: "10th January 2026",
    title: "PPT Screening & Idea Evaluation",
    description:
      "Phase 1: Idea & PPT Submission Round – Screening of concepts and innovation potential. All submitted presentations will be evaluated for creativity and feasibility.",
  },
  {
    date: "27th January 2026",
    title: "Finalists Announcement for Grand Finale",
    description:
      "Following the evaluation rounds, selected teams with distinctive presentations will earn their spot in the Grand Finale at UCER campus.",
  },
  {
    date: "27th – 28th February 2026",
    title: "Grand Finale (On-Campus)",
    description:
      "Phase 2: Working model Development & Implementation Round – On-spot hackathon to develop the working model. Teams will craft their innovative solutions in two days and present them for final evaluation by judges at UCER campus.",
  },
];

function initTimeline() {
  const stepsContainer = document.getElementById("timelineSteps");
  if (!stepsContainer) return;

  timeline.forEach((item, index) => {
    const isLeft = index % 2 === 0;
    const stepDiv = document.createElement("div");
    stepDiv.className = `timeline-step step-${index + 1} ${
      isLeft ? "step-left" : "step-right"
    }`;
    stepDiv.setAttribute("data-step", index);

    stepDiv.innerHTML = `
      <div class="step-number-wrapper">
        <div class="step-number">${index + 1}</div>
      </div>
      <div class="step-content">
        <h3 class="step-title">${item.title}</h3>
        <div class="step-duration">Duration - ${item.date}</div>
        <p class="step-description">${item.description}</p>
      </div>
      <div class="step-connector"></div>
    `;

    stepsContainer.appendChild(stepDiv);
  });

  initJourneyPath();
}

function initJourneyPath() {
  const timelineSection = document.querySelector(".timeline-journey-section");
  const timelineSteps = document.querySelectorAll("[data-step]");
  const activePath = document.getElementById("active-journey-path");
  const journeyIndicator = document.getElementById("journey-indicator");

  if (!timelineSection || !activePath || !journeyIndicator) return;

  const pathLength = activePath.getTotalLength();
  activePath.style.strokeDasharray = `${pathLength}`;
  activePath.style.strokeDashoffset = `${pathLength}`;

  let rafId = null;

  function handleScroll() {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = 0;
      const startTrigger = windowHeight * 0.6;
      const endTrigger = windowHeight * 0.4;

      if (rect.top < startTrigger && rect.bottom > endTrigger) {
        const scrolledSinceStart = startTrigger - rect.top;
        const totalScrollable =
          timelineSection.offsetHeight + startTrigger - endTrigger;
        progress = Math.max(
          0,
          Math.min(scrolledSinceStart / totalScrollable, 1),
        );
      } else if (rect.bottom <= endTrigger) {
        progress = 1;
      }

      const drawLength = pathLength * progress;
      activePath.style.strokeDashoffset = pathLength - drawLength;

      if (progress > 0 && drawLength > 0) {
        const point = activePath.getPointAtLength(drawLength);
        const svg = document.querySelector(".journey-path-svg");
        const svgRect = svg.getBoundingClientRect();
        const wrapper = document.querySelector(".timeline-journey-wrapper");
        const wrapperRect = wrapper.getBoundingClientRect();

        const viewBoxWidth = 1200;
        const viewBoxHeight = 2500;
        const scale = Math.min(
          svgRect.width / viewBoxWidth,
          svgRect.height / viewBoxHeight,
        );
        const contentWidth = viewBoxWidth * scale;
        const contentHeight = viewBoxHeight * scale;
        const offsetX = (svgRect.width - contentWidth) / 2;
        const offsetY = (svgRect.height - contentHeight) / 2;

        const x = svgRect.left - wrapperRect.left + offsetX + point.x * scale;
        const y = svgRect.top - wrapperRect.top + offsetY + point.y * scale;

        journeyIndicator.style.transform = `translate(${x - 8}px, ${y - 8}px)`;
        journeyIndicator.style.opacity = "1";
      } else {
        journeyIndicator.style.opacity = "0";
      }
    });
  }

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("step-visible");
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -20% 0px" },
  );

  timelineSteps.forEach((step) => stepObserver.observe(step));

  const throttledScroll = throttle(handleScroll, 16);
  window.addEventListener("scroll", throttledScroll, { passive: true });
  window.addEventListener("resize", debounce(handleScroll, 150), {
    passive: true,
  });
  handleScroll();
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    initTimeline();
  } catch (e) {
    console.error("Timeline init failed", e);
  }
});
