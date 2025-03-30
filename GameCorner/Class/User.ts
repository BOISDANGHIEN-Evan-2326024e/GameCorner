export class User {
    id: number;
    email: string;
    pwd: string;
    nom: string;
    prenom: string;
    image_profil: string;

    constructor(id: number, email: string, pwd: string, nom: string, prenom: string, image_profil: string) {
        this.id = id;
        this.email = email;
        this.pwd = pwd;
        this.nom = nom;
        this.prenom = prenom;
        this.image_profil = image_profil;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPwd() {
        return this.pwd;
    }

    getNom() {
        return this.nom;
    }

    getImageProfil() {
        return this.image_profil;
    }

    setId(id: number) {
        this.id = id;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPwd(pwd: string) {
        this.pwd = pwd;
    }

    setNom(nom: string) {
        this.nom = nom;
    }

    setImageProfil(image_profil: string) {
        this.image_profil = image_profil;
    }
}
