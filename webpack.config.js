const path							= require('path'),
	  HtmlWebpackPlugin				= require('html-webpack-plugin'),
	  CopyWebpackPlugin				= require('copy-webpack-plugin'),
	  MiniCssExtractPlugin			= require('mini-css-extract-plugin')

module.exports = (env, options) => {
	if (['development', 'production'].indexOf(options.mode) === -1) {
		throw new Error('ERROR:  Please specify a value for the --mode parameter to webpack.')
	}

	let config = {
		target: 'browserslist',
		entry: {
			'home/index':			'./src/public/scripts/home/index.jsx',
			'employees/all':		'./src/public/scripts/employees/all/index.jsx',
			'employees/add':		'./src/public/scripts/employees/add/index.jsx',
			'employees/edit':		'./src/public/scripts/employees/edit/index.jsx'
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: path.join('public', 'scripts', '[name].js')
		},
		module: {
			rules: [{
				test: /\.(jsx?)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/react' ]
					}
				}
			}, {
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'sass-loader'
				]
			}, {
				test: /\.ejs$/,
				exclude: /node_modules/,
				use: {
					loader: 'raw-loader'
				}
			}]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'public/css/[name].css'
			}),
			new HtmlWebpackPlugin({
					template: './src/views/pages/home/index.ejs',
					filename: 'views/pages/home/index.ejs',
					inject: 'head',
					chunks: [ 'home/index' ]
			}),
			new HtmlWebpackPlugin({
					template: './src/views/pages/employees/all.ejs',
					filename: 'views/pages/employees/all.ejs',
					inject: 'head',
					chunks: [ 'employees/all' ]
			}),
			new HtmlWebpackPlugin({
					template: './src/views/pages/employees/add.ejs',
					filename: 'views/pages/employees/add.ejs',
					inject: 'head',
					chunks: [ 'employees/add' ]
			}),
			new HtmlWebpackPlugin({
					template: './src/views/pages/employees/edit.ejs',
					filename: 'views/pages/employees/edit.ejs',
					inject: 'head',
					chunks: [ 'employees/edit' ]
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: 'src/views/partials',
						to: 'views/partials'
					}
				]
			})
		],
		externals: {
			jquery: 'jQuery',
			bootstrap: 'bootstrap',
			react: 'React',
			'react-dom': 'ReactDOM'
		},
		resolve: {
			extensions: [ '.js', '.jsx', '.json' ]
		}
	}

	if (options.mode === 'development') {
		config.devtool = 'source-map'
	}

	return config
}
