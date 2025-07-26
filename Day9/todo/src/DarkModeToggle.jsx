import { useEffect, useState } from 'react';

function getInitialMode() {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function DarkModeToggle() {
    const [dark, setDark] = useState(getInitialMode);

    useEffect(() => {
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('darkMode', dark);
    }, [dark]);

    return (
        <button
            className="darkmode-toggle"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDark(d => !d)}
        >
            {dark ? '🌙' : '🌞'}
        </button>
    );
} 