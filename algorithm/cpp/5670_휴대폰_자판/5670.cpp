#include <iostream>
#include <vector>
#include <unordered_map>
#include <iomanip>
#include <cmath>
using namespace std;

// 문자열 해시테이블

struct trie{
    int count = 0;
    unordered_map<char, trie *> dictionary;
};

float result;
void dfs(trie *current){
    for(auto iter: current->dictionary){
        if(iter.second->count != current->count) result +=iter.second->count ;
        dfs(iter.second);
    }
}

int main(){
    ios::sync_with_stdio(0), cin.tie(0);
    cout << setprecision(2) << fixed << showpoint;
    int n, i, j;
    while(cin >> n){
        vector<string> words (n);

        trie *root = new trie();
        trie *current = root;
        root->count = 0;
        root->dictionary.clear();

        for(i=0; i<n; ++i)
            cin >> words[i];
        
        for(string word: words){
            current = root;
            for(char c: word){
                if(current->dictionary.find(c) == current->dictionary.end()){ // 없음
                    current->dictionary[c] = new trie();
                }
                current= current->dictionary[c];
                current->count += 1;
            }
        }

        result = 0;
        dfs(root);
        cout << result/n << endl;
    }

    return 0;
}