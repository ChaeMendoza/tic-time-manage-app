import confetti from "canvas-confetti";

export const launchConfetti = () => {
    const duration = 1 * 1000;
    const end = Date.now() + duration;

    const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};
