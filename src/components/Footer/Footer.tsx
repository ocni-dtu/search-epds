import { Anchor, Group, useMantineTheme } from '@mantine/core'
import { Logo } from '@components'
import { useMediaQuery } from '@mantine/hooks'

interface FooterProps {
  links?: {
    link: string
    label: string
  }[]
}

export const Footer = ({ links }: FooterProps) => {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: 48em)`)

  const items = links?.map((link) => (
    <Anchor<'a'> c={theme.black} key={link.label} href={link.link} size='sm' target='_blank'>
      {link.label}
    </Anchor>
  ))
  return (
    <Group justify='space-between' style={{ backgroundColor: theme.colors.light[1] }}>
      <Logo link size={isMobile ? 60 : 80} />
      <Group justify='flex-end' px={12}>
        {items}
      </Group>
    </Group>
  )
}
