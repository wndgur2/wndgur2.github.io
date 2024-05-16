## 1249_보급로 2024-05-10 14:41:59
### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15QRX6APsCFAYD)

### #BFS

### 문제 요약
가중치가 있는 지도가 주어진다. 4방으로 1칸 씩 이동하여 0, 0에서 N-1, N-1까지 가는 최소 비용을 출력하라.
    

| 입력 예 |
| --- |  
|3|
|4|
|0100|
|1110|
|1011|
|1010|
|6|
|011001|
|010100|
|010011|
|101001|
|010101|
|111010|
|8|
|01333212|
|03121302|
|01220112|
|02003220|
|13323020|
|13010121|
|23120012|
|02322220|

| 출력 예 |
| --- |
|#1 2|
|#2 2|
|#3 8|

### 첫인상
대표적인 가중치를 이용한 백트래킹 문제?

### 실패
재귀호출로 인한 메모리 초과, 탐색 방향으로 인한 시간 초과를 겪었다.

### 풀이   
[반복문 메모이제이션 DFS]  
DFS를 반복문으로 구현해 메모리 초과를 해결했다.  
시간 초과 원인에 대해 고민하다 시간 복잡도를 줄이기보다는 디테일한 문제라고 판단해서, 효율을 최대한 높이려고 했다. 그러다 눈에 밟힌 것이
``` python
# 증가하는 경우
if y<size-1:
    branches.append([y+1, x, cost+cost_map[y+1][x]])
if x<size-1:
    branches.append([y, x+1, cost+cost_map[y][x+1]])
# 감소하는 경우
if y>0:
    branches.append([y-1, x, cost+cost_map[y-1][x]])
if x>0:
    branches.append([y, x-1, cost+cost_map[y][x-1]])
```
DFS의 가지를 뻗는 부분이다. 잘 보면, y와 x가 증가하는 경우를 추가하고, 감소하는 부분을 추가한다.  
여기서 문제는 branches.pop()은 리스트의 마지막 원소를 가져온다는 것.  
```python
while branches:
    y, x, cost = branches.pop() # O(1)
    if (cost < min_stacked_cost_map[y][x]) or (min_stacked_cost_map[y][x]==-1):
        min_stacked_cost_map[y][x] = cost
    else:
        continue
    if (min_stacked_cost_map[size-1][size-1]!=-1) and (cost > min_stacked_cost_map[size-1][size-1]):
        continue
    if (y==size-1) and (x==size-1):
        continue
    if y<size-1:
        branches.append([y+1, x, cost+cost_map[y+1][x]])
    if x<size-1:
        branches.append([y, x+1, cost+cost_map[y][x+1]])
    if y>0:
        branches.append([y-1, x, cost+cost_map[y-1][x]])
    if x>0:
        branches.append([y, x-1, cost+cost_map[y][x-1]])
```

따라서 나는 마지막으로 추가된 x가 감소하는 방향을 먼저 탐색하고, y가 감소하는 방향, x가 증가하는 방향, y가 증가하는 방향 순서로 탐색하고 있었다.

이 append문 순서를 바꿔 시간 초과 문제를 해결했다.

[BFS] 2024-05-13 16:10

친구와 시간복잡도 계산을 하다가 다른 사람들이 제출한 코드의 실행 시간이, 내가 제출한 시간보다 10배 이상 빠른 것을 보고, 풀이를 찾아보았다. 결론은 BFS가 DFS보다 빠르다는 것.

우리가 결론낸 그 원인은 이렇다.
- 문제에 탐색 방향성이 있다. ([0,0]->[n-1,n-1])
- 비용 맵을 그래프로 봤을 때 그래프의 엣지가 주변 노드로 정해져있다. (4방향)
- 따라서 가까운 노드를 먼저 탐색하는 것이 유리하다.

### 시간 복잡도
기본적으로는 각 칸에서 발생하는 가지가 4개이므로 $O(4^{n*n})$이다.  
하지만 메모이제이션으로 비용이 최소가 되는 경로만 유지하기 때문에 그보다 현저히 낮아진다.  

### 회고
생각지 못한 메모리 초과와 시간 초과를 맞아 한 시간을 겨우 안 넘겼다.  
DFS나 BFS나 한 방식으로만 구현해왔던 게 조금 시간을 잡아먹었다. 재귀 호출의 단점도 몰랐다.  
따라서 알고리즘만 안다면, 다양한 방식으로, 장단점을 따져 구현할 줄 알아야겠다.  
(유연한 구현?)  