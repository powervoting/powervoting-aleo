'use client'
import { useState } from 'react'
import ListFilter from '@/components/ListFilter.jsx'
import { getList } from '@/api'
import useSWR from 'swr'
import Link from 'next/link'

const voteStatusList = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Voting',
    value: 1
  },
  {
    label: 'Counting',
    value: 2
  },
  {
    label: 'Completed',
    value: 3
  }
]

const participateList = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Created',
    value: 1
  },
  {
    label: 'Voted',
    value: 2
  },
  {
    label: 'Completed',
    value: 3
  }
]

const resList = [
  {
    name: 'EIP 9971',
    deadline: '2021-09-30 12:00:00',
    status: 'Voting'
  },
  {
    name: 'FIP 1288',
    deadline: '2021-09-30 12:00:00',
    status: 'Voting'
  }
]
export default function Home () {
  const [voteStatus, setVoteStatus] = useState('')
  const [participate, setParticipate] = useState('')
  const { data = [], isLoading } = useSWR('/api/home-list', getList)
  // console.log({ data, isLoading })
  return (
    <div className='rounded border border-[#313D4F] bg-[#273141] min-h-[200px]'>
      <div className='flex justify-between px-[30px]'>
        <ListFilter
          name='Status'
          value={voteStatus}
          list={voteStatusList}
          onChange={setVoteStatus}
        />

        <ListFilter
          name='Participate'
          value={participate}
          list={participateList}
          onChange={setParticipate}
        />
      </div>

      <table className='w-full'>
        <thead>
          <tr className='bg-[#313D4F] text-left'>
            <th className='text-[#7F8FA4] py-5 font-normal pl-8'>Name</th>
            <th className='text-[#7F8FA4] py-5 font-normal'>Deadline</th>
            <th className='text-[#7F8FA4] py-5 font-normal'>Status</th>
            <th className='text-[#7F8FA4] py-5 font-normal pl-4'>Operations</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-[#313D4F]'>
          {isLoading ? (
            <tr>
              <td colSpan={4} className='py-4 text-center'>
                loading
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index} className='text-white'>
                  <td className='pl-8'>{item.title}</td>
                  <td>{item.expiration}</td>
                  <td>{item.status}</td>
                  <td className='py-4'>
                    <Link href={`/view-poll/${item.id}`}>
                      <button
                        type='button'
                        className='hover:opacity-80 w-[150px] h-[42px] p-0 bg-[#213A33] border border-[#245534] rounded'
                      >
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr className='text-white'>
              <td colSpan={4} className='py-4 text-center'>
                no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
