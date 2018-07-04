//on Change of Status Reason for Contact ==  'Compliment' the make Date of Incident Non-mandatory
var complimentOptionSetValue = 2; // Reason of Contact == Compliment
var apology = { value: 1, text: "Apology" };
var refundGNG = { value: 2, text: "Refund - GNG" };
var refundGWG = { value: 3, text: "Refund - GWG" };
var refundFranchiseSite = { value: 4, text: "Refund - Franchise Site" };
var refundHolidayExtra = { value: 5, text: "Refund - Holiday Extra" };
var refundBOAGWG = { value: 6, text: "Refund - BOA GWG" };
var leisureVoucher = { value: 7, text: "Leisure Voucher" };
var dpaFailed = { value: 8, text: "DPA Failed" };
var forwardedExternal = { value: 9, text: "Forwarded External" };
var forwardedInternal = { value: 10, text: "Forwarded Internal" };
var referredToOtherDepartment = { value: 11, text: "Referred to Other Department (Meetings, Leisure Vouchers web-site etc.)" };
var afterSevenDays = { value: 12, text: "After 7 Days" };
var outsideOfPolicy = { value: 13, text: "Outside of Policy" };
var noRefund = { value: 14, text: "No Refund" };
var informationProvided = { value: 15, text: "Information provided" };
var thankYou = { value: 16, text: "Thank You" };
var duplicate_Chaser = { value: 17, text: "Duplicate/Chaser" };
var closedValue = 12;//Status option set - closed
var awaitingCustomerFeedbackValue = 3; //Status option set - onHold
var thankYouValue = 16; //Resolution Code option set - Thankyou
var statusClosedFlag = false;
var teamManagerRole = "Team Manager";
var noOfAlerts;
// JavaScript source code


function propertyOnChange() {

    try {

        var dateofincident = Xrm.Page.getAttribute("whb_dateofincident").getValue();
        var property = Xrm.Page.getAttribute("whb_property").getValue();

        var flag = Xrm.Page.getAttribute("whb_childcaseflag").getValue();
        var formType = Xrm.Page.ui.getFormType();
        if (flag != true && formType != 1) {
            if (property != null) {
                if (noOfAlerts != null) {
                    for (var i = 0; i <= noOfAlerts; i++) {
                        Xrm.Page.ui.clearFormNotification(i.toString());
                    }
                }
                if (property != null && property != undefined && dateofincident != null && dateofincident != undefined) {
                    var notificationString = '', whb_enddate = '', whb_feedback = '', whb_startdate = '';
                    var propertyid = property[0].id.slice(1, -1);
                    var req = new XMLHttpRequest();
                    var D = dateofincident.getDate();
                    var M = dateofincident.getMonth() + 1;
                    var Y = dateofincident.getFullYear();
                    var DDMMYYY = Y + "-" + M + "-" + D;
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_sitealerts?$select=whb_enddate,whb_feedback,whb_startdate&$filter=(whb_enddate eq null or whb_enddate ge " + DDMMYYY + ") and whb_startdate le " + DDMMYYY + " and _whb_propertyid_value eq " + propertyid + "", true);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                noOfAlerts = results.value.length;
                                for (var i = 0; i < results.value.length; i++) {
                                    whb_enddate = results.value[i]["whb_enddate"];
                                    whb_feedback = results.value[i]["whb_feedback"];
                                    whb_startdate = results.value[i]["whb_startdate"];
                                    var sDate = new Date(whb_startdate);
                                    var SD = sDate.getDate(); var SM = sDate.getMonth() + 1; var SY = sDate.getFullYear();
                                    if (SD < 10) { SD = "0" + SD };
                                    if (SM < 10) { SM = "0" + SM };
                                    var startDate = SD + "/" + SM + "/" + SY;
                                    if (whb_enddate != null && whb_enddate != "undefined" && whb_enddate != "") {
                                        var eDate = new Date(whb_enddate);
                                        var ED = eDate.getDate(); var EM = eDate.getMonth() + 1; var EY = eDate.getFullYear();
                                        if (ED < 10) { ED = "0" + ED };
                                        if (EM < 10) { EM = "0" + EM };
                                        var endDate = ED + "/" + EM + "/" + EY;
                                        notificationString = whb_feedback + " on " + startDate + " with end date as " + endDate;
                                    }
                                    else {
                                        notificationString = whb_feedback + " on " + startDate;
                                    }
                                    Xrm.Page.ui.setFormNotification(notificationString, "WARNING", i.toString());

                                }
                            } else {
                                Xrm.Utility.alertDialog(this.statusText);
                            }
                        }
                    };
                    req.send();
                }
                else {
                    Xrm.Page.ui.clearFormNotification();
                }
            }
        }

        //Xrm.Page.ui.clearFormNotification("SI001");
        //alertSerialInvoker();
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "propertyOnChange", err);
    }
    //alertSerialInvoker();
}



function removeDateofIncMandatory() {
    if (Xrm.Page.getAttribute("whb_reasonforcontact") != null) {
        if (Xrm.Page.getAttribute("whb_reasonforcontact").getValue() == complimentOptionSetValue) {
            Xrm.Page.getAttribute("whb_dateofincident").setRequiredLevel("none");
        }
        else {
            Xrm.Page.getAttribute("whb_dateofincident").setRequiredLevel("required");
        }
    }
}

function statusOnChangeToClose() {
    try {
        if (Xrm.Page.getAttribute("whb_status") != null && Xrm.Page.getAttribute("whb_resolutioncode") != null) {
            var pickList = Xrm.Page.getControl("whb_resolutioncode");
            var options = Xrm.Page.getAttribute("whb_resolutioncode").getOptions();

            if (Xrm.Page.getAttribute("whb_status").getValue() == closedValue) {
                if (Xrm.Page.getAttribute("whb_resolutioncode").getValue() != thankYouValue) {
                    Xrm.Page.getAttribute("whb_resolutioncode").setValue(null);
                }
                // *** Clear current option set items
                for (var i = 0; i < options.length; i++) {
                    pickList.removeOption(options[i].value);
                }
                //add/filter only one option set when status is closed
                pickList.addOption(thankYou);

                //set this flag here beacuse when user selects status - closed and then selects any other option set we need to add back the option set values to resolution code
                statusClosedFlag = true;
                Xrm.Page.getAttribute("whb_status").setSubmitMode("always");
                Xrm.Page.getAttribute("whb_resolutioncode").setSubmitMode("always");
            }

            else {
                if (statusClosedFlag) {
                    //add/filter all option set when user selects any other status, after having selected status = close --  we have dine this because all the option set items would have been removed when status is closed
                    // *** Clear current option set items
                    for (var i = 0; i < options.length; i++) {
                        pickList.removeOption(options[i].value);
                    }

                    pickList.addOption(apology);
                    pickList.addOption(refundGNG);
                    pickList.addOption(refundGWG);
                    pickList.addOption(refundFranchiseSite);
                    pickList.addOption(refundHolidayExtra);
                    pickList.addOption(refundBOAGWG);
                    pickList.addOption(leisureVoucher);
                    pickList.addOption(dpaFailed);
                    pickList.addOption(forwardedExternal);
                    pickList.addOption(forwardedInternal);
                    pickList.addOption(referredToOtherDepartment);
                    pickList.addOption(afterSevenDays);
                    pickList.addOption(outsideOfPolicy);
                    pickList.addOption(thankYou);
                    pickList.addOption(duplicate_Chaser);
                    Xrm.Page.getAttribute("whb_status").setSubmitMode("always");
                    Xrm.Page.getAttribute("whb_resolutioncode").setSubmitMode("always");
                }
            }
        }

        if (Xrm.Page.getAttribute("whb_status") != null && Xrm.Page.getAttribute("statuscode") != null) {
            if (Xrm.Page.ui.getFormType() == 2) {
                if (Xrm.Page.getAttribute("whb_status").getValue() == awaitingCustomerFeedbackValue) {
                    Xrm.Page.getAttribute("statuscode").setValue(2);
                    Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
                }
                else {
                    Xrm.Page.getAttribute("statuscode").setValue(1);
                    Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
                }
            }
        }

    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "statusOnChangeToClose", err);
    }
}

function statusOnloadToClose() {

    try {
        if (Xrm.Page.ui.getFormType() == 2) {
            statusOnChangeToClose();
        }
    }

    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "statusOnloadToClose", err);
    }
}


// Checking Logged in user Security Role.
// Created By : Prasanna.
// Created On :  01/11/2017.
// Changed Date : 01/12/2017.
function CheckUserRole() {
    try {
        //debugger;
        var currentUserRoles = Xrm.Page.context.getUserRoles();
        var formType = Xrm.Page.ui.getFormType();
        if (formType > 1) {
            var flag = false;
            for (var i = 0; i < currentUserRoles.length; i++) {
                var userRoleId = currentUserRoles[i];
                var RoleName = GetRoleName(userRoleId);
                if (RoleName == teamManagerRole) {
                    flag = true;
                }
            }

            if (flag == true) {
                var fields = Xrm.Page.getControl("whb_date1stcontactreceived");
                if (fields) {
                    fields.setDisabled(false);
                }
            }
            else {
                var fields = Xrm.Page.getControl("whb_date1stcontactreceived");
                if (fields) {
                    fields.setDisabled(true);
                }
            }
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "CheckUserRole", err);
    }

}
// Security Role Name
function GetRoleName(userRoleId) {
    try {
        //debugger;
        var name = null;
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/roles(" + userRoleId + ")?$select=name,roleid", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.send();
        if (req.readyState === 4) {
            req.onreadystatechange = null;
            if (req.status === 200) {
                var result = JSON.parse(req.response);
                name = result["name"];
            }
            else {
                Xrm.Utility.alertDialog(req.statusText);
            }
        }
        return name;
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "GetRoleName", err);
    }
}

function defaultcustomer() {
    Xrm.Page.getControl("customerid").addPreSearch(addFilter);
}

function addFilter() {
    var customerAccountFilter = "<filter type='and'><condition attribute='accountid' operator='null' /></filter>";
    Xrm.Page.getControl("customerid").addCustomFilter(customerAccountFilter, "account");
}


//Set Status Reason to InProgress once form saved.
// Created By : Prasanna.
// Created On :  01/11/2017.
// Changed Date : 01/12/2017.
function SetStatusReasonInProgress() {
    try {
        var statuscode = Xrm.Page.getAttribute("statuscode").getValue();
        if ((Xrm.Page.ui.getFormType() == 1) && (statuscode != 130570001)) {
            Xrm.Page.getAttribute("statuscode").setValue(1);
            //Xrm.Page.data.entity.save();
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "SetStatusReasonInProgress", err);
    }
}

// Fetching Parent Case Informtion to Child Case
// Created By : Prasanna.
// Created On :  01/11/2017.
// Changed Date : 01/12/2017.
function FetchParentCase() {

    //debugger;
    try {
        var parentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
        var formType = Xrm.Page.ui.getFormType();
        if (parentCase != null && formType == 1) {
            var Id = parentCase[0].id;
            var parentCaseID = Id.slice(1, -1);
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/incidents(" + parentCaseID + ")?$select=_parentcaseid_value,_whb_contact_value,prioritycode,whb_businessarea,whb_complimentrybreakfast,whb_dateofincident,whb_feedbackcard,_whb_primarycategory_value,_whb_primarysubcategory_value,whb_reasonteammembernotnotified,_whb_reservation_value,_whb_secondarycategory_value,_whb_secondarysubcategory_value,whb_teammembernotified,whb_teammemberresponseaction,_whb_tertiarycategory_value,_whb_tertiarysubcategory_value,_whb_property_value", false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var result = JSON.parse(this.response);
                        var _whb_contact_value = result["_whb_contact_value"];
                        var _whb_contact_value_formatted = result["_whb_contact_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_contact_value_lookuplogicalname = result["_whb_contact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var prioritycode = result["prioritycode"];
                        var prioritycode_formatted = result["prioritycode@OData.Community.Display.V1.FormattedValue"];
                        var whb_businessarea = result["whb_businessarea"];
                        var whb_businessarea_formatted = result["whb_businessarea@OData.Community.Display.V1.FormattedValue"];
                        var _whb_property_value = result["_whb_property_value"];
                        var _whb_property_value_formatted = result["_whb_property_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_property_value_lookuplogicalname = result["_whb_property_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var whb_complimentrybreakfast = result["whb_complimentrybreakfast"];
                        var whb_complimentrybreakfast_formatted = result["whb_complimentrybreakfast@OData.Community.Display.V1.FormattedValue"];
                        var whb_dateofincident = result["whb_dateofincident"];
                        var whb_feedbackcard = result["whb_feedbackcard"];
                        var whb_feedbackcard_formatted = result["whb_feedbackcard@OData.Community.Display.V1.FormattedValue"];
                        var _whb_primarycategory_value = result["_whb_primarycategory_value"];
                        var _whb_primarycategory_value_formatted = result["_whb_primarycategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_primarycategory_value_lookuplogicalname = result["_whb_primarycategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_primarysubcategory_value = result["_whb_primarysubcategory_value"];
                        var _whb_primarysubcategory_value_formatted = result["_whb_primarysubcategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_primarysubcategory_value_lookuplogicalname = result["_whb_primarysubcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var whb_reasonteammembernotnotified = result["whb_reasonteammembernotnotified"];
                        var _whb_reservation_value = result["_whb_reservation_value"];
                        var _whb_reservation_value_formatted = result["_whb_reservation_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_reservation_value_lookuplogicalname = result["_whb_reservation_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_secondarycategory_value = result["_whb_secondarycategory_value"];
                        var _whb_secondarycategory_value_formatted = result["_whb_secondarycategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_secondarycategory_value_lookuplogicalname = result["_whb_secondarycategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_secondarysubcategory_value = result["_whb_secondarysubcategory_value"];
                        var _whb_secondarysubcategory_value_formatted = result["_whb_secondarysubcategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_secondarysubcategory_value_lookuplogicalname = result["_whb_secondarysubcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var whb_teammembernotified = result["whb_teammembernotified"];
                        var whb_teammembernotified_formatted = result["whb_teammembernotified@OData.Community.Display.V1.FormattedValue"];
                        var whb_teammemberresponseaction = result["whb_teammemberresponseaction"];
                        var _whb_tertiarycategory_value = result["_whb_tertiarycategory_value"];
                        var _whb_tertiarycategory_value_formatted = result["_whb_tertiarycategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_tertiarycategory_value_lookuplogicalname = result["_whb_tertiarycategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_tertiarysubcategory_value = result["_whb_tertiarysubcategory_value"];
                        var _whb_tertiarysubcategory_value_formatted = result["_whb_tertiarysubcategory_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_tertiarysubcategory_value_lookuplogicalname = result["_whb_tertiarysubcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_company_value = result["_whb_company_value"];
                        var _whb_company_value_formatted = result["_whb_company_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_company_value_lookuplogicalname = result["_whb_company_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _whb_property_value = result["_whb_property_value"];
                        var _whb_property_value_formatted = result["_whb_property_value@OData.Community.Display.V1.FormattedValue"];
                        var _whb_property_value_lookuplogicalname = result["_whb_property_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _parentcaseid_value = result["_parentcaseid_value"];
                        var _parentcaseid_value_formatted = result["_parentcaseid_value@OData.Community.Display.V1.FormattedValue"];
                        var _parentcaseid_value_lookuplogicalname = result["_parentcaseid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                        Xrm.Page.getAttribute("whb_childcaseflag").setValue(true);
                        if (_parentcaseid_value != null) {
                            Xrm.Page.getAttribute("parentcaseid").setValue([{ id: _parentcaseid_value, name: _parentcaseid_value_formatted, entityType: _parentcaseid_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_property").setSubmitMode("always");
                        }
                        if (_whb_property_value != null) {
                            Xrm.Page.getAttribute("whb_property").setValue([{ id: _whb_property_value, name: _whb_property_value_formatted, entityType: _whb_property_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_property").setSubmitMode("always");
                        }
                        if (_whb_company_value != null) {
                            Xrm.Page.getAttribute("whb_company").setValue([{ id: _whb_company_value, name: _whb_company_value_formatted, entityType: _whb_company_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_company").setSubmitMode("always");
                        }
                        if (_whb_contact_value != null) {
                            Xrm.Page.getAttribute("whb_contact").setValue([{ id: _whb_contact_value, name: _whb_contact_value_formatted, entityType: _whb_contact_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_contact").setSubmitMode("always");
                        }
                        if (_whb_primarycategory_value != null) {
                            Xrm.Page.getAttribute("whb_primarycategory").setValue([{ id: _whb_primarycategory_value, name: _whb_primarycategory_value_formatted, entityType: _whb_primarycategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_primarycategory").setSubmitMode("always");
                        }
                        if (_whb_primarysubcategory_value != null) {
                            Xrm.Page.getAttribute("whb_primarysubcategory").setValue([{ id: _whb_primarysubcategory_value, name: _whb_primarysubcategory_value_formatted, entityType: _whb_primarysubcategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_primarysubcategory").setSubmitMode("always");
                        }
                        if (_whb_reservation_value != null) {
                            Xrm.Page.getAttribute("whb_reservation").setValue([{ id: _whb_reservation_value, name: _whb_reservation_value_formatted, entityType: _whb_reservation_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_reservation").setSubmitMode("always");
                        }
                        if (_whb_secondarycategory_value != null) {
                            Xrm.Page.getAttribute("whb_secondarycategory").setValue([{ id: _whb_secondarycategory_value, name: _whb_secondarycategory_value_formatted, entityType: _whb_secondarycategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_secondarycategory").setSubmitMode("always");
                        }
                        if (_whb_secondarysubcategory_value != null) {
                            Xrm.Page.getAttribute("whb_secondarysubcategory").setValue([{ id: _whb_secondarysubcategory_value, name: _whb_secondarysubcategory_value_formatted, entityType: _whb_secondarysubcategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_secondarysubcategory").setSubmitMode("always");
                        }
                        if (_whb_tertiarycategory_value != null) {
                            Xrm.Page.getAttribute("whb_tertiarycategory").setValue([{ id: _whb_tertiarycategory_value, name: _whb_tertiarycategory_value_formatted, entityType: _whb_tertiarycategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_tertiarycategory").setSubmitMode("always");
                        }
                        if (_whb_tertiarysubcategory_value != null) {
                            Xrm.Page.getAttribute("whb_tertiarysubcategory").setValue([{ id: _whb_tertiarysubcategory_value, name: _whb_tertiarysubcategory_value_formatted, entityType: _whb_tertiarysubcategory_value_lookuplogicalname }]);
                            Xrm.Page.getAttribute("whb_tertiarysubcategory").setSubmitMode("always");
                        }
                        if (whb_businessarea != null) {
                            Xrm.Page.getAttribute("whb_businessarea").setValue(whb_businessarea);
                            Xrm.Page.getAttribute("whb_businessarea").setSubmitMode("always");
                        }
                        if (whb_reasonteammembernotnotified != null) {
                            Xrm.Page.getAttribute("whb_reasonteammembernotnotified").setValue(whb_reasonteammembernotnotified);
                            Xrm.Page.getAttribute("whb_reasonteammembernotnotified").setSubmitMode("always");
                        }
                        if (whb_teammemberresponseaction != null) {
                            Xrm.Page.getAttribute("whb_teammemberresponseaction").setValue(whb_teammemberresponseaction);
                            Xrm.Page.getAttribute("whb_teammemberresponseaction").setSubmitMode("always");
                        }
                        if (whb_dateofincident != null) {
                            var date = new Date(whb_dateofincident);
                            Xrm.Page.getAttribute("whb_dateofincident").setValue(date);
                            Xrm.Page.getAttribute("whb_dateofincident").setSubmitMode("always");
                        }
                        if (prioritycode != null) {
                            Xrm.Page.getAttribute("prioritycode").setValue(prioritycode);
                            Xrm.Page.getAttribute("prioritycode").setSubmitMode("always");
                        }
                        Xrm.Page.getAttribute("whb_ischanged").setValue(true);
                        Xrm.Page.getAttribute("whb_complimentrybreakfast").setValue(whb_complimentrybreakfast);
                        Xrm.Page.getAttribute("whb_feedbackcard").setValue(whb_feedbackcard);
                        Xrm.Page.getAttribute("whb_teammembernotified").setValue(whb_teammembernotified);
                        if (whb_teammembernotified == false) {
                            Xrm.Page.getControl("whb_reasonteammembernotnotified").setVisible(true);
                            Xrm.Page.getControl("whb_teammemberresponseaction").setVisible(false);
                            Xrm.Page.getControl("whb_complimentrybreakfast").setVisible(false);
                            Xrm.Page.getControl("whb_feedbackcard").setVisible(false);

                        }
                        else {
                            Xrm.Page.getControl("whb_reasonteammembernotnotified").setVisible(false);
                            Xrm.Page.getControl("whb_teammemberresponseaction").setVisible(true);
                            Xrm.Page.getControl("whb_complimentrybreakfast").setVisible(true);
                            Xrm.Page.getControl("whb_feedbackcard").setVisible(true);
                        }
                    }
                    else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send();

        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "FetchParentCase", err);
    }
}



//created by Muthu(Used for populating case Details from DPA form)
//created by Muthu(Used for populating case Details from DPA form)
function getdetailsfromdpa() {
    //debugger;
    try {

        var parameters = Xrm.Page.context.getQueryStringParameters();
        if (parameters["parameter_0"] != null) {
            var contactid = parameters["parameter_0"];
            var contactname = parameters["parameter_1"];
            if (Xrm.Page.getAttribute("whb_contact").getValue() == null) {
                Xrm.Page.getAttribute("whb_contact").setValue([{ id: contactid, name: contactname, entityType: "contact" }]);
            }
        }

        if (parameters["parameter_2"] != null) {
            var reservationid = parameters["parameter_2"];
            var reservationname = parameters["parameter_3"];
            if (Xrm.Page.getAttribute("whb_reservation").getValue() == null) {
                Xrm.Page.getAttribute("whb_reservation").setValue([{ id: reservationid, name: reservationname, entityType: "whb_reservation" }]);
            }
        }
        if (parameters["parameter_4"] != null) {
            var propertyid = parameters["parameter_4"];
            var propertyname = parameters["parameter_5"];
            if (Xrm.Page.getAttribute("whb_property").getValue() == null) {
                Xrm.Page.getAttribute("whb_property").setValue([{ id: propertyid, name: propertyname, entityType: "whb_property" }]);
            }
        }

        if (parameters["parameter_6"] != null) {
            var dpaID = parameters["parameter_6"];
            if (Xrm.Page.getAttribute("whb_dparecordguid").getValue() == null) {
                Xrm.Page.getAttribute("whb_dparecordguid").setValue(dpaID);
            }
        }

        if (parameters["parameter_7"] != null && parameters["parameter_8"] != null) {
            var guestGuid = parameters["parameter_7"];
            var guestName = parameters["parameter_8"];
            if (Xrm.Page.getAttribute("whb_guestname").getValue() == null) {
                Xrm.Page.getAttribute("whb_guestname").setValue([{ id: guestGuid, name: guestName, entityType: "whb_stays" }]);
            }
        }


    } catch (err) {
        ErrorHandling("Case", "whb_onload.js", "getdetailsfromdpa", err);

    }
}

function isdirty() {

    var attributes = Xrm.Page.data.entity.attributes.get();
    for (var i in attributes) {
        var attribute = attributes[i];
        if (attribute.getIsDirty()) {
            alert("attribute dirty: " + attribute.getName());
        }


    }

}

// Change Status Reason to InProgress whenever open saved form. Except this condition 
// (Awaiting Customer Feedback,Awaiting Internal Communication,Awaiting Manager Approval,Awaiting External Communication,Awaiting BART Bills)
// Created By : Prasanna.
// Created On :  01/11/2017.
// Changed Date : 01/12/2017.
// Modified by : Ranjith
// Modified on : 22/05/2018
function ChangeStatusReasonToInProgress() {
    try {
        //debugger;
        if (Xrm.Page.ui.getFormType() == 2) {
            var statusReason = Xrm.Page.getAttribute("statuscode").getValue();
            var owner = Xrm.Page.getAttribute("ownerid").getValue();
            var loggedinuserId = Xrm.Page.context.getUserId();
            if (owner[0].id == loggedinuserId) {
                if (statusReason != 130570009 && statusReason != 130570000 && statusReason != 130570001 && statusReason != 1 && statusReason != 130570010 && statusReason != 130570011) {
                    Xrm.Page.getAttribute("statuscode").setValue(1);
                    Xrm.Page.data.entity.save();
                }
            }
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "ChangeStatusReasonToInProgress", err);
    }
}

//Created by Ranjith to make Property field mandatory for Child Cases
function propertyMandatoryforChildCases() {
    var parentCaseLookup = Xrm.Page.getAttribute("parentcaseid").getValue();

    if (parentCaseLookup != null) {
        Xrm.Page.getAttribute("whb_property").setRequiredLevel("required");
    }
    else {
        Xrm.Page.getAttribute("whb_property").setRequiredLevel("none");
    }
}


//Created By Ranjith(For Hide or Show fields as per Team Member Notified Field)
function showorHideFieldsasperTeamMemberNotified() {
    try {
        var notified = Xrm.Page.getAttribute("whb_teammembernotified").getValue();
        if (notified == false) {
            Xrm.Page.getControl("whb_reasonteammembernotnotified").setVisible(true);
            Xrm.Page.getControl("whb_teammemberresponseaction").setVisible(false);
            Xrm.Page.getControl("whb_complimentrybreakfast").setVisible(false);
            Xrm.Page.getControl("whb_feedbackcard").setVisible(false);
        }
        else {
            Xrm.Page.getControl("whb_reasonteammembernotnotified").setVisible(false);
            Xrm.Page.getControl("whb_teammemberresponseaction").setVisible(true);
            Xrm.Page.getControl("whb_complimentrybreakfast").setVisible(true);
            Xrm.Page.getControl("whb_feedbackcard").setVisible(true);
        }

    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "showorHideFieldsasperTeamMemberNotified", err);
    }
}

function disableCaseFields() {

    var ststusReason = Xrm.Page.getAttribute("statuscode").getValue();
    if (ststusReason == 130570001) {
        Xrm.Page.ui.controls.forEach(function (control, i) {
            if (control && control.getDisabled && !control.getDisabled()) {
                control.setDisabled(true);
            }
        });
    }
}


var addedActivityButtons = false;
var hidetypes = ["Appointment"]
function LoadActivityButtons() {
    if (Xrm.Page.context.client.getClient() != "Mobile") {
        try {
            var ec = parent.document;
            var moree = ec.querySelector("a#moreActivitiesButton");
            if (!addedActivityButtons && moree != null && !moree.classList.contains("activityfilterdisabled")) {

                var mns = ec.querySelectorAll("div#moreActivitiesButton_Menu li.ms-crm-RefreshForm-MoreMenu");

                for (var i = 0; i < mns.length; i++) {
                    var an = mns[i];
                    if (hidetypes.indexOf(an.getAttribute("title")) === -1) {
                        var onode = ec.querySelector("a.activity-bar-label.activity-button-text");
                        var cn = onode.cloneNode(true);
                        cn.setAttribute("title", an.getAttribute("title"));
                        cn.setAttribute("onclick", an.getAttribute("onclick") + ";return false;");
                        cn.innerText = an.getAttribute("title");
                        onode.parentElement.appendChild(cn);
                    }
                    else {
                        console.log("hiding activity command '" + an.getAttribute("title") + "'");
                    }

                }
                ec.querySelector("#moreActivitiesButton").style.display = "none";
                var resizeAllabs = ec.querySelectorAll("a.activity-bar-label.activity-button-text");
                for (var i = 0; i < resizeAllabs.length; i++) {
                    resizeAllabs[i].style.width = resizeAllabs[i].innerText.length * 6.25 + "px";
                }

                addedActivityButtons = true;
            }
        }
        catch (err) {
            console.log("Catch while trying to show all activity buttons: " + err.message);
        }
    }
}

//this function is used to set Fields under Resolution Section as non mandatory 
//created by Rahul 
function setResSectionFieldsNonMand() {
    if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && Xrm.Page.getAttribute("whb_proposedresolutioncode") != null && Xrm.Page.getAttribute("whb_rationale") != null) {
        Xrm.Page.getAttribute("whb_proposedresolutioncode").setRequiredLevel("none");
        Xrm.Page.getAttribute("whb_rationale").setRequiredLevel("none");
    }
}



//Shows an alert When Case is Opened if the Customer is 'Potential Serial Invoker' 
//Created By : Ranjith
//Created On : 08/02/2018
//Changed On: 26/02/2018
//Changed On: 22/05/2018
function alertSerialInvoker() {
    Xrm.Page.ui.clearFormNotification("SI001");
    try {
        var formType = Xrm.Page.ui.getFormType();
        if (formType != 1) {
            if (Xrm.Page.getAttribute("whb_contact").getValue() != null && Xrm.Page.getAttribute("whb_contact").getValue()[0] != null) {
                var contact = Xrm.Page.getAttribute("whb_contact").getValue()[0].id;
                var contact = contact.slice(1, -1);
                var req = new XMLHttpRequest();
                req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + contact + ")?$select=whb_potentialserialinvoker", true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {

                            var result = JSON.parse(this.response);
                            //var highvaluecustomer = result["whb_highvaluecustomer"];
                            //var highvaluecustomer_formatted = result["whb_highvaluecustomer@OData.Community.Display.V1.FormattedValue"];
                            var potentialserialinvoker = result["whb_potentialserialinvoker"];
                            var potentialserialinvoker_formatted = result["whb_potentialserialinvoker@OData.Community.Display.V1.FormattedValue"];
                            if (potentialserialinvoker == true) {
                                //alert("The related Guest (Contact/Guest Name) might be a 'Potential Serial Invoker' and 'High Value Customer'")
                                Xrm.Page.ui.setFormNotification("The related Contact might be a 'Potential Serial Invoker'", "WARNING", "SI001");
                                // window.parent.document.getElementById("crmNotifications").lastChild.style = "background-color:red";
                                //$(window.parent.$.find(".Notification")[0]).attr('style', 'background-color:red');
                            }
                        } else {
                            Xrm.Utility.alertDialog(this.statusText);
                        }
                    }
                };
                req.send();
            }
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "alertSerialInvoker", err);
    }
}



//Created by Rahul for stamping contact
function stampCustomerField() {

    if (Xrm.Page.ui.getFormType() == 1) {
        if (Xrm.Page.getAttribute("whb_contact").getValue() != null && Xrm.Page.getAttribute("whb_contact").getValue()[0] != null) {

            var childcaseflag = Xrm.Page.getAttribute("whb_childcaseflag").getValue();
            var contactid = Xrm.Page.getAttribute("whb_contact").getValue()[0].id;
            contactid = contactid.toUpperCase();
            var contactname = Xrm.Page.getAttribute("whb_contact").getValue()[0].name;
            if (childcaseflag == 1) {

                Xrm.Page.getAttribute("customerid").setValue([{ id: contactid, name: contactname, entityType: "contact" }]);
            }
            else {
                Xrm.Page.getAttribute("customerid").setValue([{ id: contactid, name: contactname, entityType: "contact" }]);
            }


        }
    }
}
function lockFields() {
    var formType = Xrm.Page.ui.getFormType();
    if (formType > 1) {
        if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && Xrm.Page.getAttribute("whb_reasonforcontact").getValue() != 5 && (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() == null) && (Xrm.Page.getAttribute("whb_reasonforcontact") != null && Xrm.Page.getAttribute("whb_reasonforcontact").getValue() != 2)) {
            // Xrm.Page.ui.controls.forEach(function (control, i) {
            // if (control && control.getDisabled && !control.getDisabled()) {
            // control.setDisabled(true);
            // }
            // });
            // Xrm.Page.getControl("whb_contact").setDisabled(false);
            // Xrm.Page.getControl("whb_reservation").setDisabled(false);
            // Xrm.Page.getControl("whb_reasonforcontact").setDisabled(false);
            // Xrm.Page.getControl("whb_guestname").setDisabled(false);
            // getTeamMangerRoleNameFlag(); // to set date of first conctact received based on team manager role
            // Xrm.Page.getControl("whb_contacttype").setDisabled(false);
            // Xrm.Page.getControl("whb_businessarea").setDisabled(false);
            // Xrm.Page.getControl("whb_property").setDisabled(false);
            // Xrm.Page.getControl("whb_visitcategory").setDisabled(false);
            // Xrm.Page.getControl("whb_dateofincident").setDisabled(false);
            // Xrm.Page.getControl("whb_primarycategory").setDisabled(false);
            // Xrm.Page.getControl("whb_primarysubcategory").setDisabled(false);
            // Xrm.Page.getControl("whb_primaryother").setDisabled(false);
            // Xrm.Page.getControl("whb_secondarycategory").setDisabled(false);
            // Xrm.Page.getControl("whb_secondarysubcategory").setDisabled(false);
            // Xrm.Page.getControl("whb_secondaryother").setDisabled(false);
            // Xrm.Page.getControl("whb_tertiarycategory").setDisabled(false);
            // Xrm.Page.getControl("whb_tertiarysubcategory").setDisabled(false);
            // Xrm.Page.getControl("whb_tertiaryother").setDisabled(false);
            // Xrm.Page.getControl("title").setDisabled(false);
            // Xrm.Page.getControl("whb_summary").setDisabled(false);
            // Xrm.Page.getControl("whb_sitefeedbackrequested").setDisabled(false);
            // lockAllFieldsinTab("Details");
            //lockAllFieldsinTab("Resolution");
            lockAllFieldsinTab("Details", "During Stay Information");
            lockAllFieldsinTab("Details", "Related Cases");
            //lockAllFieldsinTab("Details", "case audit history");
            lockAllFieldsinTab("Details", "Applicable SLA(STANDARD)");
            lockAllFieldsinTab("Details", "Escalation Details");
            lockAllFieldsinTab("Resolution", "tab_5_section_1");
            lockAllFieldsinTab("Resolution", "tab_5_section_3");

        }
        else {
            unLockAllFieldsinTab("Details", "During Stay Information");
            unLockAllFieldsinTab("Details", "Related Cases");
            // unLockAllFieldsinTab("Details", "case audit history");
            unLockAllFieldsinTab("Details", "Applicable SLA(STANDARD)");
            unLockAllFieldsinTab("Details", "Escalation Details");
            unLockAllFieldsinTab("Resolution", "tab_5_section_1");
            unLockAllFieldsinTab("Resolution", "tab_5_section_3");
        }
    }
}

function getTeamMangerRoleNameFlag() {
    try {
        //debugger;
        var currentUserRoles = Xrm.Page.context.getUserRoles();
        var formType = Xrm.Page.ui.getFormType();
        if (formType > 1) {
            var flag = false;
            for (var i = 0; i < currentUserRoles.length; i++) {
                var userRoleId = currentUserRoles[i];
                var RoleName = GetRoleName(userRoleId);
                if (RoleName == teamManagerRole) {
                    flag = true;
                }
            }

            if (flag == true) {
                var fields = Xrm.Page.getControl("whb_date1stcontactreceived");
                if (fields) {
                    fields.setDisabled(false);
                }
            }
            else {
                var fields = Xrm.Page.getControl("whb_date1stcontactreceived");
                if (fields) {
                    fields.setDisabled(true);
                }
            }
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "getTeamMangerRoleNameFlag", err);
    }
}

function dpaNotification() {
    var formType = Xrm.Page.ui.getFormType();
    if (formType == 2) {
        if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() == null) && (Xrm.Page.getAttribute("whb_reasonforcontact") != null && Xrm.Page.getAttribute("whb_reasonforcontact").getValue() != 2)) {
            Xrm.Page.ui.clearFormNotification("007");
            //Xrm.Page.ui.setFormNotification("DPA Check is yet to be done", "INFORMATION", "007");
            Xrm.Page.ui.setFormNotification("DPA Check is yet to be done", "WARNING", "007");
        }

        else {
            Xrm.Page.ui.clearFormNotification("007");
        }
    }
}



function populatingcurrency() {

    try {
        var formtype = Xrm.Page.ui.getFormType();
        if (formtype == 1 || formtype == 2) {
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/transactioncurrencies?$select=currencyname,transactioncurrencyid&$filter=currencyname eq 'Pound%20Sterling'", false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var results = JSON.parse(this.response);
                        for (var i = 0; i < results.value.length; i++) {
                            var currencyname = results.value[i]["currencyname"];
                            var transactioncurrencyid = results.value[i]["transactioncurrencyid"];
                            Xrm.Page.getAttribute("transactioncurrencyid").setValue([{ id: transactioncurrencyid, name: currencyname, entityType: "transactioncurrency" }]);
                            Xrm.Page.getAttribute("transactioncurrencyid").setSubmitMode("always");
                        }
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send();
        }

    } catch (err) {
        ErrorHandling("Case", "whb_onload.js", "populatingcurrency", err);
    }
}

//130570009 - Awaiting Customer Feedback
//130570000 - Awaiting Internal Communication
//130570011 - Awaiting External Communication
//1 - In Progress

function RemoveFewStatusReasonOption() {
    var statusReason = Xrm.Page.getAttribute("statuscode").getValue();
    Xrm.Page.getControl("header_statuscode").removeOption(130570001);
    Xrm.Page.getControl("header_statuscode").removeOption(3);
    Xrm.Page.getControl("header_statuscode").removeOption(4);
    if (statusReason == 130570001 || statusReason == 3 || statusReason == 4) {
        Xrm.Page.getControl("header_statuscode").setDisabled(true);
    }
    if (statusReason == 130570009 || statusReason == 130570000 || statusReason == 130570011) {
        Xrm.Page.getControl("header_statuscode").removeOption(1);
    }
}


function lockAllFieldsinTab(tabname, sectionname) {
    try {
        var section = Xrm.Page.ui.tabs.get(tabname).sections.get(sectionname);
        var controls = section.controls.get();

        var controlsLenght = controls.length;

        for (var i = 0; i < controlsLenght; i++) {
            if (controls[i].getControlType() != "subgrid")
                controls[i].setDisabled(true);
        }

    } catch (err) {
        ErrorHandling("Case", "whb_caseonload.js", "lockAllFieldsinTab", err);

    }
}

function unLockAllFieldsinTab(tabname, sectionname) {
    try {
        var section = Xrm.Page.ui.tabs.get(tabname).sections.get(sectionname);
        var controls = section.controls.get();
        var controlsLenght = controls.length;

        for (var i = 0; i < controlsLenght; i++) {
            if (controls[i].getControlType() != "subgrid")
                controls[i].setDisabled(false);
        }

    } catch (err) {
        ErrorHandling("Case", "whb_caseonload.js", "unLockAllFieldsinTab", err);

    }
}
//Created by Ranjith
//Created on: 21/05/2018
//Lock the Status reason field if the Status is Awaiting Customer Feedback/Awaiting Internal Communication/Awaiting External Communication

function lockStatusReason() {
    try {

        var statusReason = Xrm.Page.getAttribute("statuscode").getValue();
        if (statusReason == 130570009 || statusReason == 130570000 || statusReason == 130570011) {
            Xrm.Page.getControl("header_statuscode").setDisabled(true);
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onload.js", "lockStatusReason", err);
    }
}