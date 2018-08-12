// rollup.config.js
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  name: 'qstring',
  input: './index.js',
  output: {
    file: './dist/index.js',
    format: 'umd'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', { modules: false }], 'es2015-rollup']
    }),
    uglify()
  ]
}
