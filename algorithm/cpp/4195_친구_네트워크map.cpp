#include <iostream>
#include <cstring>
#include <string>
#include <unordered_map>

using namespace std;

int* parents = (int*)malloc( sizeof(int) * 200000 + 1 );
int* amount = (int*)malloc( sizeof(int) * 200000 + 1 );
int* depth = (int*)malloc( sizeof(int) * 200000 + 1 );

int indx = 0;
unordered_map<string, int> people;

int getParent(int i, int* parents){
    // printf("PARENT");
    if(i==parents[i]){
        return i;
    } else{
        parents[i] = getParent(parents[i], parents);
        return parents[i];
    }
}

int main(){
    int T, n_relations;
    int i, j, k, pA, pB;
    char *a = (char*)malloc( sizeof(char) * 20 + 1);
    char *b = (char*)malloc( sizeof(char) * 20 + 1);
    long idx_a, idx_b;

    scanf("%d", &T);

    for(i=0; i<T; i++){
        scanf("%d", &n_relations);
        people.clear();

        for(j=0; j<n_relations; j++){
            scanf("%s %s", a, b);
            if(!people.count(a)){
                amount[indx] = 1;
                parents[indx] = indx;
                depth[indx] = 1;
                people[a] = indx++;
            }
            if(!people.count(b)){
                amount[indx] = 1;
                parents[indx] = indx;
                depth[indx] = 1;
                people[b] = indx++;
            }
            pA = getParent(people[a], parents);
            pB = getParent(people[b], parents);
            if(pA != pB){
                if(depth[pA] > depth[pB]){ // B를 A에
                    parents[pB] = pA;
                    amount[pA] += amount[pB];
                } else{
                    if(depth[pA] == depth[pB]) depth[pB] += 1;
                    parents[pA] = pB;
                    amount[pB] += amount[pA];
                }
            }
            printf("%d\n", amount[getParent(pA, parents)]);
        }
    }
    return 0;
}