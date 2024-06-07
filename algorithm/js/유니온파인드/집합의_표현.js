const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];

rl.on('line', function (line) {
    lines.push(line)
})
    .on('close', function () {
        solution();
        process.exit();
    });

const solution = () => {
    const [n, m] = lines[0].split(" ");
    const ops = lines.slice(1);

    ops.forEach((string, idx) => {
        ops[idx] = string.split(" ");
    });

    let parents = Array(parseInt(n));
    parents.fill();
    parents.forEach((n, i) => {
        parents[i] = i;
    })

    const getParent = (i) => {
        if (parents[i] == i) return i;
        else {
            parents[i] = getParent(parents[i]);
            return parents[i];
        }
    }

    ops.forEach(([op, a, b]) => {
        if (op === "1") { // 같은 집합인지
            if (getParent(a - 1) == getParent(b - 1)) console.log("YES");
            else console.log("NO");
        } else { // 합집합
            parentA = getParent(parents[a - 1]);
            parentB = getParent(parents[b - 1]);
            if (parentA > parentB) parents[parentA] = parentB;
            else parents[parentB] = parentA;
        }
    })
}