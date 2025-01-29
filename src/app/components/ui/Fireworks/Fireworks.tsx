"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Icon } from "@/app/_ui";

const Fireworks = ({}) => {
  useEffect(() => {
    const count = 100;
    const defaults = {
      origin: { y: 0.3 },
    };

    function fire(particleRatio: number, opts: confetti.Options | undefined) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 45,
      gravity: 2,
    });
    fire(0.2, {
      spread: 60,
      gravity: 1.7,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      gravity: 1.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      gravity: 1.9,
    });
    fire(0.1, {
      spread: 10,
      startVelocity: 45,
      gravity: 2,
    });
  }, []);

  return (
    <Icon
      src={"/icon/common/firecracker.svg"}
      alt={"email icon"}
      width={90}
      height={120}
      className=""
    />
  );
};

export default Fireworks;
