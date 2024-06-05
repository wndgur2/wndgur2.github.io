//배열돌리기 6
#include <stdio.h>
#include <vector>
#include <cmath>
#define MAX_LENGTH 128

using namespace std;

int N, R; //배열 크기, 연산 수
int arr[MAX_LENGTH][MAX_LENGTH];

void operate_1(int size) { // size * size마다 상하 반전
    int newArray[MAX_LENGTH][MAX_LENGTH];
    
    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j ++) // x값은 1씩 증가시켜도 될 것이다.
            for(int k = 0; k < size; k++)
                newArray[i + k][j] = arr[i+size-k-1][j];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_2(int size) { // size * size마다 좌우 반전
    int newArray[MAX_LENGTH][MAX_LENGTH];
    
    for(int i = 0; i < pow(2, N); i ++) // y값은 1씩 증가시켜도 될 것이다.
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                newArray[i][j + k] = arr[i][j+size-k-1];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_3(int size) { // size * size마다 오른쪽으로 90도 회전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[i + l][j + size - k - 1] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_4(int size){ // size * size마다 왼쪽으로 90도 회전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[i + size - l - 1][j + k] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_5(int size){ // 부분 배열을 유지한 채 배열 상하 반전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[static_cast<int>(pow(2, N)) - size - i + k][j + l] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_6(int size){ // 부분 배열을 유지한 채 배열 좌우 반전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[i + k][static_cast<int>(pow(2, N)) - size - j + l] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_7(int size){ // 부분 배열을 유지한 채 배열 오른쪽으로 90도 회전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[j + k][static_cast<int>(pow(2, N)) - size - i + l] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

void operate_8(int size){ // 부분 배열을 유지한 채 배열 왼쪽으로 90도 회전
    int newArray[MAX_LENGTH][MAX_LENGTH];

    for(int i = 0; i < pow(2, N); i += size)
        for(int j = 0; j < pow(2, N); j += size)
            for(int k = 0; k < size; k++)
                for(int l = 0; l < size; l++)
                    newArray[static_cast<int>(pow(2, N)) - size - j + k][i + l] = arr[i + k][j + l];
    
    copy(&newArray[0][0], &newArray[0][0] + MAX_LENGTH*MAX_LENGTH, &arr[0][0]);
}

int main(){
    scanf("%d %d", &N, &R);
    for(int i=0; i<pow(2, N); i++)
        for(int j=0; j<pow(2, N); j++)
            scanf("%d", &arr[i][j]);

    for(int i=0; i<R; i++){
        int op, size;
        scanf("%d %d", &op, &size);
        size = pow(2, size);
        switch(op){
            case 1:
                operate_1(size);
                break;
            case 2:
                operate_2(size);
                break;
            case 3:
                operate_3(size);
                break;
            case 4:
                operate_4(size);
                break;
            case 5:
                operate_5(size);
                break;
            case 6:
                operate_6(size);
                break;
            case 7:
                operate_7(size);
                break;
            case 8:
                operate_8(size);
                break;
        }
    }

    for(int i=0; i<pow(2, N); i++){
        for(int j=0; j<pow(2, N); j++)
            printf("%d ", arr[i][j]);
        printf("\n");
    }

    return 0;
}