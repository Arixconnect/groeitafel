import { Code2, Lightbulb, MessagesSquare, Sparkles } from "lucide-react";
export function EveningArt({
  type,
  small = false,
}: {
  type: string;
  small?: boolean;
}) {
  return (
    <div
      className={`evening-art ${type === "Workshopavond" ? "peach" : type === "Vibe code avond" ? "lime" : "lavender"} ${small ? "small" : ""}`}
      aria-hidden="true"
    >
      {type === "Workshopavond" ? (
        <>
          <div className="art-paper">
            <Lightbulb size={38} />
            <i />
            <i />
          </div>
          <span className="art-spark">✳</span>
          <div className="art-pencil" />
        </>
      ) : type === "Vibe code avond" ? (
        <>
          <div className="art-window">
            <div className="window-dots">•••</div>
            <Code2 size={58} />
            <span>een idee wordt iets.</span>
          </div>
          <Sparkles className="floating" size={40} />
        </>
      ) : (
        <>
          <div className="speech one">ik zoek…</div>
          <div className="speech two">ik bied!</div>
          <MessagesSquare className="floating" size={40} />
        </>
      )}
    </div>
  );
}
export function ProductArt({ type }: { type: string }) {
  return (
    <div
      className={`product-art ${type}`}
      aria-label="Conceptillustratie van product"
    >
      <div className="mockup">
        {type === "bag" && <div className="bag-handles" />}
        <span className="mockup-star">✳</span>
        <b>
          de
          <br />
          groeitafel<span>.</span>
        </b>
        <small>
          {type === "notebook"
            ? "ruimte voor ideeën"
            : type === "cards"
              ? "een goed gesprek begint hier"
              : type === "ticket"
                ? "schuif aan."
                : "neem je ideeën mee."}
        </small>
      </div>
      <span className="concept-label">CONCEPTILLUSTRATIE</span>
    </div>
  );
}
