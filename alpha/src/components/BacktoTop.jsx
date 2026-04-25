import { useState, useEffect } from 'react';

function BackToTop() {
     const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

   if (!visible) return null;

return (
    <button className="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      ↑
    </button>
  );
}

export default BackToTop;