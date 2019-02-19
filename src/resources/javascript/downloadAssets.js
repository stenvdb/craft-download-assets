(function (window) {

  if (!window.Craft || !window.jQuery) {
    return false;
  }

  Craft.DownloadAssetsPlugin = {
    init: function() {
      var fields = $('.field .input .elementselect .element:not(.linked)[data-type*="Asset"]').each(function () {
        var $this = $(this);
        console.log($this.attr('data-type'));
        var $a = $('<a></a>')
          .attr('target', '_blank')
          .attr('href', $this.data('url'))
          .attr('title', 'Download')
          .addClass('download')
          .addClass('sharebtn')
          .addClass('icons')
        $a.insertBefore($this.find('.elementthumb'));
        $this.addClass('linked');
      });
    }
  };
} (window));
