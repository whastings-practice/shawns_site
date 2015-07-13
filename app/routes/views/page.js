import co from 'co';
import fs from 'fs';
import keystone from 'keystone';
import RSVP from 'rsvp';

var Page = keystone.list('Page'),
    stat = RSVP.denodeify(fs.stat);

var VIEW_DIR = `${keystone.get('module root')}/templates/views`;

export default function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals,
      params = req.params,
      permalink = params.pageId,
      data = locals.data = {};

  if (!permalink) {
    permalink = 'home';
  }

  // Load current page.
  view.on('init', function(next) {
    co(function*() {
      var page;

      try {
        page = yield Page.model.findOne({permalink}).exec();
      } catch (err) {
        next(err);
      }

      data.page = page;
      next();
    });
  });

  stat(`${VIEW_DIR}/${permalink}.hbs`)
    .then(() => view.render(permalink), () => view.render('page'));
}
