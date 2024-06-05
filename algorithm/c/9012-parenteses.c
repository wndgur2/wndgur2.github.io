#include <stdio.h>
#include <stdlib.h>

int main(void){
    int n;
    char *newS = malloc(sizeof(char*)*51);
    scanf("%i", &n);
    for (int i=0; i<n; i++){
        int openP = 0;
        // for (int j=0; j<51; j++){
        //     newS[j] = 0;
        // }
        scanf("%s", newS);
        for (int j=0; j<51; j++){
            if(newS[j]=='(')
                openP ++;
            else if(newS[j]==')'){
                if(openP==0){
                    printf("NO\n");
                    break;
                }
                else
                    openP--;
            }
            else{
                if(openP==0)
                    printf("YES\n");
                else
                    printf("NO\n");
                break;
            }
        }
    }
}