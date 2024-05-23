document.addEventListener("DOMContentLoaded", () => {
    const selectsPersonalizados = document.querySelectorAll(".custom-select");

    selectsPersonalizados.forEach(select => {
        const selecionado = select.querySelector(".selected-option");
        const opcoesContainer = select.querySelector(".options");
        const opcoes = select.querySelectorAll(".option");

        selecionado.addEventListener("click", () => {
            opcoesContainer.classList.toggle("open");
        });

        opcoes.forEach(opcao => {
            opcao.addEventListener("click", () => {
                selecionado.innerHTML = opcao.innerHTML;
                selecionado.dataset.value = opcao.dataset.value;
                opcoesContainer.classList.remove("open");
            });
        });

        document.addEventListener("click", (e) => {
            if (!select.contains(e.target)) {
                opcoesContainer.classList.remove("open");
            }
        });
    });

    const botaoConverter = document.getElementById("converter");
    botaoConverter.addEventListener("click", () => {
        const moedaOrigem = document.querySelector("#select-moeda-origem .selected-option").dataset.value;
        const moedaDestino = document.querySelector("#select-moeda-destino .selected-option").dataset.value;
        const valor = parseFloat(document.getElementById("recebeValor1").value);

        if (isNaN(valor)) {
            alert("Por favor, insira um valor numérico válido.");
            return;
        }

        // Exemplo de taxas de câmbio. Em uma aplicação real, você obteria estas taxas de uma API.
        const taxas = {
            "BRL": { "USD": 0.20, "EUR": 0.18, "BRL": 1},
            "USD": { "BRL": 5.00, "EUR": 0.90, "USD": 1},
            "EUR": { "BRL": 5.50, "USD": 1.10, "EUR": 1}
        };

        const taxa = taxas[moedaOrigem][moedaDestino];
        if (!taxa) {
            alert("Conversão não suportada.");
            return;
        }

        const valorConvertido = valor * taxa;
        document.getElementById("mostraConversao").value = valorConvertido.toFixed(2);
    });
});
