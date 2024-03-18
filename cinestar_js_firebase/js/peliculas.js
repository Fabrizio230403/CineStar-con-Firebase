import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
			
			const firebaseConfig = {
				apiKey: "AIzaSyC52mqFgPMjho5bjB3un4wKLyYqcsbRIXs",
				authDomain: "cine-1a1af.firebaseapp.com",
				projectId: "cine-1a1af",
				storageBucket: "cine-1a1af.appspot.com",
				messagingSenderId: "501057256699",
				appId: "1:501057256699:web:e3ebc3d26dd1a5c80bc45e"
			};

			const app = initializeApp(firebaseConfig);
			const db = getFirestore(app);
			
			export const getPeliculas = async()=>{
				let id = new URLSearchParams(window.location.search).get('id')
				id = id == 'cartelera' ? 1 : id == 'estrenos' ? 2 : 0
				const consulta = query(collection(db, 'peliculas'), where('idEstado', '==', `${id}`), orderBy('id'));

				const peliculas = await getDocs(consulta)  
				let html = `<br/><h1>Cartelera</h1><br/>`
				peliculas.forEach((doc)=>{
					let pelicula = doc.data()
					
					html += `
					<div class="contenido-pelicula">
						<div class="datos-pelicula">
							<h2>${pelicula.Titulo}</h2><br/>
							<p>${pelicula.Sinopsis}</p>
							<br/>
							<div class="boton-pelicula"> 
								<a href="pelicula.html?id=${pelicula.id}">
									<img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
								</a>
							</div>
							<div class="boton-pelicula"> 
								<a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
									<img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver trailer"/>
								</a>
							</div> 
						</div>
						<img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
					</div>`
				})
				document.getElementById('contenido-interno').innerHTML=html
			}
			
			 