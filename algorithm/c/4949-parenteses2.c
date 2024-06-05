#include <stdio.h>
#include <stdlib.h>

int main(void){
    int n, prsP;
    char *newS = malloc(sizeof(char*)*101);
    int *prs = malloc(sizeof(int*)*101);
    while(1){
        prsP=0;
        fgets(newS, sizeof(char*)*101, stdin);
        if(newS[0]=='.')
            break;
        for (int j=0; j<101; j++){
            if(newS[j] == '('){
                prs[prsP] = 1;
                prsP++;
            }
            else if(newS[j] == '['){
                prs[prsP] = 2;
                prsP ++;
            }
            else if(newS[j] == ')'){
                if(prsP == 0){
                    printf("no\n");
                    break;
                }
                else if(prs[prsP-1]==1){
                    prsP--;
                }
                else{
                    printf("no\n");
                    break;
                }
            }
            else if(newS[j] == ']'){
                if(prsP == 0){
                    printf("no\n");
                    break;
                }
                else if(prs[prsP-1]==2){
                    prsP--;
                }
                else{
                    printf("no\n");
                    break;
                }

            }
            else if(newS[j] == '.'){
                if(prsP==0){
                    printf("yes\n");
                    break;
                }
                else{
                    printf("no\n");
                    break;
                }
            }
        }
    }
    free(prs);
    free(newS);
}