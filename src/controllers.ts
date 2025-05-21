import { PelisCollection, Peli } from "./models";

class PelisController {
  private model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }

    if (options.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options.search) {
      return this.model.search(options.search);
    }

    return [];
  }

  async getOne(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli | undefined> {
    const resultados = await this.get(options); // Esperás a que se resuelva la promesa
    return resultados[0]; // Ahora podés acceder al primer elemento
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }

}
export { PelisController };
