import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  output: {
    format: ['cjs', 'esm', 'umd'],
    fileName: 'vue-composable-helpers-[format][min].js',
    minify: true,
    moduleName: 'VueComposableHelpers'
  }
}

export default config
