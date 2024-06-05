#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int i, front=0, back=0, n;//back은 마지막 +1, front는 시작
    scanf("%i", &n);
    getchar();
    int *que= malloc(sizeof(int*)*n);
    char *cmd = malloc(sizeof(char*)*12);
    char *token, *t;
    for (i=0; i<n; i++){
        fgets(cmd, sizeof(char*)*12, stdin);
        if(strcmp(cmd, "pop\n")==0){
            if(back-front==0)
                printf("-1\n");
            else{
                printf("%i\n", que[front]);
                front ++;
            }
        }
        else if(strcmp(cmd, "size\n")==0){
            printf("%i\n", back-front);
        }
        else if(strcmp(cmd, "empty\n")==0){
            if(back-front==0)
                printf("1\n");
            else
                printf("0\n");
        }
        else if(strcmp(cmd, "front\n")==0){
            if(back-front==0)
                printf("-1\n");
            else
                printf("%i\n",que[front]);
        }
        else if(strcmp(cmd, "back\n")==0){
            if(back-front==0)
                printf("-1\n");
            else
                printf("%i\n", que[back-1]);
        }
        else{
            token = strtok(cmd, " ");
            while ((t =strtok(NULL, " ")) != NULL) token = t;
            que[back]=atoi(token);
            back++;
        }
    }
}