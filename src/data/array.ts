export function randomise<T extends any[]>(input: T): T {
  return input
    .map((item) => ({ item, n: Math.random() }))
    .sort((a, b) => a.n - b.n)
    .map(({ item }) => item) as T
}
