import Table from '@/components/Table'
import { formatDollar } from '@/util'

const SubTable = ({ list }) => {
  return (
    <table className='min-w-full bg-[#273141] border border-[#313D4F] rounded text-right'>
      <thead>
        <tr className='border-b border-[#313D4F] text-base font-normal text-[#8896AA]'>
          <th scope='col' className='p-4'>
            Duration (Days)
          </th>
          <th scope='col' className='p-4'>
            PVT Amount
          </th>
          <th scope='col' className='p-4'>
            Voting Power (Points)
          </th>
        </tr>
      </thead>
      <tbody className='divide-y divide-[#313D4F]'>
        {list.map((item, idx) => (
          <tr key={idx}>
            <td className='py-5 px-4 text-xl'>{item.duration}</td>
            <td className='py-5 px-4 text-xl text-white'>{item.amount}</td>
            <td className='py-5 px-4 text-xl text-white'>{item.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default function PowerVotingDAO () {
  const stakeList = [
    {
      duration: 30,
      amount: formatDollar(1000000),
      points: formatDollar(1000000)
    },
    {
      duration: 30,
      amount: formatDollar(1000000),
      points: formatDollar(1000000)
    },
    {
      duration: 30,
      amount: formatDollar(1000000),
      points: formatDollar(1000000)
    }
  ]
  const list = [
    {
      name: 'Description',
      comp: (
        <div>
          PVT is the governace token used by Power Voting DAO, you can stake
          your PVT tokens here to get your Voting Powers in Power Voting DAO.
        </div>
      )
    },
    {
      name: 'Your Stakings',
      comp: (
        <div>
          <p className='mb-4'>
            Your voting power:{' '}
            <span className='text-2xl font-bold text-[rgb(226,127,25)]'>
              {formatDollar(1000000)}
            </span>{' '}
            points
          </p>
          <SubTable list={stakeList} />
        </div>
      )
    },
    {
      name: 'Total Stakings',
      comp: (
        <div>
          <p className='mb-4'>
            Your voting power:{' '}
            <span className='text-2xl font-bold text-[rgb(226,127,25)]'>
              {formatDollar(1000000)}
            </span>{' '}
            points
          </p>
          <SubTable list={stakeList} />
        </div>
      )
    }
  ]
  return <Table title='Power Voting DAO' list={list} />
}
