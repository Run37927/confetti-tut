'use client'

import { useRef } from "react"
import { Button } from "./ui/button"
import confetti from 'canvas-confetti'

function HomePage() {
    const audioRef = useRef(null)
    const shootRealisticConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { x: 0.8, y: 0.2 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }

    const shootFireworks = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    const shootCash = () => {
        const scalar = 2;
        const cash = confetti.shapeFromText({ text: '💸', scalar });
        const money = confetti.shapeFromText({ text: '💰', scalar })

        const defaults = {
            spread: 360,
            ticks: 60,
            gravity: 0,
            decay: 0.96,
            startVelocity: 20,
            shapes: [cash, money],
            scalar
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 30
            });

            confetti({
                ...defaults,
                particleCount: 5,
                flat: true
            });

            confetti({
                ...defaults,
                particleCount: 15,
                scalar: scalar / 2,
                shapes: ['circle']
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    }
    const handleSubmit = () => {
        // your other functions here

        shootCash();
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("audio play failed:", e))
        }
    }
    return (
        <div className="flex items-center justify-center">
            <Button
                size='lg'
                onClick={() => handleSubmit()}
                className='text-3xl py-8 px-16 font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600'
            >
                Shoot Confetti
            </Button>

            <audio ref={audioRef} src='/cashsound.mp3' />
        </div>
    )
}

export default HomePage