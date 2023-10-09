import { ComponentPropsWithoutRef } from "react";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <input 
      {...props}
      className={`${props.className || ''} focus:outline-none border p-2.5 border-neutral-600 placeholder:italic placeholder:text-neutral-500 text-black text-sm rounded w-full`}
    />
  )
}