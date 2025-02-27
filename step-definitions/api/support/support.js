import _ from 'lodash';
import { Before } from "@cucumber/cucumber";
import nconf from 'nconf';

Before(async function () {
  nconf
      .env({
        transform: ({ key, value }) => {
          if (_.includes(['true', 'false'], value)) value = JSON.parse(value);
          return { key, value };
        },
      })
      .argv()
      .file('default', './configs/config.api.json');
});
