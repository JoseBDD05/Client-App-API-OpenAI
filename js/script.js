/**
 * Función asincrónica para enviar un mensaje a una API y mostrar la respuesta.
 * 
 * Captura el valor del campo de entrada, lo envía a una API en formato JSON
 * y muestra la respuesta en un elemento HTML. Maneja errores de entrada,
 * errores en la respuesta de la API y errores de conexión.
 */
async function enviarMensaje() {
    // Obtener el valor del input de mensaje
    const inputMensaje = document.getElementById("prompt").value;
    // Obtener el elemento donde se mostrará la respuesta
    const respuestaElemento = document.getElementById("respuesta");

    // Validar que el mensaje no esté vacío
    if (inputMensaje.trim() === "") {
        respuestaElemento.textContent = "Por favor, escribe un mensaje.";
        return;
    }

    // URL de la API a la que se enviará el mensaje (modificar según sea necesario)
    const url = "http://44.198.182.120/api-gpt-php/endpoints/chat.php"; 
    
    // Crear el objeto de datos con el mensaje
    const datos = { message: inputMensaje };

    try {
        // Enviar la solicitud a la API usando fetch
        const respuesta = await fetch(url, {
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json" // Indicar que se envía JSON
            },
            body: JSON.stringify(datos) // Convertir el objeto a una cadena JSON
        });

        // Convertir la respuesta en formato JSON
        const resultado = await respuesta.json();

        // Verificar si la respuesta de la API fue exitosa
        if (resultado.status === 200) {
            respuestaElemento.textContent = resultado.data.reply;
        } else {
            respuestaElemento.textContent = "Error en la respuesta de la API.";
        }
    } catch (error) {
        // Manejo de errores en la conexión con la API
        respuestaElemento.textContent = "Error en la conexión con la API.";
        console.error("Error:", error);
    }
}