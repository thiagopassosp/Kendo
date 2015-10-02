// Define a Person model.
var Person = kendo.data.Model.define({
    fields: {
        "primeiroNome": {
            type: "string"
        },
        "ultimoNome": {
            type: "string"
        },
        "id": {
            type: "number"
        }
    },

    // Define a function for fullName to get the firstName and lastName
    // and concatenate them together.
    fullName: function () {
        return this.get("primeiroNome") + " " + this.get("ultimoNome");
    },

    idade: function () {
        var retorno = "";
        if (this.get("dataNascimento") != null || this.get("dataNascimento") != undefined) {
            retorno = ReturnIdade(this.get("dataNascimento"));
        }
        else {
            retorno = 0;
        }
        return retorno;
    }
});


// Create an observable object with an obserable array where each item
// in the array is an instance of a Person model.
var vm = kendo.observable({
    pessoas: [
        new Person({
            primeiroNome: "John",
            ultimoNome: "DeVight",
            id: 2,
            dataNascimento: "01/05/2010"

        }),
        new Person({
            primeiroNome: "Wendy",
            ultimoNome: "Parry",
            id: 1,
            dataNascimento: "13/11/1985"
        })
    ],

    roles: [
        {
            id: 1,
            name: "CEO"
        },
    {
        id: 2,
        name: "Developer"
    },
    {
        id: 3,
        name: "Tester"
    }
    ],

    // Add a new person to the array.
    Adicionar: function () {
        this.pessoas.push(new Person());
    },

    // Delete the person from the array.
    delete: function (e) {
        var that = this;
        $.each(that.pessoas, function (idx, person) {
            if (e.data.uid === person.uid) {
                that.pessoas.splice(idx, 1);
                return true;
            }
        });
    }
});

kendo.bind($("#ListPessoas"), vm);

function ReturnIdade(datanascimento) {    
    var res = datanascimento.split("/");

    //variaveis do formulario
    nasc_dia = res[0];
    nasc_mes = res[1];
    nasc_ano = res[2];


    //variaveis do dia/mes/ano de hj	
    data = new Date();
    dia = data.getDate();
    mes = data.getMonth() + 1;
    ano = data.getFullYear();


    totalDias = dia - nasc_dia;

    resMes = mes - nasc_mes;
    totalMes = resMes * 30;

    resDiasDoMes = totalMes - totalDias;

    resAno = ano - nasc_ano;
    totalAno = resAno * 365;

    total = resDiasDoMes + totalAno;
    return Math.ceil(total / 365);


}
