// Respuestas correctas
let correctas = [1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 
    1, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 3]
    ; // Solo 3 alternativas por pregunta (1=A, 2=B, 3=C)

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
}

function mostrarPregunta(numeroPregunta) {
    document.querySelectorAll('.question').forEach((pregunta, index) => {
        pregunta.style.display = index === numeroPregunta ? 'block' : 'none';
    });
}

function mostrarResultados() {
    let totalPreguntas = correctas.length;
    let correctasCount = 0;
    let detalleRespuestas = '';

    for (let i = 0; i < totalPreguntas; i++) {
        const seleccionada = document.querySelector(`input[name="p${i}"]:checked`);
        if (seleccionada && parseInt(seleccionada.value) === correctas[i]) {
            correctasCount++;
            detalleRespuestas += `<li>Pregunta ${i + 1}: Correcta</li>`;
        } else {
            detalleRespuestas += `<li>Pregunta ${i + 1}: Incorrecta</li>`;
        }
    }

    document.getElementById('resultado').textContent = correctasCount;
    document.getElementById('detalle').innerHTML = `<ul>${detalleRespuestas}</ul>`;
    document.querySelectorAll('.question').forEach(pregunta => pregunta.style.display = 'none');
    document.getElementById('resultados').style.display = 'block';
}
