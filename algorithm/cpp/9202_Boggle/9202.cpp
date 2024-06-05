#include<iostream>
#include<vector>
#include<tuple>

using namespace std;

/*
    제한시간 10초
    메모리 제한 512MB

    보드
        는 모두 4x4
        는 최대 30개

    단어
        의 글자수는 최대 8자
        의 종류는 최대 30만개

    한 단어를 찾을 때 같은 칸 단어 중복 사용 불가. (visits 사용)
    각 보드의 최장 단어, 점수, 찾은 단어의 개수 저장해야함. -> 각 보드에 대한 search 함수: tulple(점수, 최장단어, 개수) 리턴

    1글자, 2글자 0점
    3글자, 4글자 1점
    5글자 2점
    6글자 3점
    7글자 5점
    8글자 11점

    0점짜리도 개수 파악 등을 위해 찾아야함.

    search 작동 방식
        찾을 단어를 지정한다.
        첫 글자를 찾는다.
                찾은 글자를 disable한다.(visit)
                주위에서 다음 글자를 찾는다. 반복.
            주변에 다음 글자가 없다면 찾은 글자들을 enable한다. 반복
    
    cpp 컴파일
    디버그: 최적화x
    릴리즈
*/

vector<pair<int, int>> ds = {{-1, 0}, {-1, 1}, {0, 1}, {1, 1}, {1, 0}, {1, -1}, {0, -1}, {-1, -1}}; //북 동북 동 남동 남 남서 서 북서
int score, amount;

bool dfs(int y, int x, vector<vector<char>> &board, string &word, vector<vector<bool>> &visit, int letter_index, string &longest_word){
    if(letter_index == word.length()) return true;

    for(auto d: ds){
        int new_y = y+d.first;
        int new_x = x+d.second;
        if(new_y<0 || new_y > board.size()-1) continue;
        if(new_x<0 || new_x > board[0].size()-1) continue;
        if(visit[new_y][new_x]) continue;
        if(board[new_y][new_x] != word[letter_index]) continue;
        visit[new_y][new_x] = true;
        if(dfs(new_y, new_x, board, word, visit, letter_index+1, longest_word))
            return true;
        visit[new_y][new_x] = false;
    }

    return false;
}

void searchWord(vector<vector<char>> &board, string &word, string &longest_word){
    // 첫 글자를 찾는다.

    for(int y=0; y<board.size(); ++y){
        for(int x=0; x<board[0].size(); ++x){
            if(board[y][x] == word[0]){
                vector<vector<bool>> visits (4, vector<bool> (4, false));
                visits[y][x] = true;
                bool found = dfs(y, x, board, word, visits, 1, longest_word);
                if(found){
                    if(word.length() > longest_word.length()){
                        longest_word = word;
                    } else if(word.length() == longest_word.length()){
                        if(word.compare(longest_word)<0)
                           longest_word = word;
                    }
                    switch (word.length())
                    {
                        case 3:
                            score += 1;
                            break;
                        case 4:
                            score += 1;
                            break;
                        case 5:
                            score += 2;
                            break;
                        case 6:
                            score += 3;
                            break;
                        case 7:
                            score += 5;
                            break;
                        case 8:
                            score += 11;
                            break;
                        default:
                            break;
                    }
                    ++amount;
                    return;
                }
            }
        }
    }
}

tuple<int, string, int> search(vector<vector<char>> &board, vector<string> &words){
    score = 0, amount = 0;
    string longest_word;
    for(string word:words){
        // 찾을 단어를 지정한다.
        searchWord(board, word, longest_word);
    }

    return make_tuple(score, longest_word, amount);
}


int main(){
    int n_word, n_board, i, j;
    
    // 단어 사전 입력
    cin >> n_word;
    vector<string> words (n_word);
    while(n_word--){
        cin >> words[n_word];
    }
    
    // 보드 입력
    cin >> n_board;
    vector<vector<vector<char>>> boards (n_board, vector<vector<char>> (4, vector<char> (4)));

    for(i=0; i<n_board; ++i){
        for(j=0; j<4; ++j){
            for(int k=0; k<4; ++k)
                cin >> boards[i][j][k];
        }
    }

    // test: 보드 프린트 
    // for(auto board: boards){
    //     for(auto row: board){
    //         for(char letter: row){
    //             cout << letter << " ";
    //         }
    //         cout << endl;
    //     }
    //     cout << endl;
    // }
    
    for(auto board: boards){
        tuple<int, string, int> result;
        result = search(board, words);
        cout << get<0>(result) << ' ' << get<1>(result) << ' ' << get<2>(result)<< endl;
    }

    return 0;
}

/*

    풀이시간: 2시간,
    참고자료: string.compare(), 테스트케이스{
        1
        ABA 

        1
        ABCD
        EFGH
        IJKL
        MNOP
    },
    다른풀이: DP,

*/