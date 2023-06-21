import Table from '@/components/table'
import Button from '@/components/Button'

export default function CreatePage () {
  const list = [
    {
      name: 'Poll Title',
      comp: <input />
    }
  ]
  return (
    <div className='flow-root space-y-8'>
      <Table title='Create A Poll' list={list} />

      <div className='text-center'>
        <Button>Create</Button>
      </div>
    </div>
  )
}
