#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct node{
    struct node *prev;
    int value;
    struct node *next;
};

int main(){
    int n, i, t, size=0, pushN;
    struct node *front=NULL, *back=NULL, *tNode=NULL;
    char *buffer = malloc(sizeof(char*)*19);
    char *token = malloc(sizeof(char*)*10);
    if(buffer==NULL){
        printf("Allocation error.");
        return 1;
    }
    if(token==NULL){
        printf("Allocation error.");
        return 1;
    }
    scanf("%i", &n);
    getchar();
    for (i=0; i<n; i++){
        fgets(buffer, sizeof(char*)*19, stdin);
        if(strcmp(buffer, "pop_front\n")==0){
            if(front==NULL)
                printf("-1\n");
            else{
                size--;
                printf("%i\n", front->value);
                tNode = front;
                if(front->next!=NULL){
                    front=front->next;
                    front->prev = NULL;
                }
                else {
                    front = NULL;
                    back=NULL;
                }
                free(tNode);
            }
        }
        else if(strcmp(buffer, "pop_back\n")==0){
            if(back==NULL)
                printf("-1\n");
            else{
                size--;
                printf("%i\n", back->value);
                tNode = back;
                if(back->prev!=NULL) {
                    back=back->prev;
                    back->next=NULL;
                }
                else {
                    back = NULL;
                    front=NULL;
                }
                free(tNode);
            }
        }
        else if(strcmp(buffer, "size\n")==0){
            printf("%i\n", size);
        }
        else if(strcmp(buffer, "empty\n")==0){
            if(size==0) printf("1\n");
            else        printf("0\n");
        }
        else if(strcmp(buffer, "front\n")==0){
            if(back==NULL)  printf("-1\n");
            else            printf("%i\n", front->value);
        }
        else if(strcmp(buffer, "back\n")==0){
            if(back==NULL) printf("-1\n");
            else           printf("%i\n", back->value);
        }
        else{
            size++;
            buffer = strtok(buffer, " ");
            pushN = atoi(strtok(NULL, " "));
            struct node* newNode = NULL;
            newNode = malloc(sizeof(struct node));
            if(newNode==NULL){
                printf("Allocation error.");
                return 1;
            }
            newNode->value = pushN;
            if(strcmp(buffer, "push_front")==0){
                newNode->next = front;
                newNode->prev = NULL;
                if(front != NULL) front->prev = newNode;
                front = newNode;
                if(back == NULL) back = front;
            }
            else if(strcmp(buffer, "push_back") == 0){
                newNode->prev = back;
                newNode->next = NULL;
                if(back != NULL) back->next = newNode;
                back = newNode;
                if(front == NULL) front = back;
            }
        }
    }
    while(front!=NULL){
        free(front);
        front=front->next;
    }
    free(buffer);
    free(token);
}