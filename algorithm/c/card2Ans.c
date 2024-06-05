#include <stdio.h>
int main()
{
    int n;
    int deck[1000005];
    int front,tail;
    
    for (int j=1; j<50; j++){
        n = j;
        front=0, tail=0;
        for(int i=1;i<=n;i++){
            deck[front]=i;
            front++;
        }
        while(front-tail!=1){
            tail++;
            int tmp=deck[tail];
            tail++;
            deck[front]=tmp;
            front++;
        }
        printf("%i: %i ",j, deck[tail]);
    }
}