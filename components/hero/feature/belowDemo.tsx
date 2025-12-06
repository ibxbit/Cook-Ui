import { LinesPatternCard, LinesPatternCardBody } from "./below";


export function LinesPatternCardDemo() {
  return (
    <LinesPatternCard>
      <LinesPatternCardBody>
        <h3 className="text-lg font-bold mb-1 text-foreground">
          Diagonal Lines Pattern
        </h3>
        <p className="text-wrap text-sm text-foreground/60">
          A modern pattern featuring diagonal lines in a repeating grid. 
          Creates a sense of movement and depth while maintaining a clean, 
          minimalist aesthetic.
        </p>
      </LinesPatternCardBody>
    </LinesPatternCard>
  )
}