function entrada(){
    var n = Number(document.querySelector("input#valorN").value);
    var k = document.querySelector("input#valorK").value;
    var p = Number(document.querySelector("input#valorP").value);
    var q = Number(document.querySelector("input#valorQ").value);

    var mediaF = mediaA(n,p);
    var desvioP = deviopadrao(n,p,q);

    k = k.split(";");
    var prob = null;
    k.forEach(function(element,i) {
        prob += probabilidade(p,Number(element),n,q);
    }, this);

    document.getElementById("saida1").innerHTML = "A media é: " + mediaF +"</br>O desvio padrão é: " + desvioP + "</br>  " + " A probabilidade é de: " + (prob * 100).toFixed(2) +"%";

}
function mediaA(n,p){
    var media = n*p;
    return media;
}

function deviopadrao(n,p,q){
    dp = Math.sqrt(n*p*q).toFixed(2);
    return dp;
}
function probabilidade(p,k,n,q){
    var analiseresult = analise(n,k);
    var resultado = analiseresult * Math.pow(p,k) * Math.pow(q,(n -k));
    return resultado
}
function analise(n,k){
    if(k ==0 || n == k){
        return 1;
    }
    else if(k==1 ){
        return n;
    }
    var fatn = fatorial(n);
    var fatk = fatorial(k);
    var fatnk = fatorial(n - k);
    var analise = fatn / (fatk * fatnk);
    return analise;
}
function fatorial(n){
    var result = n;
    for(var i = 1; i <n; i++){
        result = result * i;
    }
    return result;          
}