#include <stdio.h>
#include <stdlib.h>

int *cut(int *arr, int l)
{
  // arr 테스트 출력
  // printf("arr:");
  // for(int i=0; i<l*l; i++)
  //     printf(" %i", arr[i]);
  // printf("\n");
  static int count[] = {0, 0, 0}; // -1, 0, 1의 개수
  if (l == 1) //길이가 1이면
  {
    count[arr[0] + 1]++;
  }
  else
  {
    int t = arr[0];
    int isSame = 1;
    for (int i = 0; i < l * l; i++)
    {
      if (arr[i] != t)
        isSame = 0;
    }
    if (isSame == 1) //종류가 하나이면
    {
      count[t+1]++;
      return count;
    }
    else //길이가 1을 초과하고 종류가 2개 이상이면
    {
      int nl = (int)(l / 3);
      int *tArr = NULL;
      for (int i = 0; i < 3; i++)
      {
        for (int j = 0; j < 3; j++)
        {
          tArr = malloc(sizeof(int) * nl * nl);
          for (int k = 0; k < nl * nl; k++)
          {
            tArr[k] = arr[i * l * nl + j * nl + (int)((int)(k / nl) * l) + k % nl];
          }
          cut(tArr, nl);
          free(tArr);
        }
      }
    }
  }

  return count;
}
int main()
{
  int n;
  scanf("%i", &n);
  int *arr = malloc(sizeof(int) * n * n);
  for (int i = 0; i < n * n; i++)
    scanf("%i", &arr[i]);

  int *ans = cut(arr, n);
  printf("%i\n%i\n%i\n", ans[0], ans[1], ans[2]);
}