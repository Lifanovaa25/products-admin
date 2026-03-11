import { useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

type Props = {
  isLoading: boolean
}

export const Loader = ({ isLoading }: Props) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [isLoading])

  return null
}