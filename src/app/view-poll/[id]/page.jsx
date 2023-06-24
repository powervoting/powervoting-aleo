import Table from '@/components/Table'

export default function ViewPoll ({ params }) {
  const optionsList = [
    {
      optionName: 'OPTION 1',
      voteCount: 5
    },
    {
      optionName: 'OPTION 2',
      voteCount: 3
    }
  ]
  const totalVoteCount = optionsList.reduce(
    (acc, item) => acc + item.voteCount,
    0
  )
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
      name: 'Poll Result',
      comp: (
        <div>
          <h3 className='mb-6'>Total 15 votes</h3>
          <div className='space-y-4'>
            {optionsList.map((item) => {
              return <div className='flex items-center' key={item.optionName}>
                <div className='max-w-[120px] truncate'>{item.optionName}</div>
                <div className='mx-5 relative w-[400px] h-2 rounded bg-[#1B2331]'>
                  <div
                    className='absolute top-0 left-0 h-full rounded bg-[#1975D1]'
                    style={{
                      width: `${(item.voteCount / totalVoteCount) * 100}%`
                    }}
                  ></div>
                </div>
                <div>{item.voteCount} votes</div>
              </div>
            })}
          </div>
        </div>
      )
    }
  ]
  return <Table title='View Poll' list={list} />
}
