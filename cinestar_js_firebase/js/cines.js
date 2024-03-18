import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, getDocs, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
	  
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

			export const getCines = async () => {
				try {
					 
					const consulta = query(collection(db, 'cines'), orderBy('id'));
					const cines = await getDocs(consulta);
                    let html = '<br/><h1>Nuestros Cines</h1><br/>'
					cines.forEach((doc) => {
						const cine = doc.data();
						html += `
							<div class="contenido-cine">
								<img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
								<div class="datos-cine">
									<h4>${cine.RazonSocial}</h4><br/>
									<span>${cine.Direccion} - ${cine.Detalle}<br/><br/>Teléfono: ${cine.Telefonos}</span>
								</div>
								<br/>
								<a href="cine.html?id=${cine.id}">
									<img src="img/varios/ico-info2.png" width="150" height="40"/>
								</a>
							</div>`;
					});
					document.getElementById('contenido-interno').innerHTML = html;
				} catch (error) {
					console.error("Error al obtener los cines:", error);
				}
			};
			 
//SOY PIERO XD