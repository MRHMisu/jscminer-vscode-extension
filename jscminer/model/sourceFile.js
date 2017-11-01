module.exports.SourceFile=SourceFile;

function SourceFile(fileID, fileName, filePath) {
    this.fileID=fileID;
    this.fileName = fileName;
    this.filePath = filePath;
    this.content="";
    this.setContent = function(content) {
        this.content=content;
    };
    this.getContent = function() {
        return this.content;
    };
    this.getFilePath = function() {
        return this.filePath;
    };
}
