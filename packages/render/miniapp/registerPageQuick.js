
import {  isFn } from 'react-core/util';
import { eventSystem } from './eventSystemQuick';
import { onLoad, onUnload, onReady } from './registerPageMethod';
import { shareObject } from './utils';

export function registerPage(PageClass, path) {
    PageClass.reactInstances = [];
    let config = {
        private: {
            props: Object,
            context: Object,
            state: Object
        },
        dispatchEvent: eventSystem.dispatchEvent,
        onInit(query) {
            var $app =  shareObject.app = this.$app.$def || this.$app._def;
            var instance = onLoad.call(this,PageClass, path, query);
            // shareObject的数据不是长久的，在页面跳转时，就会丢失
            var pageConfig = instance.config || PageClass.config;
            $app.pageConfig = pageConfig && Object.keys(pageConfig).length ? pageConfig : null;
            $app.pagePath = path;
            $app.page = instance;
        },
        onReady: onReady,
        onDestroy: onUnload
    };
    Array('onShow', 'onHide', 'onMenuPress').forEach(function(hook) {
        config[hook] = function() {
            let instance = this.reactInstance;
            let fn = instance[hook];
            if (isFn(fn)) {
                return fn.apply(instance, arguments);
            }
        };
    });
    return config;
}
