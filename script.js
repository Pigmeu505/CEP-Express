document.getElementById("cepForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove non-numeric characters
    const result = document.getElementById("result");
    const loading = document.getElementById("loading");
    
    if (cep.length === 8) {
        loading.style.display = "block";
        result.style.display = "none";
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP inválido.");
                } else {
                    document.getElementById("cepResult").textContent = data.cep;
                    document.getElementById("logradouro").textContent = data.logradouro;
                    document.getElementById("bairro").textContent = data.bairro;
                    document.getElementById("localidade").textContent = data.localidade;
                    document.getElementById("uf").textContent = data.uf;
                    
                    result.style.display = "block";
                }
            })
            .catch(error => {
                alert("Erro ao buscar o CEP. Tente novamente.");
            })
            .finally(() => {
                loading.style.display = "none";
            });
    } else {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
    }
});
