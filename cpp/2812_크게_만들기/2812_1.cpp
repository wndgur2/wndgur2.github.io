#include <iostream>
#include <vector>

using namespace std;

int charsToNumber(vector<char> &numbers){
    string s = "";

    for(char c: numbers)
        s += c;
    cout << "CTN" << endl;
    cout << s << endl;
    return stoi(s);
}

void findMax(int i, int removedN, vector<char> numbers, vector<int> &maxNumbers, int k){
    if(i >= numbers.size()) return;

    if(removedN == k) return;
    findMax(i+1, removedN, numbers, maxNumbers, k);
    vector<char> newNumbers = numbers;
    newNumbers.erase(newNumbers.begin() + i);
    int newNumber = charsToNumber(newNumbers);
    if(maxNumbers[removedN+1] < newNumber){
        maxNumbers[removedN+1] = newNumber;
        findMax(i, removedN+1, newNumbers, maxNumbers, k);
    }
}

int main(){
    int n, k;
    cin >> n >> k;
    vector<char> numbers (n);
    vector<int> maxNumbers (k+1, 0);

    for(int i=0; i<n; ++i)
        cin >> numbers[i];
    
    maxNumbers[0] = charsToNumber(numbers);

    findMax(0, 0, numbers, maxNumbers, k); //! 이거 구현해야함

    cout << maxNumbers[k] << endl;
    return 0;
}