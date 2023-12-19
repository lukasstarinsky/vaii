export default function Input(props) {
  return (
    <input 
      {...props}
      className={`${props.type === "submit" ? "border-0": "border border-neutral-600"} ${props.className || ''} focus:outline-none border p-2.5 placeholder:italic placeholder:text-neutral-500 text-black text-sm rounded w-full`}
    />
  );
}