import {packageTypes} from './types'

export function parsePackageType(input: string): string {
  if (input === 'npm')
    return 'npm'
  if (input === 'poetry')
    return packageTypes.poetry
  throw new Error(`invalid package type: ${input}, supported types: ${JSON.stringify(packageTypes)}`)
}

