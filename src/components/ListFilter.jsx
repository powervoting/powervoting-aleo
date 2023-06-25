import { useState } from 'react'
import classNames from 'classnames'

export default function ListFilter ({ name, value, list, onChange = () => {} }) {
  return (
    <div className='flex text-base pt-6 pb-5'>
      <div className='text-[#7F8FA3]'>{name}:</div>
      <div className='flex'>
        {list.map((item, index) => {
          return (
            <button
              onClick={() => onChange(item.value)}
              type='button'
              key={index}
              className={classNames(
                value === item.value
                  ? 'text-white before:absolute before:inset-x-0 before:-top-6 before:h-1 before:bg-[#2DA1F7]'
                  : 'text-[#7F8FA3]',
                'ml-[20px] cursor-pointer relative'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
