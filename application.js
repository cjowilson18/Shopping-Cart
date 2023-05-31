$(document).ready(function () {
    updateCart();
    $(document).on('click', '.btn.remove', function (){
        $(this).closest('tr').remove();
        updateCart();
    });

    var timeout;
    $('tr input').on('input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            updateCart();
        }, 1000);
        updateCart();
    })


    $('#addFood').on('submit', function (event) {
        event.preventDefault();
        var name= $(this).children('[name=name]').val();
        var price= $(this).children('[name=prices]').val();
        var quantities= $(this).children('[name=quantities]').val();
    

        $('tbody').append('<tr>' + '<td class="name">' + name + '</td>' +
        '<td class="prices">' + price + '</td>' +
        '<td class="quantities"><input type="number" value="' + quantities + '" /></td>'+ 
        '<td class="totalCost"></td>' +
        '<td><button class="btn btn-light btn-sm remove">remove</button></td>' + '</tr>');

        updateCart();
        $(this).children('[name=name]').val('');
        $(this).children('[name=prices]').val('');
        $(this).children('[name=quantity]').val('');
    
    })
});

var updateCart = function () {
    var foodTotals = [];
    $('tbody tr').each(function (i, ele) {
        var totalCost = updateTotalCost(ele);
        foodTotals.push(totalCost);
    })

    var grandSum = foodTotals.reduce(sum);
    $("#totalCart").html(grandSum);
}


var updateTotalCost = function (ele) {
    var prices = parseFloat($(ele).children('.prices').text());
    var quantities = parseFloat($(ele).find('.quantities input').val());
    var totalCost = prices * quantities;
    $(ele).children('.totalCost').html(totalCost);
    return totalCost;
}

var sum = function (acc, x) { return acc + x; };
