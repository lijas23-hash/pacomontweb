"use client";
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-6 py-2 rounded-full transition-colors"
    >
      Descargar PDF →
    </button>
  );
}
