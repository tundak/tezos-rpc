import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import $ from 'jquery';

export class App {
  private tk: TezosToolkit = Tezos;

  constructor() {
    this.tk.setProvider({ rpc: 'https://rpcalpha.tzbeta.net' });
  }

  public initUI() {
    $('#show-balance-button').bind('click', () =>
      this.getBalance($('#address-input').val())
    );

     $('#show-replace-button').bind('click', () =>
      replaceValue($('#replace_value').val())
    );
  }

  private showError(message: string) {
    $('#balance-output')
      .removeClass()
      .addClass('hide');
    $('#error-message')
      .removeClass()
      .addClass('show')
      .html('Error: ' + message);
  }

  private showBalance(balance: number) {
    $('#error-message')
      .removeClass()
      .addClass('hide');
    $('#balance-output')
      .removeClass()
      .addClass('show');
    $('#balance').html(balance);
  }


    private getBalance(address: string) {
    this.tk.rpc
      .getBalance(address)
      .then(balance => this.showBalance(balance.toNumber() / 1000000))
      .catch(e => this.showError('Address not found'));
  }


  async function replaceValue(value: number) {
          const provider = 'https://rpcalpha.tzbeta.net';
          const signer: any = new InMemorySigner('edskRnayNbLn6qriLXbXxiM21cwnx12QumBmk7sPZTL1eFECQqrNfuzfHnPHb7sTBFQQxM2PeZRNXwUAUgXA8P5GykzQDp8C5C');
          Tezos.setProvider({ rpc: provider, signer });
          try {
          const contract = await Tezos.contract.at('KT1DWXB7jZSJ8RTiAUkNXimXkE3f2qyEddjB');
          const op = await contract.methods.replace(value);
           await op.send();
           getStorage();
           $('#replace_value').val('');
           alert('updateed successfully.');

          } catch (ex) {
             console.log(ex)
          }
  }


 

    async function getStorage() {
      const provider = 'https://rpcalpha.tzbeta.net';
      const signer: any = new InMemorySigner('edskRnayNbLn6qriLXbXxiM21cwnx12QumBmk7sPZTL1eFECQqrNfuzfHnPHb7sTBFQQxM2PeZRNXwUAUgXA8P5GykzQDp8C5C');
      Tezos.setProvider({ rpc: provider, signer });
      try {
          const contract = await Tezos.contract.at('KT1DWXB7jZSJ8RTiAUkNXimXkE3f2qyEddjB');
          var storage=await contract.storage();
          $('#storage_value').html(storage.c[0]); 
      } catch (ex) {
          console.log(ex)
      }
    }

    getStorage();
}
