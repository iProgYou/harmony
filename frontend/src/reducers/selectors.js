const samplerNoteArr = (state, jam) => {
    let samplerNotes = [];
    for (let i = 0; i < jam.beats; i++) {
        samplerNotes.push([])
        jam.gridIds.forEach(gridId => {
            let notes = state.entities.grids[gridId].notes;
            let inst = state.entities.grids[gridId].instrument;
            if (inst === "drums") {
                let drumArr = [];
                // debugger
                notes[i].forEach(note => {
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

// const state = {
//     entities: {jams: {
//         1: {
//             id: 1,
//             gridIds: [1,2,3,4],
//             beats: 8,
//             hostId: 10
//         }
//     },
//     grids: {
//         1: {
//             id: 1,
//             notes: ["A1","A2","","","A1","A2","",""],
//             instrument: "piano",
//             beats: 8
//         },
//         2: {
//             id: 2,
//             notes: ["","","C#2","B1","","","C#2","B1"],
//             instrument: "keyboard",
//             beats: 8
//         },
//         3: {
//             id: 3,
//             notes: ["A1","","C#2","","A1","","C#2",""],
//             instrument: "bass",
//             beats: 8
//         },
//         4: {
//             id: 3,
//             notes: [
//                 ["A1", "F#2"],
//                 ["A1"],
//                 ["B1", "F#2"],
//                 ["A1"],
//                 ["F#2"],
//                 ["A1"],
//                 ["F#2", "B1"],
//                 ["B1", "E2"]
//             ],
//             instrument: "drums",
//             beats: 8
//         }
//     }}
// };

// console.log(samplerNoteArr(state,state.entities.jams[1]));