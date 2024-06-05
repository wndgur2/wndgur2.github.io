#include <iostream>
#define LOG true

struct Building{ 
    int number;
    int time_to_build;
    int max_time_to_build;
    int in_degree;
    bool visit;
    struct Node *head;
};

struct Node{ // 연결 리스트
    int number;
    struct Node *next;
};

void push(struct Building *b1, struct Building *b2){ // b2를 보고 노드를 만들어서 b1의 연결리스트에 insert
    struct Node *n = (struct Node*)malloc(sizeof(struct Node));
    n->number = b2->number;
    n->next = b1->head;
    b1->head = n;
}

void cutLinks(struct Building *buildings, Node *node, int max_time_to_build){
    if(node==NULL) return;
    int new_time_to_build = buildings[node->number - 1].time_to_build + max_time_to_build;
    if(buildings[node->number - 1].max_time_to_build < new_time_to_build){
        buildings[node->number - 1].max_time_to_build = new_time_to_build;
    }
    buildings[node->number - 1].in_degree --;
    if(node->next)
        cutLinks(buildings, node->next, max_time_to_build);
}

int main(){
    int n, i, required = 0;
    scanf("%d", &n);
    struct Building *buildings = (struct Building*)malloc(sizeof(struct Building)*n);
    // 선행조건 연결
    for(i=0; i<n; i++){ 
        // 초기화
        buildings[i].number = i+1;
        buildings[i].in_degree = 0;
        buildings[i].visit = false;
        scanf("%d", &buildings[i].time_to_build);
        buildings[i].max_time_to_build = buildings[i].time_to_build;
        scanf("%d", &required);
        while(required != -1){
            buildings[i].in_degree++;
            push(&buildings[required-1], &buildings[i]);
            scanf("%d", &required);
        }
    }
    // 건설 시간 계산. 위상정렬을 이용해 자기 ttb 건네주기.
    int *queue = (int*)malloc(sizeof(int)*n);
    int left=0, right=0;
    while(true){
        queue = (int*)malloc(sizeof(int)*n);
        for(i=0; i<n; i++){ // in_degree==0인 빌딩 찾기
            if(!buildings[i].in_degree && !buildings[i].visit){
                queue[right++] = i;
                buildings[i].visit=true;
            }
        }
        if(right==left) break;
        // 링크 자르면서 ttb 건네주기
        for(i=left; i<right; i++){
            cutLinks(buildings, buildings[queue[i]].head, buildings[queue[i]].max_time_to_build);
        }
        left = right;
    }
    for(i=0; i<n; i++) printf("%d\n", buildings[i].max_time_to_build);
    return 0;
}