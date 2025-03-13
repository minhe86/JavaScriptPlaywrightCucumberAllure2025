import nconf from 'nconf';
import _ from 'lodash';

nconf
  .env({
    transform: ({ key, value }) => {
      if (_.includes(['true', 'false'], value)) {
        value = JSON.parse(value);
      }
      return { key, value };
    }
  })
  .argv()
  .file('default', './configs/config.default.json');  