const samplerNoteArr = (state, room) => {
    let samplerNotes = [];
    for (let i = 0; i < room.cols; i++) {
        samplerNotes.push([])
        room.instrumentNames.forEach(gridId => {
            let notes = state.entities.grids[gridId].notes;
            let inst = state.entities.grids[gridId].instrument;
            if (inst === "drums") {
                let drumArr = [];
                // debugger
                if (notes[i]) notes[i].forEach(note => {
                    drumArr.push(inst[0] + note)
                });
                samplerNotes[i].push(...drumArr)
                // debugger
            } else {
                if (notes[i] !== "") {
                    samplerNotes[i].push(inst[0] + notes[i])
                };
            };
        });
    };
    return samplerNotes
};

export const samplerReadableNotes = (state,room) => {
    // debugger
    let samplerNotes = samplerNoteArr(state,room)
    let encodeNotes = {
        bA1: "A1", bB1: "B1", bCs2: "C1", bE2: "D1", bFs2: "E1", bA2: "F1", 
        pA1: "A2", pB1: "B2", pCs2: "C2", pE2: "D2", pFs2: "E2", pA2: "F2",
        kA1: "A3", kB1: "B3", kCs2: "C3", kE2: "D3", kFs2: "E3", kA2: "F3", 
        dA1: "A4", dB1: "B4", dCs2: "C4", dE2: "D4", dFs2: "E4", dA2: "F4"
    }
    let newNoteArr = []; 
    samplerNotes.forEach(noteArr => {
        newNoteArr.push(noteArr.map(note => {
            // console.log(note)
            if (note.includes("#")) {
                // console.log(note)
                return encodeNotes[note.replace("#","s")]
            } else {
                return encodeNotes[note]
            }
        }));
    })
    return newNoteArr
}

export const getAllMiniNotes = (state, instrument) => {
    let res = []
    for(let grid of state.grids){
        if(grid.instrument !== instrument) res.push(grid.notes)
    }
    return res
}

// notes
// have rooms also contain gridIds
// const state = {
//     entities: {
//         room: {
//                 id: 1,
//                 beats: 8,
//                 hostId: 10,
//                 gridNames: ["piano","keyboard","drums","bass"]
//             }
//         },
//         jams: {
//             1: {
//                 id: 1,
//                 gridIds: [1,2,3,4],
//                 beats: 8,
//                 hostId: 10
//             }
//         },
//         grids: {
//             "piano": {
//                 id: 1,
//                 notes: ["A1","A2","","","A1","A2","",""],
//                 instrument: "piano",
//                 beats: 8
//             },
//             "keyboard": {
//                 id: 2,
//                 notes: ["","","C#2","B1","","","C#2","B1"],
//                 instrument: "keyboard",
//                 beats: 8
//             },
//             "bass": {
//                 id: 3,
//                 notes: ["A1","","C#2","","A1","","C#2",""],
//                 instrument: "bass",
//                 beats: 8
//             },
//             "drums": {
//                 id: 3,
//                 notes: [
//                     ["A1", "F#2"],
//                     ["A1"],
//                     ["B1", "F#2"],
//                     ["A1"],
//                     ["F#2"],
//                     ["A1"],
//                     ["F#2", "B1"],
//                     ["B1", "E2"]
//                 ],
//                 instrument: "drums",
//                 beats: 8
//             }
//         }
//     }
// };

// console.log(samplerReadableNotes(samplerNoteArr(state,state.entities.jams[1])));

// room: = {
//                     id: 1,
//                     beats: 8,
//                     hostId: 10,
//                     gridNames: ["piano","keyboard","drums","bass"]
//                 }

//                 grids = {
//                                 "piano": {
//                                     id: 1,
//                                     notes: ["A1","A2","","","A1","A2","",""],
//                                     instrument: "piano",
//                                     beats: 8
//                                 },
//                                 "keyboard": {
//                                     id: 2,
//                                     notes: ["","","C#2","B1","","","C#2","B1"],
//                                     instrument: "keyboard",
//                                     beats: 8
//                                 },
//                                 "bass": {
//                                     id: 3,
//                                     notes: ["A1","","C#2","","A1","","C#2",""],
//                                     instrument: "bass",
//                                     beats: 8
//                                 },
//                                 "drums": {
//                                     id: 3,
//                                     notes: [
//                                         ["A1", "F#2"],
//                                         ["A1"],
//                                         ["B1", "F#2"],
//                                         ["A1"],
//                                         ["F#2"],
//                                         ["A1"],
//                                         ["F#2", "B1"],
//                                         ["B1", "E2"]
//                                     ],
//                                     instrument: "drums",
//                                     beats: 8
//                                 }
//                             }