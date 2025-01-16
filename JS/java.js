let correctas = [1, 1, 3, 4, 2, 1, 3, 2, 3, 1]; // Respuestas correctas para las 10 preguntas
let opcion_elegida = [];
let cantidad_correctas = 0;

// Función para registrar la respuesta
function respuesta(num_pregunta, seleccionada) {
    opcion_elegida[num_pregunta] = seleccionada.value; // Guardar respuesta del usuario
    let id = "p" + num_pregunta;
    let labels = document.getElementById(id).querySelectorAll("label");

    // Limpiar clases previas
    labels.forEach(label => label.classList.remove("correcta", "incorrecta"));

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

    // Deshabilitar opciones
    labels.forEach(label => label.querySelector("input").disabled = true);
}

// Función para mostrar pregunta específica
function mostrarPregunta(numeroPregunta) {
    document.querySelectorAll('.question').forEach((pregunta, index) => {
        pregunta.style.display = index === numeroPregunta ? 'block' : 'none';
    });
}

// Función para mostrar resultados
function mostrarResultados() {
    cantidad_correctas = 0;
    let resumenHTML = `<h3>Resumen:</h3><ul>`;
    for (let i = 0; i < correctas.length; i++) {
        let correcta = convertirValorALetra(correctas[i]);
        let respuestaUsuario = opcion_elegida[i]
            ? convertirValorALetra(opcion_elegida[i])
            : "No respondida";

        if (respuestaUsuario === correcta) {
            cantidad_correctas++;
            resumenHTML += `<li style="color: green;">Pregunta ${i + 1}: Correcto (Respuesta: ${correcta})</li>`;
        } else {
            resumenHTML += `<li style="color: red;">Pregunta ${i + 1}: Incorrecto (Correcta: ${correcta}, Tu respuesta: ${respuestaUsuario})</li>`;
        }
    }
    resumenHTML += `</ul>`;
    document.getElementById("resultado").innerText = cantidad_correctas;
    document.getElementById("detalle").innerHTML = "";
    document.getElementById("resumen").innerHTML = resumenHTML;
    document.querySelectorAll('.question').forEach(pregunta => pregunta.style.display = 'none');
    document.getElementById("resultados").style.display = 'block';
}

// Función para convertir números a letras
function convertirValorALetra(valor) {
    const opciones = ["A", "B", "C", "D", "E"];
    return opciones[valor - 1] || "No válida";
}
