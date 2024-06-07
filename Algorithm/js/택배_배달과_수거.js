// 1. 갈 때 배달, 올 때 수거.

// 2. 먼 집을 최대한 적게 가도록.
// cap이 3이고 끝 집에 4개를 배달해야하면 2번만에 해결해야한다.
// 1개씩 3번 방문하지 말자는 이야기. 이를 위해서, 우선순위를 먼 집 우선으로 두기.

// 스택으로 해결할 수 있을까?
// 딜리버리, 픽업 스택을 각각 두고, top이 가장 멀리 있는 집이라고 하자.
// 스택의 크기가 가장 먼 집의 거리일 것이고, 이를 꺼낼 때마다 이동거리가 증가한다.
// 한 번 갈 때 두 스택 중 큰 값 x 2 만큼 소모한다.
// 매번 위에있는 0은 걷어내야할 것이다.

function solution(cap, n, deliveries, pickups) {
    var answer = 0;

    while (deliveries[deliveries.length - 1] == 0)
        deliveries.pop();
    while (pickups[pickups.length - 1] == 0)
        pickups.pop();

    while (deliveries.length > 0 || pickups.length > 0) {
        temp_cap = cap;
        answer += deliveries.length > pickups.length ? deliveries.length * 2 : pickups.length * 2;
        while (temp_cap > 0 || deliveries[deliveries.length - 1] == 0) {
            if (deliveries[deliveries.length - 1] <= temp_cap) {
                temp_cap -= deliveries.pop();
            } else if (temp_cap > 0) {
                deliveries[deliveries.length - 1] -= temp_cap;
                temp_cap = 0;
            }
        }
        temp_cap = cap;
        while (temp_cap > 0 || pickups[pickups.length - 1] == 0) {
            if (pickups[pickups.length - 1] <= temp_cap) {
                temp_cap -= pickups.pop();
            } else if (temp_cap > 0) {
                pickups[pickups.length - 1] -= temp_cap;
                temp_cap = 0;
            }
        }
    }
    return answer;
}
console.log(solution(3, 4, [1, 2, 3, 4], [0, 0, 0, 0]));

console.log(solution(6, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]));
console.log(solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0])); 