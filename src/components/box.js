
export default function Box({ children }) {
  return (
    // คลาสเหล่านี้คือสไตล์ของ "กล่อง"
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 text-left w-full">
      {children}
    </div>
  );
}