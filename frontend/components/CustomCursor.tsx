'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Detect touch devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            // Dot snaps instantly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Detect hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsHovering(!!isInteractive);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleMouseOver);

        // Ring trails with lerp using rAF
        let animFrame: number;
        const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

        const animate = () => {
            ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.18);
            ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.18);

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
            }

            animFrame = requestAnimationFrame(animate);
        };

        animFrame = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animFrame);
        };
    }, [isVisible]);

    if (isTouch) return null;

    return (
        <>
            {/* Dot — snaps instantly */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#fff',
                    mixBlendMode: 'difference',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s',
                }}
            />
            {/* Ring — trails with lerp */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: isHovering
                        ? '2px solid rgba(168, 85, 247, 0.8)'
                        : '1.5px solid rgba(255, 255, 255, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.3s, height 0.3s, border 0.3s, opacity 0.3s',
                    ...(isHovering
                        ? {
                            width: 56,
                            height: 56,
                            marginLeft: -10,
                            marginTop: -10,
                        }
                        : {}),
                }}
            />
        </>
    );
}
