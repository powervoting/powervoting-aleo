'use client'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { formatDollar } from '@/util'

export default function DAOMintNFT () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const onSubmit = data => console.log(data)
  const list = [
    {
      name: 'Poll Title',
      comp: (
        <select
          name='dao'
          className='mt-2 block w-full rounded border-0 py-1.5 pl-3 bg-[#273141] pr-10 ring-1 ring-inset'
          {...register('dao', { required: true })}
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      )
    },
    {
      name: 'Token Staking',
      comp: (
        <div>
          <p className='mb-1'>
            You've stacked{' '}
            <span className='text-2xl font-bold text-[rgb(226,127,25)]'>
              {formatDollar(1000000)}
            </span>{' '}
            PVT tokens for{' '}
            <span className='text-2xl font-bold text-[rgb(39,141,245)]'>
              {formatDollar(3000)}
            </span>{' '}
            days in Power Voting DAO.
          </p>
          <p className='text-[#8896AA] text-base'>
            The PVT token staking information is automatically retrieved from
            Power Voting DAO.
          </p>
        </div>
      )
    },
    {
      name: 'Voting Power',
      comp: (
        <div>
          <p className='mb-2'>
            Your voting power:{' '}
            <span className='text-2xl font-bold text-[rgb(226,127,25)]'>
              {formatDollar(1000000)}
            </span>{' '}
            points
          </p>
          <p className='mb-2'>
            Total voting power:{' '}
            <span className='text-2xl font-bold text-[rgb(226,127,25)]'>
              {formatDollar(1000000)}
            </span>{' '}
            points
          </p>
          <p className='text-[#8896AA] text-base'>
            Voting power will automatically be generated based on how many and
            how long PVT tokens are staked by you in Power Voting DAO.
          </p>
          <p className='text-[#8896AA] text-base'>
            Voting Power will be minted into Voting NFT, then you can use the
            NFT to vote.
          </p>
        </div>
      )
    }
  ]
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flow-root space-y-8'>
      <Table title='DAO Mint NFT' list={list} />

      <div className='text-center'>
        <Button className='px-16' htmlType='submit' disabled={loading}>
          Mint Voting NFT
        </Button>
      </div>
    </form>
  )
}
