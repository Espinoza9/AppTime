import { useState, } from "react";
import './Search.css';

function Search(props) {

    const [cidade, setCidade] = useState("");
    function SearchInput(e) {
        e.preventDefault();
        let correntValue = document.querySelector('input[name=SearchInput]').value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${correntValue}&appid=e7ab0b3967f0958bb759d08bcdeafbf2&units=metric`;
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
                                <h2>${Math.round(main.temp)}°</h2>
                                <h2>${sys.country}</h2>
                                <h2>${name}</h2>
                                <h2>${weather[0]['description']}</h2>
                            </div>
                        `)
                    }
                } else {
                    setCidade("");
                }

            })
    }

    return (
        <div className="searchwraper">
            <div className="search" >
                <h2>DIGITE O NOME DA CIDADE:</h2>
                <form onSubmit={(e) => SearchInput(e)}>
                    <input className="search-input" placeholder={props.placeholder} type="text" name="SearchInput" />
                    <input className="input" type="submit" value="Pesquisar por cidade!" />
                </form>
            </div>

            {
                (cidade !== "") ?
                    <div dangerouslySetInnerHTML={{ __html: cidade }} /> :
                    <div><h3>Pesquise Por Algo Acima....</h3></div>
            }
        </div>
    )
}

export default Search;