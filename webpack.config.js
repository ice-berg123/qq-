const _pagePath = "./src/page"
const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("mini-css-extract-plugin")
let fileName = fs.readdirSync(_pagePath)
let entryPage = {}
let plugingsList = []

fileName.forEach((item)=>{
    let _itemPagePath = _pagePath+"/"+item
    entryPage[item] = {
        import:[`${_itemPagePath}/index.js`],
        // dependOn:"shared"
    }
    plugingsList.push(new HtmlWebpackPlugin(
        {
            title:item,
            filename:`${item}.html`,
            template:`${_itemPagePath}/index.html`,
            chunks:[`${item}`]
        }
    ))
})
// entryPage.shared = './src/module/test'
plugingsList.push(new MiniCssExtractPlugin(
    {
        filename:'styles/[contenthash].css'
    }
))

module.exports = {
    devtool:"source-map", 
    mode:"production",
    context:__dirname,
    entry: entryPage,
    output:{
        path:path.join(__dirname,"dist"),
        clean:true,
        filename:"./js/[name].bundle.js",
        assetModuleFilename:'images/[contenthash][ext]'
    },
    plugins:plugingsList,

    module:{
        rules:[
            {
                test: /\.scss$/i,
                use:[MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|webp|svg)/i,
                type:'asset',
            },
            {
                test:/\.html$/,
                use:{
                    loader:"html-loader",
                }
            },

        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer:{
        hot:true
    }
}