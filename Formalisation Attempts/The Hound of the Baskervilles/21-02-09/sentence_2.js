//Changes: Removed sentence 2, fixed sentence 1

/**
 * I stood upon the hearth-rug and picked up the stick 
 * which our visitor had left behind him the night before.
 * 
 * Split version:
 *      - The character stood
 *      - The character was upon the hearth-rug
 *      - (does this fully convey a 'Watson -- To be standing upon -- hearth rug' relationship?)
 *      - The character picked up a stick
 *      - A visitor visited Holmes and Watson the night before
 *      - The visitor left the stick the night before
 */

let actions = [
    {
        "id": "1",
        "type": "to sit",
        "subject": "1",
        "subject_type": "person",
        "object": "",
        "object_type": "",
        "start": "09/02/2021 07:49:23",//Taking advice about filling in with arbitrary info
        "end": "09/02/2021 08:49:23"//At this point, this action is continuing indefinitely
    },
    {
        "id": "2",
        "type": "to stand",
        "subject": "2",
        "subject_type": "person",
        "object": "",
        "object_type": "",
        "start": "09/02/2021 07:49:23",//Taking advice about filling in with arbitrary info
        "end": "09/02/2021 08:49:23"//At this point, this action is continuing indefinitely
    },
    {
        "id": "3",
        "type": "to pick up",
        "subject": "2",
        "subject_type": "person",
        "object": "3",
        "object_type": "object",
        "start": "09/02/2021 07:49:23",//Taking advice about filling in with arbitrary info
        "end": "09/02/2021 08:49:23"//At this point, this action is continuing indefinitely
    },
    {
        "id": "4",
        "type": "to visit",
        "subject": "3",
        "subject_type": "person",
        "object": "1",
        "object_type": "group",
        "start": "08/02/2021 19:21:02",
        "end": "08/02/2021 21:07:48"//Arbitrary, but some time likely passed
    },
    {
        "id": "5",
        "type": "to leave behind",
        "subject": "3",
        "subject_type": "person",
        "object": "3",
        "object_type": "object",
        "start": "08/02/2021 21:07:48",
        "end": "08/02/2021 21:07:48"
    }
]

/**
 * I'm considering treating groups
 * as interchangable with individuals
 */
let groups = [
    {
        "id": "1",
        "members": [
            "1",
            "2"
        ]//No need for timestamp
    }
]
/**
 * Split out prepositions as a separate data structure.
 * Not entirely content with how this looks at the minute, 
 * perhaps it will be better once I incorporate 'types' properly.
 * 
 * Also not sure if 'prepositions' isn't too cumbersome a name.
 */
let prepositions = [
    {
        "type": "at",
        "subject": "1",
        "subject_type": "person",
        "object": "1",
        "object_type": "object",
        "start": "09/02/2021 07:49:23",
        "end": "09/02/2021 08:49:23"
    },
    {
        "type": "on",
        "subject": "2",
        "subject_type": "person",
        "object": "2",
        "object_type": "object",
        "start": "09/02/2021 07:49:23",
        "end": "09/02/2021 08:49:23"
    }
]
/**
 * I needed to find a way of highlighting person 3 as a 'visitor', without actually
 * naming the person as such.
 * 
 * This could also be though of as
 * equivalent of an occupation field.
 */
let roles = [
    {
        "id": "1",
        "id_type": "person",
        "type": "visitor",
        "start": "08/02/2021 19:21:02",
        "end": "08/02/2021 21:07:48"
    }
]
/**
 * I've been thinking about more intuitive names for 'state'.
 * Currently come up with 'entities', but not sure that it
 * fully encompasses what this should be about
 */
let entities = [
    {
        "datetime": "09/02/2021 07:49:25",
        people:
            [
                {
                    "id": "1",
                    "name": "Sherlock Holmes",
                    "gender": "male",
                    "age": "adult"
                },
                {
                    "id": "2"
                },
                {
                    "id": "3",
                    "gender": "male"
                }
            ],
        objects:
            [
                {
                    "id": "1",
                    "name": "breakfast table"
                },
                {
                    "id": "2",
                    "name": "hearth-rug"
                },
                {
                    "id": "3",
                    "name": "stick"
                }
            ]
    }
]

function constraints_for_sentence_1() {
    let sherlock_holmes_was_seated_at_the_breakfast_table = false;
    for (let i = 0; i < entities.length; i++) {
        let time = entities[i];
        for (let j = 0; j < time.people.length; j++) {
            let person = time.people[j];
            if (person.name == "Sherlock Holmes") {
                //Not going to test on 'adult male', as this is inferred info
                for (let k = 0; k < actions.length; k++) {
                    let action = actions[k];
                    if (action.subject_type == "person") {
                        if (action.subject == person.id) {
                            if (action.type == "to sit") {
                                //If Holmes is sitting within this time
                                if (action.start <= time.datetime && time.datetime <= action.end) {
                                    //Number one finished, now for the breakfast table
                                    for (let l = 0; l < prepositions.length; l++) {
                                        let preposition = prepositions[l];
                                        if (preposition.subject_type == "person") {
                                            if (preposition.subject == "1") {
                                                if (preposition.object_type == "object") {
                                                    for (let m = 0; m < time.objects.length; m++) {
                                                        let object = time.objects[m];
                                                        if (object.id == preposition.object) {
                                                            if (object.name == "breakfast table") {
                                                                if (preposition.start <= time.datetime && time.datetime <= preposition.end) {
                                                                    sherlock_holmes_was_seated_at_the_breakfast_table = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("1." + sherlock_holmes_was_seated_at_the_breakfast_table)
}

function constraints_for_sentence_2_part1() {
    let valid = false;
    //There exists a person who is not Holmes, who is standing, and is upon the hearth-rug
    let time = entities[0];//For convenience
    for (let i = 0; i < time.people.length; i++) {
        let person = time.people[i];
        if (person != "Sherlock Holmes") {
            //This person is not Holmes
            for (let j = 0; j < actions.length; j++) {
                let action = actions[j];
                if (action.subject_type == "person") {
                    if (action.subject == person.id) {
                        if (action.type == "to stand") {
                            if (action.start <= time.datetime && time.datetime <= action.end)
                                //This person is standing
                                for (let k = 0; k < prepositions.length; k++) {
                                    let prep = prepositions[k];
                                    if (prep.subject_type == "person") {
                                        if (prep.subject == person.id) {
                                            if (prep.type == "on") {
                                                if (prep.object_type == "object") {
                                                    for (let l = 0; l < time.objects.length; l++) {
                                                        let object = time.objects[l];
                                                        if (prep.object == object.id) {
                                                            if (object.name == "hearth-rug") {
                                                                if (prep.start <= time.datetime && time.datetime <= prep.end) {
                                                                    //This person is on the hearth-rug
                                                                    for (let m = 0; m < actions.length; m++) {
                                                                        let action2 = actions[m];
                                                                        if (action2.subject_type == "person") {
                                                                            if (action2.subject == person.id) {
                                                                                if(action2.type == "to pick up"){
                                                                                    if(action2.object_type == "object"){
                                                                                        for(let n = 0; n < time.objects.length; n++){
                                                                                            let object2 = time.objects[n];
                                                                                            if(object2.id == action2.object){
                                                                                                if(object2.name == "stick"){
                                                                                                    if(action2.start <= time.datetime && time.datetime <= action2.end){
                                                                                                        //This person picked up a stick
                                                                                                        valid = true;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }                                                                                    
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                        }
                    }
                }
            }
        }
    }

    console.log("2a." + valid)
}

function constraints_for_sentence_2_part2(){
    let valid = false;
    //Our visitor had left the stick behind him the night before
    let time = entities[0];
    for(let i = 0; i < actions.length; i++){
        let action = actions[i];
        if(action.subject_type == "person"){
            if(action.type == "to visit") {
                if(action.object_type == "group"){
                    for(let j = 0; j < groups.length; j++){
                        let group = groups[j];
                        if(group.id == action.object){
                            let names = [];
                            for(let k = 0; k < group.members.length; k++){
                                let member = group.members[k];
                                for(let l = 0; l < time.people.length; l++){
                                    let person = time.people[l];
                                    if(person.id == member){
                                        names.push(person.name);
                                    }
                                }
                            }
                            if(names.includes("Sherlock Holmes") /*Need to find a way to reference Watson here, possibly as the person who picked up the stick?*/){
                                //A person visited a group containing at least Holmes
                                for(let k = 0; k < actions.length; k++){
                                    let action2 = actions[k];
                                    if(action2.subject_type == "person"){
                                        if(action2.subject == action.subject){
                                            if(action2.type == "to leave behind"){
                                                if(action2.object_type == "object"){
                                                    if(action2.end < time.datetime){
                                                        let time_of_leaving = action2.end;//"end": "08/02/2021 21:07:48"
                                                        let day_of_leaving = time_of_leaving.substr(0, 2);
                                                        let hour_of_leaving = time_of_leaving.substr(time_of_leaving.length - 8, 2);
                                                        let day_current = time.datetime.substr(0, 2);
                                                        if( (day_of_leaving == day_current - 1 && 18 <= hour_of_leaving && hour_of_leaving < 24) || (day_of_leaving == day_current && hour_of_leaving < 6) ){
                                                            //The visitor left behind something the previous night (the bounds of which are REALLY up to interpretation)
                                                            for(let l = 0; l < time.objects.length; l++){
                                                                let object = time.objects[l];
                                                                if(object.id == action2.object){
                                                                    if(object.name == "stick"){
                                                                        valid = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("2b." + valid)
}

constraints_for_sentence_1();
constraints_for_sentence_2_part1();
constraints_for_sentence_2_part2();
//#endregion



