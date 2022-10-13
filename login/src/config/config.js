const ENTORNO = 'desarrollo';

const local = {
    url: '//localhost',
    port: '3000',
    realTimeServerUrl : '//localhost',
    realTimeServerPort : '4000'
}

const desarrollo = {
    url: 'http://192.0.99.131',
    port: '3000',
    realTimeServerUrl : 'http://192.0.99.131',
    realTimeServerPort : '4000'
}



export function getRealTimeServerURL(){
    
    switch(ENTORNO){
        case 'local':
            return `${local.realTimeServerUrl}:${local.realTimeServerPort}/`;
            break;
        case 'desarrollo':
            return `${desarrollo.realTimeServerUrl}:${desarrollo.realTimeServerPort}/`;
            break;
    }
}

export function getServerURL(){

    switch(ENTORNO){
        case 'local':
            return `${local.url}:${local.port}/`;
            break;
        case 'desarrollo':
            return `${desarrollo.url}:${desarrollo.port}/`;
            break;
    }
}