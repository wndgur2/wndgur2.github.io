#include<iostream>
using namespace std;

struct Room{
    int food;
};

int main(){
    Room* a = NULL;
    if(a) cout << "A";
    else cout << "B";
    cout << a;
    return 0;
}