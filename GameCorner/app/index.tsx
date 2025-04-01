import React, { useState } from "react";
import Login from "./login";
import Recherche from "./recherche";
import Router from "@/app/router";

export default function App() {
    const [logged, setLogged] = useState(false);
    const [idUser, setIdUser] = useState(0);

    return (
        <>
            {!logged ? (
                <Login logMe={setLogged} setIdUser={setIdUser} />
            ) : (
                <Router IdUser={idUser} />
            )}
        </>
    );
}