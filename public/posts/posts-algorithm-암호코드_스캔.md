
## 1242\_암호코드스캔 2024-05-17-15:00:07

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15JEKKAM8CFAYD)

### #구현 #문자열 #해시

### 문제 요약

문제가 매우 기므로 링크를 참조하시길 바랍니다. (복제는 금지되어있습니다.)

| 입력 예                                            |
| -------------------------------------------------- |
| 2                                                  |
| 16 26                                              |
| 00000000000000000000000000                         |
| 00000000000000000000000000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 000000001DB176C588D26EC000                         |
| 00000000000000000000000000                         |
| 00000000000000000000000000                         |
| 18 50                                              |
| 00000000000000000000000000000000000000000000000000 |
| 00000000000000000000000000000000000000000000000000 |
| 000000000000000000000000000196EBC5A316C57800000000 |
| 000000000000000000000000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000328D1AF6E4C9BB0000000196EBC5A316C57800000000 |
| 000000000000000000000000000196EBC5A316C57800000000 |
| 000000000000000000000000000196EBC5A316C57800000000 |
| 00000000000000000000000000000000000000000000000000 |
| 00000000000000000000000000000000000000000000000000 |

| 출력 예 |
| ------- |
| #1 38   |
| #2 48   |

### 풀이

문자열 처리와 해싱을 통한 구현 문제이다. 시간이 상당히 오래걸렸다.  
원인은 아래 문제였던 것 같다.

-   이런 문제 난이도일 것이라고 생각을 못했다.
-   복잡한 구현을 오랜만에 해서, 최적화할 방법(쉽게 코드로 바꿀 방법)을 잘 떠올리지 못했다.

이진수로 쉽게 변환하는 방법을 배웠다.

```python
    binary = "{:04b}".format(int(hexChar, 16))
```

시간 복잡도는 들어오는 입력 크기에 비례한다.  
$∴ O(H * W)$ ($H$ = 입력 줄 개수, $W$ = 입력 줄 길이)

최악의 경우에는 이렇지만, 입력줄을 set으로 받아 중복을 제거했기에 웬만하면 훨씬 빨리 수행할 것이다.

---

### Code

<!-- CODE-APPENDED:1242_암호코드스캔.py -->
```python
"""

	1242_암호코드스캔 created at 2024-05-17 15:00:07

"""

import sys
sys.stdin = open("input.txt", "r")

decode_map = {"211": 0, "221": 1,"122": 2,"411": 3,"132": 4,"231": 5,"114": 6,"312": 7,"213": 8,"112": 9,}
visited_code = set()

def decode(arr):
    # arr[0], arr[1], arr[2]의 ratio 구하기 (1~4)
    min_value = min(arr)
    key = ""
    for i in range(len(arr)):
        if arr[i]%min_value != 0:
            return -1
        arr[i] = arr[i]/min_value
        key += str(int(arr[i]))
    if key not in decode_map:
        return -1
    return str(decode_map[key])
    
def validateCode(code):
    if code in visited_code:
        return False
    visited_code.add(code)
    oddSum = 0
    evenSum = 0
    isOdd = True
    for i in range(len(code)-1):
        if isOdd:
            oddSum += int(code[i])
        else:
            evenSum += int(code[i])
        isOdd = not isOdd
    auth = (10-(oddSum*3 + evenSum)%10)%10
    return auth==int(code[-1])

for test_case in range(1, int(input()) + 1):
    H, W = map(int, input().strip().split())
    hexData = set()
    for i in range(H):
        hexData.add(input().strip())
    
    binaryData = []
    for hexString in hexData:
        binaryString = ""
        for hexChar in hexString:
            binaryString += "{:04b}".format(int(hexChar, 16))
        binaryString = binaryString.rstrip("0")
        if binaryString:
            binaryString += '0'
            binaryData.append(binaryString)
    
    code_suspects = []
    for binaryString in binaryData:
        code_suspect = ""
        
        before = '0'
        amount = 0
        amounts = []
        for binaryChar in binaryString:
            if binaryChar != before:
                if before!='0' or len(amounts)!=0:
                    amounts.append(amount)
                amount = 0
                before = binaryChar

                if len(amounts) == 3:
                    decode_result = decode(amounts)
                    if decode_result == -1:
                        code_suspect = ""
                    else:
                        code_suspect += decode_result
                    if len(code_suspect) == 8:
                        code_suspects.append(code_suspect)
                        code_suspect = ""
                    amounts = []
                    before = '0' # 다음 암호 찾기 위함
            amount += 1
    result = 0
    for code in code_suspects:
        if validateCode(code):
            result += sum(map(int, list(code)))
    print(f'#{test_case} {result}')
```
