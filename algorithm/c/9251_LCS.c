/**
 * 2023.4.4
*/

#include <stdio.h>
// 두 문자열의 최대 공통 수열의 길이를 구하는 프로그램
int main(){
    char strA[1000], strB[1000];
    int i, j, len1, len2, LCS[1001][1001];
    scanf("%s", strA);
    scanf("%s", strB);
    for(i=0; strA[i]!='\0'; i++);
    len1 = i;
    for(i=0; strB[i]!='\0'; i++);
    len2 = i;
    for(i=0; i<=len1; i++)
        LCS[i][0] = 0;
    for(i=0; i<=len2; i++)
        LCS[0][i] = 0;
    for(i=1; i<=len1; i++){
        for(j=1; j<=len2; j++){
            if(strA[i-1] == strB[j-1])
                LCS[i][j] = LCS[i-1][j-1] + 1;
            else if(LCS[i-1][j] >= LCS[i][j-1])
                LCS[i][j] = LCS[i-1][j];
            else
                LCS[i][j] = LCS[i][j-1];
        }
    }
    printf("%d\n", LCS[len1][len2]);
}