#include <iostream>
#include <vector>

using namespace std;

int main(){
    string s = "";
    vector<char> numbers = {'1', '2', '3'};

    for(char c: numbers){
        s += c;
    }

    cout << stoi(s) + 5 << endl;

    return 0;
}