/**
 * Generate UI for a JSON kvPair
 * 
 * @param {*} document - the relevant document
 * @param {*} key - the key of the pair
 * @param {*} value - the value of the pair
 * @returns - the generated UI
 */
function parseKeyValuePair(document, key, value) {
    var div = document.createElement("div");
    //Mark div as a pair
    div.classList.add("jsonKeyValuePair");

    //Get the value UI
    var valueUI = parseValue(document, value)

    //Generate the key UI
    var keyUI = document.createElement("label");
    keyUI.textContent = key;
    keyUI.classList.add("jsonKey");
    keyUI.setAttribute("data-type", valueUI.getAttribute("data-type"));
    //Append the key UI
    div.appendChild(keyUI);

    //If struct, create a third UI element to show the type of struct
    if (valueUI.getAttribute("data-type") == "struct") {
        let typeUI = document.createElement("label");
        typeUI.textContent = value.$type;
        div.appendChild(typeUI);
    }
    //Append valueUI
    div.appendChild(valueUI);
    return div;
}

/**
 * Generate UI for a JSON value
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the value from which the UI is sourced
 * @returns - the generated UI
 */
function parseValue(document, value) {
    var valueUI;
    //Get the correct UI based upon the datatype
    var type = getType(value);
    switch (type) {
        case "object":
            valueUI = parseObject(document, value);
            break;
        case "array":
            valueUI = parseArray(document, value);
            break;
        case "string":
            valueUI = parseString(document, value);
            break;
        case "number":
            valueUI = parseNumber(document, value);
            break;
        case "boolean":
            valueUI = parseBoolean(document, value);
            break;
        case "struct":
            valueUI = parseStruct(document, value);
            break;
        case "reference":
            valueUI = parseReference(document, value);
            break;
        default:
            valueUI = parseString(document, String(value));
            type = "string";//Set type to string so value can be read again
            break;
    }
    //Mark as a value
    valueUI.classList.add("jsonValue");
    valueUI.setAttribute("data-type", type);
    return valueUI;
}

/**
 * Generate UI for a JSON object
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the object which UI is being created for
 * @returns - the generated UI
 */
function parseObject(document, value) {
    //Get keys of object
    var childKeys = Object.keys(value);
    var div = document.createElement("div");
    for (var i = 0; i < childKeys.length; i++) {
        //Create appropriate UI for each pair
        var childKey = childKeys[i];
        var childValue = value[childKey];
        var keyValuePairUI = parseKeyValuePair(document, childKey, childValue);
        div.appendChild(keyValuePairUI);
    }
    return div;
}

/**
 * Generate UI for a JSON array
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the array which UI is being created for
 * @returns - the generated UI
 */
function parseArray(document, value) {
    var list = document.createElement("div");
    //Create UI for each array element
    for (var i = 0; i < value.length; i++) {
        var item = value[i];
        //Get UI appropriate for the value's data type
        var element = parseValue(document, item);
        list.appendChild(element);
    }
    return list;
}

/**
 * Generate UI for a JSON string
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the string in question
 * @returns - the generated UI
 */
function parseString(document, value) {
    var element;
    if (value.length > 20) {//If long enough, create a multiline UI
        element = document.createElement("textarea");
        element.textContent = value;
    } else {//Otherwise, use a single line
        element = document.createElement("input");
        element.setAttribute("type", "text");
        element.setAttribute("value", value);
    }
    return element;
}

/**
 * Generate UI for a JSON number
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the number in question
 * @returns - the generated UI
 */
function parseNumber(document, value) {
    var element = document.createElement("input");
    element.setAttribute("type", "number");
    element.setAttribute("value", value);
    return element;
}

/**
 * Generate UI for a JSON bool
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the bool in question
 * @returns - the generated UI
 */
function parseBoolean(document, value) {
    var element = document.createElement("input");
    element.setAttribute("type", "checkbox");
    element.checked = value;
    return element;
}

/**
 * Generate UI for a struct
 * (composite JSON value,
 * mimicing OOP functionality)
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the struct in question
 * @returns - the generated UI
 */
function parseStruct(document, value) {
    var div = document.createElement("div");

    //Enforce keys designated in emptyStructs
    let type = value.$type;
    div.setAttribute("data-struct_type", type);

    //Get an empty struct of the same type
    let empty = getEmptyStruct(type);

    //If no empty struct found, do not attempt further parsing
    if (empty == null) {
        let message = document.createElement("label");
        message.textContent = "(no template found)";
        div.appendChild(message);
    } else {
        //Convert value where it matches the empty, ignore when it does not
        
        //Get pairs of empty
        let keys = Object.keys(empty);
        for (let i = 0; i < keys.length; i++) {
            let childKey = keys[i];
            if (childKey != "$type") {
                //Use empty as default, but try to override with the imported JSON
                let childValue = empty[childKey];
                if (value[childKey] != null) {
                    //Check that value is same type as that of empty
                    let emptyKeyType = getType(childValue);
                    let valueKeyType = getType(value[childKey]);

                    if (emptyKeyType == valueKeyType) {
                        childValue = value[childKey]
                    }
                }
                //Add whichever value has won out
                var keyValuePairUI = parseKeyValuePair(document, childKey, childValue);
                div.appendChild(keyValuePairUI);
            }
        }
    }
    return div;
}

/**
 * Generate UI for a reference,
 * i.e. a url like pointer to somewhere else
 * int the JSON structure.
 * 
 * Needs work to be fully realised.
 * 
 * @param {*} document - the relevant document
 * @param {*} value - the reference in question
 * @returns - the generated UI
 */
function parseReference(document, value){
    //Just importing like a string for now
    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("value", value.$ref);
    return element;
}

/**
 * Find out the type of a given value,
 * with support for some custom types
 * 
 * @param {*} value - the value being investigated
 * @returns 
 */
function getType(value) {
    //Get primitive value
    let type = typeof (value);
    //Arrays default to object, so alternative check for arrays 
    if (Array.isArray(value)) {
        type = "array";
    }
    //Check for structs and refs
    if (type == "object") {
        if (value.$ref != null){
            type = "reference";
        }
        if (value.$type != null) {
            type = "struct";
        }
    }
    return type;
}