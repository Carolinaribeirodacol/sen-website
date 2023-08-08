export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`
}

export function getStrapiAPIURL(path = "") {
  return getStrapiURL(`/api/${path}`);
}