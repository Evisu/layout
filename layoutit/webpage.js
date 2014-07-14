/**
 * Created by gc on 2014/7/10.
 */
var webPage = {
    //总记录数
    total:0,
    //总页数
    pageTotal: new Array(),
    //当前页
    curPage: 1,
    start:0,
    //每页最大记录数
    limit:5,
    //初始化方法
    initWebPage :function(opition){
        if( this.total == 0)
            this.total = opition.data.total;

        var j = 0;
        if( this.total % this.limit == 0 )
            j = this.total / this.limit;
        else
            j = this.total / this.limit + 1;

        this.pageTotal.length = 0;
        for(var i = 1;i <= j;i++){
            this.pageTotal.push(i);
        }

    }
};