function isValid(s) {
    const stack = [];
    const map = {
        "(": ")",
        "[": "]",
        "{": "}"
    };
  
    for (let char of s) {
        if (char in map) {
            stack.push(char);
        } else {
            if (stack.length === 0) {
                return false;
            }
            const lastOpenBracket = stack.pop();
            if (map[lastOpenBracket] !== char) {
                return false;
            }
        }
    }
  
    return stack.length === 0;
  }
  