function entrada(){
    var n = Number(document.getElementById("valorN").value);
    var k = Number(document.getElementById("valorK").value);
    var p = Number(document.getElementById("valorP").value);
    var q = Number(document.getElementById("valorQ").value);
    var dp = 0;
    var media = n*p;
    dp = Math.sqrt(n*p*q).toFixed(2);
    document.getElementById("saida1").innerHTML = "A media é: " + media +"</br>O desvio padrão é: " + dp;

}