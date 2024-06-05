#include<iostream>
#include<vector>
#include<string>
using namespace std;


// (100~1~|01)~
int main(){
    int pattern = 0; // 0: none, 1: 100~1~, 2: 01
    int fir_pattern_status = 0; // 0: none, 1: expecting 0(pattern 1), 2: expecting 0, 3: expecting 0 or 1, 4: expecting 1 or 0(new pattern).
    string str;
    cin >> str;
    for(char c : str){
        if(c == '1'){
            switch(pattern){
                case 0:{
                    pattern = 1;
                    fir_pattern_status = 1;
                    break;
                }
                case 1:{
                    switch(fir_pattern_status){
                        case 0:{
                            return noise();
                            break;
                        }
                        case 1:{ // 11
                            return noise();
                            break;
                        }
                        case 2:{ // 101
                            return noise();
                            break;
                        }
                        case 3:{ // 100~1
                            ++fir_pattern_status;
                            break;
                        }
                        case 4:{ // 100~1~
                            //
                            break;
                        }
                        default:{
                            return noise();
                            break;
                        }
                    }
                    break;
                }
                case 2:{
                    break;
                }
                default:{
                    return noise();
                    break;
                }
            }
        } else{ // c == 0
            switch(pattern){
                case 0:{
                    pattern = 2;
                    break;
                }
                case 1:{
                    switch(fir_pattern_status){
                        case 0:{
                            return noise();
                            break;
                        }
                        case 1:{ // 10
                            ++fir_pattern_status;
                            break;
                        }
                        case 2:{ // 100
                            ++fir_pattern_status;
                            break;
                        }
                        case 3:{ // 100~
                            break;
                        }
                        case 4:{ // 100~1~0
                            // new pattern
                            break;
                        }
                        default:{
                            return noise();
                            break;
                        }
                    }
                    break;
                }
                case 2:{
                    break;
                }
                default:{
                    return noise();
                    break;
                }
            }
        }
    }

    cout << "SUBMARINE" << endl;
    return 0;
}

int noise(){
    cout << "NOISE" << endl;
    return 0;
}