import Clipboard from 'clipboard'

export default class BankAccount extends HTMLElement {
  set account(accountDetail) {
    this._account = accountDetail
    this.render()
  }

  connectedCallback() {
    const clip = new Clipboard(`#copy-${this._account.accNo}`)
    clip.on('success', e => {
      alert(`No. rekening untuk ${this._account.bankName} berhasil dicopy`)
    })
  }

  render() {
    this.innerHTML = `
      <div class="container mx-auto mb-5 px-5 md:w-1/2">
        <div class="flex items-center p-3 bg-white rounded-md shadow-md">
          <div class="w-1/5 font-body">
            <img src="${this._account.bankLogo}" alt="${this._account.bankName}">
          </div>
          <div class="flex-grow ml-5">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-body font-bold mr-4 account-no">${this._account.accNoFormatted}</h3>
              <a href="#" class="font-body uppercase text-xs border border-orange-300 rounded py-1 px-3 text-orange-500" id="copy-${this._account.accNo}" data-clipboard-text="${this._account.accNo}">Copy</a>
            </div>
            <div class="font-body italic text-sm">
              <span class="text-gray-600">a.n.</span>
              ${this._account.accName}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
