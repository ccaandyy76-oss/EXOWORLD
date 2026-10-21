import { configById, hazardInfo, simulatorDisclaimer, statusInfo, type Assessment, type HazardLevel } from "../../data/survivalRules";
import { planets } from "../../data/planets";
import { planetResearch } from "../../data/planetResearch";
import { environments } from "../../data/environments";

const levelText: Record<HazardLevel, string> = {
  none: "NO CONCERN", mitigated: "MITIGATED", partial: "PARTLY MITIGATED", unmitigated: "UNMITIGATED", beyond: "BEYOND DEMONSTRATED ENGINEERING",
};
const levelColor: Record<HazardLevel, string> = {
  none: "#5BE3A0", mitigated: "#64E7FF", partial: "#FFB454", unmitigated: "#FF5D73", beyond: "#C26BFF",
};

export default function SurvivalResult({ a }: { a: Assessment }) {
  const planet = planets.find((p) => p.id === a.planetId)!;
  const cfg = configById[a.configId];
  const st = statusInfo[a.status];
  const needed = a.hazards.filter((x) => x.demand > 0);
  const research = planetResearch[a.planetId];
  const unresolved = a.hazards.filter((x) => x.residual > 0 && !hazardInfo[x.hazard].lifeCritical);

  return (
    <div className="result" aria-live="polite">
      <h3 className="result__title">SURVIVAL ASSESSMENT</h3>
      <p className="result__ctx">{planet.name.toUpperCase()} · CONFIGURATION {cfg.letter}: {cfg.label.toUpperCase()}</p>

      <section className="result__block" style={{ borderColor: st.color }}>
        <h4 className="sub">OVERALL STATUS</h4>
        <p className="result__status" style={{ color: st.color }}><span className="dot" style={{ background: st.color }} aria-hidden /> {st.label}</p>
        <p className="para">{st.summary}</p>
        {a.limitedDuration && a.status !== "baseline" && <p className="overview__note">A suit is limited-duration protection. It is not sustained human habitation.</p>}
      </section>

      <section className="result__block">
        <h4 className="sub">PRIMARY HAZARDS</h4>
        {a.primary.length === 0 ? <p className="para">No major hazards identified for this scenario.</p> : (
          <ul className="hazlist">
            {a.primary.map((x) => (
              <li key={x.hazard}>
                <span className="dot" style={{ background: levelColor[x.level] }} aria-hidden />
                <div><strong>{x.label}</strong> <span className="lvl" style={{ color: levelColor[x.level] }}>{levelText[x.level]}</span>
                  <p className="para">{x.why}{x.uncertain ? " (Knowledge is limited here.)" : ""}</p></div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="result__block">
        <h4 className="sub">REQUIRED EQUIPMENT</h4>
        {needed.length === 0 ? <p className="para">None for typical conditions.</p> : (
          <ul className="equiplist">
            {needed.map((x) => (
              <li key={x.hazard}>
                <span className={x.provided ? "tick tick--ok" : "tick tick--no"}>{x.provided ? "PROVIDED" : "NOT PROVIDED"}</span>
                {" "}<strong>{x.label}:</strong> {x.equipment}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="result__block">
        <h4 className="sub">LONG-TERM HABITATION CHALLENGES</h4>
        <ul className="exp__list">
          {research.humanChallenges.map((c) => <li key={c}>{c}</li>)}
          {unresolved.length > 0 && a.configId !== "none" && <li>Unresolved with this configuration: {unresolved.map((x) => x.label.toLowerCase()).join(", ")}.</li>}
        </ul>
        <p className="overview__note">{environments[a.planetId].humanStatus}</p>
      </section>

      <section className="result__block">
        <h4 className="sub">WHY THIS RESULT?</h4>
        <ul className="exp__list">{a.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
        <table className="why" aria-label="Hazard rule evaluation">
          <thead><tr><th>Hazard</th><th>Needed</th><th>Provided</th><th>Result</th></tr></thead>
          <tbody>
            {a.hazards.map((x) => (
              <tr key={x.hazard}>
                <td>{x.label}{x.uncertain ? " *" : ""}</td>
                <td><Tiers n={x.demand} /></td>
                <td><Tiers n={x.capability} /></td>
                <td style={{ color: levelColor[x.level] }}>{levelText[x.level]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="overview__note">Tiers run 0 (none) to 5 (beyond demonstrated engineering). They are simplified educational rule values, not measurements. * Knowledge is limited.</p>
      </section>

      <p className="disclaimer">{simulatorDisclaimer}</p>
    </div>
  );
}

function Tiers({ n }: { n: number }) {
  return <span className="tiers" aria-label={`tier ${n} of 5`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= n ? "on" : ""} />)}</span>;
}
