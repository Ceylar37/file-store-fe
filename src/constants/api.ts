export const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

if (!baseApiUrl)
  throw new Error('NEXT_PUBLIC_BACKEND_URL isn\'t specified')