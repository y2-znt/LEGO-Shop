"use client";

import { useEffect, useState } from "react";

import { useCartActions } from "@/features/cart/hooks/useCartActions";

import PageState from "@/components/shared/PageState";
import Title from "@/components/shared/Title";
import { Confetti } from "@/components/ui/confetti";

export default function SuccessView() {
  const { clearOnSuccess } = useCartActions();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    clearOnSuccess();
    setShowConfetti(true);
  }, []);

  return (
    <div>
      <Title text="Payment Successful!" />
      <PageState
        title="Thank you for your purchase!"
        imagePath="/assets/success-page.png"
      >
        {showConfetti && (
          <Confetti className="pointer-events-none absolute top-0 left-0 z-0 size-full" />
        )}
      </PageState>
    </div>
  );
}
