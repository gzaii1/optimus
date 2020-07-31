const baseUrl = process.env.NODE_ENV === "development"?
  "api/v1/":
  'http://100.98.97.86:80/api/v1/'

const defaultConfig = { 
    headers: { 'content-type': 'application/json' },
    method:'GET',
    mode:'cors',
    credentials:'include'
}

let configs = Object.create(null)

export const Fetch = new Proxy(fetch, {
    set:(target, key, value, receiver)=>{
        if(key === 'body' || key === 'params'){
            if(Object.prototype.toString.call(value) === '[object Object]'){
                value = JSON.stringify(value)
            }
        }else if(key === 'method'){
            value = value.toUpperCase()
        }
        configs[key] = value
        return true
    },
    apply:(target, thisArg, argumentsList)=>{
        if(argumentsList[1]){
            configs.body = JSON.stringify(argumentsList[1])
        }
        const response = target(argumentsList[0].includes('http')? argumentsList[0]: baseUrl + argumentsList[0], { ...defaultConfig, ...configs })
        configs = Object.create(null)
        return response
        .then(res=> res.json())
        .catch((error)=>{
            console.log(error)
        })
    },
})