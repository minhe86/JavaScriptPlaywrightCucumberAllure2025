import { setWorldConstructor } from '@cucumber/cucumber';

setWorldConstructor(function ({attach}) {
  this.browser = null;
  this.page = null;
  this.attach = attach;
  this.products = [];
});
