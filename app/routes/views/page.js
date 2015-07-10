import co from 'co';
import keystone from 'keystone';

var Page = keystone.list('Page');

export default function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals,
      params = req.params,
      data = locals.data = {};

  // Load current page.
  view.on('init', function(next) {
    co(function*() {
      var page;

      try {
        page = yield Page.model.findOne({permalink: params.pageId}).exec();
      } catch (err) {
        next(err);
      }

      data.page = page;
      next();
    });
  });

  view.render('page');
}
