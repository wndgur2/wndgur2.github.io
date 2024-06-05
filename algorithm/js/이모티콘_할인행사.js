// 1. 이모티콘 플러스 가입자를 최대로 늘린다.
// 2. 판매액을 최대로 늘린다.

// 할인율은 10, 20, 30, 40중에 하나
// 이모티콘 플러스 가입자가 최대가 되면서 판매액이 최대가 되는 할인율..
// emoticons 길이가 7까지이니까 4^7 *100으로 할만하다? 4 16 64 256 1024 4096 16000

function solution(users, emoticons) {
    const addResult = (discounts) => {
        newAnswer = [0, 0];
        users.forEach(user => {
            totalCost = 0;
            [discountToBuy, costToSubscribePlus] = user;
            emoticons.forEach((cost, index) => {
                if (discounts[index] >= discountToBuy)
                    totalCost += cost * (100 - discounts[index]) / 100;
            });
            if (totalCost >= costToSubscribePlus)
                newAnswer[0] += 1;
            else
                newAnswer[1] += totalCost;
        });
        if (newAnswer[0] > answer[0])
            answer = newAnswer;
        else if (newAnswer[0] == answer[0])
            if (newAnswer[1] > answer[1])
                answer = newAnswer;
        // console.log(newAnswer, answer);
    }

    const discountSearch = (i, discounts) => {
        addResult(discounts);

        if (i < discounts.length - 1)
            discountSearch(i + 1, discounts.slice());
        else if (i > discounts.length - 1)
            return;

        if (discounts[i] < 40) {
            discounts[i] += 10;
            discountSearch(i, discounts.slice());
        }
    }

    var answer = [0, 0];
    discounts = new Array(emoticons.length);
    discounts.fill(10);
    discountSearch(0, discounts);

    return answer;
}
// console.log(solution([[40, 10000], [25, 10000]], [7000, 9000]));