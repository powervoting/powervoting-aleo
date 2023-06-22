'use client'
import { ConfigProvider, theme } from 'antd'

export default function ({ children }) {
  return (
    <ConfigProvider
      algorithm={theme.darkAlgorithm}
      token={{
        colorPrimary: '#1991EB'
      }}
    >
      {children}
    </ConfigProvider>
  )
}
