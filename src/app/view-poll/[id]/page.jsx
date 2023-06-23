import Table from '@/components/table'

export default function ViewPoll ({ params }) {
  
  const list = [
    {
      name: 'Poll Title',
      comp: <div>Dinner</div>
    }
  ]
  return <Table title="View Poll" list={list}/>
}
