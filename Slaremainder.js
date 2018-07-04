<html><head>
    <title>Show popup</title>
    <meta charset="utf-8">
    <script src="../WebResources/ClientGlobalContext.js.aspx" type="text/javascript"></script>
    <script src="../WebResources/whb_jquery-1.12.4" type="text/javascript"></script>
    <script src="../WebResources/whb_jquery-ui.js" type="text/javascript"></script>
    <script src="../WebResources/whb_CommonErrorHandling.js" type="text/javascript"></script>
    <link href="../WebResources/whb_jquery-ui.css" type="text/css" rel="stylesheet">
    <style type="text/css">
        body {
    direction: LTR;
    margin: 0px;
    border: 0px;
    cursor: default;
            font-family: Segoe UI,Tahoma,Arial;
            font-size: 11px;
        }

.ms-crm-RefreshDialog-Header {
    top: 0px;
    position: absolute;
    width: 96%;
    height: 75px;
    padding-top: 10px;
    background-color: #FFFFFF;
    border-bottom-color: #A4ABB2;
    word-wrap:break-word;
}

DIV.ms-crm-RefreshDialog-Header-Title {
    font-weight: bold;
    font-size: 20px;
    font-family: Segoe UI Light, Segoe UI, Tahoma, Arial;
    margin-left: 30px;
    margin-right: 30px;
    color: black;
    word-wrap:break-word;
}

.ms-crm-TextAutoEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ms-crm-RefreshDialog-Header-Desc {
    padding-top: 4px;
    font-family: Segoe UI,Tahoma,Arial;
    margin-left: 30px;
    margin-right: 30px;
    color: #666666;
    font-size: 12px;
}

.ms-crm-RefreshDialog-Main {
    font-size: 12px;
    top: 90px;
    position: absolute;
    bottom: 49px;
    vertical-align: top;
    width: 95%;
    font-family: Segoe UI,Tahoma,Arial;
    color: #444444;
    background-color: #FFFFFF;
    border-bottom-color: #A4ABB2;
    right: 30px;
    left: 30px;
}

.ms-crm-RefreshDialog-Footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    min-width: 288px;
    height: 44px;
    text-align: right;
    background-color: #F8F8F8;
    border-top-color: #FFFFFF;
}

.ms-crm-RefreshDialog-Button {
    color: #444444;
    background-color: #FFFFFF;
    height: 24px;
    font-family: Segoe UI,Tahoma,Arial;
    border: 1px solid #C6C6C6;
    background-image: none;
    margin-top: 10px;
    width: auto;
    min-width: 80px;
    white-space: nowrap;
    font-size: 12px;
    line-height: 16px;
    width: 84px;
    text-align: center;
    cursor: pointer;
    background-repeat: repeat-x;
    padding-left: 5px;
    padding-right: 5px;
}

table.blueTable {
    border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin-left: 10px;
    table-layout: fixed;
}

table.blueTable td, table.blueTable th {
    border: 1px solid #AAAAAA;
    padding: 3px 2px;
}

table.blueTable tbody td {
    font-size: 15px;
    word-wrap: break-word;
}

table.blueTable tr:nth-child(even) {
    background: #D0E4F5;
}

table.blueTable thead {
    background: #1C6EA4;
    background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    border-bottom: 2px solid #444444;
}

table.blueTable thead th {
    font-size: 13px;
    color: #FFFFFF;
    border-left: 2px solid #D0E4F5;
}

table.blueTable thead th:first-child {
    border-left: none;
}

table.blueTable tfoot {
    font-size: 11px;
    color: #FFFFFF;
    background: #D0E4F5;
    background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
    background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
    background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
    border-top: 2px solid #444444;
}

table.blueTable tfoot td {
    font-size: 11px;
}

table.blueTable tfoot .links {
    text-align: right;
}

table.blueTable tfoot .links a {
    display: inline-block;
    background: #1C6EA4;
    color: #FFFFFF;
    padding: 2px 8px;
    border-radius: 5px;
}

table.blueTable td.casenum {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}

p {
    font-family: verdana;
    font-size: 25px;
    text-align: center;
    padding-bottom: 67px;
    padding-right: 27px;
    padding-top: 139px;
    padding-left: 53px;
}
       
</style>

<script language="javascript" type="text/javascript">
debugger;
$(document).ready(function () {
    debugger;
    loadServices();

});

function formatDateUKFormat(date) {
    if (date == null || date == '' || date == undefined || date == "")
        return "";
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

function loadServices() {

    //Get Account Services
    var accountServices = getCaseServices();
    if (accountServices != null && accountServices.value.length > 0) {
        var tableData = "";

        //Create HTML table
        for (var i = 0; i < accountServices.value.length; i++) {

            var ticketnumber = accountServices.value[i]["ticketnumber"];
            var title = accountServices.value[i]["title"];
            var whb_internalsla = formatDateUKFormat(accountServices.value[i]["whb_internalsla"]);
            var incidentid = accountServices.value[i]["incidentid"];
            var statuscode = accountServices.value[i]["statuscode@OData.Community.Display.V1.FormattedValue"];
            var internaldepartmental = accountServices.value[i]["_whb_awaitinginternalcommunicationfrom_value@OData.Community.Display.V1.FormattedValue"];
            var externaldepartmental = accountServices.value[i]["_whb_externaldepartmentassistance_value@OData.Community.Display.V1.FormattedValue"];

            if (externaldepartmental == null && externaldepartmental ==undefined)
            {

                externaldepartmental = "";
            }
            if (internaldepartmental == null && internaldepartmental == undefined) {

                internaldepartmental = "";
            }
            //tableData = tableData + '<tr><td class="casenum">' + ticketnumber + "</td><td>" + title + "</td><td>" + whb_internalsla + "</td><td style='display:none;'>" + incidentid + "</td></tr>";
            tableData = tableData + '<tr><td class="casenum"><a onclick="OpenCase(\'' + incidentid + '\')">' + ticketnumber + '</a></td><td>' + title + '</td><td>' + whb_internalsla + '</td><td>' +statuscode+'</td><td>' +internaldepartmental+'</td><td>'+externaldepartmental+'</td></tr>';

        }

        var table = '<table class="blueTable" id="ResultTable" style="font-family: Segoe\000020UI\000020Semibold,Tahoma,sans\00002Dserif;"><thead><tr><td> Case Number</a></td><td>Case Title</td><td>Date of Reminder</td><td>Case Status</td><td>Internal Department Assistance</td><td>External Department Assistance</td></tr></thead>' + tableData + '</table>';
        //show table data on the Account form
        document.getElementsByClassName("tableDiv")[0].innerHTML = table;
    }
    else
    {
        document.getElementsByClassName("tableDiv")[0].innerHTML = '<p>There are no cases Awaiting Internal/External Communication that have exceeded Date of Reminder</p>';
        document.getElementById("dialogHeaderTitle").style.display = 'none';
        if (typeof (Storage) != "undefined") {
            sessionStorage.setItem("Flag","true");
       
        }
    }
}

function OpenCase(incidentid) {
    Xrm.Utility.openEntityForm("incident", incidentid);
}
//get Account Services
function getCaseServices() {
    debugger
    try {
        var accountServices = null;
        var ownerid = Xrm.Page.context.getUserId().slice(1, -1);
        var date=new Date();
        var updatedmonth = date.getMonth() + 1;
        var today = date.getFullYear() + "-" + updatedmonth + "-" + date.getDate();
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: Xrm.Page.context.getClientUrl() + "/api/data/v8.2/incidents?$select=ticketnumber,incidentid,title,whb_internalsla,statuscode,_whb_awaitinginternalcommunicationfrom_value,_whb_externaldepartmentassistance_value&$filter= whb_internalsla le " + today + " and (statuscode eq 130570000 or statuscode eq 130570011) and _ownerid_value eq " + ownerid + "&$orderby=whb_internalsla desc",
            // url: Xrm.Page.context.getClientUrl() + "/api/data/v8.2/incidents?$select=ticketnumber,incidentid,title,whb_internalsla&$filter=statuscode eq 130570000",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
                XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            },
            async: false,
            success: function (data, textStatus, xhr) {
                var results = data;
                accountServices = results;
            },
            error: function (xhr, textStatus, errorThrown) {

                ErrorHandling("SLA Remainder", "SLA Remainder", "getCaseServices", xhr);
                //Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
            }
        });
        return accountServices;
    } catch (e) {
        ErrorHandling("SLA Remainder", "SLA Remainder", "getCaseServices", e);
    }

}

</script>


<meta>
<meta>
<meta>
<meta>
<meta>
<meta>
<meta>
<meta>
<meta>
<meta><meta><meta><meta><meta><meta><meta><meta><meta><meta><meta><meta><meta></head>
<body style="word-wrap: break-word;">
    <div class="ms-crm-RefreshDialog-Main-Container">
        <div class="ms-crm-RefreshDialog-Header" id="tdDialogHeader">
            <div title="Your dialog header" class="ms-crm-RefreshDialog-Header-Title ms-crm-TextAutoEllipsis" id="dialogHeaderTitle" style="width: 80%;"><b>Cases Awaiting Internal/External Communication that have exceeded </b><br><b>Date of Reminder</b></div>
            <br>
            <br>
            <div class="tableDiv"></div>
        </div>
        <div class="ms-crm-RefreshDialog-Footer" id="tdDialogFooter">
            <button tabindex="1" class="ms-crm-RefreshDialog-Button" id="cmdDialogCancel" style="margin-right: 30px; margin-left: 8px;" onclick="closeWindow();" type="button">Close</button>
        </div>
    </div>














</body></html>