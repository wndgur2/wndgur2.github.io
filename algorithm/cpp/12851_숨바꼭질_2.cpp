#include <iostream>
#include <vector>
#define X 100000
using namespace std;

int main(){
    int i, j;
    int me, goal;
    scanf("%d %d", &me, &goal);

    if(me == goal){
        printf("0\n1\n");
        return 0;
    }

    int states[X];
    
    for(i=0; i<X; i++) states[i] = 0;

    states[me] = 1;
    states[goal] = 2;

    vector<vector<int> > ques(2);
    ques[0].push_back(me);

    int depth = 0;
    int found_goal = 0;
    vector<int> visits;

    while(!(ques[0].empty() && ques[1].empty())){
        while(!ques[depth%2].empty()){

            int before_position = ques[depth%2].back();
            ques[depth%2].pop_back();

            int new_position = before_position - 1;
            if((new_position >= 0) && (states[new_position] != 1)){
                visits.push_back(new_position);
                if(states[new_position] == 2)
                    found_goal += 1;
                else if(found_goal == 0)
                    ques[(depth+1) %2].push_back(new_position);
            }
            
            new_position = before_position + 1;
            if((new_position <= X) && (states[new_position] != 1)){
                visits.push_back(new_position);
                if(states[new_position] == 2)
                    found_goal += 1;
                else if(found_goal == 0)
                    ques[(depth+1) %2].push_back(new_position);
            }

            new_position = before_position *2;
            if((new_position <= X) && (states[new_position] != 1)){
                visits.push_back(new_position);
                if(states[new_position] == 2)
                    found_goal += 1;
                else if(found_goal == 0)
                    ques[(depth+1) %2].push_back(new_position);
            }

            // if(depth >= 25){
            //     for(int visit: visits)
            //     printf("visited %d\n", visit);
            // }
        }
        for(int visit: visits) states[visit] = 1;
        visits.clear();
        depth += 1;
        // printf("\n\ndepth: %d\n\n", depth);
        if(found_goal) break;
    }
    ques.clear();

    printf("%d\n%d\n", depth, found_goal);

    return 0;
}