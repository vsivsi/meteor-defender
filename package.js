/***************************************************************************
###     Copyright (C) 2015 by Vaughn Iverson
###     vsivsi:defend is free software released under the MIT/X11 license.
###     See included LICENSE file for details.
***************************************************************************/

var currentVersion = '0.0.1';

Package.describe({
  summary: 'Package to check for changes to standard Meteor system functions',
  name: 'vsivsi:defender',
  version: currentVersion,
  git: 'https://github.com/vsivsi/meteor-defender.git'
});

Package.onUse(function(api) {
  api.export('Defender');
  api.add_files(['defend.js'], ['server','client']);
});

Package.onTest(function (api) {
  api.use('vsivsi:defender@' + currentVersion, ['server', 'client']);
  api.use('tinytest@1.0.5', ['server', 'client']);
  api.add_files('defend-tests.js', ['server', 'client']);
});
