import { ReactNode } from 'react'
import { ErrorBoundary, ErrorMessage } from '@components'
import { LoadingPage } from '@pages'

interface FetchingBoundaryProps {
  loading?: boolean
  error?: { message: string } | null
  children: ReactNode
}

export const FetchingBoundary = <P extends FetchingBoundaryProps>(props: P & FetchingBoundaryProps) => {
  const { loading, error, children } = props

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorMessage error={error} data-testid='error-message' />
  }

  return (
    <ErrorBoundary data-testid='error-boundary' {...(props as P)}>
      {children}
    </ErrorBoundary>
  )
}
