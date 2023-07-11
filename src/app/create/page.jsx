'use client'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { createPropose } from '@/api'
import { optionSeparator, pollTypes } from '@/util'

export default function CreatePage () {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      poll_type: 2,
      option: ['Edit Option']
    }
  })
  const [loading, setLoading] = useState(false)
  const { fields, append, remove } = useFieldArray({
    name: 'option',
    control,
    rules: {
      required: true
    }
  })
  const onSubmit = async data => {
    console.log(data)
    const { title, description: content, expieration, poll_type:vote_type } = data
    const options = data.option?.join(optionSeparator)
    const res = await createPropose({
      title,
      content,
      expieration,
      vote_type,
      options
    })
    console.log({res})
  }

  const list = [
    {
      name: 'Poll Title',
      comp: (
        <>
          <input
            type='text'
            className={classNames(
              'form-input w-full rounded bg-[#212B3C] border border-[#313D4F]',
              errors['title'] && 'border-red-500 focus:border-red-500'
            )}
            placeholder='Poll Title'
            {...register('title', { required: true })}
          />
          {errors['title'] && (
            <p className='text-red-500 mt-1'>Poll Title is required</p>
          )}
        </>
      )
    },
    {
      name: 'Poll Description',
      comp: (
        <>
          <textarea
            rows='3'
            className={classNames(
              'form-textarea w-full rounded bg-[#212B3C] border border-[#313D4F]',
              errors['description'] && 'border-red-500 focus:border-red-500'
            )}
            placeholder='Poll Description'
            {...register('description', { required: true })}
          />
          {errors['description'] && (
            <p className='text-red-500 mt-1'>Poll Description is required</p>
          )}
        </>
      )
    },
    {
      name: 'Poll Expieraion Time',
      comp: (
        <div className='flex items-center'>
          <input
            type='datetime-local'
            className={classNames(
              'form-input rounded bg-[#212B3C] border border-[#313D4F] w-[248px]',
              errors['start_time'] && 'border-red-500 focus:border-red-500'
            )}
            placeholder='Pick Date'
            {...register('expieration', { required: true })}
          />
          {errors['expieration'] && (
            <p className='text-red-500 mt-1'>Please Pick Expiration Date</p>
          )}
        </div>
      )
    },
    {
      name: 'Poll Type',
      comp: (
        <Controller
          name='poll_type'
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <RadioGroup className='flex' value={value} onChange={onChange}>
                {pollTypes.map(poll => (
                  <RadioGroup.Option
                    key={poll.label}
                    value={poll.value}
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
                            {poll.label}
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
      )
    },
    {
      name: 'Poll Options',
      comp: (
        <>
          <div className='rounded border border-[#313D4F] divide-y divide-[#212B3C]'>
            <div className='flex justify-between bg-[#293545] text-base text-[#8896AA] px-5 py-4'>
              <span>Options</span>
              <span>Operations</span>
            </div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className='flex items-center pl-2.5 py-2.5 pr-5'>
                  <input
                    type='text'
                    className={classNames(
                      'form-input flex-auto rounded bg-[#212B3C] border border-[#313D4F]',
                      errors.option?.[0] &&
                        'border-red-500 focus:border-red-500'
                    )}
                    placeholder='Edit Option'
                    {...register(`option.${index}`, { required: true })}
                  />
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='ml-3 w-[50px] h-[50px] flex justify-center items-center bg-[#212B3C] rounded-full'
                  >
                    <TrashIcon className='h-5 w-5 text-[#8896AA] hover:opacity-80' />
                  </button>
                </div>
                {errors.option?.[0] && (
                  <div className='px-2.5 pb-3'>
                    <p className='text-red-500 text-base'>
                      This field is required
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {errors.option?.root && (
            <div className='px-2.5 py-3'>
              <p className='text-red-500 text-base'>Please add some options</p>
            </div>
          )}
          <div className='pl-2.5 py-4'>
            <button
              type='button'
              onClick={() => append('')}
              className='px-8 py-3 rounded border border-[#313D4F] bg-[#3B495B] text-base text-white hover:opacity-80'
            >
              Add Option
            </button>
          </div>
        </>
      )
    }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flow-root space-y-8'>
        <Table title='Create A Poll' list={list} />

        <div className='text-center'>
          <Button className='px-16' htmlType='submit' disabled={loading}>
            Create
          </Button>
        </div>
      </div>
    </form>
  )
}
