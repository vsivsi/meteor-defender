## Meteor Defender

This package defends against unexpected redefinitions of standard Meteor
global functions such as `Mongo.Collection` or `Meteor.publish`.

#### Why?

Because I've wasted [too much time](https://github.com/vsivsi/meteor-job-collection/issues/58#issuecomment-72272402) debugging [problems caused](https://github.com/vsivsi/meteor-file-sample-app/issues/2#issuecomment-120780592) by packages
that (**surprise!**) monkey-patch and shadow the standard Meteor APIs.

I'm going to be unabashedly opinionated and just say that packages that do this are EVIL.

It is a terrible programming practice in one's own code, and a ***Very Bad Thing***
to silently do to some else's application. I'm not going to name names, but if you use
this package, you may find out soon enough which packages I'm talking about.

As a package developer myself, this practice makes the system difficult to reason about,
and leads to major support headaches debugging issues reported by my users. Unless I
have access to their entire app, I have no way of knowing what parts of Meteor are
pristine, and which have been monkey-patched into a nightmarish steaming pile of hacks.

As an app developer, I am concerned that packages that I use and depend on (or packages that they
depend on...) may "go rogue" during an upgrade and start modifying Meteor in ways I can't
anticipate or guard against. This prospect is basically a stability nightmare. Even worse,
a dependency of a dependency of a dependency may become a backdoor. I don't claim that this
package can replace the importance of diligence in reviewing and applying upgrades, but it
will at least alert you to more overt changes that should raise alarm.

So this package is my first stab at a solution. To raise awareness of the extent of the problem,
and hopefully to move us away from blanket acceptance of packages that implement this poor practice.

#### Installation and use

```
meteor add vsivsi:defender
```

The way this works is this package takes a snapshot of the current state of Meteor API
functions when it loads. So its position in the package load order will matter. After running the
command above, you will want to edit your `.meteor/packages` file and move the reference to
this package above any other non-core Meteor packages:

```
# Meteor packages used by this project, one per line.
#
# 'meteor add' and 'meteor remove' will edit this file for you,
# but you can also edit it by hand.

standard-app-packages
coffeescript
accounts-ui
accounts-password
# Meteor core packages go above this line
vsivsi:defender
# Atmosphere packages go below this line
twbs:bootstrap
benjaminrh:jquery-cookie
numeral:numeral
rubaxa:sortable
vsivsi:file-collection
```

Once you have done this, you can then check at any point in your application what the status
of the Meteor API is. Right now this is implemented as a single global object `Defender` with a single
function call `.check`.

`Defender.check([fatal]);`

If `fatal === true`, then this call will `throw` if any of the Meteor API calls have been modified
since the package loaded. If `fatal` is omitted or `false` then this call will log all API changes it
detects to the browser and/or server console:

```
(STDERR) ###############################################################
(STDERR) ## WARNING from vsivsi:defender package:
(STDERR) ## Meteor function: Mongo.Collection has been modified!
(STDERR) ###############################################################
```

That's all for now. I'm very open to suggestions and contributions. This is very prototype and nothing is 
set in stone, so I don't recommend deploying it in your production app just yet (!), but I hope you find it
useful in your test and debug workflow to restore some sanity to the "Wild West" environment of
Meteor packages.
