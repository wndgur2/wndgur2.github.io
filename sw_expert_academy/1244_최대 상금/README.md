## 1244_최대 상금 2024-05-09 20:22:56

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15Khn6AN0CFAYD)

### 문제 요약

    최대 6자리 수 중 두개의 자리를 최대 10번 교환하여 만들 수 있는 가장 큰 수를 구하시오.
<style>
  th, td{
    background-color: #424242;
    color: white;
  }
  th:last-child, td:last-child {
    background-color: #aaa;
    color: black;
  }
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" colspan="2">입력 예</th>
    <th class="tg-0pky" colspan="1">출력 예</th>
  </tr>
  <tr>
    <th class="tg-0pky">수</th>
    <th class="tg-0pky">교환 횟수</th>
    <th class="tg-0pky">가장 큰 수</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">423</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">432</td>
  </tr>
  <tr>
    <td class="tg-0pky">32886</td>
    <td class="tg-0pky">3</td>
    <td class="tg-0pky">88632</td>
  </tr>
</tbody>
</table>

### 첫인상
    이전에 비슷한 문제를 푼 기억이 있으나, 풀이가 기억나지는 않는다.  

    6개의 수 중에 교환할 두 수를 중복하여 최대 10번을 고르는 경우의 수는 15^10이므로 시간 내에 불가능할 것이다.

### 문제 풀이

    [실패]  
    규칙을 찾아 직접 구현할 수 있을 것 같았다. 하지만 예시를 만들어보다가, 동일한 최고 숫자가 여러개 있을 경우 구현하기에 점점 복잡해지는 것을 발견.

    적은 경우의 수를 탐색하는 방법을 고민. 중복된 조합을 제거하면 최대 6자리이므로 10^6개의 경우의 수만 나올 것임을 깨달음.

<br/>

    [성공]
    dfs하며 각 depth마다 따로 중복 검사를 하여 통과했다. python의 set를 활용해 중복 검사를 상수 시간에 해결했다.

### 실패 원인
    문제를 얕잡아보았다. 같은 난이도를 너무 쉽게 풀었었다. 항상 어려워질 가능성을 열어두어야겠다.