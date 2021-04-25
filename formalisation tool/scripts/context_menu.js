var menu;//The context menu itself
var selectedElement;//The currently selected element
var isPair;//Whether the currently selected element is a pair or not
var isStructChild;//Whether the currently selected element is the child of a struct or not
var visible = false;//Whether the menu is currently visible

/**
 * Close the menu,
 * usually because the user has clicked elsewhere
 * 
 * @param {*} e 
 */
function escapeMenu(e) {
    //Get the menu
    if (menu == null) {
        menu = document.querySelector("#mainMenu");
    }
    //Hide the menu
    if (visible) {
        visible = false;
        menu.style.display = "none";
    }
}

/**
 * Open the menu for a 
 * specific UI element
 * 
 * @param {*} e - oncontextmenu event 
 * @returns 
 */
function activateMenu(e) {
    //Make sure menu is referenced
    if (menu == null) {
        menu = document.querySelector("#mainMenu");
    }
    //Prevent event from firing for parents, 
    //grandparents etc. of a domNode,
    //and prevent browser menu from opening instead
    e.preventDefault();
    e.stopPropagation();

    //Get clicked UI element
    let target = e.target;

    //Determine what the user intended to select
    //(preferring to work with pair due to maximum convenience later on)
    if (target.classList.contains("jsonKeyValuePair")) {
        //Already at the pair
        selectedElement = target;
        isPair = true;
    } else if (target.classList.contains("jsonKey")) {
        //Not pair, but key so it definitely exists,
        //so just go ahead and select it
        selectedElement = target.parentNode;
        isPair = true;
    } else if (target.classList.contains("jsonValue")) {
        //Not pair, and value so need to check for pair
        if (target.parentNode.classList.contains("jsonKeyValuePair")) {
            //Found the pair, so select it
            selectedElement = target.parentNode;
            isPair = true;
        } else {
            //No pair exists
            selectedElement = target;
            isPair = false;
        }
    }
     
    //If child of a struct, make sure to flag so that this element can't be freely manipulated
    if(selectedElement.parentNode.getAttribute("data-type") == "struct"){
        isStructChild = true;
    } else {
        isStructChild = false;
    }

    //Set title
    menu.querySelector(".menuTitle").textContent = isPair ? keyOf(selectedElement).textContent : "untitled " + selectedElement.getAttribute("data-type");

    //Set which options are available
    let type;
    if (isPair) {
        //If a key exists, allow renaming
        menu.querySelector("#renameTarget").classList.remove("disabled");
        type = keyOf(selectedElement).getAttribute("data-type");

    } else {
        menu.querySelector("#renameTarget").classList.add("disabled");
        type = selectedElement.getAttribute("data-type");
    }

    //Unless a child of a struct, in which case never allow renaming
    if(isStructChild){
        menu.querySelector("#renameTarget").classList.add("disabled");
    }

    //if object, allow saving as a struct
    let saveMenuOption = menu.querySelector("#saveTarget");
    if(type == "object"){
        saveMenuOption.classList.remove("disabled");
    } else {
        saveMenuOption.classList.add("disabled");
    }

    //if object or array, allow new children
    let appendMenuOption = menu.querySelector("#appendToTarget");
    if (type == "object" || type == "array") {
        appendMenuOption.classList.remove("disabled");
        
        //Show struct options as well as built-in types
        let structsMenu = document.querySelector("#addStructMenu");
        let structsList = structsMenu.querySelector("ul");
        structsList.innerHTML = "";

        //Get all struct options, and alter menu to reflect this
        let keys = Object.keys(emptyStructs);
        for(let i = 0; i < keys.length; i++){
            let structItem = document.createElement("li");
            structItem.textContent = keys[i];
            structItem.addEventListener("click", function(e){
                appendToTarget("struct", keys[i]);
            });
            structsList.appendChild(structItem);
        }
        //If no struct options, let the user know
        if(keys.length == 0){
            let structItem = document.createElement("li");
            structItem.textContent = "(none)";
            structsList.appendChild(structItem);
        }

    } else {
        appendMenuOption.classList.add("disabled");
    }



    //Prevent user from deleting the root node or struct children
    if (selectedElement.id == "root" || isStructChild) {
        menu.querySelector("#deleteTarget").classList.add("disabled");
    } else {
        menu.querySelector("#deleteTarget").classList.remove("disabled");
    }

    //Set the location of the menu to match that of the click
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";

    ////Tried to make menu stay on screen, but wasn't a complete solution
    // // alert(menu.offsetTop + " + " + menu.offsetHeight + " > " + window.innerHeight)
    // if(menu.offsetTop + menu.offsetHeight > window.innerHeight){      
    //     menu.style.top = e.pageY - menu.offsetHeight + "px";
    // }

    //Make menu visible
    visible = true;
    menu.style.display = "inline-block";

    return false;
}

/**
 * Rename the key of the target pair
 */
function renameTarget() {
    renameElement(keyOf(selectedElement));
}

/**
 * Delete the target element
 */
function deleteTarget() {
    deleteElement(selectedElement);
}

/**
 * Save the target object as a struct
 */
function saveTarget() {
    saveElement(selectedElement);
}

/**
 * Add a child of a given type to the target element
 * 
 * @param {*} childType - the type of the element to add
 * @param {*} structType - in the case of structs, which empty struct to borrow from
 */
function appendToTarget(childType, structType) {
    //Get the value and type of the element if the element is a pair
    let value = (isPair) ? valueOf(selectedElement) : selectedElement;
    let type = (isPair) ? keyOf(selectedElement).getAttribute("data-type") : selectedElement.getAttribute("data-type");
    if (type == "object") {//Add as pair if object parent
        addKeyValuePair(value, childType, structType);
    } else if (type == "array") {//Add as element if array parent
        addArrayElement(value, childType, structType);
    }
}

//Make the menu hide when the window is clicked
window.addEventListener("click", escapeMenu);