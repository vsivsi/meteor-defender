/***************************************************************************
###     Copyright (C) 2015 by Vaughn Iverson
###     vsivsi:defend is free software released under the MIT/X11 license.
###     See included LICENSE file for details.
***************************************************************************/

Tinytest.add('Defender -- Smoke test', function (test) {
  Meteor.setTimeout = function () {
    var timeOut = Meteor.setTimeout;
    return function (f, d) {
      return timeOut(f, d);
    };
  }();
  test.throws(function () { Defender.check(true); });
});
