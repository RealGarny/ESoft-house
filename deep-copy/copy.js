
const deepCopy = (obj, seen=[]) => {
    if (typeof(obj) !== "object") return obj;
    if (seen.length === 0) seen.push(obj);

    let value;
    let temp = Array.isArray(obj) ? [] : {};
    
    for(const key in obj) {
        value = obj[key];

        if(obj[key].constructor.name !== "Object") {
            temp[key] = value;
        } else {
            for(let i = 0; i < seen.length; i++)
            {
                if(seen[i] === value)
                {
                    return seen[i];
                }
            }
            temp[key] = deepCopy(value);
            seen.push(temp[key]);
        }
    }
    return temp;
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

