const scripts = performance
  .getEntries()
  .filter(
    (entry) =>
      entry instanceof PerformanceResourceTiming &&
      entry.initiatorType === 'script',
  );

const parameter = new URLSearchParams(
  scripts[0].name.slice(scripts[0].name.indexOf('?') + 1),
);

const scriptVersion = parameter.get('v');

switch (scriptVersion) {
  case '1':
    console.log('v1');
    break;
  case '2':
    console.log('v2');
    break;
  default:
    console.log('default');
    break;
}
