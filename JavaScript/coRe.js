(function() {
    const botaoArquivo = document.getElementById("arquivo2").addEventListener("change", () => {
        lerArquivo();
    })

    function lerArquivo() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const file = document.getElementById("arquivo2").files[document.getElementById("arquivo2").files.length - 1];
        const inputFile1 = document.getElementById("independente");
        const inputFile2 = document.getElementById("dependente");
        const regExp = [/.txt$/, /.csv$/];
        if (regExp[0].test(file.name) || regExp[1].test(file.name)) {
            const reader = new FileReader();
            reader.onload = () => {
                const data = reader.result.split(/\n/);

                inputFile1.value = data[0];
                inputFile2.value = data[1];
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




    var w
    var z
    var dataS = [];
    var dataL = [];
    var maiorRegr
    var menorRegr
    var a;
    var b;
function entrada(evt){
    evt.preventDefault();
    var valx = document.getElementById("independente").value;
    var valy = document.getElementById("dependente").value;
    var divP = document.querySelector("div.projecao");
    var resultados = document.getElementById("resultados");
    resultados.style.display = "block";

    valx = valx.replace(/,/g, '.');
    valy = valy.replace(/,/g, '.');
    console.log(valx, valy);
    
    divP.style.display = "inline-block";

    w = valx.split(";");
    z = valy.split(";");
    var somx = 0;
    var somy = 0;
    var somxy = 0;
    var somx2 = 0;
    var somy2 = 0;
    var tamanho = w.length

    for(var i = 0 ; i < w.length ; i++){ 
        w[i] = Number(w[i]);  
        z[i] = Number(z[i]);  
        somx = somx + w[i];
        somy = somy + z[i];
        somxy = somxy + (w[i]*z[i]);
        somx2 = somx2 + (w[i]*w[i]);
        somy2 = somy2 + (z[i]*z[i]);
    }    
    var S = 0;
    S = tamanho*somxy-(somx*somy);    
    var T = 0;
    T = ((tamanho*somx2-(somx*somx))*(tamanho*somy2-(somy*somy)));
    T = Math.sqrt(T);
    var R = S/T;
    R = R.toFixed(2);

    a = (tamanho*somxy-somx*somy)/(tamanho*somx2-(somx*somx));
    a = a.toFixed(2);
    b = ((somy/tamanho)-a*(somx/tamanho));
    b = b.toFixed(2);       
    maiorRegr = z[0];
    menorRegr = z[0];
    for (var i = 0; i < w.length; i++) {
        dataS.push({
            x: w[i],
            y: z[i]
        });
        if (maiorRegr < z[i]) {
            maiorRegr = z[i];
        }
        if (menorRegr > z[i]) {
            menorRegr = z[i];
        }
    }  

    document.getElementById("saidaA").innerHTML= a;
    document.getElementById("saidaB").innerHTML= b;
    document.getElementById("saida1").innerHTML="A probabilidade é de: " + R + "%";
    grafico();
}
function grafico() {
     let grafico = document.getElementById('grafico').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    dataL = [{
        x:(menorRegr - b) /a, y: menorRegr
    },{
        x:(maiorRegr - b) /a, y: maiorRegr
    }]   
    
    let massPopChart = new Chart(grafico, {
      type: 'scatter' , // bar, horizontalBar, pie, line, doughnut, radar, polarArea , scatter
      data: {
        
                    
        datasets: [{            
                data:dataS,
                backgroundColor: "#ff2200",
                borderColor: "#ff2200"                  
                 
        },{
            type: 'line',
            data: dataL,
            fill: false,
            borderColor:"#00008B",
            backgroundColor: "#00008B",
            showLine: true,
            pointRadius: 0
        }]
    
      },
      options:{        
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0
            }
        }                     
      }
        
      }
    );
}
function validacao2(){
    if((document.form.independente.value == "")||(document.form.dependente.value == "")){
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

function futura(evt){
    evt.preventDefault();
    var txtyf = document.getElementById("nDepe");
    var txtxf = document.getElementById("nInde");
    var yf = Number(txtyf.value);
    var xf = Number(txtxf.value);


    var final = 0;
    if((txtyf.value == "") && (txtxf.value != "")){
        final = Number(a) * xf + Number(b)
        txtyf.value = final.toFixed(2);
    }
    else if ((txtxf.value == "") && (txtyf.value != "")){
        final = (yf - Number(b)) / Number(a);
        txtxf.value = final.toFixed(2);
    }
    else if((txtxf.value != "" && txtyf.value != "")){
        alert("Por favor preencha apenas um dos dados")
    }
    else if ((txtxf.value == "") && (txtyf.value == "" )){
        alert("Por favor preencha um dos dados")
    }
}