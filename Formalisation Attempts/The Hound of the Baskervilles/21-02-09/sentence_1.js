//Changes: Removed sentence 2, fixed sentence 1

//#region 1. Mr. Sherlock Holmes was seated at the breakfast table.

/**
 * Split into the two statements:
 * - Mr. Sherlock Holmes was seated
 * - Mr. Sherlock Holmes was at the breakfast table.
 */

let actions = [
    {
        "id": "1",
        "type": "to sit",
        "subject": "1",
        "subject_type": "person",
        "object":"",
        "object_type":"",
        "start": "09/02/2021 07:49:23",//Taking advice about filling in with arbitrary info
        "end": "09/02/2021 08:49:23"//At this point, this action is continuing indefinitely
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
        "type":"at",
        "subject":"1",
        "subject_type":"person",
        "object":"1",
        "object_type":"object",
        "start":"09/02/2021 07:49:23",
        "end":"09/02/2021 08:49:23"
    }
]

/**
 * I've been thinking about more intuitive names for 'state'.
 * Trying 'entities' for now, although this deviates somewhat
 * from the purpose of this structure in the bio system.
 * 
 * Perhaps I could build an 'entities' timeline? Could that 
 * be a better way of conveying what exists at a certain time,
 * and what attributes each thing has?
 */
let entities = [
    {
        "datetime":"09/02/2021 07:49:25",
        people:
        [
            {
                "id": "1",
                "name": "Sherlock Holmes",
                "gender": "male",
                "age": "adult"
            }
        ],    
        objects:
        [
            {
                "id": "1",
                "name": "breakfast table"
            }
        ]
    }
]

function constraints_for_sentence_1(){
    let sherlock_holmes_was_seated_at_the_breakfast_table = false;    
    for(let i = 0; i < entities.length; i++){
        let time = entities[i];  
        for(let j = 0; j < time.people.length; j++){
            let person = time.people[j];
            if(person.name == "Sherlock Holmes"){
                //Not going to test on 'adult male', as this is inferred info
                for(let k = 0; k < actions.length; k++){
                    let action = actions[k];
                    if(action.subject_type == "person"){
                        if(action.subject == person.id){
                            if(action.type == "to sit"){
                                //If Holmes is sitting within this time
                                if(action.start <= time.datetime && time.datetime <= action.end){
                                    //Number one finished, now for the breakfast table
                                    for(let l = 0; l < prepositions.length;l++){
                                        let preposition = prepositions[l];
                                        if(preposition.subject_type == "person"){
                                            if(preposition.subject == "1"){
                                                if(preposition.object_type == "object"){
                                                    for(let m = 0; m < time.objects.length; m++){
                                                        let object = time.objects[m];
                                                        if(object.id == preposition.object){
                                                            if(object.name == "breakfast table"){
                                                                if(preposition.start <= time.datetime && time.datetime <= preposition.end){
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
    console.log(sherlock_holmes_was_seated_at_the_breakfast_table)
}
constraints_for_sentence_1();

//#endregion



