#include <iostream>
#include <string>
#include <vector>

using namespace std;

string solution(vector<string> survey, vector<int> choices) {
    vector<int> scores(4, 0);
    // RT CF JM AN
    string answer = "";
    
    for(int i=0; i<survey.size(); i++){
        if(survey[i].find("R")!=string::npos){
            if(survey[i][0]=='R'){
                scores[0]+=choices[i]-4;
            } else{
                scores[0]-=choices[i]-4;
            }
        }
        else if (survey[i].find("C")!=string::npos){
            if(survey[i][0]=='C'){
                scores[1]+=choices[i]-4;
            } else{
                scores[1]-=choices[i]-4;
            }
        }
        else if (survey[i].find("J")!=string::npos){
            if(survey[i][0]=='J'){
                scores[2]+=choices[i]-4;
            } else{
                scores[2]-=choices[i]-4;
            }
        }
        else {
            if(survey[i][0]=='A'){
                scores[3]+=choices[i]-4;
            } else{
                scores[3]-=choices[i]-4;
            }
        }
    }
    if(scores[0]<=0){
        answer += "R";
    } else{
        answer += "T";
    }
    if(scores[1]<=0){
        answer += "C";
    } else{
        answer += "F";
    }
    if(scores[2]<=0){
        answer += "J";
    } else{
        answer += "M";
    }
    if(scores[3]<=0){
        answer += "A";
    } else{
        answer += "N";
    }
    return answer;
}


int main(){
    vector<string> in1({"AN", "CF", "MJ", "RT", "NA"});
    vector<int> in2({5, 3, 2, 7, 5});
    string a = solution(in1, in2);
    cout << a << endl;
}