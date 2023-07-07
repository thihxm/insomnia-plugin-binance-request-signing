const crypto = require('crypto')

const removeEmptyValue = (obj) => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach((key) => isEmptyValue(obj[key]) && delete obj[key])
  return obj
}

const isEmptyValue = (input) => {
  /**
   * Scope of empty value: falsy value (except for false and 0),
   * string with white space characters only, empty object, empty array
   */
  return (
    (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) &&
      /^\s+$/.test(input)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
  )
}

const buildQueryString = (params) => {
  if (!params) return ''
  return Object.entries(params).map(stringifyKeyValuePair).join('&')
}

const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
  return `${key}=${encodeURIComponent(valueString)}`
}

const generateSignature = (params, secret) => {
  const sanitizedParams = removeEmptyValue(params)
  const timestamp = Date.now()
  const queryString = buildQueryString({ ...sanitizedParams, timestamp })

  const signature = crypto
    .createHmac('sha256', secret)
    .update(queryString)
    .digest('hex')

  return { timestamp, signature }
}

const createHtmlElementWith = (content) => {
  const element = document.createElement('div')
  element.innerHTML = content
  return element
}

module.exports = {
  generateSignature,
  createHtmlElementWith,
}
