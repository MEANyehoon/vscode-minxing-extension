
import * as vscode from 'vscode';

import wifi from './wifi';
import addProjectTemplate from './add_project_template';
import addPageTemplate from './add_page_template';
import build from './build';
import commandsConfig from './config';

interface CommandConfig extends vscode.QuickPickItem{
    command: string,
    title: string,
    category?: string
}

export default {
    mainEntry(uri) {
        const quickItems: Array<vscode.QuickPickItem> = commandsConfig
                .filter(c => c.command !== "Minxing.mainEntry")
                .map(cmd => Object.assign({}, cmd, {"label": cmd.title}));
        vscode.window.showQuickPick(quickItems, {
            matchOnDescription: true,
            placeHolder: '选择要进行的操作'
        }).then(data => {
            if (!data) return;
            const namespace = 'Minxing';
            const cmd = (<CommandConfig>data).command;
            if (!(new RegExp(`^${namespace}`)).test(cmd)) {
                return;
            }
            const method = cmd.split('.')[1];
            if (this[method] instanceof Function) {
                this[method](uri);
            }
        })
    },
    addProjectTemplate,
    addPageTemplate,
    getWifiInfo: wifi.getWifiInfo.bind(wifi),
    getWifiLog: wifi.getWifiLog.bind(wifi),
    sync: wifi.syncWifi.bind(wifi),
    syncAll: wifi.syncAllWifi.bind(wifi),
    build 
}