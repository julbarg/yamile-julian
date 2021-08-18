import { useState, useEffect } from 'react'

export default function useIsMobile(): [boolean] {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 769)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [isMobile]
}
