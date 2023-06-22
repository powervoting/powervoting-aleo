'use client'
import Table from '@/components/table'
import Button from '@/components/Button'
import { RadioGroup } from '@headlessui/react'
function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const settings = [
  {
    name: 'Public access',
    description: 'This project would be available to anyone who has the link'
  },
  {
    name: 'Private to Project Members',
    description: 'Only members of this project would be able to access'
  },
  {
    name: 'Private to you',
    description: 'You are the only one able to access this project'
  }
]
const pollTypes = [
  {
    label: 'Single Answer',
    value: 1
  },
  {
    label: 'Multiple Answers',
    value: 2
  }
]
export default function CreatePage () {
  const list = [
    {
      name: 'Poll Title',
      comp: (
        <input
          type='text'
          className='form-input w-full rounded bg-[#212B3C] border border-[#313D4F]'
          placeholder='Poll Title'
        />
      )
    },
    {
      name: 'Poll Description',
      comp: (
        <textarea
          rows='3'
          className='form-textarea w-full rounded bg-[#212B3C] border border-[#313D4F]'
          placeholder='Poll Description'
        />
      )
    },
    {
      name: 'Poll Description',
      comp: (
        <div className='space-x-2.5'>
          <input
            type='date'
            lang='en'
            className='form-input rounded bg-[#212B3C] border border-[#313D4F] w-[248px]'
            placeholder='Pick Date'
          />
          <input
            type='time'
            lang='en'
            className='form-input rounded bg-[#212B3C] border border-[#313D4F] w-[248px]'
            placeholder='Pick Date'
          />
        </div>
      )
    },
    {
      name: 'Poll Type',
      comp: (
        <RadioGroup className='flex'>
          {pollTypes.map((poll, settingIdx) => (
            <RadioGroup.Option
              key={poll.label}
              value={poll}
              className={
                'relative flex items-center cursor-pointer p-4 focus:outline-none'
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? 'bg-[#45B753] border-transparent'
                        : 'bg-[#212B3B] border-[#38485C]',
                      active ? 'ring-2 ring-offset-2 ring-[#45B753]' : '',
                      'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden='true'
                  >
                    {(active || checked)&& (
                      <span className='rounded-full bg-white w-1.5 h-1.5' />
                    )}
                  </span>
                  <span className='ml-3'>
                    <RadioGroup.Label
                      as='span'
                      className={checked ? 'text-white' : 'text-[#8896AA]'}
                    >
                      {poll.label}
                    </RadioGroup.Label>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      )
    }
  ]
  const onFinish = values => {
    console.log(values)
  }
  return (
    <div className='flow-root space-y-8'>
      <Table title='Create A Poll' list={list} />

      <div className='text-center'>
        <Button className='px-16' htmlType='submit'>
          Create
        </Button>
      </div>
    </div>
  )
}
