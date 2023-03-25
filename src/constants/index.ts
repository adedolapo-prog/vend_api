export default {
  LIMIT: 50,
  SKIP: 0,
  SORT: "asc",
}

export interface IPagination {
  limit: number
  skip: number
  sort: string
  $or?: any
}
