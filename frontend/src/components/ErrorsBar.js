export default function ErrorsBar({ errors }) {
  if (!errors || errors.length === 0 || !Array.isArray(errors)) {
    return null;
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 mt-3 px-4 py-3 rounded relative" role="alert">
      {errors.map((error, i) => (
        <span key={i} className="block sm:inline">{error}<br /></span>
      ))}
    </div>
  );
}