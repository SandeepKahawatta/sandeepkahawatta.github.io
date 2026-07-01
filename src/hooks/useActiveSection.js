import { useEffect, useState } from 'react';

/**
 * Scroll-spy via IntersectionObserver — no per-scroll layout reads.
 * Returns the id of the section currently in the "reading band" of the viewport.
 */
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      // Active band: from 20% below the top to 60% above the bottom of the viewport
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
