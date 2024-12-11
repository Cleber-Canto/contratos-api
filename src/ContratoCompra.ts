import Veiculo from './Veiculo';

class ContratoCompra {
  private _id: number;
  private _empresa: string;
  private _cliente: string;
  private _transporte: Veiculo;

  constructor(id: number, empresa: string, cliente: string, transporte: Veiculo) {
    this._id = id;
    this._empresa = empresa;
    this._cliente = cliente;
    this._transporte = transporte;
  }

  get id(): number {
    return this._id;
  }

  get empresa(): string {
    return this._empresa;
  }

  get cliente(): string {
    return this._cliente;
  }

  get transporte(): Veiculo {
    return this._transporte;
  }
}

export default ContratoCompra;
