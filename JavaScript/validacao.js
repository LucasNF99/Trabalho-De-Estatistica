function validacao(){
    if((document.form.email.value == "")||(document.form.senha.value == "")){
        alert("Por favor preecha todos os campos!");
        return false;
    }
}
function validacao2(){
    if((document.form.email.value == "")||(document.form.senha.value == "")||(document.form.Csenha.value == "")||(document.form.Cemail.value == "")){
        alert("Por favor preecha todos os campos!");
        return false;
    }
}


