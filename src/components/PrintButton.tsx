'use client';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-6 py-3 bg-primary text-text-primary rounded-xl hover:bg-primary-hover transition-colors"
    >
      Cetak Sesi
    </button>
  );
} 