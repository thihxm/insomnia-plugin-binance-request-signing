module.exports = {
  title: 'Binance API keys config missing',
  message: `
    <div class="pad">
      You need to create a new <a href="https://support.insomnia.rest/article/18-environment-variables">environment variable</a> like this:
      <p>
      <pre>
      "BINANCE_CONFIG": {
        "API_KEY": "my-api-key",
        "SECRET_KEY": "my-secret-key"
      }
      </pre>
      </p>
      <ul>
      <li>* Replace "<i>my-api-key</i>" with the API Key.</li>
      <li>* Replace "<i>my-secret-key</i>" with the Secret Key.</li>
      </ul>
      <p>Have a look at the <a href="https://www.binance.com/en/support/faq/360002502072">Official Binance documentation</a> to see how to setup an API Key.</p>
    </div>
  `,
}
