"""

	1242_암호코드스캔 created at 2024-05-17 15:00:07

"""

import sys
sys.stdin = open("input.txt", "r")

directions = [[0,1], [1,0], [0,-1], [-1,0]]

decode_map = {"211": 0, "221": 1,"122": 2,"411": 3,"132": 4,"231": 5,"114": 6,"312": 7,"213": 8,"112": 9,}

def decode(arr):
    # arr[0], arr[1], arr[2]의 ratio 구하기 (1~4)
    min_value = min(arr)
    key = ""
    for i in range(len(arr)):
        if arr[i]%min_value != 0:
            return -1
        arr[i] = arr[i]/min_value
        key += str(int(arr[i]))
    print(key)
    if key not in decode_map:
        return -1
    return str(decode_map[key])
    


for test_case in range(1, int(input()) + 1):
    H, W = map(int, input().split())
    visited = [[False]*W for _ in range(H)]
    data = []
    for i in range(H):
        data.append(list(input()))
    
    suspects = []

    for row in range(H):
        for col in range(W):
            if data[row][col] != '0' and not visited[row][col]: 
                code = ""
                tmp_col = col
                while tmp_col < W and data[row][tmp_col] != '0':
                    code += data[row][tmp_col]
                    tmp_col += 1
                suspects.append(code)

                branches = [[row, col]]
                while branches:
                    y, x = branches.pop()
                    visited[y][x] = True
                    for dy, dx in directions:
                        nextY = y + dy
                        nextX = x + dx
                        if 0 <= nextY < H and 0 <= nextX < W:
                            if data[nextY][nextX] == '0':
                                continue
                            if visited[nextY][nextX]:
                                continue
                            branches.append([nextY, nextX])
    result = 0
    for code in suspects:
        binaryCode = format(int(code, 16),'0>'+str(len(code)*4)+'b')
        
        blue_tmp = 0
        white_tmp = 0
        continuous_amounts = []
        secret_code = ""
        for i in range(len(binaryCode)-1, -1, -1):
            if blue_tmp==0 and binaryCode[i]==0 and continuous_amounts==[]:
                continue
            if binaryCode[i]=='1':
                blue_tmp += 1
                if white_tmp > 0:
                    continuous_amounts.append(white_tmp)
                    white_tmp = 0
            else:
                white_tmp += 1
                if blue_tmp > 0:
                    continuous_amounts.append(blue_tmp)
                    blue_tmp = 0
            if len(continuous_amounts) == 3:
                decoded = decode(continuous_amounts)
                if decoded == -1:
                    break
                secret_code = decoded + secret_code
                continuous_amounts = []
                white_tmp = 0
        print("code: ", secret_code)
        
        # authenticate secret_code
            
        
    print(f'#{test_case}')