function entrada(evt) {
    evt.preventDefault();
    var vmax = Number(document.getElementById("vMax").value);
    var vmin = Number(document.getElementById("vMin").value);
    var intervalo = document.getElementById("interv").value
    var dados = document.getElementById("intDados").value;
    var vet = dados.split(";");  

    var media = 0;
    media = ((vmax + vmin) / 2);   
    var dp = Math.sqrt(((vmax-vmin)** 2) /12).toFixed(2);
    var coef = ((dp / media)*100).toFixed(2);
    coef = coef + "%";
    var inter = 0;  
    if(intervalo == "menorQ"){
        inter = vet - vmin;
    }
    else if(intervalo == "maiorQ"){              
        inter = vmax - vet;
    }
    else{
        inter = vet[1] - vet[0];
    }
    var desuni = 0;
    desuni = ((1/(vmax - vmin))*inter).toFixed(2);
    desuni = (desuni * 100) + "%";
    document.getElementById("saida1").innerHTML ="A média é: "+ media +"</br> O desvio padrão é: " + dp + "</br> O coeficiente de variação é: " + coef + "</br> A probabilidade é de: " + desuni;
}

function validacao2(){
    if((document.formA.valorMax.value == "")||(document.formA.valorMin.value == "")||(document.formA.dados.value == "")){
        alert("Por favor preecha todos os campos!");
        return false; 
    }

    return true;
}

function start(evt) {
    let validation = validacao2();

    if(validation) {
        entrada(evt);
    }
}