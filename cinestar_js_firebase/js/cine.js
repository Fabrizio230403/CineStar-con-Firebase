import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, getDocs, doc, where, query, collection } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC52mqFgPMjho5bjB3un4wKLyYqcsbRIXs",
    authDomain: "cine-1a1af.firebaseapp.com",
    projectId: "cine-1a1af",
    storageBucket: "cine-1a1af.appspot.com",
    messagingSenderId: "501057256699",
    appId: "1:501057256699:web:e3ebc3d26dd1a5c80bc45e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCine = async () => {
    try {
        let id = new URLSearchParams(window.location.search).get('id');
        const cines = await getDocs(query(collection(db, 'cines'), where('id', '==', id)));

        cines.forEach((doc) => {
            const cine = doc.data();

            if (cine) {
                let htmlTarifas = '';
                cine.tarifas.forEach(tarifa => {
                    htmlTarifas += `
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-titulo">${tarifa.DiasSemana}</div>
                            <div class="celda">${tarifa.Precio}</div>
                        </div>
                    </div>
                    `;
                });

                let htmlPeliculas = '';
                cine.peliculas.forEach(pelicula => {
                    htmlPeliculas += `
                        <div class="cine-info peliculas">
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-titulo">${pelicula.Titulo}</div>
                                    <div class="celda">${pelicula.Horarios}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });

                const html = `
                    <h2>${cine.RazonSocial}</h2>
                    <div class="cine-info">
                        <div class="cine-info datos">
                            <p>${cine.Direccion} - ${cine.Detalle}</p> 
                            <p>Teléfono: ${cine.Telefonos}</p>
                            <br>                             
                            <div class="tabla">
                            ${htmlTarifas}
                            </div>

                            <div class="aviso">
                                <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                            </div>
                        </div>
                        <img src="img/cine/${cine.id}.2.jpg"/>
                        <br><br> 
                        <h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br>
                        <div class="cine-info peliculas">
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-cabecera">Películas</div>
                                    <div class="celda-cabecera">Horarios</div>
                                </div>

                            ${htmlPeliculas}

                            </div>
                        </div>
                    </div>
                    <div>
                        <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/><br>
                        <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                        Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.
                        <br><br>
                        Visitános y diviértete con nosotros. 
                        <br><br>
                        <b>CINESTAR</b>, siempre pensando en tí. 
                        </span>
                    </div>
                `;

                document.getElementById('contenido-interno').innerHTML = html;
            }
        });
    } catch (error) {
        console.error("Error al obtener la información del cine:", error);
    }
};