'use client'
import cls from 'classnames'

export default function Button ({ children, type = 'primary', ...props }) {
  const base = 'rounded hover:opacity-80 py-4 px-8 text-xl'
  const primary = 'bg-[#1991EB] text-[#fff]'
  return (
    <button type='button' className={cls(base, type === 'primary' && primary)} {...props}>
      {children}
    </button>
  )
}
