qA = [[1, 0], [2,2]]
qB = []
q = [qA, qB]
qI = 0
res = 3000000
while q != [[],[]]:
  for j in q[qI%2]:
    print(j)
    for node, l in j:
      print(node, l)