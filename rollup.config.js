import vue from 'rollup-plugin-vue'
import common from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser";

export default {
	input: './src/index.js',
	output: [
	{
		format: 'esm',
		file: 'dist/bundle.esm.js',
	},
	{
		format: 'umd',
		name: 'puStagger',
		file: 'dist/bundle.umd.js',
	},
	{
		format: 'cjs',
		file: 'dist/bundle.cjs.js',
	},
	],
	plugins: [
		vue(),
		common(),
		terser({
			 include: [/^.+\.min\.js$/, '*umd*']
		})
	]
}