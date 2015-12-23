import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import request from 'request';
import progress from 'request-progress';
import child_process from 'child_process';
import _ from 'lodash';
import url from 'url';
import analyticsActions from '../actions/analyticsActions';
import {
    app
}
from 'remote';
import {
    ipcRenderer
}
from 'electron';
import {
    version
}
from '../../package.json';
import updaterActions from '../actions/updateActions';
var tryedAgain = false;


const appUpdateDir = path.join(app.getPath('userData'), 'update_cache');


if (!fs.existsSync(appUpdateDir))
    fs.mkdirSync(appUpdateDir);

const download = (url, filename, size, version) => {
    var outPath = path.join(appUpdateDir, filename);

    fs.readdirSync(appUpdateDir).filter(file => {
        if (file !== filename)
            fs.unlink(path.join(appUpdateDir, file))
    });

    try {
        if (fs.statSync(outPath).size === size) {
            updaterActions.updateAvailable(outPath);
            return notifyUpdate(outPath, version);
        }
    } catch (e) {

    }

    progress(request(url), {
        throttle: 2000,
        delay: 1000
    })
        .on('progress', state => {
            console.log('Update download percent:', state.percent + '%', '\nETA:', state.eta.toString(), 'seconds');
        })
        .on('error', err => {
            console.error('Error downloading update!', err);
        })
        .pipe(fs.createWriteStream(outPath))
        .on('finish', () => {
            console.info('Update successfully downloaded to', outPath);

            updaterActions.updateAvailable(outPath);
            notifyUpdate(outPath, version);
        });
}


const notifyUpdate = (updatePath, version) => {
    notifier.notify({
        title: 'Slakie ' + version + ' update available',
        message: 'Click to install',
        icon: path.join(__dirname, '../../images/icon.png'),
        sound: true,
        wait: true
    });

    notifier.on('click', () => installUpdate(updatePath));
}

const installUpdate = updatePath => {
    analyticsActions.event(['update', 'installed']);
    switch (process.platform) {
        case 'win32':
            exec(updatePath, ['--update'], {
                detached: true
            });
            break;
    }
}

const getJson = url => {
    return new Promise((resolve, reject) => {
        request(url, {
            json: true,
            headers: {
                'User-Agent': 'Slakie v.' + version
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200)
                resolve(body)
            else
                reject('something went Very Wong:' + error + '\nCODE:' + response.statusCode + '\nBODY:' + JSON.stringify(body));
        });
    })
}

const exec = (execPath, args = [], options = {}) => {
    child_process.exec(execPath + ' ' + args.join(' '), options, (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
        }
        console.log(stdout);
    });
}

module.exports = {
    check(annon) {

        if (process.env.NODE_ENV === 'development')
            return console.info('Development mode active, not checking for updates');
        else
            console.info('Checking for updates for client v.' + version);

        analyticsActions.event(['update', 'check', version]);
        getJson('https://api.github.com/repos/luigiplr/slakie/releases/latest' + (annon ? '' : '?client_id=XXXXXXXXXXXXXXX&client_secret=XXXXXXXXXXXXXXX'))
            .then(json => {

                if (version === json.tag_name || json.prerelease)
                    return console.info('No new updates available');

                var candidate = false;

                _.forEach(json.assets, asset => {
                    let assetParsed = path.parse(asset.name).name.split('-');
                    if (_.isEqual({
                        platform: (assetParsed[2].toLowerCase() === ('windows' || 'win32')) ? 'win32' : 'darwin',
                        arch: assetParsed[3],
                        installer: (path.parse(asset.name).ext === ('.exe' || '.dmg')) ? true : false
                    }, {
                        platform: process.platform,
                        arch: process.arch,
                        installer: true
                    }))
                        candidate = asset;
                });

                if (candidate) {
                    console.info('New update available v.' + json.tag_name);
                    download(candidate.browser_download_url, candidate.name, candidate.size, 'v.' + json.tag_name);
                }

            })
            .catch(err => {
                console.log(err);
                if (!tryedAgain) {
                    tryedAgain = true;
                    _.delay(this.check.bind(this, true), 1000)
                }
            })
    },
    install: installUpdate
}