#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
string str;
int len;

void dfs(string s, int idx) {
	if (idx == len - 1) {
	    printf("%s\n", s.c_str());
		return;
	}
	for (int i = idx; i < len; i++) {
		if (i != idx && s[i] == s[idx])
			continue;
		if(s[i] != s[idx]){
			char c = s[i];
			s[i] = s[idx];
			s[idx] = c;
		}
		dfs(s, idx + 1);
	}
}
int main() {
	int T;
	scanf("%d", &T);
	while (T) {
		cin >> str;
		len = str.size();
		sort(str.begin(), str.end());
		dfs(str, 0);
		T--;
	}
	return 0;
}