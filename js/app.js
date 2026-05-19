// Evento que se ejecuta automáticamente al cargar la página completa
document.addEventListener("DOMContentLoaded", () => {
    cargarEdicionesPasadas();
});

// ARREGLO JS 1: Lectura del archivo JSON usando peticiones asíncronas (Fetch)
function cargarEdicionesPasadas() {
    const contenedor = document.getElementById("contenedor-ediciones");
    if (!contenedor) return;

    // Buscamos el archivo JSON de datos locales
    fetch("data/ediciones.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de datos JSON.");
            }
            return response.json();
        })
        .then(datos => {
            let htmlContenido = "<ul>";
            // Recorremos el JSON y construimos la estructura HTML dinámicamente
            datos.forEach(item => {
                htmlContenido += `
                    <li>
                        <strong>${item.edicion}:</strong> Proyecto Ganador: <em>${item.proyectoGanador}</em> — Institución: ${item.institucion}
                    </li>`;
            });
            htmlContenido += "</ul>";
            // Pintamos los datos en el HTML
            contenedor.innerHTML = htmlContenido;
        })
        .catch(error => {
            console.error("Error al procesar el JSON:", error);
            contenedor.innerHTML = "<p style='color:red;'>Ocurrió un error al cargar las ediciones pasadas desde el servidor local.</p>";
        });
}

// ARREGLO JS 2: Gestión del Formulario de Registro con Almacenamiento Local (LocalStorage)
function registrarUsuario(event) {
    event.preventDefault(); // Detiene el envío predeterminado para que la página no parpadee

    // Captura y lectura de los datos ingresados en el DOM
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("password").value;
    const categoria = document.getElementById("categoria").value;
    const equipo = document.getElementById("equipo").value;
    const institucion = document.getElementById("institucion").value;
    const proyecto = document.getElementById("proyecto").value;

    // Estructuración de datos en un Objeto JS
    const datosRegistro = {
        usuario,
        contrasena,
        categoria,
        equipo,
        institucion,
        proyecto
    };

    // Almacenamos el objeto convertido en cadena de texto dentro de la memoria local del navegador
    localStorage.setItem("usuarioRegistrado", JSON.stringify(datosRegistro));

    alert("¡Registro completado con éxito! Los datos se han guardado de forma local.");
    document.getElementById("formRegistro").reset(); // Limpia los campos del formulario
}

// ARREGLO JS 3: Autenticación, control de accesos y renderizado dinámico de perfiles
function iniciarSesion() {
    const loginUser = document.getElementById("loginUsuario").value;
    const loginPass = document.getElementById("loginPassword").value;

    // Traemos la información guardada previamente en la memoria del navegador
    const datosGuardados = localStorage.getItem("usuarioRegistrado");

    if (!datosGuardados) {
        alert("Error: No existen usuarios registrados en este equipo.");
        return;
    }

    // Convertimos la cadena de texto de vuelta a un objeto manipulable por JS
    const usuarioObjeto = JSON.parse(datosGuardados);

    // Verificación lógica de credenciales
    if (loginUser === usuarioObjeto.usuario && loginPass === usuarioObjeto.contrasena) {
        alert("¡Sesión iniciada correctamente! Cargando panel de control...");
        
        // Manipulamos el DOM para rellenar la ficha del perfil
        document.getElementById("verUsuario").textContent = usuarioObjeto.usuario;
        document.getElementById("verCategoria").textContent = usuarioObjeto.categoria;
        document.getElementById("verEquipo").textContent = usuarioObjeto.equipo;
        document.getElementById("verInstitucion").textContent = usuarioObjeto.institucion;
        document.getElementById("verProyecto").textContent = usuarioObjeto.proyecto;
        
        // Modificamos el estilo CSS del bloque para hacerlo visible al usuario
        document.getElementById("perfilUsuario").style.display = "block";
    } else {
        alert("Credenciales incorrectas. Verifique el usuario o la contraseña ingresada.");
    }
}