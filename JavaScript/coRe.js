    var w
    var z
    var dataS = [];
    var dataL = [];
    var maiorRegr
    var menorRegr
    var a;
    var b;    
function entrada(){
    var valx = document.getElementById("independente").value;
    var valy = document.getElementById("dependente").value;
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
    document.getElementById("saida1").innerHTML= R;
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