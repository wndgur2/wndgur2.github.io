// 1. 대상 수를 이진수화한다.
// 2. 이진화된 수가 포화트리가능개수(1,3,7,15,...)이고 가운데값이 1이 될 때까지 앞에 0을 붙인다. 101 -> 00101
// 3. 만들어진 이진수를, 알낳기(?) 알고리즘으로 생성가능한지 판단하여 result에 추가한다.

const toBinary = (decimal) => {
    let binary = "";
    while (decimal > 0) {
        if (decimal & 1) {
            binary = "1" + binary;
        } else {
            binary = "0" + binary;
        }
        decimal = decimal >> 1;
    }
    return binary;
}

const logTwoBased = (x) => {
    return Math.log(x) / Math.log(2);
}

const toOddBinary = (binary) => {
    binaryTree = binary;
    while (logTwoBased(binaryTree.length + 1) % 1 != 0 || binaryTree[parseInt(binaryTree.length / 2)] == 0) {
        if (binaryTree.length > 3 && binaryTree.slice(0, parseInt(binaryTree.length / 2)).search("1") == -1)
            return 0;
        binaryTree = "0" + binaryTree;
    }
    return binaryTree;
}

const getPossibleToTree = (binary, parent, d) => {
    if (binary == "") return 1;
    let mid = parseInt(binary.length / 2);
    let left = binary.repeat(1).slice(0, mid);
    let right = binary.repeat(1).slice(mid + 1, parseInt(binary.length));
    if (binary[mid] === "1") {
        if (parent == 0) return 0;
        return getPossibleToTree(left, 1, d + 1) && getPossibleToTree(right, 1, d + 1);
    } else {
        return getPossibleToTree(left, 0, d + 1) && getPossibleToTree(right, 0, d + 1);
    }
}

function solution(numbers) {
    var answer = [];
    numbers.forEach((n) => {
        binary = toOddBinary(toBinary(n));
        // console.log("A: ", n, binary);
        if (binary) answer.push(getPossibleToTree(binary, 1, 0));
        else answer.push(0);
    });
    return answer;
}

// else
//     console.log("1");
// console.log(solution([95]));
console.log(solution([7, 42, 5, 63, 111, 95, 15]));
