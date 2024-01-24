/// <reference types="vite-plugin-svgr/client" />
import CKLogo from '../../assets/logo_light.svg?react'
import { Anchor } from '@mantine/core'

interface LogoProps {
  link?: boolean
  size?: number
}

export const Logo = ({ link, size = 100 }: LogoProps) => {
  if (link) {
    return (
      <Anchor<'a'> href={'https://kongsgaard.eu'} target='_blank'>
        <CKLogo width={size} height={size} />
      </Anchor>
    )
  }
  return <CKLogo />
}
