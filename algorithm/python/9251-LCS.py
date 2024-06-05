import sys
sys.setrecursionlimit(10000)


def recall(index1, index2):
    if(index1 < 0):
        return 0
    if(index2 < 0):
        return 0
    if(s1[index1] == s2[index2]):
        if not (tuple([index1-1, index2-1]) in resD):
            resD[tuple([index1-1, index2-1])] = recall(index1-1, index2-1)
        return resD[tuple([index1-1, index2-1])] + 1
    else:
        if not (tuple([index1-1, index2]) in resD):
            resD[tuple([index1-1, index2])] = recall(index1-1, index2)
        if not (tuple([index1, index2-1]) in resD):
            resD[tuple([index1, index2-1])] = recall(index1, index2-1)
        return max(resD[tuple([index1, index2-1])], resD[tuple([index1-1, index2])])


resD = dict()
s1 = input()
s2 = input()


print(recall(len(s1)-1, len(s2)-1))
