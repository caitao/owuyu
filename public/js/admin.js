/**
 * Created by Administrator on 2016/10/31.
 */
// window.jQuery = window.$ = require('jquery');
$(function () {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        console.log(id);
        // $.ajax({
        //     type: 'DELETE',
        //     url: '/admin/list?id=' + id
        // }).done(function(results){
        //       if(results.success === 1){
        //         if(tr.length > 0){
        //             tr.remove();
        //         }
        //       }
        //     });
        $.ajax({
            type: 'DELETE',
            url: '/admin/list/' + id,
            // data: {
            //     id: id
            // },
            success: function(result) {
                if(result.success === 1){
                    $('#' + id).remove();
                }
            }
        });
    });
});