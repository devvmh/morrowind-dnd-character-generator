export function getStats(answers) {
  const statPreferences = (({ str, dex, con, int, wis, cha }) => ({ str, dex, con, int, wis, cha }))(answers);
  const orderedList = entriesSortedByValue(statPreferences);
  const standardArray = [15, 14, 13, 12, 10, 8];
  const stats = Object.fromEntries(orderedList.map((element, index) => {
    const key = element[0];
    const value = standardArray[index];
    return [key, value];
  }));
  return stats;
}

export function getClass(answers) {
  const classPreferences = (({ war, wiz, cle, rog }) => ({ war, wiz, cle, rog }))(answers);
  const orderedList = entriesSortedByValue(classPreferences);
  const shortName = orderedList[0][0];
  const nameMappings = {
    war: 'Fighter',
    wiz: 'Wizard',
    cle: 'Cleric',
    rog: 'Rogue'
  };
  return nameMappings[shortName];
}

// e.g. turns { a: 1, b: 2, c: 0 }
// into [['b', 2], ['a', 1], ['c', 0]]
function entriesSortedByValue(obj) {
  return Object.entries(obj).slice().sort((a, b) => b[1] - a[1]);
}
