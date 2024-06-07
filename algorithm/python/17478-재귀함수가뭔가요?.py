str1 = '"재귀함수가 뭔가요?"'
str2 = '"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.'
str2_2 = '마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.'
str2_3 = '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."'
str3 = '라고 답변하였지.'
ans = '"재귀함수는 자기 자신을 호출하는 함수라네"'

n = int(input())

def ask(rec):
  print('____' * (n-rec) + str1)
  if(rec==0):
    print('____' * (n-rec) + ans)
    print('____' * (n-rec) + str3)
    return 0
  print('____' * (n-rec) + str2)
  print('____' * (n-rec) + str2_2)
  print('____' * (n-rec) + str2_3)
  ask(rec-1)
  print('____' * (n-rec) + str3)

print("어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.")
ask(n)