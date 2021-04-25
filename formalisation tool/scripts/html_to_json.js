/**
 * Retrieve a JSON pair from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON kvPair
 */
function getKeyValuePair(domNode) {
    //Get key of pair
    let key = keyOf(domNode).textContent;
    //Get value of pair
    let valueNode = valueOf(domNode);
    let value = getValue(valueNode);
    return { "key": key, "value": value };
}

/**
 * Retrieve a JSON value from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON value
 */
function getValue(domNode) {
    //Get type of value
    let type = domNode.getAttribute("data-type");
    //Use type info to correctly retrieve value
    let value;
    switch (type) {
        case "object":
            value = getObject(domNode);
            break;
        case "array":
            value = getArray(domNode);
            break;
        case "string":
            value = getString(domNode);
            break;
        case "number":
            value = getNumber(domNode);
            break;
        case "boolean":
            value = getBoolean(domNode);
            break;
        case "struct":
            value = getStruct(domNode);
            break;
        case "reference":
            value = getReference(domNode);
            break;
        default:
            value = "";
            break;
    }
    return value;
}

/**
 * Retrieve a JSON object from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON object
 */
function getObject(domNode) {
    //Create empty object
    let object = {};
    //Get pairs from UI
    let pairNodes = keyValuePairsOf(domNode);
    //Fill object with pairs from UI
    for (let i = 0; i < pairNodes.length; i++) {
        let pairNode = pairNodes[i];
        let pair = getKeyValuePair(pairNode);
        object[pair["key"]] = pair["value"];
    }

    return object;
}

/**
 * Retrieve a JSON array from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON array
 */
function getArray(domNode) {
    let array = [];
    //Get elements from UI
    let elementNodes = elementsOf(domNode);
    //Fill array with elements from UI
    for (let i = 0; i < elementNodes.length; i++) {
        let elementNode = elementNodes[i];
        let element = getValue(elementNode);
        array.push(element);
    }
    return array;
}

/**
 * Retrieve a JSON string from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON string
 */
function getString(domNode) {
    return String(domNode.value);
}

/**
 * Retrieve a JSON number from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON number
 */
function getNumber(domNode) {
    return Number(domNode.value);
}

/**
 * Retrieve a JSON bool from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - JSON bool
 */
function getBoolean(domNode) {
    return Boolean(domNode.checked);
}

/**
 * Retrieve a struct from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - struct
 */
function getStruct(domNode) {
    //Create object, and set $type
    let object = {};
    let type = domNode.getAttribute("data-struct_type");
    object["$type"] = type;
    //Fill with pairs from UI
    let pairNodes = keyValuePairsOf(domNode);
    for (let i = 0; i < pairNodes.length; i++) {
        let pairNode = pairNodes[i];
        let pair = getKeyValuePair(pairNode);
        object[pair["key"]] = pair["value"];
    }

    return object;
}

/**
 * Retrieve a reference from corresponding UI
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - reference
 */
function getReference(domNode){    
    //Get ref as string
    let referenceText = String(domNode.value);
    return {"$ref":referenceText};
}

/**
 * Find the children of an object domNode
 * labeled as kvPairs
 * 
 * @param {*} domNode - the domNode being translated
 * @returns - a list of UI elements of pairs
 */
function keyValuePairsOf(domNode) {
    let kvPairs = [];
    //Go through children, adding those with kvPair class
    for (let i = 0; i < domNode.children.length; i++) {
        let child = domNode.children[i];
        if (child.classList.contains("jsonKeyValuePair")) {
            kvPairs.push(child);
        }
    }
    return kvPairs;
}

/**
 * Find children of an array domNode
 * labeled as values (array elements)
 * @param {*} domNode 
 * @returns - list of value UI elements
 */
function elementsOf(domNode) {
    let kvPairs = [];
    //Go through children, adding those with value class
    for (let i = 0; i < domNode.children.length; i++) {
        let child = domNode.children[i];
        if (child.classList.contains("jsonValue")) {
            kvPairs.push(child);
        }
    }
    return kvPairs;
}

/**
 * Find the key UI corresponding to a kvPair
 * 
 * @param {*} domNode - the kvPair UI
 * @returns - the key UI
 */
function keyOf(domNode) {
    for (let i = 0; i < domNode.children.length; i++) {
        let child = domNode.children[i];
        if (child.classList.contains("jsonKey")) {
            return child;
        }
    }
    return null;
}

/**
 * Find the value UI corresponding to a kvPair
 * 
 * @param {} domNode - the kvPair UI
 * @returns - the value UI
 */
function valueOf(domNode) {
    for (let i = 0; i < domNode.children.length; i++) {
        let child = domNode.children[i];
        if (child.classList.contains("jsonValue")) {
            return child;
        }
    }
    return null;
}