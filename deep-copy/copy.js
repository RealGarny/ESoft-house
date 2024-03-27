function deepCopy(obj, seen = new WeakMap()) {
    if (seen.has(obj)) return seen.get(obj);

    let copy;

    if (obj instanceof Date) {
        copy = new Date(obj);
    } else if (obj instanceof Map) {
        copy = new Map(Array.from(obj.entries()));
    } else if (obj instanceof Set) {
        copy = new Set(Array.from(obj.values()));
    } else if (typeof obj === 'object' && obj !== null) {
        copy = Array.isArray(obj) ? [] : {};

        seen.set(obj, copy);

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                copy[prop] = deepCopy(obj[prop], seen);
            }
        }
    } else {
        copy = obj;
    }

    return copy;
}

const testObject = {
    int: 12,
    string: "hello",
    nest: {
        one: "1",
        day: Date.now(),
    },
    array: [1,63,743],
    set: new Set([1,12,54,32])
}

//testObject.loop = testObject;
testObject.date = new Date();
testObject.map = new Map();
testObject.loop = testObject;
testObject.map.set('a', 1);
testObject.map.set('b', 2);
testObject.map.set('c', 3);

let copied = deepCopy(testObject);
copied.map.set('d', 4);
copied.nest.one = '2'
copied.int = 14;
copied.date = new Date(8.64e15);

console.log(testObject)

