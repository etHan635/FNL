/**
 * Produces a new JSON structure in the work area,
 * replacing its current contents
 */
function newJson() {
    //Get and clear the work area
    let output = document.getElementById("workAreaInner");
    output.innerHTML = "";
    //Create and set up the UI for an empty JSON structure
    let generatedHTML = parseKeyValuePair(document, "new json file.json", {});
    generatedHTML.id = "root";
    setupEventListeners(generatedHTML);
    //Insert this new structure into the work area
    output.appendChild(generatedHTML);
}

/**
 * Import and existing JSON file,
 * placing it within the work area
 */
function importJson() {
    //Get and clear the work area
    let output = document.getElementById("workAreaInner");
    output.innerHTML = "";

    try {
        //Find the file which the user wants to import from
        let file = document.getElementById("importedFile").files[0];
        let reader = new FileReader();

        //Add event listener for when reader is finished
        reader.addEventListener("load", function (e) {
            //Convert text to JSON
            let text = e.target.result;
            let json = JSON.parse(text);
            //Create and set up UI for JSON
            let generatedHTML = parseKeyValuePair(document, file.name, json);
            generatedHTML.id = "root";
            setupEventListeners(generatedHTML);
            //Insert UI into work area
            output.appendChild(generatedHTML);
        })
        //Read file
        reader.readAsText(file);
    } catch (err) {//Lots of things can go wrong here, so I've just used a blanket catch statement
        alert("Something went wrong.");
    }
}

/**
 * Display a JSON version of the 
 * current contents of the work area
 * in the 'preview' window
 */
function previewJson() {
    //Get the structure as UI
    let root = document.getElementById("root");
    //Get structure as JSON
    let json = getKeyValuePair(root)["value"];
    //Convert to string so it can be dumped as text
    json = JSON.stringify(json, null, 4);
    //Dump text of the JSON into the preview window
    document.getElementById("previewInner").textContent = json;
}

/**
 * Download the contents of the work area
 * as a JSON file
 */
function downloadJson() {
    //Get the structure as UI, convert to JSON
    let root = document.getElementById("root");
    let jsonRoot = getKeyValuePair(root);

    //Make a JSON file containing the json structure
    let fileName = jsonRoot["key"];
    let json = jsonRoot["value"];
    let file = new Blob([JSON.stringify(json)], { type: "application/json" });
    //Dispense the file through creative use of a link
    //(can't just drop it in Downloads due to security concerns)
    let fileURL = URL.createObjectURL(file);
    var a = document.createElement("a");
    a.download = fileName;
    a.href = fileURL;
    a.click();
}

/**
 * Import an existing JSON file
 * so that the tool can recognise the
 * structs within
 */
function importStructs() {
    try {
        //Get the selected file
        let file = document.getElementById("importedStructsFile").files[0];
        let reader = new FileReader();

        //Set an event listener for when the file has been read
        reader.addEventListener("load", function (e) {
            //Get the file in JSON form
            let text = e.target.result;
            let json = JSON.parse(text);
            //Deposit it into the local structs variable
            emptyStructs = json;
        })
        //Read the file
        reader.readAsText(file);
    } catch (err) {
        alert("Something went wrong.");
    }
}

/**
 * Export the current structs so
 * that they can be used elsewhere
 */
function downloadStructs() {
    //Create a file to store the structs
    let fileName = "empty_structs.json"
    let json = emptyStructs;
    let file = new Blob([JSON.stringify(json)], { type: "application/json" });
    //Dispense the file through creative use of a link
    //(can't just drop it in Downloads due to security concerns)
    let fileURL = URL.createObjectURL(file);
    var a = document.createElement("a");
    a.download = fileName;
    a.href = fileURL;
    a.click();
}

/**
 * Rename a pair
 * @param {*} key - the key of the pair being renamed
 */
function renameElement(key) {
    //Choose a new key
    let newKey = window.prompt("Rename key '" + key.textContent + "' to:");
    //If appropriate, set the new key.
    //(I could check for existing uses of that key here, 
    //but JSON itself doesn't enforce uniqueness, 
    //so I won't impose this limit either)
    if (newKey != null) {
        if (newKey != "") {
            key.textContent = newKey;
        }
    }
}

/**
 * Save an object as a
 * struct so that it can be
 * duplicated elsewhere
 * @param {*} object - the object to be used as a template when instances of this struct are created
 */
function saveElement(object) {
    //Choose a name for the new struct
    let type = prompt("Name struct:");
    if (type != null && type != "") {
        //Ensure that the value is being used, not the pair
        if (object.classList.contains("jsonKeyValuePair")) {
            object = valueOf(object);
        }
        //Get this structure in JSON form
        let objectAsJSON = getObject(object);
        //Save the new struct
        emptyStructs[type] = objectAsJSON;
    }
}

/**
 * Delete an element from the work area
 * @param {*} element - the element to delete
 */
function deleteElement(element) {
    //Get the key of the element
    //(or improvise one)
    let key = keyOf(element);
    if (key == null) {
        key = "untitled " + element.getAttribute("data-type");
    } else {
        key = key.textContent;
    }
    //Confirm that the user wants to delete
    let del = window.confirm("Are you sure you want to remove '" + key + "'?");
    if (del) {
        //Delete the element
        element.remove();
    }
}

/**
 * Add a kvPair to an existing object
 * 
 * @param {*} object - the parent to which the new pair is being appended
 * @param {*} childType - the type of the new pair
 * @param {*} structType - the source struct of the new pair (only used for 'struct')
 */
function addKeyValuePair(object, childType, structType) {
    let value;
    let keyName = childType;
    //Get the default value for the chosen type
    switch (childType) {
        case "object": value = {}; break;
        case "array": value = []; break;
        case "string": value = ""; break;
        case "number": value = 0; break;
        case "boolean": value = false; break;
        case "struct":
            //find the struct in question
            value = getEmptyStruct(structType);
            keyName = value ? value.$type : "struct";
            break;
        case "reference": value = { "$ref": "" }; break;
        default: return;
    }
    //Create and add the UI for the new pair
    let pair = parseKeyValuePair(document, "new " + keyName, value);
    object.appendChild(pair);
}

/**
 * Add a value to an existing array
 * 
 * @param {*} array - the parent to which the new value is being appended
 * @param {*} childType - the type of the new value
 * @param {*} structType - the source struct of the new value (struct only)
 */
function addArrayElement(array, childType, structType) {
    let value;
    //Get the default value for the chosen type
    switch (childType) {
        case "object": value = {}; break;
        case "array": value = []; break;
        case "string": value = ""; break;
        case "number": value = 0; break;
        case "boolean": value = false; break;
        case "reference": value = { "$ref": "" }; break;
        case "struct": value = getEmptyStruct(structType); break;
        default: return;
    }
    //Create and add the UI for the value
    let valueUI = parseValue(document, value);
    array.appendChild(valueUI);
}

/**
 * Finds an empty struct from emptyStructs
 * 
 * @param {*} type - the key of the empty struct
 * @returns - the struct found, or null if nothing is found
 */
function getEmptyStruct(type) {
    //Check that this struct actually exists
    if (Object.keys(emptyStructs).includes(type)) {
        //Get the source object for this struct
        let emptyStructure = emptyStructs[type];
        //Set the type
        emptyStructure["$type"] = type;
        //Return the struct
        return emptyStructure;
    }
}

/**
 * Setup the UI so that it brings up the custom context menu on right click,
 * rather than the default browser options
 * 
 * @param {*} rootNode 
 */
function setupEventListeners(rootNode) {
    //Get all JSON UI
    for (let jsonElement of rootNode.querySelectorAll(".jsonKey, .jsonValue, .jsonKeyValuePair")) {
        //Add right click event listeners
        jsonElement.addEventListener("contextmenu", function (e) {
            activateMenu(e);
        })
    }
}