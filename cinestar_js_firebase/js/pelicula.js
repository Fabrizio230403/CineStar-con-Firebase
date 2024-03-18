import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, getDocs ,doc, where,query,collection } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
	  
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

			export const getPelicula = async() => {

				let id = new URLSearchParams(window.location.search).get('id')
				const  peliculas = await getDocs(query(collection(db, 'peliculas'), where('id', '==', `${id}`)));
				let pelicula = 1
				peliculas.forEach((doc) => {
					 pelicula = doc.data()
			 

				    let html =`
					<br/><h1>Cartelera</h1><br/>
					<div class="contenido-pelicula">
					<div class="datos-pelicula">
						<h2>${pelicula.Titulo}</h2>
						<p>${pelicula.Sinopsis}</p>
						<br/>
						<div class="tabla">
							<div class="fila">
								<div class="celda-titulo">Título Original :</div>
								<div class="celda">${pelicula.Titulo}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Estreno :</div>
								<div class="celda">${pelicula.FechaEstreno}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Género :</div>
								<div class="celda">${pelicula.Generos}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Director :</div>
								<div class="celda">${pelicula.Director}</div>
							</div>
							<div class="fila">
								<div class="celda-titulo">Reparto :</div>
								<div class="celda">${pelicula.Reparto}</div>
							</div>
						</div>
					</div>
					<img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
				</div>
				<div class="pelicula-video">
					<embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
				</div>
					
				`;
				document.getElementById('contenido-interno').innerHTML = html
            });
		 }
		 
