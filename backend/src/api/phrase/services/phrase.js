'use strict';

/**
 * phrase service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::phrase.phrase');
