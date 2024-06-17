---
category: Algorithm
title: 공통 조상
site: SWEA
number: 1248
date_started: 2024.05.16
tags: 트리, Python
---
## 1248_공통조상 2024-05-16-13:06:38
### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15PTkqAPYCFAYD)

### #트리

### 문제 요약
이진 트리가 주어진다. 주어진 두 정점의 가장 가까운 공통 조상을 구하고, 공통 조상을 루트로 하는 서브트리의 크기를 구하라.
    

| 입력 예 |
| --- |  
|10|
|13 12 8 13|
|1 2 1 3 2 4 3 5 3 6 4 7 7 12 5 9 5 8 6 11 6 10 11 13|

| 출력 예 |
| --- |
|#1 3 8|
|#2 1 10|

### 풀이   

트리를 dictionary를 이용해 구현했다. parent 노드는 하나, children은 여럿이므로 각각 다른 dictionary에서 관리했다.  

a, b의 공통 조상은 a의 부모를 따라가며 a의 모든 조상을 구하고 이를 set에 보관했다.(set의 find 시간 복잡도 O(1)이므로)
그다음 b의 조상을 따라가며 set에 있는지 확인했다.  

그렇게 찾은 공통 조상을 루트로 하는 서브트리 크기는, children dictionary를 따라가며 DFS 완전탐색했다.

$∴ O(V)$ ($V$=amount of vertexes)
