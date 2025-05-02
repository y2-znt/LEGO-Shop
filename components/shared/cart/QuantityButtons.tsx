interface QuantityButtonsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export default function QuantityButtons({
  quantity,
  onIncrease,
  onDecrease,
  className,
}: QuantityButtonsProps) {
  return (
    <div
      className={`bg-primary flex w-40 max-w-full items-start justify-center rounded-lg py-2 ${className}`}
    >
      <button onClick={onDecrease} className="px-8">
        <span className="rounded-full px-3 py-1 text-xl">-</span>
      </button>
      <div>{quantity}</div>
      <button onClick={onIncrease} className="px-8">
        <span className="rounded-full px-3 py-1 text-xl">+</span>
      </button>
    </div>
  );
}
