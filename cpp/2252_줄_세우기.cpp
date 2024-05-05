#include <iostream>
#define LOG false

struct Node{
    int idx;
    struct Node* next;
};

struct Student{
    int idx;
    int in_degree;
    struct Node* head;
};

void print(struct Student *p1){
    struct Node* temp = p1->head;
    printf("PRINT %d's links.\n", p1->idx);
    while(temp!=NULL){
        printf("%d ", temp->idx);
        temp = temp->next;
    }
    printf("\n");
}

void print(struct Node *p1){
    struct Node* temp = p1->next;
    printf("PRINT QUEUE.\n");
    printf("%d ", p1->idx);
    while(temp!=NULL){
        printf("%d ", temp->idx);
        temp = temp->next;
    }
    printf("\n");
}

void push(struct Student *p1, struct Student *p2){
    p2->in_degree ++;
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->idx = p2->idx;
    newNode->next = p1->head;
    p1->head = newNode;
}

void printReverse(struct Node *answer){
    if(answer->next)
        printReverse(answer->next);
    printf("%d ", answer->idx);
}

void printAnswer(struct Node *answer){
    printReverse(answer);
    printf("\n");
}

void push(struct Node *queue, int newIdx){
    if(queue->idx){ // queue(head)를 newIdx로 대체하고 기존 head를 다음 노드로
        struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->idx = queue->idx;
        newNode->next = queue->next;
        queue->next = newNode;
    }
    queue->idx = newIdx;
}


int pop(struct Student *p1){
    if(p1->head == NULL) return 0;
    int res = p1->head->idx;
    p1->head = p1->head->next;
    return res;
}

int pop(Node *p1){
    if(p1->next == NULL) {
        p1->idx = 0;
        return 0;
    }
    int res = p1->idx;
    p1->idx = p1->next->idx;
    p1->next = p1->next->next;
    return res;
}

int main(){
    int n, m, i, j, p1, p2;
    scanf("%d %d", &n, &m);

    // 초기화
    struct Student *students = (struct Student*)malloc(sizeof(Student) * (n+1));

    for(i=1; i<n+1; i++) {
        students[i].idx = i;
        students[i].in_degree = 0;
    }

    // 링크 설정. p1의 헤드로 p2를 추가 (p1 < p2)
    for(i=0; i<m; i++){
        scanf("%d %d", &p1, &p2);
        push(&students[p1], &students[p2]);
    }

    //각 노드를 돌며 줄세우기
    struct Node *queue = (struct Node*)malloc(sizeof(Node));
    int *visit = (int*)malloc(sizeof(int) * (n+1));
    for(i=0; i<n+1; i++) visit[i] = 0;
    struct Node *answer = (struct Node*)malloc(sizeof(Node));
    int length;
    while(true){
        length = 0;
        // in_degree가 0인 노드들 큐에 추가
        for(i=1; i<n+1; i++){
            if(students[i].in_degree==0 && visit[i] == 0){
                push(queue, i);
                push(answer, students[i].idx);
                length ++;
                visit[i] = 1;
            }
        }
        if(length == 0) break;
        
        // 큐에 있는 노드들을 꺼내서 그 노드들이 가지고 있던 링크 자르기.
        int index = 0;
        for(i=0; i<length; i++){
            index = pop(&students[queue->idx]);
            while(index != 0) {
                students[index].in_degree --;
                index = pop(&students[queue->idx]);
            }
            pop(queue);
        }
        queue = (struct Node*)malloc(sizeof(Node));
    }

    if(LOG) for(i=1; i<n+1; i++) print(&students[i]);
    printAnswer(answer);
    return 0;
}