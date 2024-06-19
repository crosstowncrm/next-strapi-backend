'use strict';

/**
 * sales-stage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sales-stage.sales-stage');
