//#region Mr. Sherlock Holmes was seated at the breakfast table.
let actionTimeline = 
[
    {
        "id": "1",
        "type": "to sit",
        "subject": "1",
        "subject_type": "person",
        "object":"",
        "object_type":"",
        "start": "",
        "end": ""
    },
    {
        "id": "2",
        "type": "to be at",
        "subject": "1",
        "subject_type": "person",
        "object":"1",
        "object_type":"object",
        "start": "",
        "end": ""
    }
];

//Removed 'actions' for now, for brevity. All info within is already in 'actionTimeline'

let state = 
[
    {
        "datetime": "",
        "people":
        [
            {
                "id": "1",
                "name": "Sherlock Holmes",
                "gender": "male",
                "age": "adult"
            }
        ],
    
        "objects"://New method of prepositions leaves 'places' largely unused, given that locations will merely be objects that another object is 'in'
        [
            {
                "id": "1",
                "name": "breakfast table"
            }
        ]
    }
]
//#endregion

//#region I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.
let actionTimeline = 
[
    {
        "id": "1",
        "type": "to sit",
        "subject": "1",
        "subject_type": "person",
        "object":"",
        "object_type":"",
        "start": "",
        "end": ""
    },
    {
        "id": "2",
        "type": "to be at",
        "subject": "1",
        "subject_type": "person",
        "object":"1",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "3",
        "type": "to be on",
        "subject": "2",
        "subject_type": "person",
        "object":"2",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "4",
        "type": "to pick up",
        "subject": "2",
        "subject_type": "person",
        "object":"3",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "5",
        "type": "to visit",
        "subject": "3",
        "subject_type": "person",
        "object":"1",
        "object_type":"group",
        "start": "",
        "end": ""
    },
    {
        "id": "6",
        "type": "to leave behind",
        "subject": "3",
        "subject_type": "person",
        "object":"3",
        "object_type":"object",
        "start": "",//'The night before' - I sorely need a method of relative chronology
        "end": ""
    },
    {
        "id": 7,
        "type": "to be a member of",
        "subject": "1",
        "subject_type": "person",
        "object": "1",
        "object_type": "group",
        "start": "",
        "end": ""
    },
    {
        "id": 8,
        "type": "to be a member of",
        "subject": "2",
        "subject_type": "person",
        "object": "1",
        "object_type": "group",
        "start": "",
        "end": ""
    }
];

//Removed 'actions' for now, for brevity. All info within is already in 'actionTimeline'
let groupTimeline = [
    {
        "id":"1",
        "type":"",        
        "start":"",
        "end":""
    }
]


let state = 
[
    {//The lack of a timekeeping system makes showing more than one 'frame' redundant. I'm only showing the most recent. 
        "datetime": "",
        "people":
        [
            {
                "id": "1",
                "name": "Sherlock Holmes",
                "gender": "male",
                "age": "adult"
            },
            {
                "id": "2"
                //Find some way to mark as viewpoint
            },
            {
                "id": "3",
                "name": "visitor",//Perhaps name should be switched with 'known aliases'
                "gender": "male"
            }
        ],
    
        "objects":
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
//#endregion

//#region It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a “Penang lawyer.”
let actionTimeline = 
[
    {
        "id": "1",
        "type": "to sit",
        "subject": "1",
        "subject_type": "person",
        "object":"",
        "object_type":"",
        "start": "",
        "end": ""
    },
    {
        "id": "2",
        "type": "to be at",
        "subject": "1",
        "subject_type": "person",
        "object":"1",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "3",
        "type": "to be on",
        "subject": "2",
        "subject_type": "person",
        "object":"2",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "4",
        "type": "to pick up",
        "subject": "2",
        "subject_type": "person",
        "object":"3",
        "object_type":"object",
        "start": "",
        "end": ""
    },
    {
        "id": "5",
        "type": "to visit",
        "subject": "3",
        "subject_type": "person",
        "object":"1",
        "object_type":"group",
        "start": "",
        "end": ""
    },
    {
        "id": "6",
        "type": "to leave behind",
        "subject": "3",
        "subject_type": "person",
        "object":"3",
        "object_type":"object",
        "start": "",//'The night before' - I sorely need a method of relative chronology
        "end": ""
    },
    {
        "id": 7,
        "type": "to be a member of",
        "subject": "1",
        "subject_type": "person",
        "object": "1",
        "object_type": "group",
        "start": "",
        "end": ""
    },
    {
        "id": 8,
        "type": "to be a member of",
        "subject": "2",
        "subject_type": "person",
        "object": "1",
        "object_type": "group",
        "start": "",
        "end": ""
    }
];

//Removed 'actions' for now, for brevity. All info within is already in 'actionTimeline'
let groupTimeline = [
    {
        "id":"1",
        "type":"",        
        "start":"",
        "end":""
    }
]


let state = 
[
    {//The lack of a timekeeping system makes showing more than one 'frame' redundant. I'm only showing the most recent. 
        "datetime": "",
        "people":
        [
            {
                "id": "1",
                "name": "Sherlock Holmes",
                "gender": "male",
                "age": "adult"
            },
            {
                "id": "2"
                //Find some way to mark as viewpoint
            },
            {
                "id": "3",
                "name": "visitor",//Perhaps name should be switched with 'known aliases'
                "gender": "male"
            }
        ],
    
        "objects":
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
                "name": "stick",
                //For now, just lumping miscellaneous and hard to categorise adjectives in here. Far from good practice, but I can't see any reasonable alternatives in the current system
                "misc": "thick; wooden; bulbous-headed; Penang lawyer"//Whilst I haven't done anything about perspective yet, I'll just take Watson's word for this
            }
        ]
    }
]
//#endregion

