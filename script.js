
const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");
const salvar = document.getElementById("salvar");
const listaNotas = document.getElementById("listaNotas");

let notas = JSON.parse(localStorage.getItem("notas")) || [];

function mostrarNotas() {
    listaNotas.replaceChildren();

    notas.forEach((nota, indice) => {
        const card = document.createElement("div");
        card.className = "nota";

        const h3 = document.createElement("h3");
        h3.textContent = nota.titulo;

        const p = document.createElement("p");
        p.textContent = nota.texto;

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";

        excluir.addEventListener("click", () => {
            notas.splice(indice, 1);
            localStorage.setItem("notas", JSON.stringify(notas));
            mostrarNotas();
        });

        card.append(h3, p, excluir);
        listaNotas.appendChild(card);
    });
}

salvar.addEventListener("click", () => {
    if (!titulo.value.trim() || !texto.value.trim()) {
        alert("Preencha o título e o texto!");
        return;
    }

    notas.push({
        titulo: titulo.value.trim(),
        texto: texto.value.trim()
    });

    localStorage.setItem("notas", JSON.stringify(notas));

    titulo.value = "";
    texto.value = "";

    mostrarNotas();
});

mostrarNotas();
