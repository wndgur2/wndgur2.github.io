#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main()
{
    
    // 123         st=0 gap=1
    //  2          st=1

    // 12345
    //  4 2        st=1


    
    // 123456      st=0 gap=1
    //  2 4 6      st=1 gap=2
    //    4        st=3
    
    // 1234567     st=0 gap=1
    //  2 4 6      st=3 gap=2
    //      6      st=5
    
    // 12345678    st=0 gap=1
    //  2 4 6 8    st=1 gap=2
    //    4   8    st=3 gap=4
    //        8    st=7
    
    // 123456789   st=0 gap=1
    //  2 4 6 8    st=3 gap=2
    //  2   6      st=5 gap=4
    //  2          st=1
    
    // 12345678910 st=0 gap=1
    //  2 4 6 8 10 st=1 gap=2
    //    4   8    st=7 gap=4
    //    4        st=3
    
    // 1 2 3 4 5 6 7 8 9 101112131415 st=0 gap=1
    //   2   4   6   8   10  12  14   st=3 gap=2
    //           6       10      14   st=9 gap=4
    //                           14   st=13
    
    // 1~20
    // 2~20 st=1 gap=2
    // 4 8 12 16 20 st=3 gap=4 len=5
    //   8    16    st=15 gap=8 len=2
    //   8 st=7

    //todo add front, end


    // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 st=0 gap=1
    //   2   4   6   8   10    12    14    16    18    20    st=3 gap=2
    //   2       6       10          14          18          st=5 gap=4   6 10 14 18 2
    //                   10                      18          st=17 gap=8
    //                   10                                  st=9 n should be 18, n should be 16
    // ans=10 output = 6
    
    //if its odd first card goes last.
    //else stay
    int n,i,left,gap=1,st=0,t,end;
    scanf("%i", &n);
    int *deck = malloc(sizeof(int*)*n);
    left=n;end=n-1;

    for(i=0;i<n;i++) deck[i]=i+1;
    //20 5 4
    while (left>1){
        printf("len: %i st: %i gap: %i n: %i\n", left,st,gap,n);
        t = st;
        st+=gap;  //25 has t
        st%=end;
        gap*=2;   //16
        if(left/2==1) break;
        if(left%2==1) {
            st += gap;
            if((n-t-1)%gap==0) n-=gap/2;
        }
        st%=end;
        left=(int)((float)left/2);
    }
    printf("ans: %i st: %i gap: %i n: %i\n", deck[st],st,gap,n);
}