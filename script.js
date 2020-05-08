var state = []
var confirmed = []
var recovered = []
var deaths = []
// var dict = new Object();
var stateCodes = {}
var confirmedCases = {}
var recoveredCases = {}

$(document).ready(function(){
    var url = "https://api.covid19india.org/data.json";

    $.getJSON(url,function(data){

        var total_active, total_recovered,total_deaths,total_confirmed;

        $.each(data.statewise,function(id,obj){
            state.push(obj.state)
            confirmed.push(obj.confirmed)
            recovered.push(obj.recovered)
            deaths.push(obj.deaths)

            stateCodes[obj.statecode] = obj.state
            confirmedCases[obj.statecode] = obj.confirmed
            recoveredCases[obj.statecode] = obj.recovered
        })

        state.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()

        total_active = data.statewise[0].active;
        total_recovered = data.statewise[0].recovered;
        total_deaths = data.statewise[0].deaths;
        total_confirmed = data.statewise[0].confirmed;

        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        $("#confirmed").append(total_confirmed);

        var myChart = document.getElementById("myChart").getContext('2d')

        var chart = new Chart(myChart,{
            type:'line',
            data:{
                labels:state,
                datasets:[
                    {
                        label:"Confirmed Cases",
                        data:confirmed,
                        backgroundColor:"#f1c40f",
                        minBarLength:100
                    },
                    {
                        label:"Recovered Cases",
                        data:recovered,
                        backgroundColor:"#2ec771",
                        minBarLength:100
                    },
                    {
                        label:"Deceased Cases",
                        data:deaths,
                        backgroundColor:"#e74c3c",
                        minBarLength:100
                    }
                ]
            },
            options:{}
        })

        $("#sta").append(`<option value="Select">-Select-</option>`)

        var table = document.getElementById("stateTable");
        var rows = table.getElementsByTagName("tr");
        $.each(data.statewise,function(id,obj){
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1);
            var cell2 = row.insertCell(-1);
            var cell3 = row.insertCell(-1);
            var cell4 = row.insertCell(-1);

            cell1.innerHTML = obj.state;
            cell2.innerHTML = obj.confirmed;
            cell3.innerHTML = obj.recovered;
            cell4.innerHTML = obj.deaths;

            // $("#sta").append(`<option value="${obj.state}">${obj.state}</option>`)

            $("#sta").append($("<option></option>")
            .attr("value",obj.statecode)
            .text(obj.state));
        })
        $("#sta option[value='TT']").remove();
    })
})

function search(){
    
    var dataValue = $("#sta").val()
    alert(stateCodes[dataValue])
    alert(confirmedCases[dataValue])
    alert(recoveredCases[dataValue])

}

function hideMytable(){
    $("#hideMe").toggle();
}