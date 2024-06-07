#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

/*
    - O가 X보다 많으면 invalid
    - X가 O보다 2개 이상 많으면 invalid
    - 빙고가 2개 이상 있으면 invalid (* X의 쌍삼 빙고 제외)
    - 빙고가 없고, 빈 칸이 있으면 invalid
    - X가 빙고를 했는데 O의 개수가 X의 개수와 같으면 invalid
    - O가 빙고를 했는데 X의 개수가 O의 개수와 다르면 invalid

    XXX
    XOO
    XOO

    XOX
    OXO
    XOX
*/

vector<int> getBingo(char letter, string board){
    // board에 있는 letter의 빙고 개수
    vector<int> result;

    // 가로 빙고
    int tmp=0;
    for(int i=0; i<3; ++i){ // 행
        for(int j=0; j<3; ++j){ // 열
            if(board[i*3 + j] != letter) break;
            if(j==2) ++tmp;
        }
    }
    result.push_back(tmp);

    tmp = 0;
    // 세로 빙고
    for(int i=0; i<3; ++i){ // 열
        for(int j=0; j<3; ++j){ // 행
            if(board[j*3 + i] != letter) break;
            if(j==2) ++tmp;
        }
    }
    result.push_back(tmp);

    tmp = 0;
    // 대각선(우하) 빙고
    for(int i=0; i<3; ++i){
        if(board[i*3 + i] != letter) break;
        if(i==2) ++tmp;
    }
    result.push_back(tmp);

    tmp = 0;
    // 대각선(우상) 빙고
    for(int i=0; i<3; ++i){
        if(board[(2-i)*3 + i] != letter) break;
        if(i==2) ++tmp;
    }
    result.push_back(tmp);

    return result;
}

bool getIsXX(string board, vector<int> bingosX){
    bool isBingo = false;
    for(int i=0; i<4; ++i){
        if(bingosX[i] > 0){
            if(isBingo) return true;
            else isBingo = true;
        }
    }
    return false;
}

bool getIsValid(string inpt){

    int countX = count(inpt.begin(), inpt.end(), 'X');
    int countO = count(inpt.begin(), inpt.end(), 'O');
    bool isFull = inpt.find('.') == string::npos;
    vector<int> bingosX = getBingo('X', inpt);
    vector<int> bingosO = getBingo('O', inpt);
    int bingoX=0, bingoO=0;
    bool isXX = getIsXX(inpt, bingosX);

    for(int i=0; i<4; ++i){
        bingoX += bingosX[i];
        bingoO += bingosO[i];
    }

    // cout << countX << endl;
    // cout << countO << endl;
    // cout << bingoX << endl;
    // cout << bingoO << endl;
    // cout << isFull << endl;
    // cout << isXX << endl;

    if(countO > countX) return false;
    if(countX-countO > 1) return false;
    if(bingoX + bingoO > 1)
        if(bingoX!=2 || bingoO!=0 || !isXX) // X자 쌍삼 빙고
            return false;
    if(bingoX+bingoO == 0 && !isFull) return false;
    if(bingoX==1 && countX == countO) return false;
    if(bingoO==1 && countX != countO) return false;

    return true;
}

int main(){
    string inpt;
    cin >> inpt;
    while(inpt != "end"){
        string result = getIsValid(inpt)? "valid": "invalid";
        cout << result << "\n";
        cin >> inpt;
    }
    return 0;
}