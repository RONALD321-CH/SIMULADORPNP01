// Lista de imágenes para cada pregunta
let imagenesPorPregunta = [
    "img1/respuesta_0_1.png", // Imagen para la pregunta 0
    "img1/respuesta_1_1.png", // Imagen para la pregunta 1
    "img1/respuesta_2_1.png", // Imagen para la pregunta 2
    "img1/respuesta_3_1.png", // Imagen para la pregunta 3
    "img1/respuesta_4_1.png", // Imagen para la pregunta 4
    "img1/respuesta_5_1.png", // Imagen para la pregunta 5
    "img1/respuesta_6_1.png", // Imagen para la pregunta 6
    "img1/respuesta_7_1.png", // Imagen para la pregunta 7
    "img1/respuesta_8_1.png", // Imagen para la pregunta 8
    "img1/respuesta_9_1.png"  // Imagen para la pregunta 9
  
];

let correctas = [4, 4, 1, 2, 2, 4, 3, 4, 4, 3]; // Respuestas correctas para cada pregunta








function respuesta(num_pregunta, seleccionada) {
    let id = "p" + num_pregunta;
    let labels = document.getElementById(id).querySelectorAll("label");

    // Limpiar clases previas
    labels.forEach(label => label.classList.remove("correcta", "incorrecta"));

    // Mostrar mensaje de correcto/incorrecto
    const mensaje = document.getElementById(`mensaje-p${num_pregunta}`);
    let respuesta_correcta = correctas[num_pregunta];
    labels[respuesta_correcta - 1].classList.add("correcta");

    if (seleccionada.value == respuesta_correcta) {
        mensaje.textContent = "Correcto";
        mensaje.style.color = "green";
    } else {
        seleccionada.parentNode.classList.add("incorrecta");
        mensaje.textContent = "Incorrecto";
        mensaje.style.color = "red";
    }

    // Deshabilitar opciones para evitar cambios
    labels.forEach(label => label.querySelector("input").disabled = true);

    // Mostrar imagen específica de la pregunta
    mostrarImagen(num_pregunta);
}

// Función para mostrar la imagen específica de cada pregunta
function mostrarImagen(num_pregunta) {
    const contenedorPregunta = document.getElementById(`p${num_pregunta}`).querySelector(".respuesta-imagen-contenedor");
    let imagenExistente = contenedorPregunta.querySelector("img");

    // Elimina cualquier imagen previa
    if (imagenExistente) {
        imagenExistente.remove();
    }

    // Crear y agregar nueva imagen
    let imagen = document.createElement("img");
    imagen.src = imagenesPorPregunta[num_pregunta]; // Ruta específica según la pregunta
    imagen.alt = `Imagen para la pregunta ${num_pregunta}`;
    imagen.className = "respuesta-imagen"; // Clase para estilos opcionales
    imagen.style.maxWidth = "100%";
    imagen.style.marginTop = "10px";

    // Agregar la nueva imagen al contenedor
    contenedorPregunta.appendChild(imagen);
}

// Función para cambiar entre preguntas
function mostrarPregunta(numeroPregunta) {
    document.querySelectorAll('.question').forEach((pregunta, index) => {
        pregunta.style.display = index === numeroPregunta ? 'block' : 'none';
    });
}


function mostrarResultados() {
    let totalPreguntas = correctas.length; // Total de preguntas
    let correctasCount = 0; // Contador para respuestas correctas
    let incorrectasCount = 0; // Contador para respuestas incorrectas
    let detalleRespuestas = '';

    // Contar respuestas correctas e incorrectas
    for (let i = 0; i < totalPreguntas; i++) {
        const seleccionada = document.querySelector(`input[name="p${i}"]:checked`);
        if (seleccionada) {
            if (parseInt(seleccionada.value) === correctas[i]) {
                correctasCount++;
                detalleRespuestas += `<li class="correcta">Pregunta ${i + 1}: Correcta</li>`;
            } else {
                incorrectasCount++;
                detalleRespuestas += `<li class="incorrecta">Pregunta ${i + 1}: Incorrecta</li>`;
            }
        } else {
            incorrectasCount++;
            detalleRespuestas += `<li class="incorrecta">Pregunta ${i + 1}: No respondida</li>`;
        }
    }

    // Mostrar resultados en la sección de resultados
    document.getElementById('resultado').textContent = correctasCount;
    document.getElementById('detalle').innerHTML = `
        <h3>Resumen:</h3>
        <p>Total de preguntas: ${totalPreguntas}</p>
        <p>Respuestas correctas: ${correctasCount}</p>
        <p>Respuestas incorrectas: ${incorrectasCount}</p>
        <ul>${detalleRespuestas}</ul>
    `;

    // Cambiar a la vista de resultados
    document.querySelectorAll('.question').forEach(pregunta => {
        pregunta.style.display = 'none';
    });
    document.getElementById('resultados').style.display = 'block';
}
