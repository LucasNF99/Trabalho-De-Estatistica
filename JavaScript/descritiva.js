/*############################## Entrada de Dados ##############################*/
(function() {
    const botaoArquivo = document.getElementById("arquivo").addEventListener("change", () => {
        lerArquivo();
    })

    function lerArquivo() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const file = document.getElementById("arquivo").files[document.getElementById("arquivo").files.length - 1];
        const inputFile = document.getElementById("variavel");
        const regExp = [/.txt$/, /.csv$/];
        if (regExp[0].test(file.name) || regExp[1].test(file.name)) {
            const reader = new FileReader();
            reader.onload = () => {
                inputFile.value = reader.result;
            };
            reader.readAsText(file);
        }
        else {
            alert('Escolha um arquivo no formato .txt ou .csv');
        }
    }
    else {
        alert('Seu navegador nao suporta essa funcionalidade');
    }
    }
})();
    var grafnomes = [];
    var grafdados = [];
    var tipografico
    var CP = 0;
    var BP = 0;
function entrada(evt) {
    evt.preventDefault();
    var dados = document.getElementById("variavel").value;
    var tipo = document.getElementById("tipoVariavel").value;
    var nomeVar = document.getElementById("nomeVariavel").value;
    var tipoPesquisa = document.getElementById("tipoPesquisa").value;
    var ordemVar = document.getElementById("ordemVariavel").value;
    var separatriz = document.getElementById("separatriz").value;
    var vet = dados.split(";");
    var ordem = ordemVar.split(";");
    var separat = separatriz.split(".");   
    
    if (tipo == "QLordinal") {
        insedireta(vet);
        QLordinal(vet, nomeVar, ordem, separat); 
        tipografico = "pie";      
    }
    else if (tipo == "QLnominal") {
        insedireta(vet);
        QLnominal(vet, nomeVar, separat);   
        tipografico = "pie";       
    }
    else if (tipo == "QNdiscreta") {
        insedireta(vet);
        QNdiscreta(vet, nomeVar, tipoPesquisa, separat);
        tipografico = "bar"; 
        CP = 0.8
        BP = 0.9 
    }
    else if (tipo == "QNcontinua") {
        insedireta(vet);
        QNcontinua(vet, nomeVar, tipoPesquisa, separat);
        tipografico = "bar"; 
        BP = 1;
        CP = 1;
    }
    grafico();
}
/*##############################Qualitativa Ordinal##############################*/
function QLordinal(vet, nomeVar, ordem, separat) {
    insedireta(vet);
    var QL = [];

    for (var i = 0; i < ordem.length; i++) {
        for (var j = 0; j < vet.length; j++) {
            if (ordem[i] == vet[j]) {
                QL.push(vet[j])
            }
        }
    }


    var matriz = [];
    matriz[0] = [];
    matriz[0][0] = nomeVar;
    matriz[0][1] = "Quantidade";
    matriz[0][2] = "Fi";
    matriz[0][3] = " Fac ";
    matriz[0][4] = " Fac %";
    matriz[1] = [];
    matriz[1][0] = QL[0];
    matriz[1][1] = 1;
    var r = 1;
    for (var i = 1; i < QL.length; i++) {
        if (matriz[r][0] == QL[i]) {
            matriz[r][1]++;
        }
        else {
            r++;
            matriz[r] = [];
            matriz[r][0] = QL[i];
            matriz[r][1] = 1;
        }
    }
    total = QL.length;
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][1] * 100) / total;
    }
    matriz[1][3] = matriz[1][1];
    for (var i = 2; i < matriz.length; i++) {
        matriz[i][3] = matriz[i - 1][3] + matriz[i][1];
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][4] = (matriz[i][3] * 100) / total;
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][2].toFixed(2));
        matriz[i][2] = matriz[i][2] + "%";
        matriz[i][4] = (matriz[i][4].toFixed(2));
        matriz[i][4] = matriz[i][4] + "%";
    }
    var conteudo = "<table class='table tabela-cor table-striped'><tr>";
    for (var i = 0; i < 5; i++) {
        conteudo = conteudo + "<th>" + matriz[0][i] + "</th>";
    }
    for (var i = 1; i < matriz.length; i++) {
        conteudo = conteudo + "<tr>";
        conteudo = conteudo + "<td>" + matriz[i][0] + "</td>"
        for (var j = 1; j < 5; j++) {
            conteudo = conteudo + "<td>";
            conteudo = conteudo + matriz[i][j];
            conteudo = conteudo + "</td>";
        }
        conteudo = conteudo + "</tr>";
    }
    conteudo = conteudo + "</table>";

    //MEDIANA
    var mediana = "";
    var meio = Math.floor(QL.length / 2);

    if (QL.length % 2 == 0) {
        mediana = vet[meio - 1];
        mediana = mediana + ", ";
        mediana = mediana + QL[meio];
    }
    else {
        mediana = (QL[meio]);
    }
    //MODA
    var cont = 0; var aux = 0; var moda = [];
    moda[0] = vet[0];
    for (var i = 0; i < vet.length; i++) {
        for (var j = 0; j < vet.length; j++) {
            if (vet[i] == vet[j]) {
                cont += 1;
            }
            if (aux < cont) {
                aux = cont;
                moda.length = 0;
                moda.push(vet[i]);
            }
            else if ((aux == cont) & (vet[i] != moda[moda.length])) {
                aux = cont;
                moda.push(vet[i]);
            }
        }
        cont = 0;
    }
    var q = [];
    q[0] = moda[0];
    var w = 0;
    for (var i = 0; i < moda.length; i++) {
        if (q[w] != moda[i]) {
            q.push(moda[i]);
            w++;
        }
    }

    //Medidas separatrizes
    var separa = 0;
    var percent = 0;
    var resulmed = 0;
    for (var i = 0 ; i < 101 ; i++){
        if (separat[1] == i)
        separa = i
    }
    percent = (separa * QL.length)/100 
    percent = Math.round(percent)
    resulmed = QL[percent - 1]

    for (var i = 1 ; i < matriz.length ; i++){
        grafnomes[i-1] = matriz[i][0];
        grafdados[i-1] = matriz[i][1];
   }


    document.getElementById("saida1").innerHTML = conteudo
    if (vet.length == q.length) {
        document.getElementById("saida2").innerHTML = " <br/> Mediana: " + mediana + "<br/> Não exite moda" + "<br/> A medida separatriz é: " + resulmed ;
    }
    else {
        document.getElementById("saida2").innerHTML = " <br/> Mediana: " + mediana + "<br/> Moda: " + q +"<br/> A medida separatriz é: " + resulmed ;
    }
}
/*##############################Qualitativa Nominal##############################*/
function QLnominal(vet, nomeVar, separat) {
    insedireta(vet);
    var matriz = [];
    matriz[0] = [];
    matriz[0][0] = nomeVar;
    matriz[0][1] = "Quantidade";
    matriz[0][2] = "Fi";
    matriz[0][3] = " Fac ";
    matriz[0][4] = " Fac %";
    matriz[1] = [];
    matriz[1][0] = vet[0];
    matriz[1][1] = 1;
    var r = 1;
    for (var i = 1; i < vet.length; i++) {
        if (matriz[r][0] == vet[i]) {
            matriz[r][1]++;
        }
        else {
            r++;
            matriz[r] = [];
            matriz[r][0] = vet[i];
            matriz[r][1] = 1;
        }
    }
    total = vet.length;
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][1] * 100) / total;
    }
    matriz[1][3] = matriz[1][1];
    for (var i = 2; i < matriz.length; i++) {
        matriz[i][3] = matriz[i - 1][3] + matriz[i][1];
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][4] = (matriz[i][3] * 100) / total;
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][2].toFixed(2));
        matriz[i][2] = matriz[i][2] + "%";
        matriz[i][4] = (matriz[i][4].toFixed(2));
        matriz[i][4] = matriz[i][4] + "%";
    }
    var conteudo = "<table class='table tabela-cor table-striped'><tr>";
    for (var i = 0; i < 5; i++) {
        conteudo = conteudo + "<th>" + matriz[0][i] + "</th>";
    }
    for (var i = 1; i < matriz.length; i++) {
        conteudo = conteudo + "<tr>";
        conteudo = conteudo + "<td>" + matriz[i][0] + "</td>"
        for (var j = 1; j < 5; j++) {
            conteudo = conteudo + "<td>";
            conteudo = conteudo + matriz[i][j];
            conteudo = conteudo + "</td>";
        }
        conteudo = conteudo + "</tr>";
    }
    conteudo = conteudo + "</table>";

    //MEDIANA
    var mediana = "";
    var meio = Math.floor(vet.length / 2);

    if (vet.length % 2 == 0) {
        mediana = vet[meio - 1];
        mediana = mediana + ", ";
        mediana = mediana + vet[meio];
    }
    else {
        mediana = (vet[meio]);
    }
    //MODA
    var cont = 0; var aux = 0; var moda = [];
    moda[0] = vet[0];
    for (var i = 0; i < vet.length; i++) {
        for (var j = 0; j < vet.length; j++) {
            if (vet[i] == vet[j]) {
                cont += 1;
            }
            if (aux < cont) {
                aux = cont;
                moda.length = 0;
                moda.push(vet[i]);
            }
            else if ((aux == cont) & (vet[i] != moda[moda.length])) {
                aux = cont;
                moda.push(vet[i]);
            }
        }
        cont = 0;
    }
    var q = [];
    q[0] = moda[0];
    var w = 0;
    for (var i = 0; i < moda.length; i++) {
        if (q[w] != moda[i]) {
            q.push(moda[i]);
            w++;
        }
    }

   //Medidas separatrizes
   var separa = 0;
   var percent = 0;
   var resulmed = 0;
   for (var i = 0 ; i < 101 ; i++){
       if (separat[1] == i)
       separa = i
   }
   percent = (separa * vet.length)/100 
   percent = Math.round(percent)
   resulmed = vet[percent - 1]

   for (var i = 1 ; i < matriz.length ; i++){
     grafnomes[i-1] = matriz[i][0];
     grafdados[i-1] = matriz[i][1];
}


    document.getElementById("saida1").innerHTML = conteudo
    if (vet.length == q.length) {
        document.getElementById("saida2").innerHTML =" <br/> Mediana: " + mediana + "<br/> Não exite moda" +"<br/> A medida separatriz é: " + resulmed ;
    }
    else {
        document.getElementById("saida2").innerHTML =" <br/> Mediana: " + grafnomes + "<br/> Moda: " + q +"<br/> A medida separatriz é: " + resulmed ;
    }
   
}
/*##############################Quantitativa Discreta##############################*/
function QNdiscreta(vet, nomeVar, tipoPesquisa, separat) {
    for (var i = 0; i < vet.length; i++) {
        vet[i] = Number(vet[i]);
    }
    insedireta(vet);
    var media = 0;
    //media
    for (var i = 0; i < vet.length; i++) {
        media = media + vet[i];
    }
    media = media / vet.length;
    media = media.toFixed(2);
    //moda
    var cont = 0; var aux = 0; var moda = [];
    moda[0] = vet[0];
    for (var i = 0; i < vet.length; i++) {
        for (var j = 0; j < vet.length; j++) {
            if (vet[i] == vet[j]) {
                cont += 1;
            }
            if (aux < cont) {
                aux = cont;
                moda.length = 0;
                moda.push(vet[i]);
            }
            else if ((aux == cont) & (vet[i] != moda[moda.length])) {
                aux = cont;
                moda.push(vet[i]);
            }
        }
        cont = 0;
    }
    var q = [];
    q[0] = moda[0];
    var w = 0;
    for (var i = 0; i < moda.length; i++) {
        if (q[w] != moda[i]) {
            q.push(moda[i]);
            w++;
        }
    }
    //mediana
    var mediana = 0;
    var meio = Math.floor(vet.length / 2);

    if (vet.length % 2) {
        mediana = vet[meio];
    }
    else {
        mediana = (vet[meio - 1] + vet[meio]) / 2;
    }


    var matriz = [];
    matriz[0] = [];
    matriz[0][0] = nomeVar;
    matriz[0][1] = "Quantidade";
    matriz[0][2] = "Fi";
    matriz[0][3] = " Fac ";
    matriz[0][4] = " Fac % ";
    matriz[1] = [];
    matriz[1][0] = vet[0];
    matriz[1][1] = 1;
    var r = 1;
    for (var i = 1; i < vet.length; i++) {
        if (matriz[r][0] == vet[i]) {
            matriz[r][1]++;
        }
        else {
            r++;
            matriz[r] = [];
            matriz[r][0] = vet[i];
            matriz[r][1] = 1;

        }
    }
    total = vet.length;
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][1] * 100) / total;
    }
    matriz[1][3] = matriz[1][1]
    for (var i = 2; i < matriz.length; i++) {
        matriz[i][3] = matriz[i - 1][3] + matriz[i][1];
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][4] = (matriz[i][3] * 100) / total;
    }
    //desvio padrão
    var desviopadrao = 0
    var dp = 0
    for (var i = 1; i < matriz.length; i++) {
        dp = dp + ((matriz[i][0] - media) * (matriz[i][0] - media)) * matriz[i][1]
    }
    if (tipoPesquisa == "amostra") {
        desviopadrao = dp / (vet.length - 1);
    }
    else {
        desviopadrao = dp / (vet.length);
    }
    desviopadrao = Math.sqrt(desviopadrao);
    desviopadrao = desviopadrao.toFixed(2);
    // coeficiente de variação
    var cv = (desviopadrao / media) * 100
    cv = cv.toFixed(2)
    cv = cv + "%"

    //Medidas separatrizes
    var separa = 0;
    var percent = 0;
    var resulmed = 0;
    for (var i = 0 ; i < 101 ; i++){
        if (separat[1] == i)
        separa = i
    }
    percent = (separa * vet.length)/100 
    percent = Math.round(percent)
    resulmed = vet[percent - 1]
   



    for (var i = 1; i < matriz.length; i++) {
        matriz[i][2] = (matriz[i][2].toFixed(2));
        matriz[i][2] = matriz[i][2] + "%";
        matriz[i][4] = (matriz[i][4].toFixed(2));
        matriz[i][4] = matriz[i][4] + "%";
    }

    var conteudo = "<table class='table tabela-cor table-striped'><tr>";
    for (var i = 0; i < 5; i++) {
        conteudo = conteudo + "<th>" + matriz[0][i] + "</th>";
    }
    for (var i = 1; i < matriz.length; i++) {
        conteudo = conteudo + "<tr>";
        conteudo = conteudo + "<td>" + matriz[i][0] + "</td>"
        for (var j = 1; j < 5; j++) {
            conteudo = conteudo + "<td>";
            conteudo = conteudo + matriz[i][j];
            conteudo = conteudo + "</td>";
        }
        conteudo = conteudo + "</tr>";
    }
    conteudo = conteudo + "</table>";

    for (var i = 1 ; i < matriz.length ; i++){
        grafnomes[i-1] = matriz[i][0];
        grafdados[i-1] = matriz[i][1];
   }

    document.getElementById("saida1").innerHTML = conteudo;
    if (vet.length == q.length) {
        document.getElementById("saida2").innerHTML = " A média é: " + media + " <br/>  A mediana é: " + mediana + " <br/> Não existe moda. " + "<br/> O desvio Padrao é: " + desviopadrao + "<br/> O Coeficiente de variação é: " + cv +"<br/> A medida separatriz é: " + resulmed ;
    }
    else {
        document.getElementById("saida2").innerHTML = " A média é: " + media + " <br/>  A mediana é: " + mediana + " <br/> A moda é: " + q + "<br/> O desvio Padrao é: " + desviopadrao + "<br/> O Coeficiente de variação é: " + cv +"<br/> A medida separatriz é: " + resulmed;
    }
}
/*##############################Quantitativa Continua##############################*/
function QNcontinua(vet, nomeVar, tipoPesquisa, separat) {
    for (var i = 0; i < vet.length; i++) {
        vet[i] = Number(vet[i]);
    }
    insedireta(vet);

    var matriz = [];
    matriz[0] = [];
    matriz[0][0] = "Classes";
    matriz[0][1] = nomeVar;
    matriz[0][2] = "Quantidades";
    matriz[0][3] = "fi";
    matriz[0][4] = " Fac ";
    matriz[0][5] = " Fac % ";

    var classes;
    var amplia;
    var interv = 0;
    var auxi = 2;
    classes = (Math.floor(Math.sqrt(vet.length)));
    amplia = vet[vet.length - 1] - vet[0];

    for (var i = 1; i < 4;i++){
        for(var j = 0 ; j < 3 ; j++){
            if (((amplia + i)%((classes-1)+j)) == 0){
                interv = ((amplia + i)/((classes-1)+j))
                classes = ((classes-1)+j)
                auxi = 1;
                break;                
            }
        }
        if (auxi == 1){
            break;
        }
    }

    for (var i = 0; i < classes; i++) {
        matriz[i + 1] = [];
        matriz[i + 1][0] = i + 1;
    }
    var o = interv;
    matriz[1][1] = vet[0] + o;
    for (var i = 2; i < classes + 1; i++) {
        matriz[i][1] = matriz[i - 1][1] + interv;
    }

    var x = vet[0];
    for (var j = 1; j < matriz.length; j++) {
        matriz[j][2] = 0;
        for (var i = 0; i < vet.length; i++) {
            if ((vet[i] >= x) && (vet[i] < (x + interv))) {
                matriz[j][2]++;
            }
        }
        x = x + interv;
    }
    total = vet.length;
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][3] = (matriz[i][2] * 100) / total;
    }
    matriz[1][4] = matriz[1][2];
    for (var i = 2; i < matriz.length; i++) {
        matriz[i][4] = matriz[i - 1][4] + matriz[i][2];
    }
    for (var i = 1; i < matriz.length; i++) {
        matriz[i][5] = (matriz[i][4] * 100) / total;
    }

    var media = 0;
    //media
    var sa = 0;
    for (var i = 1; i < matriz.length; i++) {
        sa = sa + (((matriz[i][1] + (matriz[i][1] - interv)) / 2) * matriz[i][2]);
    }
    media = sa / vet.length;
    media = media.toFixed(2);

    //moda
    var moda = [];
    var aux = 0;

    for (var i = 1; i < matriz.length; i++) {
        if (matriz[i][2] > aux) {
            aux = matriz[i][2];
        }
    }
    for (var i = 1; i < matriz.length; i++) {
        if (matriz[i][2] == aux) {
            moda.push((matriz[i][1] + (matriz[i][1] - interv)) / 2);
        }
    }

    //mediana   
    var mediana = 0
    var ca = (vet.length / 2);
    var inter = 0
    var facant = 0
    var pimedia = 0
    for (var i = 1; i < matriz.length; i++) {
        if ((media < matriz[i][1]) && (media > (matriz[i][1] - interv))) {
            inter = matriz[i][1] - interv;
            if(matriz[i - 1][4] == " Fac " ) {
                facant = 0
            }
            else {
            facant = matriz[i - 1][4]
            }
            pimedia = matriz[i][2]
        }        
    }
    mediana = inter + ((ca - facant) / pimedia) * interv
    mediana = mediana.toFixed(2);

    //desvio padrão
    var desviopadrao = 0
    var dp = 0
    for (var i = 1; i < matriz.length; i++) {
        dp = dp + ((((matriz[i][1] + (matriz[i][1] - interv)) / 2) - media) * (((matriz[i][1] + (matriz[i][1] - interv)) / 2) - media)) * matriz[i][2];
    }
    if (tipoPesquisa == "amostra") {
        desviopadrao = dp / (vet.length - 1);
    }
    else {
        desviopadrao = dp / (vet.length);
    }
    desviopadrao = Math.sqrt(desviopadrao);
    desviopadrao = desviopadrao.toFixed(2);
    // coeficiente de variação
    var cv = (desviopadrao / media) * 100
    cv = cv.toFixed(2)
    cv = cv + "%"

    //Medidas separatrizes
    var separa = 0;
    var percent = 0;
    for (var i = 0 ; i < 101 ; i++){
        if (separat[1] == i)
        separa = i
    }
    percent = (separa * vet.length)/100 
    percent = Math.round(percent)
    var infer = 0;
    var aux1 = 1;
    var fc2 
    var fclas 
    for (var i = 1 ; i < matriz.length ; i++){
        if ((percent <= matriz[i][4])&&(percent >= aux1)){
            infer = matriz[i][1] - interv;
            if (matriz[i-1][4] == " Fac "){
                fc2 = 0 ;
            }
            else{
                fc2 = matriz[i-1][4];
            }
            fclas = matriz[i][2];
        }        
        
        aux1 = aux1 + matriz[i][4];
    } 
    var resulmed = infer + ((percent - fc2)/fclas)*interv
    resulmed = resulmed.toFixed(2);
    
    
    
    

    for (var i = 1; i < matriz.length; i++) {
        matriz[i][3] = (matriz[i][3].toFixed(2));
        matriz[i][3] = matriz[i][3] + "%";
        matriz[i][5] = (matriz[i][5].toFixed(2));
        matriz[i][5] = matriz[i][5] + "%";
    }
    matriz[1][1] = (vet[0] + " |-- " + (matriz[1][1]));
    for (var i = 2; i < classes + 1; i++) {
        var z = matriz[i][1] - interv;
        matriz[i][1] = (z + " |-- " + (matriz[i][1]));
    }

    var conteudo = "<table class='table tabela-cor table-striped'><tr>";
    for (var i = 0; i < 6; i++) {
        conteudo = conteudo + "<th>" + matriz[0][i] + "</th>";
    }
    for (var i = 1; i < matriz.length; i++) {
        conteudo = conteudo + "<tr>";
        conteudo = conteudo + "<td>" + matriz[i][0] + "</td>"
        for (var j = 1; j < 6; j++) {
            conteudo = conteudo + "<td>";
            conteudo = conteudo + matriz[i][j];
            conteudo = conteudo + "</td>";
        }
        conteudo = conteudo + "</tr>";
    }
    conteudo = conteudo + "</table>";

    for (var i = 1 ; i < matriz.length ; i++){
        grafnomes[i-1] = matriz[i][1];
        grafdados[i-1] = matriz[i][2];
   }

    document.getElementById("saida1").innerHTML = conteudo;

    document.getElementById("saida2").innerHTML = " A média é: " + media  + " <br/> A mediana é: " + mediana + "<br/> A moda é: " + moda + "<br/> O desvio Padrão é: " + desviopadrao + "<br/> O Coeficiente de variação é: " + cv +"<br/> A medida separatriz é: " + resulmed;


}
/*############################## Organiza o Vetor##############################*/
function insedireta(vet) {
    var i, x, k, j;
    for (i = 1; i < vet.length; ++i) {
        x = vet[i];
        k = 0;
        j = i - 1;
        while (j >= 0 && k == 0) {
            if (x < vet[j]) {
                vet[j + 1] = vet[j];
                --j;
            } else {
                k = j + 1;
            }
        }
        vet[k] = x;
    }
}

function grafico() {
     let grafico = document.getElementById('grafico').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(grafico, {
      type: [] = tipografico , // bar, horizontalBar, pie, line, doughnut, radar, polarArea , scatter
      data:{
        labels:[] = grafnomes,
        datasets:[{
          
          data:[] = grafdados,
          columnwidth: 0,

          //backgroundColor:'green',
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(41, 219, 145, 0.6)',
            'rgba(41, 98, 219, 0.6)',
            'rgba(249, 11, 11, 0.6)',
            'rgba(50, 230, 0, 0.6)',
            'rgba(107, 230, 0, 0.6)',
            'rgba(42, 0, 255, 0.6)',
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:false,
        },
        scales: {
             xAxes: [{
                categoryPercentage: CP,
                barPercentage:  BP
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend:{
          display:false,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
}
function validacao2(){
    if((document.form.nomeVar.value == "")||(document.form.variavel.value == "")){
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