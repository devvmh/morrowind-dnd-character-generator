export function getStats(answers) {
  const statPreferences = (({ str, dex, con, int, wis, cha }) => ({ str, dex, con, int, wis, cha }))(answers);
  const orderedList = entriesSortedByValue(statPreferences);
  const standardArray = [15, 14, 13, 12, 10, 8];
  const stats = Object.fromEntries(orderedList.map((element, index) => {
    const statName = element[0];
    const value = standardArray[index];
    const modifier = getModifier(value);
    return [statName, {value, modifier}];
  }));
  return stats;
}

export function getClass(answers) {
  const classPreferences = (({ war, wiz, cle, rog }) => ({ war, wiz, cle, rog }))(answers);
  const orderedList = entriesSortedByValue(classPreferences);
  return orderedList[0][0];
}

// e.g. turns { a: 1, b: 2, c: 0 }
// into [['b', 2], ['a', 1], ['c', 0]]
function entriesSortedByValue(obj) {
  return Object.entries(obj).slice().sort((a, b) => b[1] - a[1]);
}

function getModifier(statValue) {
  return Math.floor((statValue - 10) / 2);
}
