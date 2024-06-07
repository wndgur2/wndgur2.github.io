#include <stdio.h>
#include <string.h>

int main()
{
    int n, t, j;
    char command[10];
    scanf("%i", &n);
    int stack[n];
    for (int i = 0; i < n; i++)
    {
        stack[i] = 0;
    }
    for (int i = 0; i < n; i++)
    {
        stack[i] = 0;
    }
    int i = 0;
    while (i < n)
    {
        int top = 0;
        scanf("%s", command);
        if (strcmp(command, "pop") == 0)
        {
            for (j = 0; j < n; j++)
            {
                if (stack[j] == 0)
                {
                    if (top == 0)
                    {
                        printf("-1\n");
                    }
                    else
                    {
                        stack[j - 1] = 0;
                        printf("%i\n", top);
                    }
                    break;
                }
                top = stack[j];
            }
        }
        else if (strcmp(command, "size") == 0)
        {
            for (j = 0; j < n; j++)
            {
                if (stack[j] == 0)
                {
                    printf("%i\n", j);
                    break;
                }
            }
        }
        else if (strcmp(command, "empty") == 0)
        {
            if (stack[0] == 0)
            {
                printf("1\n");
            }
            else
            {
                printf("0\n");
            }
        }
        else if (strcmp(command, "top") == 0)
        {
            for (j = 0; j < n; j++)
            {
                if (stack[j] == 0)
                {
                    if (top == 0)
                    {
                        printf("-1\n");
                    }
                    else
                    {
                        printf("%i\n", top);
                    }
                    break;
                }
                top = stack[j];
            }
        }
        else if (strcmp(command, "push") == 0)
        {
            scanf("%i", &t);
            for (j = 0; j < n; j++)
            {
                if (stack[j] == 0)
                {
                    stack[j] = t;
                    break;
                }
            }
        }
        i++;
    }
    return 0;
}