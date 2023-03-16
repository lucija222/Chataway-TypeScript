export const fetchData = async (url, setStateFunc) => {
    try {
        const response = await fetch(url);
    
        if(!response.ok) {
        throw new Error(`Fetch response not OK: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        setStateFunc(data);
    } catch(exception) {
        console.error(`Fetch exception: ${exception}`)
    }
};