import { useEffect, useState } from "react"
import { isMobile } from "../utils"

// navigator.share와 navigator.clipboard는 HTTPS 또는 localhost 환경에서만 지원
export default function ShareButton({
  title,
  text,
  url
}){
  const [isMobileDevice, setIsMobileDevice] = useState()
  const [defaultUrl, setDefaultUrl] = useState()

  useEffect(() => {
    setIsMobileDevice(isMobile())
    if(!url){
      setDefaultUrl(document.location.href)
    }
  }, [])

  const mobileShare = async () => {
    const shareData = {
      title,
      text,
      url: url || defaultUrl
    }

    await navigator.share(shareData)
  }

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(url || defaultUrl)
    alert('URL 복사되었습니다.')
  }

  const handleShareButtonClick = () => {
    if(isMobileDevice && navigator.share){
      mobileShare()
      return
    }
    copyUrlToClipboard()
  }

  return (
    <button 
      onClick={handleShareButtonClick}
    >
      공유
    </button>
  )
}
