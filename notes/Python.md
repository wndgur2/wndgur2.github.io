---
category: Study
title: Python
date_started: 2024.06.14
tags: Python
---
# 파이썬 정리 2024-06-07-11:42:36
## 리스트
### slicing, iterating
```python
temp_list = ['a', 'b', 'c'] # 빈 배열 생성
print(temp_list[0:2]) # ['a', 'b']
print(temp_list[2:0:-1]) # ['c', 'b']
```

## 문자열

### join

```python
temp_list = ["a", "b", "c"]
res = '|'.join(temp_list) # 구분자 '|'
print(res) # a|b|c

temp_string = "abc"
res = '|'.join(temp_string)
print(res) # a|b|c
```