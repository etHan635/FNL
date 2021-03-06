/**
 * Formalization Attempt 1
 * Ethan Hanley
 * 
 * (empty fields excluded for brevity)
 */


//#region 1. Gates was born in Seattle, Washington, on October 28, 1955

let actionTimeline = //Over this time period, these people were doing these things
    [
        {
            "id": "1",
            "type": "being_born",
            "applied_to": "1",
            "applied_to_type": "person",
            "start": "28/10/1955",
            "end": "28/10/1955"
        }
    ];

let actions = //Human summaries of actions
    [
        {
            "type": "being_born"
        }
    ]

let state = //Specific state information which satisfies constraint; A human should be able to understand state without having to apply judgement
    [
        {
            "datetime": "28/10/1955",
            "people":
                [
                    {
                        "id": "1",
                        "name": "Gates",
                        "location": "1"
                    }
                ],

            "places":
                [
                    {
                        "id": "1",
                        "name": "Seattle, Washington"
                    }
                ]
        }
    ]
//#endregion

//#region 1. Constraints

//Limitting use of fancy syntax to mirror Liam's (and also because I don't know any Js!)
function gatesBornSeattle() {
    for (action of actionTimeline) {
        console.log("actions exist!");
        if (action.end == "28/10/1955" && action.type == "being_born" && action.applied_to_type == "person") {//Someone was born on 1995-19-28
            console.log("birth found on 28/10/1955!");
            for (person of state[0].people) {
                console.log("people exist!");
                if (person.name == "Gates") {//Gates exists
                    console.log("Gates found!");
                    if (person.id == action.applied_to) {//Gates was born on 1995-19-28
                        console.log("Gates was the one born!");
                        for (place of state[0].places) {
                            console.log("places exist!");
                            if (place.id == person.location) {
                                console.log("the place where Gates is has been found!");
                                if (place.name == "Seattle, Washington") {//Gates was born on 1995-19-28 in Seattle, Washington
                                    console.log("That place is Seattle, Washington!");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

console.log("Gates was born on 1995-19-28 in Seattle, Washington (?): " + gatesBornSeattle());

//#endregion

//#region 2. He is the son of William H. Gates Sr.[c] (1925–2020) and Mary Maxwell Gates (1929–1994).
actionTimeline = //Over this time period, these people were doing these things
    [
        {
            "id": "1",
            "type": "being born",
            "applied_to": "1",
            "applied_to_type": "person",
            "start": "28/10/1955",
            "end": "28/10/1955"
        },
        {
            "id": "2",
            "type": "being born",
            "applied_to": "2",
            "applied_to_type": "person",
            "start": "1925",
            "end": "1925"
        },
        {
            "id": "3",
            "type": "being born",
            "applied_to": "3",
            "applied_to_type": "person",
            "start": "1929",
            "end": "1929"
        },
        {
            "id": "4",
            "type": "dying",
            "applied_to": "3",
            "applied_to_type": "person",
            "start": "1994",
            "end": "1994"
        },
        {
            "id": "5",
            "type": "dying",
            "applied_to": "2",
            "applied_to_type": "person",
            "start": "2020",
            "end": "2020"
        }
    ];

actions = //Human summaries of actions
    [
        {
            "type": "being born"
        },
        {
            "type": "dying"
        }
    ]

let relationshipTimeline = //Over this time period, these things were related in this way
    [
        {
            "id": "1",
            "type": "son",
            "between": { "subject": "1", "object": "2" },
            "between_type": { "subject": "person", "object": "person" },
            "start": "28/10/1955",
            "end": ""
        },
        {
            "id": "2",
            "type": "son",
            "between": { "subject": "1", "object": "3" },
            "between_type": { "subject": "person", "object": "person" },
            "start": "28/10/1955",
            "end": ""
        }
    ]

let relationships = //Human summaries of relationships; A relationship should only exist if the parties are doing something which would lead a human to believe they have that relationship
    [
        {
            "type": "son"
        }
    ]

state = //Specific state information which satisfies constraint; A human should be able to understand state without having to apply judgement
    [
        {
            "datetime": "1925",
            "people":
                [

                    {
                        "id": "2",
                        "name": "William H. Gates Sr."
                    }
                ]
        },
        {
            "datetime": "1929",
            "people":
                [

                    {
                        "id": "2",
                        "name": "William H. Gates Sr."
                    },
                    {
                        "id": "3",
                        "name": "Mary Maxwell Gates"
                    }
                ]
        },
        {
            "datetime": "28/10/1955",
            "people":
                [
                    {
                        "id": "1",
                        "name": "Gates",
                        "location": "1"
                    },
                    {
                        "id": "2",
                        "name": "William H. Gates Sr."
                    },
                    {
                        "id": "3",
                        "name": "Mary Maxwell Gates"
                    }
                ],

            "places":
                [
                    {
                        "id": "1",
                        "name": "Seattle, Washington"
                    }
                ]
        },
        {
            "datetime": "1994",
            "people":
                [
                    {
                        "id": "1",
                        "name": "Gates",
                        "location": "1"
                    },
                    {
                        "id": "2",
                        "name": "William H. Gates Sr."
                    }
                ],

            "places":
                [
                    {
                        "id": "1",
                        "name": "Seattle, Washington"
                    }
                ]
        },
        {
            "datetime": "2020",
            "people":
                [
                    {
                        "id": "1",
                        "name": "Gates",
                        "location": "1"
                    }
                ],

            "places":
                [
                    {
                        "id": "1",
                        "name": "Seattle, Washington"
                    }
                ]
        }
    ]
//#endregion

