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