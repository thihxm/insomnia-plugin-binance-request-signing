const { generateSignature, createHtmlElementWith } = require('./utils')

const binanceURLRegex = new RegExp(
  '(api[1-4]?(-gcp)?.binance.com)|(testnet.binance.vision)'
)

// A request hook will be run before sending the request to API, but after everything else is finalized
module.exports.requestHooks = [
  (context) => {
    const req = context.request

    // Validate URL
    if (
      !req.hasOwnProperty('getUrl') ||
      req['getUrl'] == null ||
      req['getUrl'].constructor.name != 'Function' ||
      !req.getUrl().match(binanceURLRegex)
    ) {
      console.log('Not a Binance API URL')
      return
    }

    // Check for a valid api key config
    const config = req.getEnvironmentVariable('BINANCE_CONFIG')

    if (!config.API_KEY || !config.SECRET_KEY) {
      const { title, message } = require('./help')
      context.app.dialog(title, createHtmlElementWith(message))
      return
    }
    const { API_KEY, SECRET_KEY } = config

    const requestParams = req.getParameters().reduce((obj, param) => {
      obj[param.name] = param.value
      return obj
    }, {})

    const { timestamp, signature } = generateSignature(
      requestParams,
      SECRET_KEY
    )
    req.addParameter('timestamp', timestamp)
    req.addParameter('signature', signature)

    req.setHeader('X-MBX-APIKEY', API_KEY)
  },
]
