function checkInputPattern(webForm) {
    var AllowIllegalChars = "0";
    for (i = 0; i < webForm.length; i++) {
        var pat = /[<>=]/ // This checks if the signs '<', '>' or '=' are present in the string.
        var elm = webForm.elements[i];
        if (elm.type == 'text' || elm.type == 'textarea') {
            AllowIllegalChars = elm.getAttribute("AllowIllegalChars");
            if (AllowIllegalChars == null || typeof AllowIllegalChars == 'undefined') AllowIllegalChars = "0";
            if (elm.className == "CuteEditorTextArea") AllowIllegalChars = '1';

            if (elm.value.search(pat) > -1 && AllowIllegalChars == "0") {
                alert("This text field does not accept '<',  '>' and '=' characters, please remove them before saving.");
                elm.focus();
                return false;
            }
        }
    }
    return true;
}

function ValidateWebForm(formObjects, webForm, doTrim) {
    /*       ADL - 2172               */
    var isValid = checkInputPattern(webForm);
    if (isValid == false) return false;
    ///*--------------------------------*/
    for (var x = 0; x < formObjects.length; x++) {
  
        if (formObjects[x].controlName.toString().toLowerCase().indexOf('txt') != -1)
        {
            try{
                var ctrl = document.getElementById(formObjects[x].controlName);

                if (typeof doTrim != 'undefined' || doTrim == false)
                    ctrl.value = ctrl.value;
                else
                    ctrl.value = ctrl.value.trim();
            }
            catch (e) { }
        }
        
        if (formObjects[x].isValid(webForm) == false) return false;
    }
    return true;
}
//---------------------------------------------------------------------------------------------------//
function FormControl(ctrlName, ctrlLength, ctrlLabelId, ctrlMandatory, ctrlType, ctrlMinVal, ctrlMaxVal, strOptionalLabel, optionalMessage) {
    this.control = "";
    this.controlName = ctrlName;
    this.textLength = ctrlLength;
    this.captionId = ctrlLabelId;
    this.caption = "";
    this.isNumeric = false;
    this.isDate = false;
    this.isEmail = false;
    this.isValidFileType = false;
    this.isValidCSVFile = false;
    this.isValidXMLFile = false;
    this.maxVal = 0;
    this.minVal = 0;
    this.strMsg = "";
    this.isCboSelected = false;
    this.optionalLabel = strOptionalLabel;
    if (ctrlMandatory == "0")
        this.isMandatory = false;
    else
        this.isMandatory = true;

    switch (ctrlType) {
        case "N":
            this.isNumeric = true;
            this.maxVal = ctrlMaxVal;
            this.minVal = ctrlMinVal;
            break;
        case "D":
            this.isDate = true;
            break;
        case "E":
            this.isEmail = true;
            break;
        case "F":
            this.isValidFileType = true;
            break;
        case "C":
            this.isValidCSVFile = true;
            break;
        case "X":
            this.isValidXMLFile = true;
            break;
        case "B":
            this.isCboSelected = true;
            break;
    } //end switch(ctrlType)
    this.isValid = function (theThis) { 
        objDoc = theThis.document;
        if (objDoc == null) objDoc = document;
        this.control = objDoc.getElementById(this.controlName);
        //if date pickier hai tou.. firstChild has the input box
        if (this.control.tagName == 'SPAN') this.control = this.control.firstChild;
        objCaption = objDoc.getElementById(this.captionId);
        if (objCaption) {
            this.caption = objCaption.innerHTML;
        }
        else {
            this.caption = this.optionalLabel;
        }

        //-------------------------------------------------------------------------//
        if (this.isMandatory) {
            if (isEmpty(this.control) || this.control.value == "-1") {

                if (typeof (optionalMessage) != "undefined" && optionalMessage != '')
                    this.strMsg = optionalMessage;
                else
                    this.strMsg = "Please enter some valid value into - " + this.caption + ".";
                showMessage(this.strMsg);
                highlightControl(this.control);
                return false;
            } //end if(isEmpty(this.control))
        } //end if(this.isMandatory)
        //-------------------------------------------------------------------------//
        if (!isEmpty(this.control)) {
            //-------------------------------------------------------------------------//
            if (this.textLength > 0) {
                var strText = new String(this.control.value);
                if (strText.length > this.textLength) {
                    this.strMsg = "Text length for " + this.caption + " should not be greater than " + this.textLength + " character(s).";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                } // end if (strText.length > this.textLength)
            } //end if(this.textLength > 0)
            //-------------------------------------------------------------------------//
            if (this.isNumeric) {
                //-------------------------------------------------------------------------//
                if (!isNumber(this.control.value)) {
                    this.strMsg = "Please enter valid numeric value into - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                } // end if(!isNumber(this.control.value))
                //-------------------------------------------------------------------------//
                if (parseFloat(this.control.value) < parseFloat(this.minVal)) {
                    this.strMsg = "Please enter valid numeric value greater than or equal to " + this.minVal + " into - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                } // end if(this.control.value < this.minVal)
                //-------------------------------------------------------------------------//
                if (parseFloat(this.control.value) > parseFloat(this.maxVal)) {
                    this.strMsg = "Please enter valid numeric value less than or equal to " + this.maxVal + " into - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;

                } // end if(this.control.value > this.maxVal)
                //-------------------------------------------------------------------------//
            } //end if(this.isNumeric)
            //-------------------------------------------------------------------------//
            //if (this.isDate) {
            //    //if (!checkdate(this.control)) { 
            //    //    this.strMsg = "Please enter a valid date into the " + this.caption + ".";
            //    //    showMessage(this.strMsg);
            //    //    highlightControl(this.control);
            //    //    return false;
            //    //}
            //} //end if(this.isDate)
            if (this.isEmail) {
                if (!isEmail(this.control.value)) {
                    this.strMsg = "Please enter a valid E-Mail address in - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                }
            }
            if (this.isValidFileType) {
                if (!isValidFileType(this.control.value)) {
                    this.strMsg = "Please enter a valid File Type in - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                }
            }
            if (this.isValidCSVFile) {
                if (!isValidCSVFileType(this.control.value)) {
                    this.strMsg = "Please enter a valid File Type in - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                }
            }
            if (this.isValidXMLFile) {
                if (!isValidXMLFileType(this.control.value)) {
                    this.strMsg = "Please enter a valid File in - " + this.caption + ".";
                    showMessage(this.strMsg);
                    highlightControl(this.control);
                    return false;
                }
            }


            //-------------------------------------------------------------------------//
        } //end if(!isEmpty(this.control))
        //-------------------------------------------------------------------------//
        if (this.isCboSelected) {
            if (isEmpty(this.control) || this.control.value == "" || this.control.value == "-1" || this.control.value == "0") {
                this.strMsg = "Please select " + this.caption + ".";
                showMessage(this.strMsg);
                highlightControl(this.control);
                return false;
            } //end if(isEmpty(this.control))
        }
        //return true;
    }      //end this.isValid = function()
} // end Class FormControl(id,controlName,textLength)
//---------------------------------------------------------------------------------------------------//

function isNumber(chkVal) {
    /*if(!(parseInt("" + chkVal) == "" + chkVal)) return false;
    return true;*/
    var oneDecimal = false
    var digitCount = 0;
    inputStr = chkVal.toString()
    for (var i = 0; i < inputStr.length; i++) {
        var oneChar = inputStr.charAt(i)
        if (i == 0 && oneChar == "-") {
            continue
        }
        if (oneChar == "." && !oneDecimal) {
            oneDecimal = true
            continue
        }
        if (oneChar < "0" || oneChar > "9") {
            return false
        } else {
            digitCount++
        }
    }
    return (digitCount > 0)
}

function isFloat(chkVal) {
    if (!((parseFloat("" + chkVal) == "" + chkVal))) return false;
    return true;
}
function isEmpty(control) {
    if (!control) return false;
    var strTmp = control.value;
    do {
        strTmp = strTmp.replace('\r\n', '');
    } while (strTmp.indexOf('\r\n') > -1);
    do {
        strTmp = strTmp.replace('  ', ' ');
    } while (strTmp.indexOf('  ') >= 0);

    if (strTmp.replace(' ', '') == '') {
        return true;
    }
    return false;
}
function highlightControl(control) {
    if (!control) return;
    try {
        control.focus();
        control.select();
    } catch (e) { }
}
function isSelected(control) {
    if (!control) return false;
    return control.selectedIndex > -1;
}
function validateEmailBox(control) {
    if (validateEmails(control, ';') || validateEmails(control, ','))
        return true;
    else
        return false;
}
function validateEmails(control, emailSeparator) {
    if (!control) return false;
    if (control.value.indexOf(emailSeparator) < 0) {
        return isEmail(control.value.trim());
    }
    else {
        var arrEmails = control.value.split(emailSeparator);
        for (var loopX = 0; loopX < arrEmails.length; loopX++) {
            if (!isEmail(arrEmails[loopX].trim())) return false;
        }
    }
    return true;
}
//Validating email using regular expressions.
function isEmail(string) {
    if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
        return true;
    else
        return false;
}
function checkdate(iString) {

    var valid = /^(0[1-9]|[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|[1-9]|1[012])[- \/.](19|20)\d\d$/;
    var returnval = false;

    if (!valid.test(iString.value))
        returnval = false;
    else { //Detailed check for valid date ranges
        var dayfield;
        var monthfield;
        var yearfield;
        if (iString.value.indexOf('.') != -1) {
            dayfield = iString.value.split(".")[0];
            monthfield = iString.value.split(".")[1];
            yearfield = iString.value.split(".")[2];
        }
        else {
            dayfield = iString.value.split("/")[0];
            monthfield = iString.value.split("/")[1];
            yearfield = iString.value.split("/")[2];
        }
        var dayobj = new Date(yearfield, monthfield - 1, dayfield);
        if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield) || (dayobj.getFullYear() != yearfield))
            returnval = false;
        else
            returnval = true;

    }
    return returnval;
}
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
}
//Validating File Type using regular expressions.
function isValidFileType(string) {
    if (string.search(/^.+\.(?!\b(pdf|bmp|gif|jpg|jpeg|doc|docx|xls|xlsx|xlsm|wav|mp3|rtf|csv|png|caf|eml|msg|zip|rar|txt|html|htm|dot)\b)\b(\w+)\b$/i) != -1)
        return false;
    else
        return true;
}

//Validating CSV File Type using regular expressions.
function isValidCSVFileType(string) {
    if (string.search(/^.+\.(?!\b(csv)\b)\b(\w+)\b$/i) != -1)
        return false;
    else
        return true;
}

//Validating XML File Type using regular expressions.
function isValidXMLFileType(string) {
    if (string.search(/^.+\.(?!\b(xml)\b)\b(\w+)\b$/i) != -1)
        return false;
    else
        return true;
}

function lockControl(controlId, state) {
    try {
        document.getElementById(controlId).disabled = state;
        document.getElementById(controlId).readOnly = state;
    } catch (e) { }
}
function showMessage(strMsg) {
    if (typeof msgControl == 'undefined') {
        alert(strMsg);
        return;
    }
    var msgObject = document.getElementById(msgControl);
    if (msgObject) {
        try {
            msgObject.innerHTML = '<img src="/Images/err_exclamation.gif" align="absmiddle" width=12 height=12 border=0>&nbsp;' + strMsg + '&nbsp;';
        } catch (e) { alert(strMsg); }
    }
    else {
        alert(strMsg);
    }
}

function setFocusToFirstControl() {
    var control = null;
    if (typeof focusOnStartupControlId != 'undefined' && focusOnStartupControlId != '') {
        highlightControl(document.getElementById(focusOnStartupControlId));
        try {
            if (typeof window.afterAutoFocus != 'undefined') afterAutoFocus(focusOnStartupControlId);
        } catch (e) { }
    }
    else {
        for (i = 0; i < document.forms[0].length; i++) {
            control = document.forms[0][i];
            if (control.type != "hidden" && control.disabled != true && control.readOnly != true
                && ((control.tagName == 'INPUT' && control.type == 'text') || control.tagName == 'TEXTAREA')) {
                highlightControl(document.getElementById(control.id));
                try {
                    if (typeof window.afterAutoFocus != 'undefined') afterAutoFocus(control.id);
                } catch (e) { }
                return;
            }
        }
    }
}

// Fire fox does not use block attribute
var trblock = '';
if (navigator.appName.indexOf("Microsoft") > -1)
{ trblock = 'block' }
else
{ trblock = 'table-row'; }

//// Code to disallow the .exe files in the upload section.
//function ClearBrowseContent(control) {
//    var browse = document.getElementById(control);
//    var newbrowse = browse.cloneNode(false);
//    browse.parentNode.replaceChild(newbrowse, browse);
//}

//function checkFileExt(ctrl) {
//    var form = document.form1;
//    var file = document.getElementById(ctrl).value;

//    var type = "";
//    var validExtensions = new Array(".doc", ".docx", ".bmp", ".jpg", ".jpeg", ".gif", ".wav", ".mp3", ".mp4");
//    var allowSubmit = true;
//    if (file.indexOf("\\") == -1) {
//        alert("You must select a file before hitting the Submit button");
//        return false; ;
//    }
//    else {
//        type = file.slice(file.indexOf("\\") + 1);
//        var ext = file.slice(file.lastIndexOf(".")).toLowerCase();
//        //loop through our array of extensions
//        for (var i = 0; i < validExtensions.length; i++) {
//            //check to see if it's the improper extension
//            if (validExtensions[i].toLowerCase() == ext.toLowerCase()) {
//                allowSubmit = false;
//                break;
//            }
//        }
//    }
//    //now check the final bool value
//    if (allowSubmit != false) {
//        ClearBrowseContent(ctrl);
//        alert("File type is not allowed.");
//        return false;
//    }
//    else {
//        return true
//    }

//    return allowSubmit;
//}
//// End restriction section