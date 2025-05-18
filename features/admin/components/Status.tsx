type StatusType = {
  text: string;
  color: string;
  width: string;
};

export default function Status({ text, color, width }: StatusType) {
  return (
    <div
      className={`flex ${width} items-center justify-center gap-2 rounded-lg bg-gray-200 px-1 py-0.5`}
    >
      <span className="relative flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
        ></span>

        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${color}`}
        ></span>
      </span>
      {text}
    </div>
  );
}
