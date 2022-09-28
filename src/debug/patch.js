export { patch };
export default function patch(){
    console.debug('[DEBUG] patch');
    $on('system.start', ()=>onStart());
    hookEmit();
}

function onStart() {

}

function hookEmit() {
    const emit = $emit;
    window.$emit = (key, ...args) => {
        console.debug('[DEBUG] hookEmit', key, ...args);
        return emit(key, ...args);
    }
}