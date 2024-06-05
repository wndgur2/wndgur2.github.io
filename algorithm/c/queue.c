/**
 * 2023.4.12
*/

#include <stdio.h>
#include <stdlib.h>

struct Node{
    int number;
    struct Node *next;
};

//큐에 새 노드를 삽입
void push(struct Node *queue, int new_number){
    if(queue->number != 0){
        struct Node *new_node = (struct Node*)malloc(sizeof(struct Node));
        new_node->number = queue->number;
        new_node->next = queue->next;
        queue->next = new_node;
    }
    queue->number = new_number;
}

void print_queue(struct Node *node){
    printf("%d ", node->number);
    if(node->next)
        print_queue(node->next);
}

int pop(struct Node *queue){
    int res;
    if(queue->number == 0)
        return 0;
    res = queue->number;
    if(queue->next) {
        queue->number = queue->next->number;
        queue->next = queue->next->next;
    }
    else queue->number = 0;
    return res;
}

int main(){
    struct Node queue = {0, NULL};
    for(int i=1; i<11; i++){
        push(&queue, i);
        print_queue(&queue);
        printf("\n");
    }
    for(int i=1; i<11; i++){
        pop(&queue);
        print_queue(&queue);
        printf("\n");
    }
}