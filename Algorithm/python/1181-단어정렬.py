from sys import stdin
n = int(stdin.readline())
wordLength = []
words = []
for i in range(50):
    wordLength.append([])
for i in range(n):
    word = stdin.readline().strip()
    if(not (word in words)):
        words.append(word)
        wordLength[len(word)-1].append(word)
for i in wordLength:
    if(i != []):
        i.sort()
s = ""
for i in wordLength:
    for j in i:
        s += j+'\n'
print(s)
