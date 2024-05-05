'''
    갈 수 있는 경로를 알파벳 순으로 BFS.
    도착 시 배열 리턴.
'''
from collections import deque

def solution(tickets):
    answer = ["ICN"]
    q = deque([("ICN", [])])
    # tickets를 2번째 인자 기준으로 정렬
    tickets.sort(key=lambda x: x[1])
    while q:
        airport, path = q.popleft()
        if len(path) == len(tickets):
            break
        for t in range(len(tickets)):
            if tickets[t][0] == airport:
                if not (t in path):
                    q.append([tickets[t][1], path + [t]])
    for p in path:
        answer.append(tickets[p][1])
    return answer
print(solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]))