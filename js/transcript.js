let transcriptData

async function init() {
  let yaml = await fetch('js/transcript.yml').then(r => r.text())
  transcriptData = jsyaml.load(yaml)
}
if (!transcriptData) { init() }

function transcript(path, context = {}, skipArrays = true, depth = 0) {
  if (depth > 10) { console.log('hit recursion depth 10!'); return }
  try {
    const leaf = getDescendantProp(transcriptData, path, skipArrays)
    if (typeof leaf === 'string') {
      return evalInContext('`' + leaf + '`', {...context, t: transcript})
    } else {
      return leaf
    }
  } catch(e) {
    console.error(e)
    return path
  }
}

function evalInContext(js, context) {
  console.log({js, context})
  return function() { return eval(js); }.call(context);
}

function getDescendantProp(obj, desc, skipArrays) {
  const arr = desc.split(".");
  console.log({arr, obj})
  while (arr.length) {
    obj = obj[arr.shift()];
    if (Array.isArray(obj) && skipArrays) {
      obj = obj[Math.floor(Math.random() * obj.length)]
    }
  }
  return obj;
}