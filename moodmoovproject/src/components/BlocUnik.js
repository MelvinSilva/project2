import React from 'react';
import axios from 'axios';
import { useEffect } from 'react'; 
import { useState } from 'react';
import ListeEvents from './ListeEvents';


const BlocUnik = () => {

    const [dataApi, setDataApi] = useState([])
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [genre, setGenre] = useState("")
    const [arrondissement, setArrondissement] = useState("")
    const [soumettreForm, setSoumettreForm] = useState(false) // soumission du formulaire initialement sur "faux"

    const submitForm = (e) => { // fonction qui appel l'api au moment du click sur le formulaire
        e.preventDefault();
        setSoumettreForm(true) // soumission du formulaire qui passe sur "vrai"
    }

    const dateFilter = `&q=date_start%3A%5B${dateStart}+TO+${dateEnd}%5D`
    // On choisi la date de debut dans l'input dateStart et la date de fin dans l'input dateEnd
   
    useEffect(() => { // Appel de l'api 
        axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-${dateFilter}${genre}${arrondissement}&rows=500`)
            .then((res) => {
                setDataApi(res.data.records)
            })
    }, [arrondissement, genre, dateFilter]) // dépendence qui relance la requete de l'api a chaque modif

    


    return (
        <div>
            <div className='unik'>
                <form className='ouSortir' onSubmit={(e) => submitForm(e)}> 
                    <p className='ouSortir__text'>OU SORTIR ?</p>
                    <select className='ouSortir__btn1' onChange={(e) => setArrondissement(e.target.value)}>
                        <option value="">--Arrondissement--</option>
                        <option value="&refine.address_zipcode=75001">Paris 75001</option>
                        <option value="&refine.address_zipcode=75002">Paris 75002</option>
                        <option value="&refine.address_zipcode=75003">Paris 75003</option>
                        <option value="&refine.address_zipcode=75004">Paris 75004</option>
                        <option value="&refine.address_zipcode=75005">Paris 75005</option>
                        <option value="&refine.address_zipcode=75006">Paris 75006</option>
                        <option value="&refine.address_zipcode=75007">Paris 75007</option>
                        <option value="&refine.address_zipcode=75008">Paris 75008</option>
                        <option value="&refine.address_zipcode=75009">Paris 75009</option>
                        <option value="&refine.address_zipcode=75010">Paris 75010</option>
                        <option value="&refine.address_zipcode=75011">Paris 75011</option>
                        <option value="&refine.address_zipcode=75012">Paris 75012</option>
                        <option value="&refine.address_zipcode=75013">Paris 75013</option>
                        <option value="&refine.address_zipcode=75014">Paris 75014</option>
                        <option value="&refine.address_zipcode=75015">Paris 75015</option>
                        <option value="&refine.address_zipcode=75016">Paris 75016</option>
                        <option value="&refine.address_zipcode=75017">Paris 75017</option>
                        <option value="&refine.address_zipcode=75018">Paris 75018</option>
                        <option value="&refine.address_zipcode=75019">Paris 75019</option>
                        <option value="&refine.address_zipcode=75020">Paris 75020</option>
                    </select>


                    <select className='ouSortir__btn1' onChange={(e) => setGenre(e.target.value)}>
                        <option value="">--Genre--</option>
                        <option value="&refine.tags=Art+contemporain">Art Contemporain</option>
                        <option value="&refine.tags=Atelier">Atelier</option>
                        <option value="&refine.tags=BD">BD</option>
                        <option value="&refine.tags=Balade">Balade</option>
                        <option value="&refine.tags=Brocante">Brocante</option>
                        <option value="&refine.tags=Cin%C3%A9ma">Cinéma</option>
                        <option value="&refine.tags=Cirque">Cirque</option>
                        <option value="&refine.tags=Clubbing">Clubbing</option>
                        <option value="&refine.tags=Concert">Concert</option>
                        <option value="&refine.tags=Conf%C3%A9rence">Conférence</option>
                        <option value="&refine.tags=Danse">Danse</option>
                        <option value="&refine.tags=Enfants">Enfants</option>
                        <option value="&refine.tags=Expo">Expo</option>
                        <option value="&refine.tags=Gourmand">Gourmand</option>
                        <option value="&refine.tags=Histoire">Histoire</option>
                        <option value="&refine.tags=Humour">Humour</option>
                        <option value="&refine.tags=Innovation">Innovation</option>
                        <option value="&refine.tags=LGBT">LGBT</option>
                        <option value="&refine.tags=Litt%C3%A9rature">Littérature</option>
                        <option value="&refine.tags=Loisirs">Loisirs</option>
                        <option value="&refine.tags=Musique">Musique</option>
                        <option value="&refine.tags=Nature">Nature</option>
                        <option value="&refine.tags=Peinture">Peinture</option>
                        <option value="&refine.tags=Photo">Photo</option>
                        <option value="&refine.tags=Salon">Salon</option>
                        <option value="&refine.tags=Sciences">Sciences</option>
                        <option value="&refine.tags=Solidarit%C3%A9">Solidarité</option>
                        <option value="&refine.tags=Spectacle+musical">Spectacle musical</option>
                        <option value="&refine.tags=Sport">Sport</option>
                        <option value="&refine.tags=Street-art">Street-art</option>
                        <option value="&refine.tags=Th%C3%A9%C3%A2tre">Théatre</option>
                    </select>
                    <div></div>
                    <input required onChange={(e) => setDateStart(e.target.value)} className='ouSortir__date' type="date" id="date" />
                    <input required onChange={(e) => setDateEnd(e.target.value)} className='ouSortir__date' type="date" id="date2" />
                    <button type="submit" className='ouSortir__btnVal'>VALIDER</button>
                </form>

            </div>
            <div>
                {soumettreForm && dataApi.map((api, key) => (  // on map le tableau avec les données de notre api SI  le formulaire a été soumis (&& = rendu conditionnel)
                    <ListeEvents api={api} key={key} />   // "api" est un props connecté à ListeEvents
                ))}
            </div>
        </div>
    );
};

export default BlocUnik;