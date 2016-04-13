'use strict';

module.exports = {
    promptModuleType: promptModuleType
};

function promptModuleType() {
    return {
        type: 'list',
        name: 'moduleType',
        message: 'Which kind of module do you need to be created?',
        choices: [
            {
                name: 'common',
                value: 'modules'
            },
            {
                name: 'core',
                value: 'core'
            },
            {
                name: 'widget',
                value: 'widgets'
            }
        ]
    };
}
