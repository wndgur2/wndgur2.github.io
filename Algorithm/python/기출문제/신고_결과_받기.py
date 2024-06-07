def solution(id_list, report, k):
    answer = [0 for _ in range(len(id_list))]
    reported = [[] for _ in range(len(id_list))]
    report = list(set(report))
    for rep in report:
        reporter, t = rep.split()
        reported[id_list.index(t)].append(reporter)
    for r in reported:
        if len(r) >= k:
            for reporter in r:
                answer[id_list.index(reporter)]+=1
    return answer
print(solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], 2))