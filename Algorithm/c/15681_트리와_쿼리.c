/**
 * 2023.4.15
*/
#include <stdio.h>
#include <stdlib.h>
// 역트리를 만들고
// 위상정렬로 개수 카운트

struct Node_queue{
    int number;
    struct Node_queue *next;
};

struct Node_tree{
    int number;
    int parent;
    int in_degree;
    int visit;
    int size;
};

//큐에 새 노드를 삽입
void push(struct Node_queue *queue, int new_number){
    if(queue->number != 0){ 
        struct Node_queue *new_node = (struct Node_queue*)malloc(sizeof(struct Node_queue));
        new_node->number = queue->number;
        new_node->next = queue->next;
        queue->next = new_node;
    }
    queue->number = new_number;
}

//맨 앞 노드 pop
int pop(struct Node_queue *queue){
    if(queue->number == 0)
        return 0;

    int res = queue->number;
    if(queue->next) {
        queue->number = queue->next->number;
        queue->next = queue->next->next;
    }
    else queue->number = 0;
    return res;
}

int main(){
    int n, r, q, i, j, a, b;
    scanf("%d %d %d", &n, &r, &q);

    // 노드 초기화
    struct Node_queue *links = (struct Node_queue*)malloc(sizeof(struct Node_queue) * (n+1));
    for(i=1; i<n+1; i++){
        links[i].number = 0;
        links[i].next = NULL;
    }

    // 링크 입력
    for(i=0; i<n-1; i++){
        scanf("%d %d", &a, &b);
        push(&links[a], b);
        push(&links[b], a);
    }

    // 역트리 만들기
    struct Node_tree *reversed_tree = (struct Node_tree*)malloc(sizeof(struct Node_tree)*(n+1));
    for(i=1; i<n+1; i++){
        reversed_tree[i].number = i;
        reversed_tree[i].parent = 0;
        reversed_tree[i].in_degree = 0;
        reversed_tree[i].visit = 0;
        reversed_tree[i].size = 1;
    }
    
    struct Node_queue queue = {r, NULL};
    int tempA, tempB;

    while ((tempA = pop(&queue))){
        reversed_tree[tempA].visit = 1;
        while((tempB = pop(&links[tempA]))){
            if(reversed_tree[tempB].visit==0){
                reversed_tree[tempB].parent = tempA;
                reversed_tree[tempA].in_degree++;
                push(&queue, tempB);
            }
        }
    }

    // for(i=1; i<n+1; i++){
    //     printf("\nindegreeof%d: %d\n", i, reversed_tree[i].in_degree);
    // }

    // 위상정렬
    queue.number = 0;
    queue.next = NULL;
    for(i=1; i<n+1; i++){
        if(reversed_tree[i].in_degree == 0){
            push(&queue, i);
        }
    }
    while ((tempA = pop(&queue))){
        tempB = reversed_tree[tempA].parent;
        reversed_tree[tempB].in_degree--;
        reversed_tree[tempB].size += reversed_tree[tempA].size;
        if(reversed_tree[tempB].in_degree == 0) push(&queue, tempB);
    }
    // for(i=1; i<n+1; i++){
    //     printf("\nsizeof%d: %d\n", i, reversed_tree[i].size);
    // }

    for(i=0; i<q; i++){
        scanf("%d", &a);
        printf("%d\n", reversed_tree[a].size);
    }
    return 0;
}