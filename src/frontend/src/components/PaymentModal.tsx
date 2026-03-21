import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [payClicked, setPayClicked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = () => {
    window.location.href =
      "upi://pay?pa=8789829461-4@ybl&pn=Bloom&am=29&cu=INR";
    setPayClicked(true);
  };

  const handleCompleted = () => {
    localStorage.setItem("premiumUnlocked", "true");
    setUnlocked(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(60,30,20,0.45)", backdropFilter: "blur(6px)" }}
      data-ocid="payment.modal"
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-8 shadow-2xl"
        style={{
          background: "#fdf5ec",
          border: "1px solid rgba(184,154,106,0.3)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-bloom-subtle/60 hover:text-bloom-heading transition-colors"
          data-ocid="payment.close_button"
        >
          <X className="h-5 w-5" />
        </button>

        {unlocked ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🌸</div>
            <h2 className="font-serif text-2xl text-bloom-heading font-semibold">
              Premium Unlocked!
            </h2>
            <p className="font-serif text-bloom-subtle italic mt-2">
              Enjoy all your premium features 🌸
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bloom-blush/20 border border-bloom-blush/40 mb-3">
                <Crown className="h-7 w-7 text-bloom-blush" />
              </div>
              <h2
                className="font-serif text-2xl text-bloom-heading"
                style={{ fontWeight: 600 }}
              >
                Unlock Premium
              </h2>
              <p className="font-serif text-sm text-bloom-subtle italic mt-1">
                One-time payment · ₹29
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "Premium flowers — Lotus, Blue Delphinium & more",
                "Remove watermark from your bouquet",
                "Gift Mode — personalised sharing with recipient name",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-blush/20 mt-0.5">
                    <Check className="h-3 w-3 text-bloom-blush" />
                  </span>
                  <span
                    className="font-serif text-sm text-bloom-heading"
                    style={{ fontWeight: 300 }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="rounded-2xl p-4 mb-6 text-center"
              style={{
                background: "rgba(184,154,106,0.1)",
                border: "1px solid rgba(184,154,106,0.25)",
              }}
            >
              <p className="font-sans text-xs text-bloom-subtle mb-1">UPI ID</p>
              <p
                className="font-serif text-base text-bloom-heading"
                style={{ fontWeight: 600, letterSpacing: "0.04em" }}
              >
                8789829461-4@ybl
              </p>
            </div>

            {!payClicked ? (
              <Button
                onClick={handlePayNow}
                className="w-full rounded-full bg-bloom-blush py-5 font-serif text-base text-white shadow-card hover:bg-bloom-blush/85"
                data-ocid="payment.primary_button"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Pay ₹29 via UPI
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-center font-serif text-xs text-bloom-subtle italic">
                  Complete the payment in your UPI app, then tap below.
                </p>
                <Button
                  onClick={handleCompleted}
                  className="w-full rounded-full bg-bloom-gold py-5 font-serif text-base text-white shadow-card hover:bg-bloom-gold/85"
                  data-ocid="payment.confirm_button"
                >
                  I have completed payment ✓
                </Button>
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full text-center font-serif text-xs text-bloom-subtle/70 underline underline-offset-2"
                >
                  Retry payment
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
