function escuta() {
    var select = null;
    select.addEventListener("input", function () {
        if ((select == "QNdiscreta") || (select == "QNcontinua")) {
            ordem.disabled = true;
        }
    })
}