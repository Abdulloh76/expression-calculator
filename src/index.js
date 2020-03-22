function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    
    let t=0;
    for (let i in expr) {
        t = expr[i]=='('?t+1:t;
        t = expr[i]==')'?t-1:t;
    } 
    if(t) throw "ExpressionError: Brackets must be paired";
    
    let arr = expr.split(' ');
    while (arr.includes('')) {
		let k=arr.indexOf('');
		arr.splice(k, 1);
    }
    
    let operations = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
	    '(': undefined,
	    ')': undefined
    } , numStack = [], opStack = [], result;

    function operation(str, last2, last1) {
        switch (str) {
            case '+': return last2 + last1;
            case '-': return last2 - last1;
            case '*': return last2 * last1;
            case '/': return last2 / last1;
        }
    }

    let last1, last2, lastOp;

    for (let i in arr) {
        if (!isNaN(arr[i])) {
            arr[i] = +arr[i];
            numStack.push(arr[i]);
        }
        else {
            if (arr[i]==')') {
                while(opStack[opStack.length-1]!='(') {
                    last1 = numStack.pop();
                    last2 = numStack.pop();
                    lastOp = opStack.pop();
                    numStack.push(operation(lastOp, last2, last1));
                }
                opStack.pop();
            }
            else {
                if (operations[opStack[opStack.length-1]] >= operations[arr[i]]) {
                    last1 = numStack.pop();
                    last2 = numStack.pop();
                    lastOp = opStack.pop();
                    numStack.push(operation(lastOp, last2, last1));
                    
                    opStack.push(arr[i]);
                }
                else {
                    opStack.push(arr[i]);
                }
            }
        }
    }

    while(opStack.length) {
		last1=numStack.pop(); 
        last2=numStack.pop();
        lastOp=opStack.pop();
        numStack.push(operation(lastOp, last2, last1));
	}

    if (numStack[0]=='Infinity') throw "TypeError: Division by zero.";
    return numStack[0];
}

module.exports = {
    expressionCalculator
}