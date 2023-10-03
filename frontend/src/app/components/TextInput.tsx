import Link from "next/link";
import "./navbar.css";

interface InputProps {
  id: string,
  type: string,
  label: string,
  placeholder?: string,
  className?: string
};

export default function Input(props: InputProps) {
  return (
    <div className={props.className}>
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium">{props.label}</label>
      <input type={props.type} id={props.id} className="border border-neutral-600 placeholder:italic placeholder:text-neutral-500 text-white text-sm rounded w-full p-2.5" placeholder={props.placeholder} />
    </div>
  )
}