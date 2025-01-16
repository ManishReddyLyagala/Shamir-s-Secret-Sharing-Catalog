const fs = require("fs");

const decodeValue = (base, value) => {
    return parseInt(value, base);
};

const lagrangeInterpolation = (points) => {
    const k = points.length;
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        const [x_i, y_i] = points[i];
        let product = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [x_j] = points[j];
                product *= -x_j / (x_i - x_j);
            }
        }

        constantTerm += product;
    }

    return Math.round(constantTerm);
};

const findConstantTerm = (filePath) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { n, k } = data.keys;
    const points = [];

    for (const key in data) {
        if (key !== "keys") {
            const x = parseInt(key);
            const { base, value } = data[key];
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    points.sort((a, b) => a[0] - b[0]);
    const selectedPoints = points.slice(0, k);

    return lagrangeInterpolation(selectedPoints);
};

console.log("Secret (Test Case 1):", findConstantTerm("testcase1.json"));
console.log("Secret (Test Case 2):", findConstantTerm("testcase2.json"));
