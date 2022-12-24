import outdent from 'outdent';

export function render(stats, klass) {
  const className = renderClassName(klass);
  const { str, dex, con, int, wis, cha } = renderStats(stats);
  const initiative = renderModifier(stats.dex.modifier);
  const health = getHealth(klass, stats.con.modifier);

  return outdent`
    ${outdent}
            <Your Name>, Level 1 Human ${className}
    Str: ${str}        Proficiency: +2
    Dex: ${dex}        Initiative: ${initiative}
    Con: ${con}        Health: ${health} / ${health}
    Int: ${int}        
    Wis: ${wis}
    Cha: ${cha}
  `;
}

function getHealth(klass, conMod) {
  const healthMappings = {
    war: 10,
    cle: 8,
    rog: 8,
    wiz: 6
  };
  return healthMappings[klass] + conMod;
}

function renderModifier(modifier) {
  const symbol = modifier < 0 ? '-' : '+';
  return `${symbol}${Math.abs(modifier)}`;
}

function renderStats(stats) {
  return Object.fromEntries(Object.entries(stats).map(([statName, { value, modifier }]) => {
    const statNumber = `${value}`.padStart(2, ' ');
    const statString = `${statNumber} (${renderModifier(modifier)})`;
    return [statName, statString];
  }));
}

function renderClassName(klass) {
  const nameMappings = {
    war: 'Fighter',
    wiz: 'Wizard',
    cle: 'Cleric',
    rog: 'Rogue'
  };
  return nameMappings[klass];
}
