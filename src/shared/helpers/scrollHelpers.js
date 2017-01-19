export function synchDrawerLocationWithContentLocation(ref) {
  const offset = $(ref).offset() || {};
  const top = offset.top;
  // $(ref).pushpin({ top });

  // TODO: Tidy up jQuery selectors, use `closest()` for perf.
  $(window).scroll(() => {
    $('.side-nav li').removeClass('active');
    $('.side-nav li .collapsible-body').css('display', 'none');
    $('.side-nav li .collapsible-body ul li a').parent().removeClass('active');

    const activeAnchor = $('.side-nav li .collapsible-body ul li .active').first();
    activeAnchor.parent().parent().parent().parent().addClass('active');
    activeAnchor.parent().parent().parent().css('display', 'block');
    activeAnchor.parent().addClass('active');

    window.location.hash = '';
  });
}
