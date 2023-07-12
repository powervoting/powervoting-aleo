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