'use client'
import Table from '@/components/table'
import Button from '@/components/Button'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

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
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      poll_type: 2
    }
  })
  const onSubmit = data => console.log(data)

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
          <div className='mr-2.5'>
            <input
              type='datetime-local'
              className={classNames(
                'form-input rounded bg-[#212B3C] border border-[#313D4F] w-[248px]',
                errors['start_time'] && 'border-red-500 focus:border-red-500'
              )}
              placeholder='Pick Date'
              {...register('start_time', { required: true })}
            />
            {errors['start_time'] && (
              <p className='text-red-500 mt-1'>Please Pick Start Date</p>
            )}
          </div>

          <div>
            <input
              type='datetime-local'
              className={classNames(
                'form-input rounded bg-[#212B3C] border border-[#313D4F] w-[248px]',
                errors['end_time'] && 'border-red-500 focus:border-red-500'
              )}
              placeholder='Pick Date'
              {...register('end_time', { required: true })}
            />
            {errors['end_time'] && (
              <p className='text-red-500 mt-1'>Please Pick Start Date</p>
            )}
          </div>
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
    }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flow-root space-y-8'>
        <Table title='Create A Poll' list={list} />

        <div className='text-center'>
          <Button className='px-16' htmlType='submit'>
            Create
          </Button>
        </div>
      </div>
    </form>
  )
}
