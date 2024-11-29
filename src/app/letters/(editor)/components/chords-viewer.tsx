import React from "react";

import { Chord } from "@/interface/chord";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { ChordDiagram } from "./chord-diagram";

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
          <div className="grid max-h-[45vh] grid-flow-row grid-cols-2 gap-4 overflow-auto">
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
