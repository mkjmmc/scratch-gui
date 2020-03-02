import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import log from '../lib/log.js';
import xhr from 'xhr';
import cookies from 'js-cookie';
import AliOSS from 'ali-oss';


// const apiHost = 'http://localhost:4002';
const apiHost = 'https://scratch.yzsteam.com';
const assetHost = 'https://assets.scratch.yzsteam.com';
// const assetHost = 'http://localhost:8801';

const onClickLogo = () => {
    window.location = 'https://scratch.yzsteam.com/myprojects';
};

const handleTelemetryModalCancel = () => {
    log('User canceled telemetry modal');
};

const handleTelemetryModalOptIn = () => {
    log('User opted into telemetry');
};

const handleTelemetryModalOptOut = () => {
    log('User opted out of telemetry');
};

// 保存项目图片
const handleUpdateProjectThumbnail = (id, data) => {
    // log(id,  data)
    // 请求接口获取上传权限
    xhr({
        method: "get",
        uri: `${apiHost}/api/v1/projects/thumbnail/${id}`,
        json: true,
        headers: {
            "authorization": cookies.get('authorization')
        }
    }, function (err, resp, body) {
        console.log(resp)
        console.log(body)

        // 获取到数据，上传到oss
        const client = new AliOSS({
            region: 'oss-cn-hangzhou',
            // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
            accessKeyId: body.AccessKeyId,
            accessKeySecret: body.AccessKeySecret,
            stsToken: body.SecurityToken,
            bucket: 'yzsteam'
        });
        client.multipartUpload(body.key, data)
            .then(result => {
                console.log(result);
                if (result.res.status === 200) {
                    // 上传成功，通知服务器保存图片
                    xhr({
                        method: "put",
                        uri: `${apiHost}/api/v1/projects/thumbnail/${id}`,
                        body: {
                            thumbnail_key: result.name
                        },
                        json: true,
                        headers: {
                            "authorization": cookies.get('authorization')
                        }
                    }, function (err, resp, body) {

                    })
                }
                // this.setState({profile: result.name}, () => {
                //     this.save();
                // })
            })
            .catch(error => {
                console.log(error);
                // this.props.ErrorStatus(error);
            });
        // check resp.statusCode
    })
};

const handleLogOut = () => {
    let config = window.location.host.endsWith('yzsteam.com') ? {'domain': 'yzsteam.com'} : {};
    cookies.remove('authorization', config);

    window.location.href = '/';
};

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
export default appTarget => {
    GUI.setAppElement(appTarget);

    // note that redux's 'compose' function is just being used as a general utility to make
    // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
    // ability to compose reducers.
    const WrappedGui = compose(
        AppStateHOC,
        // HashParserHOC
    )(GUI);

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    const scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
    let simulateScratchDesktop;
    if (scratchDesktopMatches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            simulateScratchDesktop = scratchDesktopMatches[1];
        }
    }

    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    ReactDOM.render(
        // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
        simulateScratchDesktop ?
            <WrappedGui
                canEditTitle
                isScratchDesktop
                showTelemetryModal
                canSave={false}
                onTelemetryModalCancel={handleTelemetryModalCancel}
                onTelemetryModalOptIn={handleTelemetryModalOptIn}
                onTelemetryModalOptOut={handleTelemetryModalOptOut}
            /> :
            <WrappedGui
                backpackVisible={false}
                showComingSoon={false}
                backpackHost={backpackHost}
                canCreateNew={window.projectInfo.canCreateNew || false}
                canSave={window.projectInfo.canSave || false}
                canRemix={window.projectInfo.canRemix || false}
                canEditTitle={window.projectInfo.canEditTitle || false}
                authorUsername={window.projectInfo.authorUsername || ''}
                authorThumbnailUrl={window.projectInfo.authorThumbnailUrl || ''}
                is_editable={window.projectInfo.is_editable || false}
                authorId={window.projectInfo.authorId || '0'}
                onClickLogo={onClickLogo}
                projectHost={`${apiHost}/api/v1/projects/data`}
                assetHost={assetHost}
                projectId={window.projectId}
                projectTitle={window.projectInfo.name}
                // fetchingProject={true}
                // reduxProjectId={window.projectId}
                // isFetchingWithId={true}
                // loadingState={LoadingState.SHOWING_WITH_ID}
                onUpdateProjectThumbnail={handleUpdateProjectThumbnail}
                onLogOut={handleLogOut}

            />,
        appTarget);
};
