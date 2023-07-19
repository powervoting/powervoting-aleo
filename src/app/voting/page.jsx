'use client'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getParsedDetail, vote, getVoteId } from '@/api'
import { optionSeparator } from '@/util'
import aleoFetcher from '@/fetcher/aleo'
import {
  timelockEncrypt,
  roundAt,
  // HttpChainClient,
  mainnetClient
} from 'tlock-js'
import dayjs from 'dayjs'

export default function Voting ({}) {
  const { data: walletAccount } = useSWR('walletAccount', aleoFetcher)
  const params = useSearchParams()
  const [loading, setLoading] = useState(false)
  const id = params.get('id')
  const { data = {}, isLoading } = useSWR('voteDetail/' + id, () =>
    getParsedDetail(id)
  )
  const { data: voteId } = useSWR('latestVoteId', getVoteId)
  console.log({ voteId })
  const voteType = data?.voteType
  const optionsList =
    data?.options
      ?.split(optionSeparator)
      .map((optionName, value) => ({ optionName, value })) || []
  console.log(data)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      option: voteType === '1' ? [] : 0
    }
  })
  console.log({ walletAccount })
  const onSubmit = async values => {
    const chainInfo = await mainnetClient().chain().info()
    const roundNumber = roundAt(dayjs(data.expiration).unix(), chainInfo)
    const payload = Buffer.from(
      JSON.stringify({
        index: values.option
        // address: walletAccount?.address
      })
    )
    const ciphertext = await timelockEncrypt(
      roundNumber,
      payload,
      mainnetClient()
    )
    // await vote
    console.log(data)
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const list = [
    {
      name: 'Poll Title',
      comp: <div>{data.title}</div>
    },
    {
      name: 'Poll Description',
      comp: <div>{data.content}</div>
    },
    {
      name: 'Poll Expieraion Time',
      comp: <div>{data.expiration}</div>
    },
    {
      name: 'Vote',
      comp: (
        <>
          {voteType === '1' ? (
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
                  <RadioGroup value={value} onChange={onChange}>
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
      <Table
        title='View Poll'
        subTitle={voteType === '1' ? 'Multiple Answer' : 'Single Answer'}
        list={list}
      />

      <div className='text-center'>
        <Button className='px-16' htmlType='submit' disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  )
}
