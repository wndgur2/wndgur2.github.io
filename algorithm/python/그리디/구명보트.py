import collections

def solution(people, limit):
    answer = 0
    people.sort()
    people = collections.deque(people)
    while people:
        if len(people) == 1:
            answer += 1
            break
        if people[len(people)-1] + people[0] <= limit:
            people.pop()
            people.popleft()
        else:
            people.pop()
        answer += 1
    return answer
