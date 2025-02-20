import { setWorldConstructor } from '@cucumber/cucumber';

setWorldConstructor(function () {
  this.browser = null;
  this.page = null;
});
