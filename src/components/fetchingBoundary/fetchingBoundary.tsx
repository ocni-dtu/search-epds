import { ReactNode } from 'react'
import { Loading } from '../loading'
import { ErrorMessage } from '../errorMessage'
import { ErrorBoundary } from '../errorBoundary'

interface FetchingBoundaryProps {
  loading?: boolean
  error?: any | null
  children: ReactNode
}

export const FetchingBoundary = <P extends FetchingBoundaryProps>(props: P & FetchingBoundaryProps) => {
  const { loading, error, children } = props

  if (loading) {
    return <Loading />
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
