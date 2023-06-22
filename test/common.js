'use strict';

const sinonChai       = require('sinon-chai');

global.chai           = require('chai');
global.sinon          = require('sinon');
global.chaiAsPromised = require('chai-as-promised');
global.expect         = chai.expect;

global.chai.use(sinonChai);
global.chai.use(chaiAsPromised);

