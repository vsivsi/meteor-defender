/***************************************************************************
###     Copyright (C) 2015 by Vaughn Iverson
###     vsivsi:defender is free software released under the MIT/X11 license.
###     See included LICENSE file for details.
***************************************************************************/

  // Updated for Meteor 1.1.0.2

  var defenseState = {
    // These are global objects with member functions
    Meteor: {},
    Match: {},
    DDP: {},
    Mongo: {},
    Session: {},
    Accounts: {},
    Template: {},
    Blaze: {},
    Tracker: {},
    EJSON: {},
    HTTP: {},
    Email: {},
    Assets: {},
    // These are global functions
    ReactiveVar: null,
    check: null
  };

  // Save the current state of Meteor functions
  for (var key in defenseState) {
    var val = null
    try {
      val = eval(key);
    } catch (e) {
      // console.log("Missing", key);
    };
    // console.log("Key1", key, val);
    if (val) {
      switch (typeof val) {
        case 'object':
          for (key2 in val) {
            // console.log("Key2", key, key2);
            if (typeof val[key2] === 'function') {
              defenseState[key][key2] = val[key2];
            }
          }
        break;
        case 'function':
          defenseState['key'] = val;
        break;
        default:
           throw new Error("Invalid entry in vsivsi:defender internal state");
      }
    }
  }

  // console.log("defenseState:", defenseState);

  Defender = {
    check: function (hard) {
      // Check the current state of Meteor functions against saveed versions
      for (var key in defenseState) {
        var val = null
        try {
          val = eval(key);
        } catch (e) {
          // console.log("Missing", key);
        };
        // console.log("In check: Key1", key, val);
        if (val) {
          switch (typeof defenseState[key]) {
            case 'object':
              for (key2 in defenseState[key]) {
                if (typeof defenseState[key][key2] === 'function') {
                  // console.log("In check: Key2", key, key2);
                  if (defenseState[key][key2] !== val[key2]) {
                    console.warn("###############################################################");
                    console.warn("## WARNING from vsivsi:defender package:");
                    var warning = "## Meteor function: " + key + "." + key2 + " has been modified!"
                    console.warn(warning);
                    console.warn("###############################################################");
                    if (hard) throw new Error(warning);
                  }
                }
              }
            break;
            case 'function':
              if (defenseState[key] !== val) {
                console.warn("###############################################################");
                console.warn("## WARNING from vsivsi:defender package:");
                var warning = "## Meteor function: " + key + " has been modified!"
                console.warn(warning);
                console.warn("###############################################################");
                if (hard) throw new Error(warning);
              }
            break;
            default:
               throw new Error("Invalid entry in vsivsi:defender internal state");
          }
        }
      }
    }
  };
