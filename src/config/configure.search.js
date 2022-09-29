let DEBUG_ON = false;
const search = {};

export function debug() { return { on: DEBUG_ON }; }

export function core() { return { search } }

window.location.search
.substring(1)
.split('&')
.forEach(item=>{
    const [key, value] = item.split('=');
    if(!key) return;
    if(key==='debug' && value) {
        DEBUG_ON = !!JSON.parse(value);
        return;
    }
    search[key] = value;
});