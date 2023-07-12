import { execute } from './aleo'
import { encodeBs58 } from '@/util'
const programID = 'power_voting_v0_2.aleo'
export { execute }

export const createPropose = async ({
    title,
    content,
    options,
    vote_type,
    expieration
}: {
    title: string;
    content:string
    options: string;
    vote_type: string;
    expieration: string;
}) => {
 return await execute({
    programID,
    functionName: 'propose',
    inputs: [[title,'field'],[content, 'field'],[options, 'field'],[vote_type, 'u8'],[expieration, 'field']].map(([value, type]) => ( `${encodeBs58(value)}${type}`)).join(' '),
 })
}

const idUnitLen = 'u64'.length

export const getList = async () => {
    const mappingName = 'proposal_ids'
    const key = '2074281269322187893875field'
    const api = `https://vm.aleo.org/api/testnet3/program/${programID}/mapping/${mappingName}/${key}`
    const res = await fetch(api).then(res => res.json())
    const id = +res.slice(0, -idUnitLen)
    const ids = Array.from({ length: id + 1}, (_, i) => i)
    const details = await Promise.all(ids.map(id => getDetail(id)))
    const filterDetails = details.filter(Boolean)
    // console.log({ids, filterDetails})
    return filterDetails
}

export const getDetail = async (id: string | number) => {
    const mappingName = 'proposals'
    const key = `${id}u64`
    const api = `https://vm.aleo.org/api/testnet3/program/${programID}/mapping/${mappingName}/${key}`
    return await fetch(api).then(res => res.json())
}