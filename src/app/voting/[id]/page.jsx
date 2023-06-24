'use client'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'

const optionsList = [
  {
    optionName: 'OPTION 1',
    value: 1
  },
  {
    optionName: 'OPTION 2',
    value: 2
  },
  {
    optionName: 'OPTION 3',
    value: 3
  }
]

export default function Voting ({ params }) {
  const [loading, setLoading] = useState(false)
  const voteType = 2

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      option: voteType === 1 ? [] : optionsList[0].value
    }
  })
  const onSubmit = data => console.log(data)
  console.log({ errors })

  const list = [
    {
      name: 'Poll Title',
      comp: <div>Dinner</div>
    },
    {
      name: 'Poll Description',
      comp: <div>Description</div>
    },
    {
      name: 'Poll Expieraion Time',
      comp: <div>Description</div>
    },
    {
      name: 'Vote',
      comp: (
        <>
          {voteType === 1 ? (
            <div className='space-y-5'>
              {optionsList.map((item, index) => (
                <div className='relative flex items-start' key={index}>
                  <div className='flex h-6 items-center'>
                    <input
                      id={item.optionName + index}
                      type='checkbox'
                      name='option'
                      value={item.value}
                      className='h-4 w-4 rounded bg-[#212B3B] border-[#37475B] text-[#45B753] focus:ring-[#45B753]'
                      {...register('option', { required: true })}
                    />
                  </div>
                  <div className='ml-3'>
                    <label htmlFor={item.optionName + index}>
                      {item.optionName}
                    </label>
                  </div>
                </div>
              ))}
              {errors['option'] && (
                <p className='text-red-500 mt-1'>Please vote </p>
              )}
            </div>
          ) : (
            <Controller
              name='option'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                  >
                    {optionsList.map(item => (
                      <RadioGroup.Option
                        key={item.optionName}
                        value={item.value}
                        className={
                          'relative flex items-center cursor-pointer p-2 focus:outline-none'
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <span
                              className={classNames(
                                checked
                                  ? 'bg-[#45B753] border-transparent'
                                  : 'bg-[#212B3B] border-[#38485C]',
                                active
                                  ? 'ring-2 ring-offset-2 ring-[#45B753]'
                                  : '',
                                'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                              )}
                              aria-hidden='true'
                            >
                              {(active || checked) && (
                                <span className='rounded-full bg-white w-1.5 h-1.5' />
                              )}
                            </span>
                            <span className='ml-3'>
                              <RadioGroup.Label
                                as='span'
                                className={
                                  checked ? 'text-white' : 'text-[#8896AA]'
                                }
                              >
                                {item.optionName}
                              </RadioGroup.Label>
                            </span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                )
              }}
            />
          )}
        </>
      )
    }
  ]
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flow-root space-y-8'>
      <Table title='View Poll' subTitle={'Multiple Answer'} list={list} />

      <div className='text-center'>
        <Button className='px-16' htmlType='submit' disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  )
}
