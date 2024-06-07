// 조립관계를 트리로 나타내면, 루트는 완제품이 된다.
// 위상정렬 후 앞에부터 하나씩 pop해서 기본 부품의 개수를 셀 수 있을 것.

#include <iostream>
struct Node{
    int number;
    int amount;
    Node *next;
};

struct Component{
    int in_degree;
    int amount;
    bool is_base;
    bool visit;
    Node *head;
};

// Component에 새로운 Node를 추가한다.
void push(struct Component *component, int part_number, int amount){
    struct Node *newPart = (struct Node*)malloc(sizeof(Node));
    newPart->number = part_number;
    newPart->amount = amount;
    if(component->head) newPart->next = component->head;
    component->head = newPart;
}

// Component의 head Node를 pop한다. 해당 Node를 리턴한다.
struct Node *popNode(struct Component *component){
    if(component->head){
        struct Node *res = (struct Node*)malloc(sizeof(struct Node));
        res = component->head;
        component->head = res->next;
        return res;
    }
    return NULL;
}

int main(){
    int n, m, i, j, component_number, part_number, amount;
    scanf("%d", &n); 
    struct Component *components = (struct Component*)malloc(sizeof(struct Component)*n);
    //부품 초기화
    for(i=0; i<n; i++){
        components[i].in_degree = 0;
        components[i].amount = 0;
        components[i].visit = false;
        components[i].is_base = true;
    }

    // 완제품은 무조건 1개 존재.
    components[n-1].amount = 1;

    scanf("%d", &m);
    // 선행 부품 생성 (push Node on Component)
    for(i=0; i<m; i++){
        scanf("%d %d %d", &component_number, &part_number, &amount);
        components[component_number-1].is_base = false;
        push(&components[component_number-1], part_number, amount);
        components[part_number-1].in_degree++;
    }
    bool changed = true;
    struct Node *temp = (struct Node*)malloc(sizeof(struct Node));
    while(changed){
        changed = false;
        for(i=0; i<n; i++){
            if((components[i].in_degree==0) && (!components[i].visit)){
                temp = popNode(&components[i]);
                while (temp!=NULL){
                    changed = true;
                    components[temp->number-1].amount += temp->amount * components[i].amount;
                    components[temp->number-1].in_degree --;
                    temp = popNode(&components[i]);
                }
                components[i].visit = true;
            }
        }
    }
    for(i=0; i<n; i++) {if(components[i].is_base) printf("%d %d\n", i+1, components[i].amount);}
}