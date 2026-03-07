export const getAvatar = (url?: string, username?: string) => {

  if (!url) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username || "User")}&background=111827&color=fff`
  }

  // Google default avatar detection
  if (url.includes("default-user")) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username || "User")}&background=111827&color=fff`
  }

  // Fix Google image sizing
  if (url.includes("googleusercontent")) {
    return url.split("=")[0] + "=s200-c"
  }

  return url
}