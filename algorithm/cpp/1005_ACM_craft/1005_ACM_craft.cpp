#include<iostream>
#include<vector>
using namespace std;

struct B{
    int time;
    int enableTime = 0;
    int nPrioritiy = 0; // amount prior Bs
    vector<B*> to;
};

vector<B*> getEnabledBs(vector<B> &Bs){
    vector<B*> result;
    for(int i=0; i<Bs.size(); ++i)
        if(Bs[i].nPrioritiy == 0)
            result.push_back(&Bs[i]);

    return result;
}

int getMinBuildTime(int numNode, int numEdge){
    vector<B> Bs (numNode);
    
    for(int i=0; i<numNode; ++i)
        cin >> Bs[i].time;
    
    int from, to; // from is priority for to
    for(int i=0; i<numEdge; ++i){
        cin >> from >> to;
        Bs[to-1].nPrioritiy++;
        Bs[from-1].to.push_back(&Bs[to-1]);
    }

    int idxFinB;
    cin >> idxFinB;
    B* finalB = &Bs[idxFinB-1];

    // 최소 시간 계산. from의 길이가 0인 B부터
    vector<B*> enabledBs = getEnabledBs(Bs);
    vector<B*> newEnabledBs;

    while(enabledBs.size()){
        newEnabledBs = {};

        for(int i=0; i<enabledBs.size(); ++i){
            B* curB = enabledBs[i];
            if(curB == finalB)
                return finalB->enableTime + finalB->time;
            
            // to 건물들 업데이트.
            for(int j=0; j<curB->to.size(); ++j){
                B* nextB = curB->to[j];
                if(nextB->enableTime < curB->time + curB->enableTime)
                    nextB->enableTime = curB->time + curB->enableTime;
                    
                nextB->nPrioritiy--;
                if(nextB->nPrioritiy == 0)
                    newEnabledBs.push_back(nextB);
            }
        }
        enabledBs = newEnabledBs;
    }
    cout << "finalB에 도달하지 못했습니다." << endl;
    return 0;
}

int main(){
    int numTest, numNode, numEdge;

    cin >> numTest;
    while(numTest--){
        cin >> numNode >> numEdge;
        cout << getMinBuildTime(numNode, numEdge) << endl;
    }
    return 0;
}