export default function OutOfStock() {
  return (
    <div className="flex items-center justify-end">
      <div className="absolute mt-8 -mr-4 rotate-[20deg] rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white">
        Out of stock
      </div>
    </div>
  );
}
