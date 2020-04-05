import accounts from '../accounts.json'
import BankAccount from './components/BankAccount'

customElements.define('bank-account', BankAccount)

accounts.forEach(account => {
  const $accountEl = document.createElement('bank-account')
  $accountEl.account = account

  document.getElementById('bank-accounts').appendChild($accountEl)
})

