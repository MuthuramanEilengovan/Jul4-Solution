// Created By Muthu 
//Function for showing and hiding Section s based on Proposed Resolution Code
function onchangeproposedresolution(context, event) {
    try {

        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        //(proposedresolutioncode == 2(Refund GNG) && proposedresolutioncode ==6 (Refund BOAGNG)
        //Refund GNG Section will be Shown and other Sections will be Hidden
        if (proposedresolutioncode == 2 || proposedresolutioncode == 6) {
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(true);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(false);
            clearingfields("Resolution", "Refund-BOA GWG");
            clearingfields("Resolution", "Leisure Vouchers");
            clearingfields("Resolution", "Refund Holiday Extra");
            Xrm.Page.ui.clearFormNotification("1");
        }
            //(proposedresolutioncode == 7|| 3|| 9(Refund-BOAGWG))
            //Refund GwG Section will be Shown and other Sections will be Hidden
        else if (proposedresolutioncode == 7 || proposedresolutioncode == 3 || proposedresolutioncode == 19) {
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(true);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(false);

            Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(false);

            Xrm.Page.getAttribute("whb_amountrboa").setRequiredLevel("required");
            if (proposedresolutioncode == 7) {
                Xrm.Page.getAttribute("whb_refundtypeboa").setRequiredLevel("required");
                Xrm.Page.getControl("whb_refundtypeboa").setVisible(true);
            }
            else if (proposedresolutioncode == 3 || proposedresolutioncode == 19) {

                Xrm.Page.getAttribute("whb_refundtypeboa").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundtypeboa").setVisible(false);
                if (proposedresolutioncode == 19 && event == "OC") {
                    clearingfields("Resolution", "Refund-BOA GWG");
                }
            }
            Xrm.Page.ui.clearFormNotification("1");
            clearingfields("Resolution", "Refund - GNG");
            clearingfields("Resolution", "Leisure Vouchers");
            clearingfields("Resolution", "Refund Holiday Extra");
        }
            //(proposedresolutioncode == 8(Leisure Vouchers))
            //Leisure Voucher Section will be Shown and other Sections will be Hidden
        else if (proposedresolutioncode == 8) {
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(true);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(false);
            //Xrm.Page.getAttribute("whb_postaladdresssameascontactle").setValue(1);
            Xrm.Page.getAttribute("whb_pecentagelv").setValue(1);
            Xrm.Page.ui.setFormNotification("Please refer to the Leisure Voucher Matrix", "WARNING", "1");
            clearingfields("Resolution", "Refund - GNG");
            clearingfields("Resolution", "Refund-BOA GWG");
            clearingfields("Resolution", "Refund Holiday Extra");

        }
            //(proposedresolutioncode == 5(Refund Holiday Extra)
            //Refund Holiday Extra Section will be Shown and other Sections will be Hidden
        else if (proposedresolutioncode == 5) {
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(true);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(false);

            Xrm.Page.ui.clearFormNotification("1");
            clearingfields("Resolution", "Refund - GNG");
            clearingfields("Resolution", "Refund-BOA GWG");
            clearingfields("Resolution", "Leisure Vouchers");

        }

        else {
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(false);
            Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(false);

            Xrm.Page.ui.clearFormNotification("1");
            if (event == "OC") {
                clearingfields("Resolution", "Refund - GNG");
                clearingfields("Resolution", "Refund-BOA GWG");
                clearingfields("Resolution", "Leisure Vouchers");
                clearingfields("Resolution", "Refund Holiday Extra");
            }


        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "onchangeproposedresolution", err);

    }

}
function GetPrimaryCatrgory() {
    debugger;
    var primarySubCategory = Xrm.Page.getAttribute("whb_primarysubcategory").getValue();
    if (primarySubCategory != null && primarySubCategory.length == 1) {
        var Id = primarySubCategory[0].id;
        var primarySubCategoryID = Id.slice(1, -1);
        var category = GetCategory(primarySubCategoryID)
        var primarycategory = Xrm.Page.getAttribute("whb_primarycategory").getValue();
        if (category != null && primarycategory == null) {
            Xrm.Page.getAttribute("whb_primarycategory").setValue([{ id: category[0].id, name: category[0].name, entityType: category[0].entityType }]);
            Xrm.Page.getAttribute("whb_primarycategory").setSubmitMode("always");
        }
    }
}

function GetSecondaryCatrgory() {
    //debugger;
    var SecondaryCatrgory = Xrm.Page.getAttribute("whb_secondarysubcategory").getValue();
    if (SecondaryCatrgory != null && SecondaryCatrgory.length == 1) {
        var Id = SecondaryCatrgory[0].id;
        var SecondaryCatrgoryID = Id.slice(1, -1);
        var category = GetCategory(SecondaryCatrgoryID)
        if (category != null) {
            Xrm.Page.getAttribute("whb_secondarycategory").setValue([{ id: category[0].id, name: category[0].name, entityType: category[0].entityType }]);
        }
    }
}

function GetTertiaryCatrgory() {
    //debugger;
    var TertiaryCatrgory = Xrm.Page.getAttribute("whb_tertiarysubcategory").getValue();
    if (TertiaryCatrgory != null && TertiaryCatrgory.length == 1) {
        var Id = TertiaryCatrgory[0].id;
        var TertiaryCatrgoryID = Id.slice(1, -1);
        var category = GetCategory(TertiaryCatrgoryID)
        if (category != null) {
            Xrm.Page.getAttribute("whb_tertiarycategory").setValue([{
                id: category[0].id, name: category[0].name, entityType:
                category[0].entityType
            }]);
        }
    }
}




function GetCategory(Id) {
    var category = new Array();
    category[0] = new Object();
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_subcategories(" + Id + ")?$select=_whb_category_value", false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.send();
    if (req.readyState === 4) {
        //req.onreadystatechange = null;
        if (req.status === 200) {
            var result = JSON.parse(req.response);
            var _whb_category_value = result["_whb_category_value"];
            var _whb_category_value_formatted = result["_whb_category_value@OData.Community.Display.V1.FormattedValue"];
            var _whb_category_value_lookuplogicalname = result["_whb_category_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
            category[0].id = _whb_category_value;
            category[0].name = _whb_category_value_formatted;
            category[0].entityType = _whb_category_value_lookuplogicalname;

        } else {
            // Xrm.Utility.alertDialog(req.statusText);
        }
    }
    return category;
}



//Created by muthu for stamping contact
function stampcontact() {
    try {
        if (Xrm.Page.getAttribute("whb_contact").getValue() != null && Xrm.Page.getAttribute("whb_contact").getValue()[0] != null) {


            var childcaseflag = Xrm.Page.getAttribute("whb_childcaseflag").getValue();
            var contactid = Xrm.Page.getAttribute("whb_contact").getValue()[0].id;
            var contactname = Xrm.Page.getAttribute("whb_contact").getValue()[0].name;
            if (childcaseflag == 1) {
                contactid = contactid.slice(1, -1).toUpperCase();
                Xrm.Page.getAttribute("customerid").setValue([{ id: contactid, name: contactname, entityType: "contact" }]);
            }
            else {
                Xrm.Page.getAttribute("customerid").setValue([{ id: contactid, name: contactname, entityType: "contact" }]);
            }

        }

    } catch (err) { ErrorHandling("Case", "whb_onchange.js", "stampcontact", err); }
}


//Created by Ranjith for hide or show Child Case Sub grid
function hideorShowChildCaseGrid() {
    //debugger;
    var parentCaseLookup = Xrm.Page.getAttribute("parentcaseid").getValue();
    var formType = Xrm.Page.ui.getFormType();
    if (parentCaseLookup == null && formType != 1) {
        Xrm.Page.ui.controls.get("ChildCase").setVisible(true);
    }
    else {
        Xrm.Page.ui.controls.get("ChildCase").setVisible(false);

    }
}
// created by Muthu 
//function for cancelling the case when it is marked as Spam
function cancellingthecase() {
    try {

        var formtype = Xrm.Page.ui.getFormType();
        var contacttype = Xrm.Page.getAttribute("whb_reasonforcontact").getValue();
        if (Xrm.Page.getAttribute("whb_reasonforcontact").getValue() != null && formtype != 1) {

            var primarycategory = Xrm.Page.getAttribute("whb_primarycategory").getValue();
            var primarysubcategory = Xrm.Page.getAttribute("whb_primarysubcategory").getValue();
            var secondarycategory = Xrm.Page.getAttribute("whb_secondarycategory").getValue();
            var secondarysubcategory = Xrm.Page.getAttribute("whb_secondarysubcategory").getValue();
            var teriartycategory = Xrm.Page.getAttribute("whb_tertiarycategory").getValue();
            var teriartsubcategory = Xrm.Page.getAttribute("whb_tertiarysubcategory").getValue();
            if (contacttype == 5 && (primarycategory == null && primarysubcategory == null && secondarycategory == null && secondarysubcategory == null && teriartycategory == null && teriartsubcategory == null)) {

                var spamornot = confirm("You have marked this Case as SPAM and are about to Cancel the Case - do you wish to continue?");

                if (spamornot == true) {
                    var attributes = Xrm.Page.data.entity.attributes.get();
                    for (var i in attributes) {
                        attributes[i].setRequiredLevel("none");
                    }
                    //  Xrm.Page.data.entity.save();
                    Xrm.Page.data.save().then(successCallback);
                    function successCallback() {
                        Xrm.Page.ui.close();
                    }

                }
                if (spamornot == false) {
                    Xrm.Page.getAttribute("whb_reasonforcontact").setValue(null);
                }

            }
            if (contacttype == 5 && (primarycategory != null || primarysubcategory != null || secondarycategory != null || secondarysubcategory != null || teriartycategory != null || teriartsubcategory != null)) {
                alert("Since Value is there in Category and sub Category fields You cannot Select this Option");
                Xrm.Page.getAttribute("whb_reasonforcontact").setValue(null);
            }

        }
        else if (formtype == 1 && contacttype == 5) {
            alert("Spam cannot be Selected as Reason for Contact  on Creation of Case");
            Xrm.Page.getAttribute("whb_reasonforcontact").setValue(null);
        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "cancellingthecase", err);

    }
}

// JavaScript source code
//created by muthu for checking franchise site
function checkingfranchise(executionContext) {

    try {


        if (Xrm.Page.getAttribute("whb_property").getValue() != null && Xrm.Page.getAttribute("whb_property").getValue()[0] != null) {

            var propertyid = Xrm.Page.getAttribute("whb_property").getValue()[0].id;
            if (propertyid != null) {
                if (propertyid.includes("{")) {
                    propertyid = Xrm.Page.getAttribute("whb_property").getValue()[0].id.slice(1, -1);
                }
            }
            var attribute = executionContext.getEventSource().getName();
            var resolutioncode = Xrm.Page.getAttribute(attribute).getValue();
            //  var resolutioncode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();

            if (resolutioncode == 2 || resolutioncode == 3 || resolutioncode == 5 || resolutioncode == 19) {


                var req = new XMLHttpRequest();
                req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_properties(" + propertyid + ")?$select=whb_franchise", false);
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
                            var whb_franchise = result["whb_franchise"];
                            var whb_franchise_formatted = result["whb_franchise@OData.Community.Display.V1.FormattedValue"];

                            if (whb_franchise_formatted == "Yes") {

                                Xrm.Page.getAttribute(attribute).setValue(null);
                                Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund - GNG").setVisible(false);
                                Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund-BOA GWG").setVisible(false);
                                Xrm.Page.ui.tabs.get("Resolution").sections.get("Refund Holiday Extra").setVisible(false);
                                Xrm.Page.ui.tabs.get("Resolution").sections.get("Leisure Vouchers").setVisible(false);
                                alert("You cannot pick the Resolution Code Since the Property is a franchise Site");
                            }
                        } else {
                            //Xrm.Utility.alertDialog(this.statusText);
                            ErrorHandling("Case", "whb_onchange.js", "checkingfranchise", this.statusText);
                        }
                    }
                };
                req.send();
            }
        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "checkingfranchise", err);

    }


}

// JavaScript source code
//function for Populating Cost values for one day
function populatingcostforonedayrefund(executionContext) {

    try {

        var resolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var i;
        var attribute = executionContext.getEventSource().getName();
        var numberofnights = Xrm.Page.getAttribute(attribute).getValue();

        if (Xrm.Page.getAttribute("whb_guestname").getValue() != null && Xrm.Page.getAttribute("whb_reservation").getValue() != null) {
            //debugger;
            if (numberofnights == 1) {
                if (Xrm.Page.getAttribute("whb_dateofincident").getValue() != null) {
                    var contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;

                    var reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id;
                    if (contactid != null) {
                        if (contactid.includes("{")) {

                            contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                        }
                    }
                    if (reservationid != null) {

                        if (reservationid.includes("{")) {

                            reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id.slice(1, -1);
                        }
                    }

                    var dateofincident = Xrm.Page.getAttribute("whb_dateofincident").getValue();

                    var currentDate = new Date(dateofincident);
                    var updatedmonth = currentDate.getMonth() + 1;
                    var today = currentDate.getFullYear() + "-" + updatedmonth + "-" + currentDate.getDate();

                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_roomstayses?$select=whb_costpernight1,whb_dateofstay&$filter=statuscode eq 1 and whb_dateofstay eq " + today + " and  _whb_stay_value eq " + contactid + " and  _whb_reservation_value eq " + reservationid + "&$orderby=whb_dateofstay asc", false);
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
                                if (results.value.length > 0) {
                                    for (var i = 0; i < results.value.length; i++) {
                                        var whb_costpernight = results.value[i]["whb_costpernight1"];
                                        var whb_costpernightformatted = results.value[i]["whb_costpernight1@OData.Community.Display.V1.FormattedValue"];


                                        var whb_dateofstay = results.value[i]["whb_dateofstay"];
                                        var date = new Date(whb_dateofstay);
                                        if (resolutioncode == 5) {
                                            Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setValue(date);
                                            Xrm.Page.getAttribute("whb_costpopulated1rhe").setValue(whb_costpernight);
                                            Xrm.Page.getAttribute("whb_refundpercentage").setValue(1);

                                        }

                                        else if (resolutioncode == 2) {
                                            Xrm.Page.getAttribute("whb_dateofnighttorefund1").setValue(date);
                                            Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(whb_costpernight);
                                            Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(1);

                                        }
                                        else if (resolutioncode == 6) {
                                            Xrm.Page.getAttribute("whb_dateofnighttorefund1").setValue(date);
                                            Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(whb_costpernight);
                                            Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(1);

                                        }

                                    }
                                }
                                else {
                                    alert("Date of Incident is not Matching with Guest Stayed Dates Please check Date of Incident");

                                    if (resolutioncode == 5) {
                                        Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setValue(dateofincident);
                                        Xrm.Page.getAttribute("whb_costpopulated1rhe").setValue(null);
                                        Xrm.Page.getAttribute("whb_refundpercentage").setValue(null);
                                        Xrm.Page.getAttribute(attribute).setValue(null);
                                    }

                                    else if (resolutioncode == 2) {
                                        Xrm.Page.getAttribute("whb_dateofnighttorefund1").setValue(dateofincident);
                                        Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(null);
                                        Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(null);
                                        Xrm.Page.getAttribute(attribute).setValue(null);

                                    }
                                    else if (resolutioncode == 6) {
                                        Xrm.Page.getAttribute("whb_dateofnighttorefund1").setValue(dateofincident);
                                        Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(null);
                                        Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(null);
                                        Xrm.Page.getAttribute(attribute).setValue(null);
                                    }
                                }

                            } else {

                                //Xrm.Utility.alertDialog(this.statusText);
                                ErrorHandling("Case", "whb_onchange.js", "populatingcostforonedayrefund", this.statusText);
                            }
                        }
                    };
                    req.send();
                }
                else {

                    alert("Date of Incident is required for One Night Refunds");
                    Xrm.Page.getAttribute(attribute).setValue(null);
                }

            }
        }
        else {

            alert("Either Reservation or Guest Name is required for Refunds");
            Xrm.Page.getAttribute(attribute).setValue(null);
        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "populatingcostforonedayrefund", err);

    }
}

//function for Populating Cost values from Refund Holiday Extra GNG
function populatingholidayextra() {
    try {
        //debugger;
        var noofnights = Xrm.Page.getAttribute("whb_numberofnightstorefundrhe").getValue();
        var gngnoofnights = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var refundfulstay = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        var refundrhgng = Xrm.Page.getAttribute("whb_refundfullstayrhgng").getValue();
        if (proposedresolutioncode == 5) {
            if (noofnights != null && refundrhgng == 0) {
                if (noofnights == 1) {
                    Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setSubmitMode("always");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated2rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);

                }
                else if (noofnights == 2) {
                    Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);


                }
                else if (noofnights == 3) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);
                }
                else if (noofnights == 4) {
                    Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(true);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentage").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("required");
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);


                }
                else if (noofnights >= 5) {
                    Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(true);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("required");
                }

            }
            else {
                Xrm.Page.getControl("whb_dateofnighttorefund1rhe").setVisible(false);
                Xrm.Page.ui.controls.get("whb_dateofnighttorefund1rhe").setDisabled(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated1rhe").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund2rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated2rhe").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund3rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated3rhe").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund4rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated4rhe").setVisible(false);
                Xrm.Page.getControl("whb_remainingdatesofnightstorefundrhe").setVisible(false);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_remainingdatesofnightstorefundamountrhe").setVisible(false);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentage").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentage").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentage2rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentage2rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentage3rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentage3rhe").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentage4rhe").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentage4rhe").setRequiredLevel("none");
                Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated2rhe").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated1rhe").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setValue(null);


            }

        }


        else if (proposedresolutioncode == 2 || proposedresolutioncode == 6) {

            if (gngnoofnights != null && refundfulstay == 0) {
                if (gngnoofnights == 1) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").setSubmitMode("always");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated2rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated3rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated2rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundrhe").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamountrhe").setValue(null);

                }
                else if (gngnoofnights == 2) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(false);
                    Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated3rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setValue(null);
                }
                else if (gngnoofnights == 3) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(false);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(false);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("none");
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setValue(null);
                    Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setValue(null);
                }
                else if (gngnoofnights == 4) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(true);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(false);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("none");
                    Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("required");
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setValue(null);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setValue(null);



                }
                else if (gngnoofnights >= 5) {

                    Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(true);
                    Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(false);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(true);
                    Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(true);
                    Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(true);
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(true);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(true);
                    Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("required");
                    Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(true);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("required");
                }
            }
            else {

                Xrm.Page.getControl("whb_dateofnighttorefund1").setVisible(false);
                Xrm.Page.ui.controls.get("whb_dateofnighttorefund1").setDisabled(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund1").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated1rgng").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund2").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund2").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated2rgng").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund3").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund3").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated3rgng").setVisible(false);
                Xrm.Page.getControl("whb_dateofnighttorefund4").setVisible(false);
                Xrm.Page.getAttribute("whb_dateofnighttorefund4").setRequiredLevel("none");
                Xrm.Page.getControl("whb_costpopulated4rgng").setVisible(false);
                Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setRequiredLevel("none");
                Xrm.Page.getControl("whb_remainingdatesofnightstorefundamount").setVisible(false);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentagergng1").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentagergng1").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentagergng2").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentagergng2").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentagergng3").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentagergng3").setRequiredLevel("none");
                Xrm.Page.getControl("whb_refundpercentagergng4").setVisible(false);
                Xrm.Page.getAttribute("whb_refundpercentagergng4").setRequiredLevel("none");
                Xrm.Page.getAttribute("whb_dateofnighttorefund2").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated2rgng").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund3").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated3rgng").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund4").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(null);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefund").setValue(null);
                Xrm.Page.getAttribute("whb_remainingdatesofnightstorefundamount").setValue(null);
                Xrm.Page.getAttribute("whb_dateofnighttorefund1").setValue(null);
                Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(null);


            }
        }


    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "populatingholidayextra", err);
    }


}
//created by Muthu
//Function for Clearing fields when Proposed Resolution Code Changes
function clearingfields(tabname, sectionname) {
    try {
        var section = Xrm.Page.ui.tabs.get(tabname).sections.get(sectionname);
        var controls = section.controls.get();
        var controlsLenght = controls.length;

        for (var i = 0; i < controlsLenght; i++) {
            if (controls[i].getName() != "whb_postaladdresssameascontactgng" && controls[i].getName() != "whb_postaladdresssameascontactle") {
                controls[i].getAttribute().setValue(null);
                controls[i].getAttribute().setRequiredLevel("none");
            }

        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "clearingfields", err);

    }
}
//Created by Ranjith to set the Company name in Case
function stampingcompany() {
    try {

        var company = Xrm.Page.getAttribute("whb_company").getValue();
        if (company == null) {
            if (Xrm.Page.getAttribute("whb_contact").getValue() != null && Xrm.Page.getAttribute("whb_contact").getValue()[0] != null) {
                var cId = Xrm.Page.getAttribute("whb_contact").getValue()[0].id;
                if (cId != null) {
                    if (cId.includes("{")) {
                        cId = Xrm.Page.getAttribute("whb_contact").getValue()[0].id.slice(1, -1);
                    }

                    var url = Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + cId + ")?$select=_parentcustomerid_value";
                    var req = new XMLHttpRequest();
                    //req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + contactId + ")?$select=_parentcustomerid_value", false);
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + cId + ")", false);
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
                                var _parentcustomerid_value = result["_parentcustomerid_value"];
                                var _parentcustomerid_value_formatted = result["_parentcustomerid_value@OData.Community.Display.V1.FormattedValue"];
                                var _parentcustomerid_value_lookuplogicalname = result["_parentcustomerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                if (_parentcustomerid_value != null) {
                                    Xrm.Page.getAttribute("whb_company").setValue([{ id: _parentcustomerid_value, name: _parentcustomerid_value_formatted, entityType: _parentcustomerid_value_lookuplogicalname }]);
                                }
                                else {
                                    Xrm.Page.getAttribute("whb_company").setValue(null);
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
        }

    } catch (Ex) { alert("Exception in stampingcompany" + Ex.message); }
}


//function propertyOnChange() {
//    //debugger;
//    try {

//        var flag = Xrm.Page.getAttribute("whb_childcaseflag").getValue();
//        var formType = Xrm.Page.ui.getFormType();
//        if (flag != true && formType != 1) {
//            var property = Xrm.Page.getAttribute("whb_property").getValue();
//            if (property != null) {
//                var noOfAlerts = Xrm.Page.getAttribute("whb_noofalerts").getValue();
//                if (noOfAlerts != null) {
//                    //var noOfAlerts = '';
//                    for (var i = 0; i <= noOfAlerts; i++) {
//                        Xrm.Page.ui.clearFormNotification(i.toString());
//                    }
//                }
//                var currentDate = new Date();
//                var today = currentDate.getFullYear() + "-" + currentDate.getMonth() + 1 + "-" + currentDate.getDate();
//                var notificationString = '', whb_enddate = '', whb_feedback = '', whb_startdate = '';
//                var propertyid = Xrm.Page.getAttribute("whb_property").getValue()[0].id.slice(1, -1);
//                var req = new XMLHttpRequest();
//                req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_sitealerts?$select=whb_enddate,whb_feedback,whb_startdate&$filter=(whb_enddate eq null or whb_enddate ge " + today + ") and whb_startdate le " + today + " and _whb_propertyid_value eq " + propertyid + "", true);
//                req.setRequestHeader("OData-MaxVersion", "4.0");
//                req.setRequestHeader("OData-Version", "4.0");
//                req.setRequestHeader("Accept", "application/json");
//                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
//                req.onreadystatechange = function () {
//                    if (this.readyState === 4) {
//                        req.onreadystatechange = null;
//                        if (this.status === 200) {
//                            var results = JSON.parse(this.response);
//                            noOfAlerts = results.value.length;
//                        //  Xrm.Page.getAttribute("whb_noofalerts").setValue(noOfAlerts); //new field to be created
//                          //Xrm.Page.getAttribute('whb_noofalerts').setSubmitmode(always);
//                            for (var i = 0; i < results.value.length; i++) {
//                                whb_enddate = results.value[i]["whb_enddate"];
//                                whb_feedback = results.value[i]["whb_feedback"];
//                                whb_startdate = results.value[i]["whb_startdate"];
//                                if (whb_enddate != null && whb_enddate != "undefined" && whb_enddate != "") {
//                                    notificationString = whb_feedback + " on " + whb_startdate + " with end date as " + whb_enddate;
//                                }
//                                else {
//                                    notificationString = whb_feedback + " on " + whb_startdate;
//                                }
//                                Xrm.Page.ui.setFormNotification(notificationString, "WARNING", i.toString());
//                            }
//                        } else {
//                            Xrm.Utility.alertDialog(this.statusText);
//                        }
//                    }
//                };
//                req.send();
//            }
//            else {
//                Xrm.Page.ui.clearFormNotification();
//            }
//        }
//    }
//    catch (ex) { alert("Exception in propertyOnChange" + ex.message); }
//}


function associateCaseAndDPA() {
    //debugger;
    if (Xrm.Page.getAttribute("whb_dparecordguid") != null && Xrm.Page.getAttribute("whb_dparecordguid").getValue() != null) {
        var entity = {};
        var caseId = Xrm.Page.data.entity.getId();
        caseId = caseId.slice(1, -1);
        entity["whb_Case@odata.bind"] = "/incidents(" + caseId + ")";

        var dpaID = Xrm.Page.getAttribute("whb_dparecordguid").getValue();
        var req = new XMLHttpRequest();
        req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_dpachecks(" + dpaID + ")", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    //Success - No Return Data - Do Something
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(entity));
    }
}
//function for showing Address Fields in REFUNG GNG and Leisure Voucher
function showingaddressfieldsRGNG() {
    try {
        //debugger;
        var postaladdress = Xrm.Page.getAttribute("whb_postaladdresssameascontactgng").getValue();
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var postaladdresslv = Xrm.Page.getAttribute("whb_postaladdresssameascontactle").getValue();
        var noofnights = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();

        var paidinleisure = Xrm.Page.getAttribute("whb_paidinleisurevouchers").getValue();

        if (proposedresolutioncode == 2) {
            if (postaladdress == 0 && paidinleisure == 1) {
                Xrm.Page.getControl("whb_contactnameforvoucherdelivery").setVisible(true);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdelivery").setRequiredLevel("required");
                Xrm.Page.getControl("whb_addressline1").setVisible(true);
                Xrm.Page.getAttribute("whb_addressline1").setRequiredLevel("required");
                Xrm.Page.getControl("whb_addressline2").setVisible(true);
                Xrm.Page.getControl("whb_addressline3").setVisible(true);
                Xrm.Page.getControl("whb_city").setVisible(true);
                Xrm.Page.getControl("whb_county").setVisible(true);

                Xrm.Page.getControl("whb_country").setVisible(true);
                Xrm.Page.getControl("whb_postalcode").setVisible(true);
                Xrm.Page.getAttribute("whb_postalcode").setRequiredLevel("required");
            }
            else {

                Xrm.Page.getControl("whb_contactnameforvoucherdelivery").setVisible(false);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdelivery").setRequiredLevel("none");
                Xrm.Page.getControl("whb_addressline1").setVisible(false);
                Xrm.Page.getAttribute("whb_addressline1").setRequiredLevel("none");
                Xrm.Page.getControl("whb_addressline2").setVisible(false);
                Xrm.Page.getControl("whb_addressline3").setVisible(false);
                Xrm.Page.getControl("whb_city").setVisible(false);
                Xrm.Page.getControl("whb_county").setVisible(false);

                Xrm.Page.getControl("whb_country").setVisible(false);
                Xrm.Page.getControl("whb_postalcode").setVisible(false);
                Xrm.Page.getAttribute("whb_postalcode").setRequiredLevel("none");
            }
        }
        else {

            Xrm.Page.getControl("whb_contactnameforvoucherdelivery").setVisible(false);
            Xrm.Page.getAttribute("whb_contactnameforvoucherdelivery").setRequiredLevel("none");
            Xrm.Page.getControl("whb_addressline1").setVisible(false);
            Xrm.Page.getAttribute("whb_addressline1").setRequiredLevel("none");
            Xrm.Page.getControl("whb_addressline2").setVisible(false);
            Xrm.Page.getControl("whb_addressline3").setVisible(false);
            Xrm.Page.getControl("whb_city").setVisible(false);
            Xrm.Page.getControl("whb_county").setVisible(false);

            Xrm.Page.getControl("whb_country").setVisible(false);
            Xrm.Page.getControl("whb_postalcode").setVisible(false);
            Xrm.Page.getAttribute("whb_postalcode").setRequiredLevel("none");
        }
        if (proposedresolutioncode == 8) {
            if (postaladdresslv == 0) {
                Xrm.Page.getControl("whb_contactnameforvoucherdeliverylv").setVisible(true);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdeliverylv").setRequiredLevel("required");
                Xrm.Page.getControl("whb_addressline1lv").setVisible(true);
                Xrm.Page.getAttribute("whb_addressline1lv").setRequiredLevel("required");
                Xrm.Page.getControl("whb_addressline2lv").setVisible(true);
                Xrm.Page.getControl("whb_addressline3lv").setVisible(true);
                Xrm.Page.getControl("whb_towncitylv").setVisible(true);
                Xrm.Page.getControl("whb_countylv").setVisible(true);
                Xrm.Page.getControl("whb_countrylv").setVisible(true);
                Xrm.Page.getControl("whb_postalcodelv").setVisible(true);
                Xrm.Page.getAttribute("whb_postalcodelv").setRequiredLevel("required");
            }
            else {

                Xrm.Page.getControl("whb_contactnameforvoucherdeliverylv").setVisible(false);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdeliverylv").setRequiredLevel("none");
                Xrm.Page.getControl("whb_addressline1lv").setVisible(false);
                Xrm.Page.getAttribute("whb_addressline1lv").setRequiredLevel("none");
                Xrm.Page.getControl("whb_addressline2lv").setVisible(false);
                Xrm.Page.getControl("whb_addressline3lv").setVisible(false);
                Xrm.Page.getControl("whb_towncitylv").setVisible(false);
                Xrm.Page.getControl("whb_countylv").setVisible(false);
                Xrm.Page.getControl("whb_countrylv").setVisible(false);
                Xrm.Page.getControl("whb_postalcodelv").setVisible(false);
                Xrm.Page.getAttribute("whb_postalcodelv").setRequiredLevel("none");
            }
        }
        else {

            Xrm.Page.getControl("whb_contactnameforvoucherdeliverylv").setVisible(false);
            Xrm.Page.getAttribute("whb_contactnameforvoucherdeliverylv").setRequiredLevel("none");
            Xrm.Page.getControl("whb_addressline1lv").setVisible(false);
            Xrm.Page.getAttribute("whb_addressline1lv").setRequiredLevel("none");
            Xrm.Page.getControl("whb_addressline2lv").setVisible(false);
            Xrm.Page.getControl("whb_addressline3lv").setVisible(false);
            Xrm.Page.getControl("whb_towncitylv").setVisible(false);
            Xrm.Page.getControl("whb_countylv").setVisible(false);
            Xrm.Page.getControl("whb_countrylv").setVisible(false);
            Xrm.Page.getControl("whb_postalcodelv").setVisible(false);
            Xrm.Page.getAttribute("whb_postalcodelv").setRequiredLevel("none");
        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "showingaddressfieldsRGNG", err);

    }

}
//Created By Muthu
//Function for Populating Cost when Date is Selected in Refunds
function gettingcost(executionContext) {

    try {
        //debugger;
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var firstday = null;
        var reservationid = null;
        var contactid = null;
        var attribute = executionContext.getEventSource();
        var fieldname = null;

        var numberofnightsrng = Xrm.Page.getAttribute("whb_numberofnightstorefundrhe").getValue();
        var numberofnightsrefundgng = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();


        if (proposedresolutioncode == 5 && Xrm.Page.getAttribute("whb_reservation").getValue() != null && numberofnightsrng > 1 && Xrm.Page.getAttribute(attribute.getName()).getValue() != null && Xrm.Page.getAttribute("whb_guestname").getValue() != null) {
            fieldname = attribute.getName();
            firstday = Xrm.Page.getAttribute(fieldname).getValue();
            contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;

            reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id;
            if (contactid != null) {
                if (contactid.includes("{")) {

                    contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                }
            }
            if (reservationid != null) {

                if (reservationid.includes("{")) {

                    reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id.slice(1, -1);
                }
            }

            validatingdate(firstday, reservationid, fieldname, contactid, proposedresolutioncode);
        }
        else if (proposedresolutioncode == 2 && Xrm.Page.getAttribute("whb_reservation").getValue() != null && numberofnightsrefundgng > 1 && Xrm.Page.getAttribute(attribute.getName()).getValue() != null && Xrm.Page.getAttribute("whb_guestname").getValue() != null) {
            fieldname = attribute.getName();
            firstday = Xrm.Page.getAttribute(fieldname).getValue();
            contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;

            reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id;
            if (contactid != null) {
                if (contactid.includes("{")) {

                    contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                }
            }
            if (reservationid != null) {

                if (reservationid.includes("{")) {

                    reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id.slice(1, -1);
                }
            }
            validatingdate(firstday, reservationid, fieldname, contactid, proposedresolutioncode);
        }
        else if (proposedresolutioncode == 6 && Xrm.Page.getAttribute("whb_reservation").getValue() != null && numberofnightsrefundgng > 1 && Xrm.Page.getAttribute(attribute.getName()).getValue() != null && Xrm.Page.getAttribute("whb_guestname").getValue() != null) {
            fieldname = attribute.getName();
            firstday = Xrm.Page.getAttribute(fieldname).getValue();
            contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;

            reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id;
            if (contactid != null) {
                if (contactid.includes("{")) {

                    contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                }
            }
            if (reservationid != null) {

                if (reservationid.includes("{")) {

                    reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id.slice(1, -1);
                }
            }
            validatingdate(firstday, reservationid, fieldname, contactid, proposedresolutioncode);
        }
        if (Xrm.Page.getAttribute(attribute.getName()).getValue() == null) {


            if (proposedresolutioncode == 5) {
                if (attribute.getName() == "whb_dateofnighttorefund1rhe") {
                    Xrm.Page.getAttribute("whb_costpopulated1rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentage").setValue(null);
                }
                if (attribute.getName() == "whb_dateofnighttorefund2rhe") {
                    Xrm.Page.getAttribute("whb_costpopulated2rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setValue(null);
                }

                if (attribute.getName() == "whb_dateofnighttorefund3rhe") {
                    Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setValue(null);
                }
                if (attribute.getName() == "whb_dateofnighttorefund4rhe") {
                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setValue(null);
                }
            }
            else if (proposedresolutioncode == 2 || proposedresolutioncode == 6) {
                if (attribute.getName() == "whb_dateofnighttorefund1") {
                    Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(null);
                }
                if (attribute.getName() == "whb_dateofnighttorefund2") {
                    Xrm.Page.getAttribute("whb_costpopulated2rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setValue(null);
                }
                if (attribute.getName() == "whb_dateofnighttorefund3") {
                    Xrm.Page.getAttribute("whb_costpopulated3rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setValue(null);
                }
                if (attribute.getName() == "whb_dateofnighttorefund4") {
                    Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(null);
                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setValue(null);
                }
            }



        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "gettingcost", err);

    }
}
//Created By muthu
//Function for Checking Whether Selected Date is within Arrival and Departure Date
function validatingdate(firstday, reservationid, fieldname, contactid, proposedresolutioncode) {
    if (firstday != null && reservationid != null) {
        //debugger;
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_reservations(" + reservationid + ")?$select=whb_arrivaldate,whb_departuredate", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    // debugger;
                    var result = JSON.parse(this.response);
                    var whb_arrivaldate = result["whb_arrivaldate"];
                    var whb_departuredate = result["whb_departuredate"];
                    var datecheck = new Date(firstday);
                    var arrivaldate = new Date(whb_arrivaldate);
                    var departuredate = new Date(whb_departuredate);

                    var updatedmonthdatecheck = datecheck.getMonth() + 1;
                    var datecheck = datecheck.getFullYear() + "-" + updatedmonthdatecheck + "-" + datecheck.getDate();


                    var updatedmonth = arrivaldate.getMonth() + 1;
                    var arrivaldate = arrivaldate.getFullYear() + "-" + updatedmonth + "-" + arrivaldate.getDate();

                    var updatedmonthdeparture = departuredate.getMonth() + 1;
                    var departuredate = departuredate.getFullYear() + "-" + updatedmonthdeparture + "-" + departuredate.getDate();
                    if (new Date(datecheck) < new Date(arrivaldate) || new Date(datecheck) > new Date(departuredate)) {

                        alert("Selected Date is Not Within Arrival Date and Departure Date");

                        Xrm.Page.getAttribute(fieldname).setValue(null);
                    }
                    else {

                        populatingcost(contactid, reservationid, firstday, fieldname, proposedresolutioncode);
                    }
                } else {

                    ErrorHandling("Case", "whb_onchange.js", "validatingdate", this.statusText);

                }
            }
        };
        req.send();
    }

}

//created By Muthu
//Function for Stamping cost from Guest
function populatingcost(contactid, reservationid, datecheck, fieldname, proposedresolutioncode) {

    try {
        //debugger;
        // var dateofstay = getODataUTCDateFilter(datecheck);
        var currentDate = new Date(datecheck);
        var updatedmonth = currentDate.getMonth() + 1;

        var dateofstay = currentDate.getFullYear() + "-" + updatedmonth + "-" + currentDate.getDate();

        var req = new XMLHttpRequest();
        var url = Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_roomstayses?$select=whb_costpernight1,whb_dateofstay&$filter= statuscode eq 1 and _whb_stay_value eq " + contactid + "  and  _whb_reservation_value eq " + reservationid + " and  whb_dateofstay eq " + dateofstay;
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_roomstayses?$select=whb_costpernight1,whb_dateofstay&$filter= statuscode eq 1 and _whb_stay_value eq " + contactid + "  and  _whb_reservation_value eq " + reservationid + " and  whb_dateofstay eq " + dateofstay, false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    //debugger;
                    var results = JSON.parse(this.response);
                    if (results.value.length > 0) {
                        for (i = 0; i < results.value.length; i++) {

                            var whb_costpernight = results.value[i]["whb_costpernight1"];
                            if (proposedresolutioncode == 5) {
                                if (fieldname == "whb_dateofnighttorefund1rhe") {
                                    Xrm.Page.getAttribute("whb_costpopulated1rhe").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentage").setValue(1);
                                }
                                if (fieldname == "whb_dateofnighttorefund2rhe") {
                                    Xrm.Page.getAttribute("whb_costpopulated2rhe").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentage2rhe").setValue(1);
                                }

                                if (fieldname == "whb_dateofnighttorefund3rhe") {
                                    Xrm.Page.getAttribute("whb_costpopulated3rhe").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentage3rhe").setValue(1);
                                }
                                if (fieldname == "whb_dateofnighttorefund4rhe") {
                                    Xrm.Page.getAttribute("whb_costpopulated4rhe").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentage4rhe").setValue(1);
                                }
                            }
                            if (proposedresolutioncode == 2 || proposedresolutioncode == 6) {
                                if (fieldname == "whb_dateofnighttorefund1") {
                                    Xrm.Page.getAttribute("whb_costpopulated1rgng").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentagergng1").setValue(1);
                                }
                                if (fieldname == "whb_dateofnighttorefund2") {
                                    Xrm.Page.getAttribute("whb_costpopulated2rgng").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentagergng2").setValue(1);
                                }
                                if (fieldname == "whb_dateofnighttorefund3") {
                                    Xrm.Page.getAttribute("whb_costpopulated3rgng").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentagergng3").setValue(1);
                                }
                                if (fieldname == "whb_dateofnighttorefund4") {
                                    Xrm.Page.getAttribute("whb_costpopulated4rgng").setValue(whb_costpernight);
                                    Xrm.Page.getAttribute("whb_refundpercentagergng4").setValue(1);
                                }
                            }

                        }

                    } else {

                        alert("Date is not Matching with Guest Stayed Dates");
                        Xrm.Page.getAttribute(fieldname).setValue(null);
                    }

                }
            }
        };
        req.send();

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "populatingcost", err);
    }
}
function AutoApproval() {
    //debugger;
    var subcategory = Xrm.Page.getAttribute("whb_primarysubcategory").getValue();
    if (subcategory != null) { var subcategoryId = subcategory[0].id.slice(1, -1); }
    var resolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
    if (resolutioncode == 2) {
        var ammount = Xrm.Page.getAttribute("whb_amountrgng").getValue();
        var noofnights = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();
        var percentage = Xrm.Page.getAttribute("whb_refundpercentagergng1").getValue();
    }
    else if (resolutioncode == 6) {
        var ammount = Xrm.Page.getAttribute("whb_amountrboagng").getValue();
        var noofnights = Xrm.Page.getAttribute("whb_numberofnightstorefundboa").getValue();
        var percentage = Xrm.Page.getAttribute("whb_refundpercentageboagng1").getValue();
    }
    if ((ammount != null || noofnights != null || percentage != null) && subcategoryId != null && resolutioncode > 0) {
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_approvalmatrixes?$select=whb_approvallevel&$filter=whb_resolutioncode eq " + resolutioncode + " and  _whb_subcategory_value eq " + subcategoryId + " and ( whb_percentage eq " + percentage + " or whb_amount eq " + ammount + " or whb_noofnights eq " + noofnights + ")&$orderby=whb_approvallevel desc", true);
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

                        var whb_approvalmatrixid = results.value[i]["whb_approvalmatrixid"];
                        var whb_name = results.value[i]["whb_name"];
                        alert(whb_name + i);
                        if (whb_approvalmatrixid != null) {
                            Xrm.Page.getAttribute("whb_approvalmatrixid").setValue([{ id: whb_approvalmatrixid, name: whb_name, entityType: "whb_approvalmatrix" }]);
                        }
                    }
                }
                /*else {
					Xrm.Utility.alertDialog(this.statusText);
				}*/
            }
        };
        req.send();
    }
}

function OnchangeofManagerApproval() {
    var flag = Xrm.Page.getAttribute("whb_requestmanagerapproval").getValue();
    if (flag == true) {
        if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() == null)) {
            //Xrm.Page.ui.setFormNotification("DPA Check is yet to be done", "INFORMATION");
            alert("DPA Check is yet to be done");
            Xrm.Page.getAttribute("whb_requestmanagerapproval").setValue(null);

        }
        else {
            Xrm.Page.getAttribute("statuscode").setValue(130570001);
            Xrm.Page.getControl("header_statuscode").setDisabled(true);
            Xrm.Page.getControl("whb_requestmanagerapproval").setDisabled(true);
            Xrm.Page.data.entity.save();
        }
    }
}

function OnchangeofManagerAdvise() {
    var flag = Xrm.Page.getAttribute("whb_requestmanageradvise").getValue();
    if (flag == true) {
        if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() == null)) {
            //Xrm.Page.ui.setFormNotification("DPA Check is yet to be done", "INFORMATION");
            alert("DPA Check is yet to be done");
            Xrm.Page.getAttribute("whb_requestmanageradvise").setValue(null);

        }
        else {
            Xrm.Page.getAttribute("statuscode").setValue(130570001);
            Xrm.Page.getControl("header_statuscode").setDisabled(true);
            Xrm.Page.getControl("whb_requestmanageradvise").setDisabled(true);
            Xrm.Page.data.entity.save();
        }
    }
}


// Javascript Code for validating Invoice Number
function validatinginvoicenumber() {
    try {
        //debugger;
        var invoicenumber = Xrm.Page.getAttribute("whb_invoicenumber").getValue();
        if (invoicenumber != null) {
            var regexLetter = /^[A-Za-z]+$/;
            var numbervalidation = /^[0-9]*$/;
            if (invoicenumber.length == 13) {
                var firstfour = invoicenumber.substring(0, 4);
                var nextsixnumbers = invoicenumber.substring(4, 10);
                var nextletter = invoicenumber.substring(10, 11);
                var lasttwoletter = invoicenumber.substring(11, 13);
                if (!regexLetter.test(firstfour)) {

                    Xrm.Page.getControl("whb_invoicenumber").setNotification("The Entered Invoice Number is Not Valid");
                }

                else if (!numbervalidation.test(nextsixnumbers)) {

                    Xrm.Page.getControl("whb_invoicenumber").setNotification("The Entered Invoice Number is Not Valid");
                }

                else if (!regexLetter.test(nextletter)) {

                    Xrm.Page.getControl("whb_invoicenumber").setNotification("The Entered Invoice Number is Not Valid");
                }

                else if (!numbervalidation.test(lasttwoletter)) {

                    Xrm.Page.getControl("whb_invoicenumber").setNotification("The Entered Invoice Number is Not Valid");
                }
                else {
                    Xrm.Page.getControl("whb_invoicenumber").clearNotification();
                }

            }
            else {

                Xrm.Page.getControl("whb_invoicenumber").setNotification("The Entered Invoice Number is Not Valid");

            }
        }
        else {

            Xrm.Page.getControl("whb_invoicenumber").clearNotification();
        }


    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "validatinginvoicenumber", err);
    }
}
//functionforhidingamount
function hidingamount() {

    try {
        //debugger;
        //   var attribute = executionContext.getEventSource().getName();

        var numberofnightsgng = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();
        var numberofnightsrefundgng = Xrm.Page.getAttribute("whb_numberofnightstorefundrhe").getValue();
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var refundfullstayrgng = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        var refundrhgng = Xrm.Page.getAttribute("whb_refundfullstayrhgng").getValue();
        //var refundboagng = Xrm.Page.getAttribute("whb_refundfullstaycng").getValue();

        if (proposedresolutioncode == 6 && numberofnightsgng != null) {
            Xrm.Page.getControl("whb_amountrgng").setVisible(true);
            Xrm.Page.getControl("whb_refundtype").setVisible(true);
            Xrm.Page.getAttribute("whb_refundtype").setRequiredLevel("required");
            Xrm.Page.getControl("whb_paidinleisurevouchers").setVisible(false);
        }
        else if (proposedresolutioncode == 2 && numberofnightsgng != null) {
            Xrm.Page.getControl("whb_amountrgng").setVisible(true);
            Xrm.Page.getControl("whb_paidinleisurevouchers").setVisible(true);
            Xrm.Page.getControl("whb_refundtype").setVisible(false);
            Xrm.Page.getAttribute("whb_refundtype").setRequiredLevel("none");
        }

        else if (proposedresolutioncode == 5 && numberofnightsrefundgng != null) {

            Xrm.Page.getControl("whb_rheamount1").setVisible(true);

        }
        else if (refundfullstayrgng == 1 && proposedresolutioncode == 2) {
            Xrm.Page.getControl("whb_amountrgng").setVisible(true);
            Xrm.Page.getControl("whb_paidinleisurevouchers").setVisible(true);
            Xrm.Page.getControl("whb_refundtype").setVisible(false);
            Xrm.Page.getAttribute("whb_refundtype").setRequiredLevel("none");
        }
        else if (refundrhgng == 1 && proposedresolutioncode == 5) {
            Xrm.Page.getControl("whb_rheamount1").setVisible(true);
        }
        else if (refundfullstayrgng == 1 && proposedresolutioncode == 6) {
            Xrm.Page.getControl("whb_amountrgng").setVisible(true);
            Xrm.Page.getControl("whb_refundtype").setVisible(true);
            Xrm.Page.getAttribute("whb_refundtype").setRequiredLevel("required");
            Xrm.Page.getControl("whb_paidinleisurevouchers").setVisible(false);
        }
        else {


            Xrm.Page.getControl("whb_amountrgng").setVisible(false);
            Xrm.Page.getControl("whb_paidinleisurevouchers").setVisible(false);
            Xrm.Page.getControl("whb_rheamount1").setVisible(false);
            Xrm.Page.getAttribute("whb_refundtype").setRequiredLevel("none");
            Xrm.Page.getControl("whb_refundtype").setVisible(false);
            Xrm.Page.getControl("whb_postaladdresssameascontactgng").setVisible(false);
            Xrm.Page.getControl("whb_chargetohotel").setVisible(false);



        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "hidingamount", err);

    }
}

// created by Rahul 
// This function is used to Hide and Show Internal Communication Field based on Status and Resolution Code selected 
function hideShowInternalCommunication(context, event) {
    try {
        if (Xrm.Page.getAttribute("statuscode") != null && Xrm.Page.getAttribute("whb_resolutioncode") != null) {
            var statusCode = Xrm.Page.getAttribute("statuscode").getValue();
            var resolutionCode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();
            var externalcommunicatioon = Xrm.Page.getAttribute("whb_externaldepartmentassistance").getValue();

            if (statusCode == 130570000 || resolutionCode == 11) {
                Xrm.Page.getControl("whb_awaitinginternalcommunicationfrom").setVisible(true);
                Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setRequiredLevel("required");
                Xrm.Page.getControl("whb_externaldepartmentassistance").setVisible(false);
                Xrm.Page.getAttribute("whb_externaldepartmentassistance").setRequiredLevel("none");
                if (statusCode == 130570000) {
                    Xrm.Page.getControl("whb_internalsla").setVisible(true);
                    Xrm.Page.getAttribute("whb_internalsla").setRequiredLevel("required");

                    if (externalcommunicatioon != null && event == "OC") {
                        Xrm.Page.getAttribute("whb_externaldepartmentassistance").setValue(null);
                    }
                }

            }
            else if (statusCode == 130570011 || resolutionCode == 10) {
                Xrm.Page.getControl("whb_externaldepartmentassistance").setVisible(true);
                Xrm.Page.getAttribute("whb_externaldepartmentassistance").setRequiredLevel("required");
                Xrm.Page.getControl("whb_awaitinginternalcommunicationfrom").setVisible(false);
                Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setRequiredLevel("none");
                var internalcommunication = Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").getValue();
                if (statusCode == 130570011) {

                    Xrm.Page.getControl("whb_internalsla").setVisible(true);
                    Xrm.Page.getAttribute("whb_internalsla").setRequiredLevel("required");
                    if (internalcommunication != null && event == "OC") {
                        Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setValue(null);
                    }
                }
            }

            else {
                Xrm.Page.getControl("whb_internalsla").setVisible(false);
                Xrm.Page.getAttribute("whb_internalsla").setRequiredLevel("none");
                Xrm.Page.getControl("whb_awaitinginternalcommunicationfrom").setVisible(false);
                Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setRequiredLevel("none");
                Xrm.Page.getControl("whb_externaldepartmentassistance").setVisible(false);
                Xrm.Page.getAttribute("whb_externaldepartmentassistance").setRequiredLevel("none");
                //Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setValue(null);
            }
        }
    }

    catch (ex) {
        alert("Exception in hideShowInternalCommunication" + ex.message);
    }
}
// created by Ranjith 
// This function is used to Hide and Show External Communication Field based on Status and Resolution Code selected 
function hideShowExternalCommunication(context, event) {
    try {
        if (Xrm.Page.getAttribute("statuscode") != null && Xrm.Page.getAttribute("whb_resolutioncode") != null) {
            var statusCode = Xrm.Page.getAttribute("statuscode").getValue();
            var resolutionCode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();
            var internalcommunication = Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").getValue();
            if (statusCode == 130570011 || resolutionCode == 10) {
                Xrm.Page.getControl("whb_externaldepartmentassistance").setVisible(true);
                Xrm.Page.getAttribute("whb_externaldepartmentassistance").setRequiredLevel("required");
                if (statusCode == 130570011) {

                    Xrm.Page.getControl("whb_internalsla").setVisible(true);
                    Xrm.Page.getAttribute("whb_internalsla").setRequiredLevel("required");
                    if (internalcommunication != null && event == "OC") {
                        Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setValue(null);
                    }
                }
            }

            else {

                Xrm.Page.getControl("whb_externaldepartmentassistance").setVisible(false);
                Xrm.Page.getAttribute("whb_externaldepartmentassistance").setRequiredLevel("none");
                //  Xrm.Page.getControl("whb_awaitinginternalcommunicationfrom").setVisible(false);
                //  Xrm.Page.getAttribute("whb_awaitinginternalcommunicationfrom").setRequiredLevel("none");
            }
        }
    }

    catch (ex) {
        alert("Exception in hideShowExternalCommunication" + ex.message);
    }
}


//created By Muthu
//used for Stampingthankyou when reason for Contact is Thank you
function stampingthankyou() {
    try {

        var reasonforcontact = Xrm.Page.getAttribute("whb_reasonforcontact").getValue();
        if (reasonforcontact == 2) {
            Xrm.Page.getAttribute("whb_proposedresolutioncode").setValue(16);
            Xrm.Page.getControl("whb_proposedresolutioncode").setDisabled(true);
            Xrm.Page.getAttribute("whb_resolutioncode").setValue(16);
            Xrm.Page.getControl("whb_resolutioncode").setDisabled(true);
        }
        else {
            if (Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009)) {
                if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == true)) {
                    Xrm.Page.getControl("whb_proposedresolutioncode").setDisabled(false);

                    Xrm.Page.getControl("whb_resolutioncode").setDisabled(false);
                }
                else {
                    if (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() != null) {
                        Xrm.Page.getControl("whb_proposedresolutioncode").setDisabled(false);

                        Xrm.Page.getControl("whb_resolutioncode").setDisabled(false);
                    }
                }
            }
            else {
                Xrm.Page.getControl("whb_proposedresolutioncode").setDisabled(false);

                Xrm.Page.getControl("whb_resolutioncode").setDisabled(false);

            }

        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "stampingthankyou", err);

    }
}


//Created by Ranjith to Populate Sitefeedback in Case form from Guest Details 
function stampSiteFeedback() {
    try {
        if (Xrm.Page.getAttribute("whb_guestname").getValue() != null && Xrm.Page.getAttribute("whb_guestname").getValue()[0] != null) {
            var guestName = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;


            if (guestName != null) {
                if (guestName.includes("{")) {

                    guestName = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                }
            }
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_stayses(" + guestName + ")?$select=whb_sitefeedback", false);
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
                        var sitefeedback = result["whb_sitefeedback"];
                        if (sitefeedback != null) {
                            Xrm.Page.getAttribute("whb_sitefeedback").setValue(sitefeedback);
                            Xrm.Page.getAttribute('whb_sitefeedback').setSubmitmode(always);
                        }
                        else {
                            Xrm.Page.getAttribute("Xrm.Page.ui.controls.get(“CrmFieldShcemaName”).setVisible(true);").setValue(null);
                            Xrm.Page.getAttribute('whb_sitefeedback').setSubmitmode(always);
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
    catch (Ex) { alert("Exception in" + Ex); }
}

function populateSiteFeedbackOnload() {
    try {

        if (Xrm.Page.ui.getFormType() == 1 && Xrm.Page.getAttribute("whb_guestname").getValue() != null && Xrm.Page.getAttribute("whb_guestname").getValue()[0] != null) {
            Xrm.Page.ui.controls.get("whb_sitefeedback").setVisible(true);
            stampSiteFeedback();
        }
    } catch (ex) {
        alert("Exception in populateSiteFeedbackOnload" + ex.message);

    }
}


//added by rahul -- to set all the fields which do not have data to on mandatory when resolution code is set to Duplicate/Chaser
var duplicateChaserValue = 18;
function makeFieldsNonMandatory() {
    if (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() != null) // check if case is a child case
    {
        if (Xrm.Page.getAttribute("whb_resolutioncode") != null && Xrm.Page.getAttribute("whb_resolutioncode").getValue() == duplicateChaserValue) {
            Xrm.Page.data.entity.attributes.forEach(
            function (attribute, index) {
                if (attribute.getValue() == null) {
                    attribute.setRequiredLevel("none");
                }
            });
        }
    }
}

//Created By Muthu
//Function for checking refund as no when Proposed Resolution code is Selected
function checkingrefund() {
    try {

        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var resolutioncode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();
        var fullstayvalue = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        if ((proposedresolutioncode == 2 || proposedresolutioncode == 6) && fullstayvalue != 1) {
            Xrm.Page.getAttribute("whb_refundfullstay").setValue(0);
        }
        if (proposedresolutioncode == 5) {

            Xrm.Page.getAttribute("whb_refundfullstayrhgng").setValue(0);
        }
        if (resolutioncode != null) {
            Xrm.Page.getAttribute("whb_resolutioncode").setValue(null);
            invoicenumbermandatory();
        }


    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "checkignrefund", err);

    }

}
//created by Muthu
//function for calculatingrefund Amount
function calculatingrefundforfullstay(executionContext) {

    try {

        var attribute = executionContext.getEventSource().getName();
        var fullstay = Xrm.Page.getAttribute(attribute).getValue();
        var resolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        if (Xrm.Page.getAttribute("whb_guestname").getValue() != null && Xrm.Page.getAttribute("whb_reservation").getValue() != null && Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue() != null && fullstay == 1) {

            var contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id;
            var reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id;
            if (contactid != null) {
                if (contactid.includes("{")) {

                    contactid = Xrm.Page.getAttribute("whb_guestname").getValue()[0].id.slice(1, -1);
                }
            }
            if (reservationid != null) {

                if (reservationid.includes("{")) {

                    reservationid = Xrm.Page.getAttribute("whb_reservation").getValue()[0].id.slice(1, -1);
                }
            }
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/whb_stayses?$select=whb_amount1,whb_numberofnights&$filter=whb_staysid eq " + contactid + "  and  _whb_reservation_value eq " + reservationid, false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        //debugger;
                        var results = JSON.parse(this.response);


                        for (var i = 0; i < results.value.length; i++) {

                            var whb_amount1 = results.value[i]["whb_amount1"];
                            var whb_amount1_formatted = results.value[i]["whb_amount1@OData.Community.Display.V1.FormattedValue"];
                            var whb_numberofnights = results.value[i]["whb_numberofnights"];
                            var whb_numberofnights_formatted = results.value[i]["whb_numberofnights@OData.Community.Display.V1.FormattedValue"];

                            if (resolutioncode == 2) {
                                Xrm.Page.getAttribute("whb_amountrgng").setValue(whb_amount1);
                                Xrm.Page.getControl("whb_amountrgng").setVisible(true);
                                Xrm.Page.getAttribute("whb_numberofnightstorefund").setValue(whb_numberofnights);

                            }
                            else if (resolutioncode == 6) {
                                Xrm.Page.getAttribute("whb_amountrgng").setValue(whb_amount1);
                                Xrm.Page.getControl("whb_amountrgng").setVisible(true);
                                Xrm.Page.getAttribute("whb_numberofnightstorefund").setValue(whb_numberofnights);
                            }
                            else if (resolutioncode == 5) {
                                Xrm.Page.getAttribute("whb_rheamount1").setValue(whb_amount1);
                                Xrm.Page.getControl("whb_rheamount1").setVisible(true);
                                Xrm.Page.getAttribute("whb_numberofnightstorefundrhe").setValue(whb_numberofnights);

                            }

                        }

                    } else {
                        ErrorHandling("Case", "whb_onchange.js", "calculatingrefundforfullstay", this.statusText);

                    }
                }
            };
            req.send();


        }
        else if (fullstay == 0) {
            if (resolutioncode == 2) {
                Xrm.Page.getAttribute("whb_amountrgng").setValue(null);


            }
            else if (resolutioncode == 6) {
                Xrm.Page.getAttribute("whb_amountrgng").setValue(null);


            }
            else if (resolutioncode == 5) {
                Xrm.Page.getAttribute("whb_rheamount1").setValue(null);

            }

        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "calculatingrefundforfullstay", err);

    }
}


function ContactAddress() {
    debugger;
    try {
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        if (proposedresolutioncode == 8 || proposedresolutioncode == 2) {
            var flaglv = Xrm.Page.getAttribute("whb_postaladdresssameascontactle").getValue();
            var flaggng = Xrm.Page.getAttribute("whb_postaladdresssameascontactgng").getValue();

            if ((flaglv == true && proposedresolutioncode == 8) || (flaggng == true && proposedresolutioncode == 2)) {
                var contact = Xrm.Page.getAttribute("whb_contact").getValue();
                var guest = Xrm.Page.getAttribute("whb_guestname").getValue();
                if (contact != null) {
                    var Id = contact[0].id;
                    var ContactID = Id.slice(1, -1);
                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + ContactID + ")?$select=address1_city,address1_country,address1_line1,address1_line2,address1_line3,address1_postalcode,address1_stateorprovince", true);
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
                                var address1_city = result["address1_city"];
                                var address1_country = result["address1_country"];
                                var address1_line1 = result["address1_line1"];
                                var address1_line2 = result["address1_line2"];
                                var address1_line3 = result["address1_line3"];
                                var address1_postalcode = result["address1_postalcode"];
                                var address1_stateorprovince = result["address1_stateorprovince"];

                                if (proposedresolutioncode == 8) {

                                    if (address1_line1 != null) {
                                        Xrm.Page.getAttribute("whb_addressline1lv").setValue(address1_line1);
                                    }
                                    if (address1_line2 != null) {
                                        Xrm.Page.getAttribute("whb_addressline2lv").setValue(address1_line2);
                                    }
                                    if (address1_line3 != null) {
                                        Xrm.Page.getAttribute("whb_addressline3lv").setValue(address1_line3);
                                    }
                                    if (address1_city != null) {
                                        Xrm.Page.getAttribute("whb_towncitylv").setValue(address1_city);
                                    }
                                    if (address1_stateorprovince != null) {
                                        Xrm.Page.getAttribute("whb_countylv").setValue(address1_stateorprovince);
                                    }
                                    if (address1_country != null) {
                                        Xrm.Page.getAttribute("whb_countrylv").setValue(address1_country);
                                    }
                                    if (address1_postalcode != null) {
                                        Xrm.Page.getAttribute("whb_postalcodelv").setValue(address1_postalcode);
                                    }
                                    if (contact != null) {
                                        Xrm.Page.getAttribute("whb_contactnameforvoucherdeliverylv").setValue(contact[0].name);
                                    }
                                }
                                else if (proposedresolutioncode == 2) {
                                    if (address1_line1 != null) {
                                        Xrm.Page.getAttribute("whb_addressline1").setValue(address1_line1);
                                    }
                                    if (address1_line2 != null) {
                                        Xrm.Page.getAttribute("whb_addressline2").setValue(address1_line2);
                                    }
                                    if (address1_line3 != null) {
                                        Xrm.Page.getAttribute("whb_addressline3").setValue(address1_line3);
                                    }
                                    if (address1_city != null) {
                                        Xrm.Page.getAttribute("whb_city").setValue(address1_city);
                                    }
                                    if (address1_stateorprovince != null) {
                                        Xrm.Page.getAttribute("whb_county").setValue(address1_stateorprovince);
                                    }
                                    if (address1_country != null) {
                                        Xrm.Page.getAttribute("whb_country").setValue(address1_country);
                                    }
                                    if (address1_postalcode != null) {
                                        Xrm.Page.getAttribute("whb_postalcode").setValue(address1_postalcode);
                                    }
                                    if (contact != null) {
                                        Xrm.Page.getAttribute("whb_contactnameforvoucherdelivery").setValue(contact[0].name);
                                    }
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
            else if (flaglv == false && proposedresolutioncode == 8) {
                Xrm.Page.getAttribute("whb_addressline1lv").setValue(null);
                Xrm.Page.getAttribute("whb_addressline2lv").setValue(null);
                Xrm.Page.getAttribute("whb_addressline3lv").setValue(null);
                Xrm.Page.getAttribute("whb_towncitylv").setValue(null);
                Xrm.Page.getAttribute("whb_countylv").setValue(null);
                Xrm.Page.getAttribute("whb_countrylv").setValue(null);
                Xrm.Page.getAttribute("whb_postalcodelv").setValue(null);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdeliverylv").setValue(null);
            }
            else (flaggng == false && proposedresolutioncode == 2)
            {
                Xrm.Page.getAttribute("whb_addressline1").setValue(null);
                Xrm.Page.getAttribute("whb_addressline2").setValue(null);
                Xrm.Page.getAttribute("whb_addressline3").setValue(null);
                Xrm.Page.getAttribute("whb_city").setValue(null);
                Xrm.Page.getAttribute("whb_county").setValue(null);
                Xrm.Page.getAttribute("whb_country").setValue(null);
                Xrm.Page.getAttribute("whb_postalcode").setValue(null);
                Xrm.Page.getAttribute("whb_contactnameforvoucherdelivery").setValue(null);
            }
        }
    } catch (Ex) {
        alert("Error in ContactAddress" + " - " + Ex.message);
    }
}


// functionforchanging no of Nights
//created By Muthu for showing and no of nights
function changingnoofnights() {

    try {

        var refundfullstayrgng = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        var refundrhgng = Xrm.Page.getAttribute("whb_refundfullstayrhgng").getValue();
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        if (refundfullstayrgng == 1 && (proposedresolutioncode == 2 || proposedresolutioncode == 6)) {

            Xrm.Page.getControl("whb_numberofnightstorefund").setVisible(false);
            Xrm.Page.getAttribute("whb_numberofnightstorefund").setRequiredLevel("none");
            Xrm.Page.getControl("whb_remainingdatesofnightstorefund").setVisible(false);

            populatingholidayextra();
        }

        else if (refundrhgng == 1 && proposedresolutioncode == 5) {

            Xrm.Page.getControl("whb_numberofnightstorefundrhe").setVisible(false);
            populatingholidayextra();
        }

        else if (refundfullstayrgng == 0 && (proposedresolutioncode == 2 || proposedresolutioncode == 6)) {

            Xrm.Page.getControl("whb_numberofnightstorefund").setVisible(true);
            Xrm.Page.getAttribute("whb_numberofnightstorefund").setRequiredLevel("required");
        }

        else if (refundrhgng == 0 && proposedresolutioncode == 5) {

            Xrm.Page.getControl("whb_numberofnightstorefundrhe").setVisible(true);

        }


    }
    catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "changingnoofnights", err);
    }
}
//Created By Muthu
//Making invoice Number Mandatory
function invoicenumbermandatory() {
    //debugger;
    try {

        var resolutioncode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();

        if (resolutioncode == 2 || resolutioncode == 6) {
            Xrm.Page.getControl("whb_invoicenumber").setVisible(true);
            Xrm.Page.getAttribute("whb_invoicenumber").setRequiredLevel("required");
        }
        else if (resolutioncode == 5) {
            Xrm.Page.getControl("whb_invoicenumber").setVisible(true);
            //    Xrm.Page.getAttribute("whb_refundfullstayrhgng").setValue(1);
            Xrm.Page.getAttribute("whb_invoicenumber").setRequiredLevel("required");
        }
        else {

            Xrm.Page.getControl("whb_invoicenumber").setVisible(false);
            Xrm.Page.getAttribute("whb_invoicenumber").setValue(null);

            //    Xrm.Page.getAttribute("whb_refundfullstayrhgng").setValue(1);
            Xrm.Page.getAttribute("whb_invoicenumber").setRequiredLevel("none");
            Xrm.Page.getControl("whb_invoicenumber").clearNotification();
        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "invoicenumbermandatory", err);

    }

}
// Created By Muthu
//Function for Showing and chargetohotel and Postal Address for Refund GNG
function enablingpostaladdress() {
    try {
        var paidinleisure = Xrm.Page.getAttribute("whb_paidinleisurevouchers").getValue();
        var refundfulstay = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        var nooofnights = Xrm.Page.getAttribute("whb_numberofnightstorefund").getValue();
        //var postaddressandchk = Xrm.Page.getAttribute("whb_postaladdresssameascontactgng").getValue();
        var postal = Xrm.Page.getAttribute("whb_postaladdresssameascontactgng").getValue();
        var proposedresolutioncode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        if ((paidinleisure == 1 && refundfulstay == 1 && proposedresolutioncode == 2) || (nooofnights != null && paidinleisure == 1 && proposedresolutioncode == 2)) {
            Xrm.Page.getControl("whb_chargetohotel").setVisible(true);
            Xrm.Page.getControl("whb_postaladdresssameascontactgng").setVisible(true);
            //  Xrm.Page.getAttribute("whb_postaladdresssameascontactgng").setValue(1);                    
            Xrm.Page.getAttribute("whb_chargetohotel").setRequiredLevel("required");

        }
        else {
            Xrm.Page.getControl("whb_chargetohotel").setVisible(false);
            Xrm.Page.getControl("whb_postaladdresssameascontactgng").setVisible(false);
            Xrm.Page.getAttribute("whb_chargetohotel").setRequiredLevel("none");

        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "enablingpostaladdress", err);

    }
}

function makeReservationMandatory() {
    try {
        if (Xrm.Page.getAttribute("whb_visitcategory") != null && Xrm.Page.getAttribute("whb_visitcategory").getValue() == 130570000 && Xrm.Page.getAttribute("whb_reasonforcontact") != null && Xrm.Page.getAttribute("whb_reasonforcontact").getValue() == 3 && Xrm.Page.getAttribute("whb_reservation") != null) {
            Xrm.Page.getAttribute("whb_reservation").setRequiredLevel("required");
        }
        else {
            Xrm.Page.getAttribute("whb_reservation").setRequiredLevel("none");
        }
    }
    catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "makeReservationMandatory", err);

    }
}

function makeGuestNameMandatory() {
    try {
        if (Xrm.Page.getAttribute("whb_visitcategory") != null && Xrm.Page.getAttribute("whb_visitcategory").getValue() == 130570000 && Xrm.Page.getAttribute("whb_guestname") != null) {
            Xrm.Page.getAttribute("whb_guestname").setRequiredLevel("required");
        }
        else {
            Xrm.Page.getAttribute("whb_guestname").setRequiredLevel("none");
        }
    }

    catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "makeGuestNameMandatory", err);
    }
}

function setResolutionSectionMandatory() {
    try {
        if (Xrm.Page.getAttribute("whb_dpacheckdone") != null && (Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == false || Xrm.Page.getAttribute("whb_dpacheckdone").getValue() == null) && Xrm.Page.getAttribute("whb_contacttype") != null && (Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570002 || Xrm.Page.getAttribute("whb_contacttype").getValue() == 130570009) && (Xrm.Page.getAttribute("parentcaseid") != null && Xrm.Page.getAttribute("parentcaseid").getValue() == null) && (Xrm.Page.getAttribute("whb_reasonforcontact") != null && Xrm.Page.getAttribute("whb_reasonforcontact").getValue() != 2)) {
            Xrm.Page.getAttribute("whb_proposedresolutioncode").setRequiredLevel("none");
            Xrm.Page.getAttribute("whb_rationale").setRequiredLevel("none");

        }

        else {
            Xrm.Page.getAttribute("whb_proposedresolutioncode").setRequiredLevel("required");
            Xrm.Page.getAttribute("whb_rationale").setRequiredLevel("required");
        }
    }

    catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "setResolutionSectionMandatory", err);
    }
}



//Function for showing Web Form Section When Contact type is Web Form
//Created By Ranjith
//Created on: 12/03/2018
//Updated on: 15/03/2018
function hideorshowWebform() {
    try {

        var contactType = Xrm.Page.getAttribute("whb_contacttype").getValue();
        //(contactType == 130,570,009 (Web Form) or contactType == 130,570,002 (Email)
        //Webform Section will be Shown 
        if (contactType == 130570009 || contactType == 130570002) {
            Xrm.Page.ui.tabs.get("Summary").sections.get("email_webform_info").setVisible(true);

        }
        else {
            Xrm.Page.ui.tabs.get("Summary").sections.get("email_webform_info").setVisible(false);

        }
    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "hideorshowWebform", err);

    }

}


//Created By Muthu 
//function for setting Resolution code for Refunds
function settingresolutioncode() {
    try {

        var proposedcode = Xrm.Page.getAttribute("whb_proposedresolutioncode").getValue();
        var resolutioncode = Xrm.Page.getAttribute("whb_resolutioncode").getValue();
        if (proposedcode == 2 || proposedcode == 3 || proposedcode == 4 || proposedcode == 5 || proposedcode == 19 || proposedcode == 6 || proposedcode == 7 || proposedcode == 8) {
            if (resolutioncode != proposedcode) {
                alert("Please Update the Proposed Resolution Code and then Update the Resolution code");
                Xrm.Page.getAttribute("whb_resolutioncode").setValue(null);
            }

        }
        else if (resolutioncode == 2 || resolutioncode == 3 || resolutioncode == 4 || resolutioncode == 5 || resolutioncode == 19 || resolutioncode == 6 || resolutioncode == 7 || resolutioncode == 8) {
            if (resolutioncode != proposedcode) {
                alert("Please Update the Proposed Resolution Code and then Update the Resolution code");
                Xrm.Page.getAttribute("whb_resolutioncode").setValue(null);
            }

        }

    } catch (err) {
        ErrorHandling("Case", "whb_onchange.js", "onchangeproposedresolution", err);
    }

}
function dateValidation(context) {
    try {
        debugger;
        var attribute = context.getEventSource().getName();
        var sdate = Xrm.Page.getAttribute(attribute).getValue();
        var selecteddate;
        var selectedmonth;
        var selecteddate;
        var firstdate, seconddate, thirdddate, fourthddate;
        if (sdate != null) {

            selecteddate = returndate(sdate);
        }
        if (selecteddate == null || selecteddate == "" || selecteddate == undefined) {
            return;
        }
        var date1 = Xrm.Page.getAttribute("whb_dateofnighttorefund1").getValue();

        if (date1 != null) {

            firstdate = returndate(date1);
        }

        var date2 = Xrm.Page.getAttribute("whb_dateofnighttorefund2").getValue();

        if (date2 != null) {

            seconddate = returndate(date2);
        }

        var date3 = Xrm.Page.getAttribute("whb_dateofnighttorefund3").getValue();

        if (date3 != null) {
            thirdddate = returndate(date3);

        }

        var date4 = Xrm.Page.getAttribute("whb_dateofnighttorefund4").getValue();

        if (date4 != null) {
            fourthddate = returndate(date4);

        }

        var refunddate1 = Xrm.Page.getAttribute("whb_dateofnighttorefund1rhe").getValue();

        if (refunddate1 != null) {

            firstdate = returndate(refunddate1);
        }

        var refunddate2 = Xrm.Page.getAttribute("whb_dateofnighttorefund2rhe").getValue();

        if (refunddate2 != null) {

            seconddate = returndate(refunddate2);
        }

        var refunddate3 = Xrm.Page.getAttribute("whb_dateofnighttorefund3rhe").getValue();

        if (refunddate3 != null) {
            thirdddate = returndate(refunddate3);

        }

        var refunddate4 = Xrm.Page.getAttribute("whb_dateofnighttorefund4rhe").getValue();

        if (refunddate4 != null) {
            fourthddate = returndate(refunddate4);

        }
        if (attribute == "whb_dateofnighttorefund1") {

            if (selecteddate == seconddate || selecteddate == thirdddate || selecteddate == fourthddate) {
                // if (((selecteddate == seconddate) && (seconddate != null || seconddate != undefined ||seconddate !="")) || ((selecteddate == thirdddate) && (thirdddate != null)) || ((selecteddate == fourthddate) && (fourthddate!=null))) {

                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund2") {

            if (selecteddate == firstdate || selecteddate == thirdddate || selecteddate == fourthddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund3") {

            if (selecteddate == firstdate || selecteddate == seconddate || selecteddate == fourthddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund4") {

            if (selecteddate == firstdate || selecteddate == seconddate || selecteddate == thirdddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund1rhe") {

            if (selecteddate == seconddate || selecteddate == thirdddate || selecteddate == fourthddate) {
                // if (((selecteddate == seconddate) && (seconddate != null || seconddate != undefined ||seconddate !="")) || ((selecteddate == thirdddate) && (thirdddate != null)) || ((selecteddate == fourthddate) && (fourthddate!=null))) {

                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund2rhe") {

            if (selecteddate == firstdate || selecteddate == thirdddate || selecteddate == fourthddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund3rhe") {

            if (selecteddate == firstdate || selecteddate == seconddate || selecteddate == fourthddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }
        else if (attribute == "whb_dateofnighttorefund4rhe") {

            if (selecteddate == firstdate || selecteddate == seconddate || selecteddate == thirdddate) {
                alert("Same date cannot be selected");
                Xrm.Page.getAttribute(attribute).setValue(null);
            }

        }



    } catch (ex) {
        alert("Exception in dateValidation()" + ex.message);
    }
}

function returndate(date1) {

    var selecteddate;
    var selectedmonth;
    var selecteddate;

    selecteddate = new Date(date1);
    selectedmonth = selecteddate.getMonth() + 1;
    selecteddate = selecteddate.getFullYear() + "/" + selectedmonth + "/" + selecteddate.getDate();

    return selecteddate;
}

//created by muthu
//function for making no of nights null
function makingnoofnightsnull() {

    try {

        var refundfullstay = Xrm.Page.getAttribute("whb_refundfullstay").getValue();
        var refundrhgng = Xrm.Page.getAttribute("whb_refundfullstayrhgng").getValue();
        if (refundfullstay == 0) {
            Xrm.Page.getAttribute("whb_numberofnightstorefund").setValue(null);
        }

        if (refundrhgng == 0) {
            Xrm.Page.getAttribute("whb_numberofnightstorefundrhe").setValue(null);
        }

    } catch (err) { ErrorHandling("Case", "whb_onchange.js", "makingnoofnightsnull", err); }
}
function intersla() {
    try {

        var next30days = new Date();
        next30days.setDate(next30days.getDate() + 30);
        next30days = returndate(next30days);
        var today = new Date();
        today = returndate(today);
        var startdate = Xrm.Page.getAttribute("whb_internalsla").getValue();
        var crmdate = new Date(startdate);
        crmdate = returndate(crmdate);
        if (new Date(crmdate) > new Date(next30days)) {
            alert("Please Enter a Date within 30 days");
            Xrm.Page.getAttribute("whb_internalsla").setValue(null);
        }
        if (new Date(crmdate) < new Date(today)) {
            alert("Entered Date is not Valid");
            Xrm.Page.getAttribute("whb_internalsla").setValue(null);
        }


    } catch (ex) { alert("Exceprion in intersla" + ex.message); }


}

