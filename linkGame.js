var linkList = [
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}],
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}],
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}],
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}],
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}],
    [{line:0,value:1},{line:1,value:1},{line:2,value:1},{line:3,value:1},{line:4,value:1},{line:5,value:1}]
];
addList();
function addList () {
    for(let i = 0;i < linkList.length; i++){
        //console.log(i)
        for(let j = 0;j < linkList[i].length; j++){
            //console.log(j)
            let id = rnd(0,5);
            $("#row"+ i).append(
                "<td id='line"+ j +"'><div class='div"+ id +"' onClick='clickLink("+ i + ","+ j + ","+ id + ")'></div></td>"
            );
        }
    }
}
function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}
//判断是否能相连
var isFirst = 1;
var firstLink;
var secondLink;
function clickLink (i,j,id) {
    console.log(i,j,id)
    if(isFirst){
        isFirst = 0;
        firstLink = {row:i,line:j,id:id};
    }else{
        secondLink = {row:i,line:j,id:id};
        isLink(firstLink,secondLink);
    }
}
// 判断能否相连
function isLink (first,second) {
    // 判断位置
    let startRow,endRow,startLine,endLine,isDelete = 1;
    if(first.row < second.row){
        startRow = first.row;
        endRow = second.row;
    }else{
        startRow = second.row;
        endRow = first.row;
    }
    if(first.line < second.line){
        startLine = first.line;
        endLine = second.line;
    }else{
        startLine = second.line;
        endLine = first.line;
    }
    // 同行
    if(startRow == endRow){
        // 判断是否在边框
        if(startRow == 0 || startRow == linkList[0].length-1){
            // 判断是否
            if(isDelete){
                canDelete(first,second);
            }
            return;
        }
        // 在表格内
        // 上方
        for(let i=startLine;i<endLine+1;i++) {
            if ($("#row" + startRow - 1).find("#line" + i).children().length > 0) {
                isDelete = 0;
            }
            // 判断是否
            if (isDelete) {
                canDelete(first, second);
                return;
            }
        }
        // 下方
        for(let i=startLine;i<endLine+1;i++){
            if($("#row"+ startRow+1).find("#line"+ i).children().length > 0){
                isDelete = 0;
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }
        // 相邻
        if(startLine === endLine-1){
            canDelete(first,second)
        }else{
            for(let i = startLine+1;i<endLine;i++){
                if($("#row"+ startRow).find("#line"+ i).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
            }
        }
    }
    // 同列
    if(startLine == endLine){
        // 判断左右侧是否有方格
        // 在边框
        if(startLine == 0 || startLine == linkList[0].length-1){
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }
        // 在表格内
        // 左侧
        for(let i=startRow;i<endRow+1;i++) {
            if ($("#row" + i).find("#line" + startLine - 1).children().length > 0) {
                isDelete = 0;
            }
            // 判断是否
            if (isDelete) {
                canDelete(first, second);
                return;
            }
        }
        // 右侧
        for(let i=startRow;i<endRow+1;i++){
            if($("#row"+ i).find("#line"+ startLine+1).children().length > 0){
                isDelete = 0;
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }

        // 相邻
        if(startRow === endRow-1){
            canDelete(first,second)
        }else{
            // 不相邻
            for(let i= startRow+1;i<endRow;i++){
                if($("#row"+ i).find("#line"+ startLine).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
            }
        }
    }
    // 不同行也不同列
    if(startRow != endRow && startLine != endLine){
        /**
         * 在相邻行/列,但不为对角线
         */
        // 在相邻行
        if(startRow == endRow-1){
            for(let i = startLine+1;i<endLine+1;i++){
                if($("#row"+ startRow).find("#line"+ i).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
            for(let i = startLine;i<endLine;i++){
                if($("#row"+ endRow).find("#line"+ i).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }

        // 在相邻列
        if(startLine == endLine-1){
            for(let i = startRow+1;i<endRow+1;i++){
                if($("#row"+ i).find("#line"+ startLine).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
            for(let i = startRow;i<endRow;i++){
                if($("#row"+ i).find("#line"+ endLine).children().length > 0){
                    isDelete = 0;
                }
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }

        /**
         * 为对角线
         */
        if(startRow === endRow-1 && startLine === endLine-1){
            if($("#row"+ startRow).find("#line"+ startLine).children().length < 1){
                isDelete = 1;
            }
            if($("#row"+ startRow).find("#line"+ endLine).children().length < 1){
                isDelete = 1;
            }
            if($("#row"+ endRow).find("#line"+ startLine).children().length < 1){
                isDelete = 1;
            }
            if($("#row"+ endRow).find("#line"+ endLine).children().length < 1){
                isDelete = 1;
            }
            // 判断是否
            if(isDelete){
                canDelete(first,second);
                return;
            }
        }

        /**
         * 不在相邻行或列
         */
        /**
         *  一个在边框
         */
        // 在左边框
        //if(startLine === 0){
        //    for(let i=startLine;i<endLine;i++){
        //        if($("#row"+ startRow).find("#line"+ i).children().length > 0){
        //            isDelete = 0;
        //        }
        //        if($("#row"+ endRow).find("#line"+ i).children().length > 0){
        //            isDelete = 0;
        //        }
        //    }
        //    // 判断是否
        //    if(isDelete){
        //        canDelete(first,second);
        //        return;
        //    }
        //}
        //// 在右边框
        //if(endLine === linkList[0].length-1){
        //    for(let i=startLine+1;i<endLine+1;i++){
        //        if($("#row"+ startRow).find("#line"+ i).children().length > 0){
        //            isDelete = 0;
        //        }
        //        if($("#row"+ endRow).find("#line"+ i).children().length > 0){
        //            isDelete = 0;
        //        }
        //    }
        //    // 判断是否
        //    if(isDelete){
        //        canDelete(first,second);
        //        return;
        //    }
        //}
        //// 在上边框
        //if(startRow === 0){
        //    for(let i=startRow;i<endRow;i++){
        //        if($("#row"+ i).find("#line"+ startLine).children().length > 0){
        //            isDelete = 0;
        //        }
        //        if($("#row"+ i).find("#line"+ endLine).children().length > 0){
        //            isDelete = 0;
        //        }
        //    }
        //    // 判断是否
        //    if(isDelete){
        //        canDelete(first,second);
        //        return;
        //    }
        //}
        //// 在下边框
        //if(endRow === linkList.length-1){
        //    for(let i=startRow+1;i<endRow+1;i++){
        //        if($("#row"+ i).find("#line"+ startLine).children().length > 0){
        //            isDelete = 0;
        //        }
        //        if($("#row"+ i).find("#line"+ endLine).children().length > 0){
        //            isDelete = 0;
        //        }
        //    }
        //    // 判断是否
        //    if(isDelete){
        //        canDelete(first,second);
        //        return;
        //    }
        //}

        // 不为对角线,判断中间是否有方格
        for(let i=startRow-1;i<endRow;i++){
            for(let j=startLine-1;j<endLine;j++){
                if($("#row"+ i).find("#line"+ j).children().length > 0){
                    isDelete = 0;
                }
            }
        }
        // 判断是否
        if(isDelete){
            canDelete(first,second);
        }
    }

}
// 判断是否能消除
function canDelete (first,second) {
    if(first.row === second.row && first.line === second.line){
        isFirst = 1;
        return;
    }
    if(first.id == second.id){
        // 消除框内元素
        $("#row"+ first.row).find("#line"+ first.line).empty();
        $("#row"+ second.row).find("#line"+ second.line).empty();
    }else{
        alert("请重新选择");
    }
    isFirst = 1;
}