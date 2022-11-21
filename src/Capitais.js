import { useState, useEffect } from "react";
import './Search.css';

const ListaDeCapitais = [
    ["Porto Velho"],
    ["Manaus"],
    ["Rio Branco"],
    ["Campo Grande"],
    ["Macapá Amapá"],
    ["Brasília"],
    ["Boa Vista"],
    ["Cuiabá"],
    ["Palmas"],
    ["São Paulo"],
    ["Teresina"],
    ["Rio de Janeiro"],
    ["Belém"],
    ["Goiânia"],
    ["Salvador"],
    ["Florianópolis"],
    ["São Luís"],
    ["Maceió"],
    ["Porto Alegre"],
    ["Curitiba"],
    ["Belo Horizonte"],
    ["Fortaleza"],
    ["Recife"],
    ["João Pessoa"],
    ["Aracaju"],
    ["Natal"],
    ["Vitória"]
];

function Capitais() {

    const [cidade, setCidade] = useState('Campo Grande, bra');
    function SearchInput(correntValue) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${correntValue + ', bra'}&appid=e7ab0b3967f0958bb759d08bcdeafbf2&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                if (sys !== undefined) {
                    if (weather !== undefined) {
                        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                        setCidade(`
                            <div>
                                <img src="${icon}" bgcolor="red" width="70px"/>
                                <h3>${Math.round(main.temp)}°, ${name}, ${sys.country}</h3>
                            </div>
                        `)
                    }
                } else {
                    setCidade("");
                }
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log( Math.round(Math.random() * 26) );
            SearchInput(ListaDeCapitais[Math.round(Math.random() * 26)][0]);
            // SearchInput(ListaDeCapitais[2][0]);
        }, 4000);
        return () => clearInterval(interval);
    });

    return (
        <div className="searchwraper">
            {
                (cidade !== "") ?
                    <div dangerouslySetInnerHTML={{ __html: cidade }} /> :
                    <div><h3>Pesquise Por Algo Acima....</h3></div>
            }
        </div>
    )
}

export default Capitais;