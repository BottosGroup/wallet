const node_uuid = require('node-uuid')

global.electron = require('electron')
global.uuid = node_uuid.v1().replace(/-/g,'');
