#include <iostream>
#include <vector>
#include <string>
#include <stack>

using namespace std;

string get_title_name(string full_str){
    bool is_title_name = false;
    string title = "";
    
    for(char a: full_str){
        if(a == '"'){
            if(is_title_name){
                return title;
            } else{
                is_title_name = true;
            }
        } else{
            if(is_title_name){
                title += a;
            }
        }
    }
    return "";
}

int main(){
    stack<string> tags;
    string html;
    bool is_in_tag = false;
    bool is_title_name = false;
    bool is_closing_tag = false;
    string temp_tag_name = "";
    string temp_title_name = "";
    string temp_conten  t = "";

    getline(cin, html);
    for(char a: html){
        if(a == '<'){
            is_in_tag = true;
            continue;
        } else if(a == '>'){
            if(is_closing_tag){
                if(temp_tag_name == "/p"){
                    if (temp_content.back() == ' ')
                        temp_content.pop_back();
                    cout << temp_content << endl;
                    temp_content = "";
                }
                is_closing_tag = false;
                temp_title_name = "";
                if(temp_tag_name == tags.top())
                    tags.pop();
            } else{
                if((temp_tag_name == "p") || (temp_tag_name == "div"))
                    tags.push(temp_tag_name);
                if((!tags.empty()) && (tags.top() == "div"))
                    cout <<"title : " << get_title_name(temp_title_name) << endl;
                is_title_name = false;
            }
            is_in_tag = false;
            temp_tag_name = "";
            continue;
        }

        if(is_in_tag){
            if(a == ' ')
                is_title_name = true;
            else if(a == '/')
                is_closing_tag = true;

            if(is_title_name)
                temp_title_name += a;
            else
                temp_tag_name += a;
        } else{
            if(a == ' '){
                if(temp_content.back() == ' ') continue;
                if(temp_content.size()==0) continue;
            }
            temp_content += a;
        }
    }
    return 0;
}