'use client'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { useState } from 'react'
import useSWR from 'swr'
import { getRecord } from '@/api'
import { mintTokenApi, mintNFTApi } from '@/api'
import { Tooltip, Typography } from 'antd'
import {
  CheckOutlined,
  HighlightOutlined,
  SmileFilled,
  SmileOutlined
} from '@ant-design/icons'
const { Paragraph } = Typography

export default function DAOMintNFT () {
  const [loading, setLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const { data = [], mutate } = useSWR(`daoMintNFT`, getRecord)
  console.log({ data })
  const mintToken = async () => {
    setMintLoading(true)
    await mintTokenApi()
    setMintLoading(false)
    mutate()
  }
  const mintNFT = async () => {
    setLoading(true)
    await mintNFTApi()
    setLoading(false)
    mutate()
  }
  const list = [
    {
      name: 'Poll Title',
      comp: (
        <select
          name='dao'
          disabled
          className='mt-2 block w-full rounded border-0 py-1.5 pl-3 bg-[#273141] pr-10 ring-1 ring-inset'
        >
          <option>Power Voting DAO</option>
        </select>
      )
    },
    {
      name: 'Records',
      comp: (
        <div>
          <div>
            <p className='text-[#8896AA] text-base'>
              Mint 10 PVT test tokens.After tokens are minted, it will be listed
              in the following Records table and will be used to mint Voting
              NFT.
            </p>
            <div className='flex justify-center pt-2 pb-4'>
              <Button
                className='px-16'
                onClick={mintToken}
                disabled={mintLoading}
              >
                Mint PVT Tokens
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            {data.map((item, index) => (
              <div
                key={index}
                className='flex items-center border border-[#313D4F] p-3 w-3/4 mx-auto rounded-lg'
              >
                <div className='flex-1'>
                  <p className='text-white text-base'>{item.programID}</p>
                  <p className='text-[#8896AA] text-sm'>{item.functionName}</p>
                </div>
                <div>
                  <Tooltip title={JSON.stringify(item)}>
                    <Paragraph
                      copyable={{
                        tooltips: ['click to copy', 'copyed'],
                        text: JSON.stringify(item)
                      }}
                      style={{ color: '#fff' }}
                    >
                      copy
                    </Paragraph>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]
  return (
    <div className='flow-root space-y-8'>
      <Table title='DAO Mint NFT' list={list} />

      <div className='text-center'>
        <Button className='px-16' onClick={mintNFT} disabled={loading}>
          Mint Voting NFT
        </Button>
      </div>
    </div>
  )
}
