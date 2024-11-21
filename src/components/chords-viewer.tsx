import React from "react";

import { Chord } from "@/interface/chord";
import { ChordDiagram } from "./chord-diagram";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {
  chords: Chord[];
}
const ChordsViewer = ({ chords }: Props) => {
  return (
    <div className="fixed right-20 top-[10%]">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Chords</CardTitle>
          <CardDescription>A resume of your chords.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-2 gap-4 max-h-[45vh] overflow-auto">
            {chords.map(chord => (
              <ChordDiagram key={chord} chordName={chord} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChordsViewer;
