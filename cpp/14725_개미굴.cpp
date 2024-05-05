#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

struct Room{
    string food;
    vector<Room> children;
};

Room* addChild(Room* parent, string food){
    parent->children.push_back({food, {}});
    return &parent->children.back();
}

Room* getChild(Room* parent, string food){
    for(int k=0; k<parent->children.size(); ++k)
        if(parent->children[k].food == food)
            return &parent->children[k];
    return NULL;
}

bool compare(Room a, Room b){
    return (a.food < b.food);
}

void DFS(Room& currentRoom, int depth){
    if(depth > 0){
        for(int i=0; i<depth-1; ++i)
            cout << "--";
        cout << currentRoom.food << '\n';
    }

    sort(currentRoom.children.begin(), currentRoom.children.end(), compare);
    for(int i=0; i<currentRoom.children.size(); ++i)
        DFS(currentRoom.children[i], depth+1);
}

int main(){
    Room root = {"root", {}};

    int N, depth;
    cin >> N;
    for(int i=0; i<N; ++i){
        cin >> depth;
        string food;
        Room* parent = &root;
        Room* child;
        for(int j=0; j<depth; ++j){
            cin >> food;
            child = getChild(parent, food);
            if(child) parent = child;
            else parent = addChild(parent, food);
        }
    }

    DFS(root, 0);
    return 0;
}