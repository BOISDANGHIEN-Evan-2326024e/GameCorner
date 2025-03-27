import React, { useState } from "react";
import Login from "./login";
import Recherche from "./recherche";

export default function App() {
    const [logged, setLogged] = useState(false);

    return (
        <>
            {!logged ? (
                <Login logMe={setLogged} />
            ) : (
                <Recherche />
            )}
        </>
    );
}
