# lx-angular-alert
[![Build Status](https://secure.travis-ci.org//lx-angular-alert.svg?branch=master)](https://travis-ci.org//lx-angular-alert) [![david-dm](https://david-dm.org//lx-angular-alert.svg?theme=shields.io)](https://david-dm.org//lx-angular-alert/) [![david-dm](https://david-dm.org//lx-angular-alert/dev-status.svg?theme=shields.io)](https://david-dm.org//lx-angular-alert#info=devDependencies&view=table) 

lx-angular-alert provides a service with a directive to display information to the user.
For this, a box will be temporarily displayed in the UI. On the methods and parameters of the service can be controlled
content and appearance of the alarm box.

## Dependencies
- angular-bootstrap

## Installation

	$ bower install lx-angular-alert

## Usage
example.js
```javascript
angular.module('app', ['ui.bootstrap', 'lx.alert'])
.controller('DemoCtrl', function ($scope, $lxAlert) {
    $scope.lxAlert = $lxAlert;
    $scope.showAlert = function(type) {
        $scope.lxAlert[type]('Info message from controller');
    };
});
```
example.html

```html
<div = ng-controller="DemoCtrl">
	<h1>Demo</h1>
	<lx-alert service="lxAlert" on-show="showAlert()"></lx-alert>
	<div class='btn-group'>
	  <button class='btn btn-default' ng-click="showAlert('info')">Info-Alert</button>
      <button class='btn btn-default' ng-click="showAlert('success')">Success-Alert</button>
      <button class='btn btn-default' ng-click="showAlert('warning')">Warning-Alert</button>
      <button class='btn btn-default' ng-click="showAlert('danger')">Danger-Alert</button>
    </div>
</div>
```
## [Demo in plunker](http://plnkr.co/edit/mBMNaLaw5Udr4FXlspSy?p=preview)

## angular.module('lx.alert')
### .factory('$lxAlert')
Service for angular-ui alert handling which shows different alert boxes in an application.

#### Methods
- lxAlert.info(string:message): Provides a simple note to the information of the user.
- lxAlert.success(string:message): Delivers a message for the successful completion of a process.
- lxAlert.warning(string:message): Delivers a striking warning.
- lxAlert.danger(string:message): Provides a alarm message for heavier errors.
- lxAlert.close(): Hides the message box again.

The message parameter contains the message to be displayed.

### .directive('lxAlert')
Markup for alert. It is the place holder which contains the DOM-content to show alert messages.

#### Usage
as element:
```html
<bbc-alert>
</bbc-alert>
```
## Testing
### Install global dependencies

    $ npm install -g grunt-cli bower

#### Run unit tests

    $ grunt test

#### Run code coverage

    $ grunt cover

#### Run all tests with reports for ci systems

    $ grunt ci

#### Run karma tests in webstorm
You can run the karma test through webstorm. Just create a new karma run configuration and choose the config file `test/karma.webstorm.conf.js`.

## Contributing
Instead of us handing out a formal style guide, simply stick to the existing programming style. Please create descriptive commit messages.
We use a git hook to validate the commit messages against these [rules](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w).
Easily expand Baboon with your own extensions or changes in the functionality of Baboon itself. Use this workflow:

1. Write your functionality
2. Write unit tests for your functionality
3. Create an example of your functionality in the sample application (optional)
4. Document your functionality in the documentation section of example app
5. Write unit tests for the example
6. Add end to end tests for the example
7. All tests should be successful
8. Check your test coverage (90 - 100%)
9. Make a pull request

We will check the tests, the example and test coverage. In case your changes are useful and well tested, we will merge your requests.

### Release a new version
We use [grunt-bump](https://github.com/vojtajina/grunt-bump) and [grunt-conventional-changelog](https://github.com/btford/grunt-conventional-changelog) internally to manage our releases.
To handle the workflow, we created a grunt task `release`. This happens:

* Bump version in package.json
* Update the CHANGELOG.md file
* Commit in git with message "chore: release v[`the new version number`]"
* Create a git tag v[`the new version number`]

#### Create a new release
Release a new patch

    $ grunt release

Release a new minor version

    $ grunt release:minor

Release a new major version

    $ grunt release:major

# Author
[Litixsoft GmbH](http://www.litixsoft.de)

### License
Copyright (c) 2014 Litixsoft GmbH Licensed under the MIT license.

