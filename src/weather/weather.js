import React,{ Component } from 'react';

class Weather extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            cd: "正在加载天气数据",
            bj: "正在加载天气数据"
        };
    }

    ajaxGet = (url) => {
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("get",url);
            xhr.send();
            xhr.onreadystatechange = () => {
                if(xhr.readyState !== 4)
                    return;
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject(xhr.onerror)
                }
            };
        }).catch((e) => {console.log(e)});
    }

    componentDidMount(){
        this.ajaxGet("/data/cityinfo/101270101.html").then(json => {
            this.setState({cd:json.weatherinfo.weather});
            return this.ajaxGet("/data/cityinfo/101010100.html")
        }).then(json => {
            this.setState({bj:json.weatherinfo.weather});
        });
    }

    render(){
        return(
            <div>
                北京今日天气：{this.state.bj}
                <br />
                成都今日天气：{this.state.cd}
            </div>
        )
    }
}

export default Weather