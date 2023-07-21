'use client'
import { useMemo, useState } from 'react'
import ListFilter from '@/components/ListFilter.jsx'
import { getList, isMock } from '@/api'
import useSWR from 'swr'
import Link from 'next/link'
import { statusMap } from '@/util'

const voteStatusList = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Voting',
    value: 'vote'
  },
  {
    label: 'Counting',
    value: 'count'
  },
  {
    label: 'Completed',
    value: 'completed'
  }
]
const pageProposalType = '1'
export default function Home () {
  const [voteStatus, setVoteStatus] = useState('')
  const { data = [], isLoading } = useSWR('/api/home-list', getList)
  const formatedData = useMemo(() => {
    const pageData = isMock()
      ? data
      : data.filter(item => item.voteType === pageProposalType)
    if (!voteStatus) return pageData
    return pageData.filter(item => item.status === voteStatus)
  }, [voteStatus, data])
  console.log({ formatedData })
  return (
    <div className='rounded border border-[#313D4F] bg-[#273141] min-h-[200px]'>
      <div className='px-[30px]'>
        <ListFilter
          name='Status'
          value={voteStatus}
          list={voteStatusList}
          onChange={setVoteStatus}
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
          ) : formatedData.length > 0 ? (
            formatedData.map((item, index) => {
              return (
                <tr key={index} className='text-white'>
                  <td className='pl-8'>{item.title}</td>
                  <td>{item.expiration}</td>
                  <td>{statusMap[item.status]?.statusLabel}</td>
                  <td className='py-4'>
                    <div className='space-x-2 inline-block'>
                      {statusMap[item.status]?.actions?.map(v => {
                        if (v.type === 'view') {
                          return (
                            <Link key={v.type} href={`${v.link}?id=${item.id}`}>
                              <button
                                type='button'
                                className={
                                  'hover:opacity-80 w-[150px] h-[42px] p-0 bg-[#213A33] border border-[#245534] rounded'
                                }
                                style={{
                                  backgroundColor: v.color
                                }}
                              >
                                {v.text}
                              </button>
                            </Link>
                          )
                        } else if (v.type === 'mint') {
                          return (
                            <Link key={v.type} href={`${v.link}?id=${item.id}`}>
                              <button
                                type='button'
                                className={
                                  'hover:opacity-80 w-[150px] h-[42px] p-0 bg-[#213A33] border border-[#245534] rounded'
                                }
                                style={{
                                  backgroundColor: v.color
                                }}
                              >
                                {v.text}
                              </button>
                            </Link>
                          )
                        } else {
                          // vote
                          return (
                            <Link key={v.type} href={`${v.link}?id=${item.id}`}>
                              <button
                                type='button'
                                className={
                                  'hover:opacity-80 w-[150px] h-[42px] p-0 bg-[#213A33] border border-[#245534] rounded'
                                }
                                style={{
                                  backgroundColor: v.color
                                }}
                              >
                                {v.text}
                              </button>
                            </Link>
                          )
                        }
                      })}
                    </div>
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
