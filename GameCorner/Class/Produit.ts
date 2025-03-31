export class Produit {
    id: number;
    name: string;
    prix: number;
    photo: string[];
    desc: string;
    etat: string;
    marchand: number;
    vendu: boolean;

    constructor(id: number, name: string, prix: number, photo: string[], desc: string, etat: string, marchand: number, vendu: boolean) {
        this.id = id;
        this.name = name;
        this.prix = prix;
        this.photo = photo;
        this.desc = desc;
        this.etat = etat;
        this.marchand = marchand;
        this.vendu = vendu;
    }
}


