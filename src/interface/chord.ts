type ChordBase = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type Accidental = "#" | "b";
type Modifier = "m" | "sus" | "add" | "dim" | "aug" | "maj";
type Bass = `/${ChordBase}${Accidental | ""}`;
type ChordNumber = "2" | "3" | "4" | "5" | "6" | "7" | "9" | "11" | "13";

export type Chord =
  | `${ChordBase}${Accidental | ""}${Modifier | ""}${ChordNumber | ""}${Bass | ""}`
  | `${ChordBase}${Accidental | ""}${Bass | ""}`;

export const chords: Array<{
  name: Chord;
  startFret: number;
  frets: Array<number | null>;
}> = [
  {name: "C", startFret: 1, frets: [null, 3, 2, 0, 1, 0]},
  {name: "Cm", startFret: 1, frets: [null, 3, 1, 0, 1, null]},
  {name: "C7", startFret: 1, frets: [null, 3, 2, 3, 1, 0]},
  {name: "Cmaj7", startFret: 1, frets: [null, 3, 2, 0, 0, 0]},
  {name: "Cadd9", startFret: 1, frets: [null, 3, 2, 0, 3, 0]},
  {name: "Cdim", startFret: 1, frets: [null, 3, 1, null, 1, null]},
  {name: "Caug", startFret: 1, frets: [null, 3, 2, 1, 1, null]},
  {name: "C/E", startFret: 1, frets: [0, 3, 2, 0, 1, 0]},

  {name: "D", startFret: 2, frets: [null, null, 0, 2, 3, 2]},
  {name: "Dm", startFret: 2, frets: [null, null, 0, 2, 3, 1]},
  {name: "D7", startFret: 2, frets: [null, null, 0, 2, 1, 2]},
  {name: "Dmaj7", startFret: 2, frets: [null, null, 0, 2, 2, 2]},
  {name: "Dsus2", startFret: 2, frets: [null, null, 0, 2, 3, 0]},
  {name: "Dsus4", startFret: 2, frets: [null, null, 0, 2, 3, 3]},
  {name: "Ddim", startFret: 2, frets: [null, null, 0, 1, 0, 1]},
  {name: "Daug", startFret: 2, frets: [null, null, 0, 3, 3, 2]},
  {name: "D/F#", startFret: 2, frets: [2, 0, 0, 2, 3, 2]},

  {name: "E", startFret: 1, frets: [0, 2, 2, 1, 0, 0]},
  {name: "Em", startFret: 1, frets: [0, 2, 2, 0, 0, 0]},
  {name: "E7", startFret: 1, frets: [0, 2, 0, 1, 0, 0]},
  {name: "Emaj7", startFret: 1, frets: [0, 2, 1, 1, 0, 0]},
  {name: "Esus4", startFret: 1, frets: [0, 2, 2, 2, 0, 0]},
  {name: "Eadd9", startFret: 1, frets: [0, 2, 4, 1, 0, 0]},
  {name: "Edim", startFret: 1, frets: [0, 1, 2, 0, null, null]},
  {name: "Eaug", startFret: 1, frets: [0, 3, 2, 1, 1, 0]},

  {name: "F", startFret: 1, frets: [1, 3, 3, 2, 1, 1]},
  {name: "Fm", startFret: 1, frets: [1, 3, 3, 1, 1, 1]},
  {name: "F7", startFret: 1, frets: [1, 3, 1, 2, 1, 1]},
  {name: "Fmaj7", startFret: 1, frets: [1, 3, 2, 2, 1, null]},
  {name: "Fsus4", startFret: 1, frets: [1, 3, 3, 3, 1, 1]},
  {name: "Fdim", startFret: 1, frets: [1, 2, 3, 1, null, null]},
  {name: "Faug", startFret: 1, frets: [1, 0, 3, 2, 2, 1]},
  {name: "F/C", startFret: 1, frets: [3, 3, 3, 2, 1, 1]},

  {name: "G", startFret: 1, frets: [3, 2, 0, 0, 0, 3]},
  {name: "Gm", startFret: 3, frets: [3, 5, 5, 3, 3, 3]},
  {name: "G7", startFret: 1, frets: [3, 2, 0, 0, 0, 1]},
  {name: "Gmaj7", startFret: 1, frets: [3, 2, 0, 0, 0, 2]},
  {name: "Gsus4", startFret: 1, frets: [3, 3, 0, 0, 1, 3]},
  {name: "Gdim", startFret: 3, frets: [3, 4, 5, 3, null, null]},
  {name: "Gaug", startFret: 1, frets: [3, 2, 1, 0, 0, 3]},
  {name: "G/B", startFret: 1, frets: [null, 2, 0, 0, 0, 3]},

  {name: "A", startFret: 1, frets: [null, 0, 2, 2, 2, 0]},
  {name: "Am", startFret: 1, frets: [null, 0, 2, 2, 1, 0]},
  {name: "A7", startFret: 1, frets: [null, 0, 2, 0, 2, 0]},
  {name: "Amaj7", startFret: 1, frets: [null, 0, 2, 1, 2, 0]},
  {name: "Asus2", startFret: 1, frets: [null, 0, 2, 2, 0, 0]},
  {name: "Asus4", startFret: 1, frets: [null, 0, 2, 2, 3, 0]},
  {name: "Adim", startFret: 1, frets: [null, 0, 1, 2, 1, null]},
  {name: "Aaug", startFret: 1, frets: [null, 0, 3, 2, 2, 1]},
  {name: "A/C#", startFret: 1, frets: [null, 4, 2, 2, 2, 0]},

  {name: "B", startFret: 2, frets: [null, 2, 4, 4, 4, 2]},
  {name: "Bm", startFret: 2, frets: [null, 2, 4, 4, 3, 2]},
  {name: "B7", startFret: 2, frets: [null, 2, 1, 2, 0, 2]},
  {name: "Bmaj7", startFret: 2, frets: [null, 2, 4, 3, 4, 2]},
  {name: "Bsus2", startFret: 2, frets: [null, 2, 4, 4, 2, 2]},
  {name: "Bsus4", startFret: 2, frets: [null, 2, 4, 4, 5, 2]},
  {name: "Bdim", startFret: 2, frets: [null, 2, 3, 4, 3, null]},
  {name: "Baug", startFret: 2, frets: [null, 2, 1, 0, 0, 3]},
  {name: "B/F#", startFret: 2, frets: [2, 2, 4, 4, 4, 2]},
] as const;
