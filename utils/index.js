export const isMobile = (userAgent = navigator.userAgent) => {
  if (/Mobile/i.test(userAgent)) {
      return true
  }
  return false
}