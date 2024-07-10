import React,{useId} from 'react'

const Input = ({
  type="text",
  className="",
  label,
  ...props
},ref) => {
  const id = useId()
  return (
    <div className="w-full flex flex-col items-center">
   {label && <label className="inline-block mb-1 pl-1 text-blue-700 font-bold font-serif" htmlFor={id}>{label}</label>}

    <input 
    type={type}
    ref={ref}
    id={id}
    className={`mb-5 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    {...props}
    />
   </div>
  )
}

export default React.forwardRef(Input)