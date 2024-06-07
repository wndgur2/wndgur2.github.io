#include <algorithm> 
#include <iostream>
#include <string>

using namespace std;

int main(){
    string str;
    int open_num=0, close_num=0;
    bool more_open = false;
    
    cin >> str;
    for(char a : str){
        if(a=='('){
            ++open_num;
        } else{
            ++close_num;
        }
    }
    
    if(open_num == close_num){ // 개수가 같음.
        cout << 0 << endl;
        return 0;
    }

    if(open_num > close_num){
        open_num=0, close_num=0;
        reverse(str.begin(), str.end()); // 뒤에서부터 보기
        for(char a : str){
            if(a=='(') ++open_num;
            else ++close_num;

            if(open_num > close_num){ // 여는 괄호가 더 많음 -> 무조건 요 뒤에서 여는 괄호 중 하나를 닫아야함
                cout << open_num << endl;
                return 0;
            }
        }
    }
    else if(open_num < close_num){
        open_num=0, close_num=0;
        for(char a : str){
            if(a=='(') ++open_num;
            else ++close_num;

            if(open_num < close_num){// 닫는 괄호가 더 많음 -> 무조건 요 앞에서 닫는 괄호 중 하나를 열어야함
                cout << close_num << endl;
                return 0;
            }
        }
    }

    return 0;
}