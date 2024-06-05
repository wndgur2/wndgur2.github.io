#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

/**
 * 2023.10.14 20:55
*/

int main(){
    string s;
    vector<string> ss;
    
    cin >> s;
    ss.push_back(s);
    int length = s.size(), i, len = length;

    while(len-->1){
        string tmp = "";
        for(i=length-len; i<length; ++i)
            tmp += s[i];
        ss.push_back(tmp);
    }
    sort(ss.begin(), ss.end());
    for(string a: ss)
        cout << a << endl;

    return 0;
}