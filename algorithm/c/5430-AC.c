#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int T, front, back, reversed, n, i, j, err;
    char c='c';
    char *bf=NULL, *token=NULL, *t=NULL;
    int *arr=NULL;
    char *func = malloc(sizeof(char*)*100001);

    scanf("%i", &T);
    fflush(stdin);
    for(i=0;i<T;i++){
        front=0; reversed=0; err=0;
        fgets(func, sizeof(char*)*100001, stdin);
        fflush(stdin);

        scanf("%i", &n);
        fflush(stdin);
        
        back = n-1;
        bf = malloc(sizeof(char*)*(2+n*2));
        arr = malloc(sizeof(int*)*n);
        
        fgets(bf, sizeof(char*)*(2+n*2), stdin);
        fflush(stdin);
        bf[0]=',';
        j=-1;
        token = strtok(bf, ",");
        while( token != NULL ) {
            if(j>=0)
                arr[j]=atoi(t);
            t = token;
            j++;
            token = strtok(NULL, ",");
        }
        arr[n-1]=atoi(t);

        j=0;
        c=func[j];
        while (c!='\n'){
            if(c=='R') reversed++;
            else if(c=='D'){
                if(back-front>=0){
                    if(reversed%2==0) front++;
                    else back--;
                }
                else{
                    printf("error\n");
                    err=1;
                    break;
                }
            }
            j++;
            c=func[j];
        }

        if(err != 1){
            if(back >= front){
                printf("[");
                if(reversed%2==0){
                    for(j=front; j<back; j++) printf("%i,",arr[j]);
                    printf("%i]\n", arr[back]);
                }
                else{
                    for(j=back; j>front; j--) printf("%i,",arr[j]);
                    printf("%i]\n", arr[front]);
                }
            }
            else printf("[]\n");
        }
    }
    free(bf);
    free(func);
    free(arr);
}