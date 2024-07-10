import React from 'react'

const Button = ({
  children,
  type="submit",
  className="",
  ...props
}) => {
  return (
    <button
    className={`p-4 border-b rounded-xl ${className} hover:bg-[#00df9a] duration-300 hover:text-black  cursor-pointer border-gray-600 `}
    type={type}
    {...props}
    >{children}</button>
  )
}

export default Button