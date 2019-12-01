function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { table: "livros" };

dbParam = JSON.stringify(obj);

xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText).livros;

        txt += "<table><thead><tr><td>Nome</td><td>Data de lançamento</td></tr></thead>"

        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].nome + "</td><td>" + myObj[x].dataLancamento + "</td></tr>";
        }

        txt += "</table>"

        document.getElementById("tab").innerHTML = txt;
    }
};
xmlhttp.open("GET", 'http://localhost:3000/livros/all', true);
xmlhttp.setRequestHeader("x-access-token", getCookie('token'));
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);