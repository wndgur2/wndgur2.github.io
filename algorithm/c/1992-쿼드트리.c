#include<stdio.h>
#include<stdlib.h>

char* cut(char *arr, int l){
    char* ans = malloc(sizeof(char)*l*l*2);
    char* temp = NULL;
    int ansIdx = 1;
    int i,j,k;
    if(l==1) { //박스(arr)가 하나의 문자면 해당 문자주소 리턴
        ans[0] = arr[0];
        ans[1] = '\n';
        return ans;
    }
    else{ //박스(arr)가 같은 문자로 채워져있는지 확인, 맞으면 박스 주소 리턴
        char t = arr[0];
        int isSame = 1;
        for (int i=0; i<l*l; i++){
            if (arr[i]!=t)
                isSame = 0;
        }
        if(isSame == 1){
            ans[0] = arr[0];
            ans[1] = '\n';
            return ans;
        }

        else{ //박스(arr)가 여러 문자로 채워져있을 경우, 박스를 4등분하여 각 박스에 대해 cut 호출, 리턴 값(char*) 참조하여 ans 뒤에 문자열 복사
            int nl = (int)(l/2);
            char *tArr=NULL;
            for (i=0; i<2; i++){
                for (j=0; j<2; j++){
                    tArr = malloc(sizeof(char)*nl*nl);
                    for (k=0; k<nl*nl; k++){
                        tArr[k] = arr[i*l*nl+j*nl+(int)((int)(k/nl)*l)+k%nl];
                    }
                    temp = cut(tArr,nl);
                    k = 0;
                    while (temp[k]!='\n'){ //ans에 temp append -> while temp[k]!='\n'로 변경
                        ans[ansIdx]=temp[k];
                        ansIdx++;
                        k++;
                    }
                    free(tArr);
                    free(temp);
                }
            }
        }
    }
    //return "(ans)"
    ans[0] = '(';
    ans[ansIdx] = ')';
    ans[ansIdx+1] = '\n';
    return ans;
}
int main(){
    int n, i;
    scanf("%i", &n);
    char *arr = malloc(sizeof(char)*n*n), *ans = malloc(sizeof(char)*n*n*2);
    for (i=0; i<n; i++)
        scanf("%s", &arr[i*n]);

    ans = cut(arr, n);
    printf("%s", ans);
}