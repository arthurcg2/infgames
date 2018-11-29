$artCred = $('#credit-art'); $iagCred = $('#credit-iag'); $enzCred = $('#credit-enz'); $gabCred = $('#credit-gab');
modal = $('#modal-body');
fb = $('#fb');
inst = $('#inst');
tt = $('#tt');
$artCred.click(function(){
    fb.attr('href', 'https://www.facebook.com/arthur.carvalhoguerra');
    inst.attr('href', 'https://www.instagram.com/arthur_cg2/?hl=pt-br');
    inst.css('display', 'inline-block');
    tt.css('display', 'none');
});
$enzCred.click(function(){
    fb.attr('href', 'https://www.facebook.com/enzo.rodrigues.754570');
    inst.css('display', 'none');
    tt.attr('href', 'https://twitter.com/ZE_ROB3RTO');
    tt.css('display', 'inline-block');
});
$iagCred.click(function(){
    fb.attr('href', 'https://www.facebook.com/iago.gabinogoncalves');
    inst.attr('href', 'https://www.instagram.com/iagogabino/?hl=pt-br');
    inst.css('display', 'inline-block');
    tt.css('display', 'none');
});
$gabCred.click(function(){
    fb.attr('href', 'https://www.facebook.com/gabriel.mazzeu');
    inst.css('display', 'none');
    tt.css('display', 'none');
});