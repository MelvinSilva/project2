import React from 'react';
import { useContext } from 'react';
import DisplayApi from './DisplayApi';

const DemoCarousel = () => {
    const { resultApi } = useContext(DisplayApi)
    
    return (
        <div className='carouselmodif'>
                {resultApi.map((api, key) => ( // on map le tableau avec les données de notre api
                    <div api={api} key={key} >
                        <h1><strong>{api.fields.title}</strong></h1>
                        {api.fields.date_description && <h4>{api.fields.date_description.split("<br />").join(" ")}</h4>}
                        <img width="500px" height="300"src={api.fields.cover_url ? api.fields.cover_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/1200px-Pas_d%27image_disponible.svg.png"} alt="ok" />
                        <h5><em>{api.fields.address_name}</em> - {api.fields.address_street}, {api.fields.address_zipcode} {api.fields.address_city}</h5>
                        <p>{api.fields.price_detail}</p>
                        {api.fields.access_link && <p><a className="link" href={api.fields.access_link}>Voir le site de l'évenement</a></p>}
                    </div>
                ))}
        </div>
    );
}


export default DemoCarousel;