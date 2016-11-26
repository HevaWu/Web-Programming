(function ($) {
    // Let's start writing AJAX calls!
    var noteList = $("#note-list");
    var noteListItems = $("#list-item");
    
    noteListItems.each(function(){
        var itemDate = $(this).attr("data-dueDate").split("-");
        var standardDate = itemDate[1]+" "+itemDate[0]+" "+itemDate[2];
       standardDate = new Date(standardDate).getTime();
       $(this).attr("data-dueDate", standardDate);
    });

    noteListItems.sort(function(a,b){
        a = parseFloat($(a).attr("data-dueDate"));
        b = parseFloat($(b).attr("data-dueDate"));
        return a>b ? -1 : a<b ? 1 : 0;
    }).each(function(){
        noteList.prepend(this);
    });

})(window.jQuery);