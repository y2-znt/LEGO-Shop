type StatusType = {
  text: string;
  color: string;
};

export default function Status({ text, color }: StatusType) {
  return (
    <div
      className={`p-1 py-0.5 bg-gray-200 w-16 rounded-lg flex items-center justify-center gap-2`}
    >
      <span className="relative flex h-3 w-3">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
        ></span>

        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${color}`}
        ></span>
      </span>
      {text}
    </div>
  );
}
