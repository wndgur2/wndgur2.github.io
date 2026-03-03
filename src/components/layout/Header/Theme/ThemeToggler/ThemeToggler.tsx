import type { ChangeEvent } from 'react'
import { IoMdMoon } from 'react-icons/io'
import { PiSunDimFill } from 'react-icons/pi'

import './ThemeToggler.css'

interface Props {
  handleChange: (_e: ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
}

export default function ThemeToggler({ handleChange, isChecked }: Props) {
  return (
    <div className='theme clickable'>
      <input
        type='checkbox'
        className='toggle'
        id='check'
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor='check'></label>
      <div className='icons'>
        <PiSunDimFill className='sun theme-icon' />
        <IoMdMoon className='moon theme-icon' />
      </div>
    </div>
  )
}
