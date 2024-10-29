const isProd = process.env.NODE_ENV === 'production'

const prefix = isProd ? '' : 'dev_'

export function prefixByEnv(database: string) {
  return `${prefix}${database}`
}