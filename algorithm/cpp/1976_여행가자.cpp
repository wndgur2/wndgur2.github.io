#include <iostream>

using namespace std;

int getParent(int i, int* parents){
    if(i==parents[i]){
        return i;
    } else{
        parents[i] = getParent(parents[i], parents);
        return parents[i];
    }
}

int main(){
    int num_total_cities, num_travel_cities, isLinked, t;
    scanf("%d", &num_total_cities);
    scanf("%d", &num_travel_cities);

    int* parents = (int*)malloc( sizeof(int) * num_total_cities + 1 );
    int* travel_cities = (int*)malloc( sizeof(int) * num_travel_cities + 1);
    for(int i=0; i<num_total_cities; i++){
        parents[i] = i;
    }

    for(int i=0; i<num_total_cities; i++){
        for(int j=0; j<num_total_cities; j++){
            scanf("%d", &isLinked);
            if(isLinked){
                parents[getParent(parents[j], parents)] = getParent(i, parents);

                // for(int i=0; i<num_total_cities; i++){
                //     printf("%d, ", parents[i]);
                // }
                // printf("\n");
            }
        }
    }
    
    for(int i=0; i<num_travel_cities; i++){
        scanf("%d", &t);
        travel_cities[i] = t - 1;
    }

    int p = getParent(travel_cities[0], parents);
    
    for(int i=1; i<num_travel_cities; i++){
        if (getParent(travel_cities[i], parents) != p){
            printf("NO\n");
            return 0;
        }
    }
    
    // for(int i=0; i<num_total_cities; i++){
    //     printf("%d, ", parents[i]);
    // }

    printf("YES\n");
    return 0;
}
// 3
// 3
// 0 1 0
// 1 0 1
// 0 1 0
// 1 2 3