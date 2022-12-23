import outdent from 'outdent';

export function render(stats, klass) {
  const { str, dex, con, int, wis, cha } = renderStats(stats);

  return outdent`
    ${outdent}
            <Your Name>, Level 1 Human ${klass}
    Str: ${str}        Proficiency: +2
    Dex: ${dex}        Initiative: +2
    Con: ${con}        Health: 6 / 6
    Int: ${int}        
    Wis: ${wis}
    Cha: ${cha}
  `;
}

function renderStats(stats) {
  return Object.fromEntries(Object.entries(stats).map(([statName, statValue]) => {
    const modifier = Math.floor((statValue-10)/2);
    const statNumber = `${statValue}`.padStart(2, ' ');
    const symbol = modifier < 0 ? '-' : '+';
    const statString = `${statNumber} (${symbol}${Math.abs(modifier)})`;
    return [statName, statString];
  }));
}
