// get all .md files
console.log("WTF");
const fs = require('fs');
const path = require('path');

const getFiles = (dir, files_) => {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory())
            getFiles(name, files_);
        else if (name.includes('.md')) 
            files_.push(name);
    }
    return files_;
};

const files = getFiles('./');
console.log(files);