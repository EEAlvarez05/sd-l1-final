import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      return pelis;
    });
  }
  
  add(peli: Peli): Promise<boolean>{
    return this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false;
      }else{
        return this.getAll().then((pelis)=>{
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(()=>{
            return true;
          })
        })
      }
    })
  }

  getById(id: number): Promise<Peli | undefined>{
    return this.getAll().then((pelis)=>{
      const resultado = pelis.find((p)=>{
        return p.id === id;
      });
      return resultado;
    })
  }

  async search(options: {title?: string, tag?: string}): Promise<Peli[]>{
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p)=>{
      let esteVa = false;

      if(options.tag){
        esteVa = p.tags.includes(options.tag);
      }

      if(options.title){
        esteVa = esteVa || p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      return esteVa;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };


