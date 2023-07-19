'use client'
import Table from '@/components/Table'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getParsedDetail, getCountOp } from '@/api'
import { optionSeparator } from '@/util'

export default function ViewPoll ({}) {
  const params = useSearchParams()
  const id = params.get('id')
  const { data = {}, isLoading } = useSWR('votePoll/' + id, () =>
    getParsedDetail(id)
  )
  const { data: counts } = useSWR(
    data.options ? 'voteCounts/' + id : null,
    () => getCountOp(id, data.options)
  )
  console.log({ data, counts })
  const voteType = data?.voteType
  const optionsList =
    data?.options
      ?.split(optionSeparator)
      .map((optionName, value) => ({ optionName, value })) || []

  const totalVoteCount = optionsList.reduce(
    (acc, item) => acc + item.voteCount || 0,
    0
  )
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
      name: 'Poll Result',
      comp: (
        <div>
          <h3 className='mb-6'>Total {totalVoteCount} votes</h3>
          <div className='space-y-4'>
            {optionsList.map(item => {
              return (
                <div className='flex items-center' key={item.optionName}>
                  <div className='max-w-[120px] truncate'>
                    {item.optionName}
                  </div>
                  <div className='mx-5 relative w-[400px] h-2 rounded bg-[#1B2331]'>
                    <div
                      className='absolute top-0 left-0 h-full rounded bg-[#1975D1]'
                      style={{
                        width: `${
                          (item.voteCount || 0 / totalVoteCount) * 100
                        }%`
                      }}
                    ></div>
                  </div>
                  <div>{item.voteCount || 0} votes</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  ]
  return <Table title='View Poll' list={list} />
}
